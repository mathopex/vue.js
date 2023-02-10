<template>
    <WaCard class="col-6 event-list__card">
        <q-card-section>
            <q-img alt="event_img"
                   height="270px"
                   img-class="justify-center items-center event-list__card-img"
                   src="https://wizards-alley.com/events/img/vUB9uPu2B3n0NX9kALB89RrRqZ6DEK.jpg" width="100%">
                <div class="absolute-center text-center">
                    <q-img img-class="user-img-radius event-list__card-user q-mb-sm"
                           src="https://wizards-alley.com/p/img/ES9ZqcmsEofZzJ9rREWYXx9TlEaKEy.jpg"
                           width="25%"></q-img>
                    <p class="event-list__card-title q-mb-sm text-body1">Ze Next Convention 3</p>
                    <WaCard :bordered="false" class="event-list__card-calendar q-mb-sm">
                        <q-card-section horizontal class="row justify-center items-center calendar">
                            <p class="col-4 q-py-lg date">{{ this.dayStart }}<br>{{ this.monthStart }}<br>{{ this.yearStart }}</p>
                            <span>au</span>
                            <p class="col-4 q-py-lg date">{{ this.dayEnd }}<br>{{ this.monthEnd }}<br>{{ this.yearEnd }}</p>
                        </q-card-section>
                    </WaCard>
                </div>
            </q-img>
        </q-card-section>
    </WaCard>
</template>

<script>
import WaCard from 'components/ui/WaCard';
import { dateFormatFrAnneeCourt, dateFormatFrJourCourt, dateFormatFrMoisCourt } from 'src/common/date.service';

export default {
    name: 'EventItem',
    components: { WaCard },
    props: {
        event: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            dayStart: '',
            monthStart: '',
            yearStart: '',
            dayEnd: '',
            monthEnd: '',
            yearEnd: ''

        };
    },
    mounted() {
        this.dayStart = dateFormatFrJourCourt(this.event.dateStart);
        this.monthStart = dateFormatFrMoisCourt(this.event.dateStart);
        this.yearStart = dateFormatFrAnneeCourt(this.event.dateStart);

        this.dayEnd = dateFormatFrJourCourt(this.event.dateEnd);
        this.monthEnd = dateFormatFrMoisCourt(this.event.dateEnd);
        this.yearEnd = dateFormatFrAnneeCourt(this.event.dateEnd);
    }
};
</script>

<style scoped>

</style>
