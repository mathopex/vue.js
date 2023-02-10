import Logger from "src/common/mercure/logger";
import {API_URL} from "src/common/config";

export class MercureVuejs {
    constructor(options = {}) {
        this.hubUrl = options.hubUrl;
        this.topics = new Map()
    }

    addTopic(topic, callback, component) {
        if (typeof callback === 'function') {
            if (!this.topics.has(topic)) {
                this.topics.set(topic, []);
            }

            const url = new URL(this.hubUrl)
            url.searchParams.append('topic', API_URL + topic)
            const eventSource = new EventSource(url)
            this.topics.get(topic).push({callback, component, eventSource});
            this.addEventSource(topic)
        } else {
            throw new Error(`callback must be a function`);
        }
    }

    removeTopic(topic, component) {
        if (this.topics.has(topic)) {
            const listeners = this.topics.get(topic).filter(listener => (listener.component !== component));

            if (listeners.length > 0) {
                this.topics.set(topic, listeners);
            } else {
                this.removeEventSource(topic)
                this.topics.delete(topic);
            }
        }
    }

    addEventSource(topic) {
        this.topics.get(topic).forEach((value) => {
            Logger.info(`#${topic} subscribe topic, component: ${value.component.$options.name}`);
            // The callback will be called every time an update is published
            value.eventSource.onmessage = function ({data}) {
                return value.callback.call(value.component, JSON.parse(data))
            }
        })
    }

    removeEventSource(topic) {
        this.topics.get(topic).forEach((value) => {
            // The callback will be called every time an update is published
            value.eventSource.close()
            Logger.info(`#${topic} unsubscribe, component: ${value.component.$options.name}`);
        })
    }
}
