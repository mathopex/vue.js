<template>
    <div class="row justify-around event-list q-col-gutter-sm">
        <EventItem v-for="(event, i) in events" :key="i" :event="event" @click="redirectTo(event)"></EventItem>
    </div>
</template>

<script>
import EventItem from 'components/EventItemComponent';
import { slugify } from 'src/common/utils.service';

export default {
    name: 'EventList',
    components: { EventItem },
    props: {
        events: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        redirectTo(event) {
            this.$router.push({ name: 'eventItemView', params: { eventSlug: `${ slugify(event.name) }` }, query: { id: event.id } });
            console.log(event)
        }
    }
};
</script>

<style lang="scss">
.calendar {
    width: 280px;
    background-color: #0d0a09;

    &:before {
        position: absolute;
        content: " ";
        top: 0;
        height: 10px;
        width: 100%;
        border-radius: 15px 15px 0px 0px;
        background-color: $secondary;
    }

    .date {
        line-height: 1.3;
    }
}

.event-past {
    .event-list__card {
        .q-img__content {
            background-color: rgba(0, 0, 0, 0.85);
            transition: 0.2s linear;
        }

        &:hover {
            .q-img__content {
                background-color: rgba(0, 0, 0, 0.10);
                opacity: 1;
                transition: 0.2s linear;
                cursor: pointer;
            }
        }
    }
}

.event-futur {
    .event-list__card {
        .q-img__content {
            background-color: rgba(0, 0, 0, 0.45);
            transition: 0.2s linear;
        }

        &:hover {
            .q-img__content {
                background-color: rgba(0, 0, 0, 0.10);
                opacity: 1;
                transition: 0.2s linear;
                cursor: pointer;
            }
        }
    }
}

.event-list__card {
    width: 390px;
}

.q-card__section {
    padding: 0;
}

.q-img__content > div {
    background: none;
}

.user-img-radius {
    border-radius: 15px;
}
</style>
