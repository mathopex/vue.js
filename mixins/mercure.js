export default {

    /**
     *  Assign runtime callbacks
     */
    beforeCreate() {
        if (!this.mercure) {
            this.mercure = {};
        }
    },

    /**
     * Register all mercure events
     */
    mounted() {
        if (this.$options.mercure) {
            Object.keys(this.$options.mercure).forEach(topic => {
                this.$mercure.addTopic(topic, this.$options.mercure[topic], this);
            });
        }
    },

    /**
     * unsubscribe when component unmounting
     */
    beforeDestroy() {
        if (this.$options.mercure) {
            Object.keys(this.$options.mercure).forEach(topic => {
                this.$mercure.removeTopic(topic, this);
            });
        }
    }
}
