<template>
    <BaseLayoutComponent :headerBanner="false">
        <div class="event-futur">
            <HeaderBanner :img="'common/newsfeed.jpg'">Les événements en cours et à venir</HeaderBanner>

            <EventList :events="getEventCurentAndFutur"/>

        </div>

        <div class="event-past">
            <HeaderBanner :img="'common/newsfeed.jpg'">Les événements passés</HeaderBanner>

            <EventList :events="getEventPast" />
        </div>
    </BaseLayoutComponent>
</template>

<script>
import BaseLayoutComponent from 'components/BaseLayoutComponent';
import HeaderBanner from 'components/ui/HeaderBanner';
import EventList from 'components/EventListComponent';
import { loadingHandler } from 'src/common/ui.service';
import { ApiEvent } from 'src/common/api.service';
import { parseIso } from 'src/common/date.service';


export default {
    name: 'EventView',
    components: {
        EventList,
        BaseLayoutComponent,
        HeaderBanner
    },
    data(){
        return{
            events:[],
            dateNow : parseIso(Date.now())
        }
    },
    computed:{
        getEventPast(){
            let dateEvents= this.events.filter((event) =>{
                return parseIso(event.dateEnd) < this.dateNow 
            })
            return dateEvents
        },
        getEventCurentAndFutur(){
            let dateEvents = this.events.filter((event) =>{
                return parseIso(event.dateEnd) >= this.dateNow 
            })
            return dateEvents
        }

    },
    methods: {
        async fetchEvents() {
            return await ApiEvent.getEvents()
        },
    },
    async mounted() {
        this.events = await loadingHandler(this.fetchEvents)
        this.events = this.events['hydra:member']
    },
};
</script>

<style lang="scss" scoped>
.col-8{
    width: 68%;
}
</style>

