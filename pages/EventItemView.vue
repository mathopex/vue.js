<template>       
    <WaCard id="main-card">
        <q-card-section class="q-card-section">
            <q-img src="https://wizards-alley.com/events/img/vApUDpMm2gXZwOFl4u75cAee6PKSJo.png"
                width="100%"
                height="300px"></q-img>
                <WaCard class="event-list__card-calendar  q-mb-sm">
                    <q-card-section horizontal class="row justify-center items-center calendar" id="calandar-eventItem">
                        <p class="col-3 q-py-lg date" id="firstDate">22<br>juin<br>2001</p>
                        <span>au</span>
                        <p class="col-5 q-py-lg date">15<br>novembre<br>2003</p>
                    </q-card-section>
                </Wacard>
                <div class="info-user">
                    <div id="name-user"> {{this.events.name}} </div>

                    <div id="pseudo-user">
                        Organisé par <span @click="redirectTo()">@{{this.user.username}}</span>
                    </div>

                    <WaButton>
                        <svg id="icon-1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <g id="XMLID_1449_">
                                <g id="XMLID_328_">
                                    <path id="XMLID_670_"
                                        d="m427.63 369.759-32.822-130.279 5.429 4.518c6.512 5.418 14.167 8.13 21.827 8.13 7.559 0 15.123-2.64 21.598-7.926 13.037-10.643 16.451-27.756 8.494-42.586l-28.337-52.813c-2.61-4.866-8.673-6.696-13.539-4.083-4.867 2.611-6.695 8.673-4.084 13.54l28.337 52.813c4.062 7.571.846 14.075-3.519 17.638-4.362 3.563-11.382 5.412-17.984-.085l-88.301-73.477c-4.247-3.532-10.551-2.953-14.083 1.291-3.533 4.246-2.955 10.551 1.29 14.083l31.709 26.386c-2.281.769-4.511 1.756-6.654 2.99l-21.203 12.206c-4.786 2.755-6.433 8.869-3.678 13.656 2.755 4.786 8.867 6.431 13.656 3.677l21.203-12.206c4.511-2.598 9.848-2.923 14.644-.891 4.794 2.032 8.273 6.093 9.545 11.142l21.547 85.517h-95.983c-4.229-4.509-10.234-7.333-16.889-7.333h-47.667c-6.655 0-12.659 2.825-16.889 7.333h-95.086l28.146-108.514c.895-3.449 3.127-6.256 6.286-7.904 3.159-1.647 6.739-1.873 10.079-.633l48.993 18.183c5.18 1.921 10.933-.718 12.854-5.896 1.922-5.178-.718-10.933-5.896-12.854l-43.586-16.176 30.406-91.103 25.878 25.878c1.953 1.953 4.512 2.929 7.071 2.929s5.119-.976 7.071-2.929c3.905-3.905 3.905-10.237 0-14.143l-32.754-32.754c12.009-28.397 39.855-47.084 71.087-47.084 28.491 0 54.559 15.596 68.029 40.702l9.786 18.241c2.611 4.867 8.674 6.695 13.539 4.084 4.866-2.611 6.695-8.673 4.084-13.54l-9.786-18.242c-16.959-31.609-49.78-51.245-85.652-51.245-41.888 0-78.941 26.696-92.202 66.429l-36.348 108.907c-4.117.395-8.165 1.564-11.902 3.514-8.12 4.236-14.096 11.75-16.396 20.615l-44.167 170.286c-29.345 8.752-84.811 29.503-84.811 61.249 0 24.161 27.414 44.843 79.279 59.813 47.339 13.663 110.1 21.187 176.721 21.187s129.382-7.524 176.722-21.188c51.864-14.968 79.278-35.651 79.278-59.812 0-31.244-44.575-50.384-84.37-61.241zm-18.766 7.383c.602 2.385.078 4.866-1.434 6.806s-3.788 3.052-6.248 3.052h-98.182v-54h94.743zm-129.031-51.475c1.746 0 3.167 1.421 3.167 3.167v62.333c0 1.746-1.421 3.167-3.167 3.167h-47.667c-1.746 0-3.167-1.421-3.167-3.167v-62.333c0-1.746 1.42-3.167 3.167-3.167zm-70.833 7.333v54h-97.761c-2.471 0-4.754-1.121-6.266-3.074-1.512-1.954-2.023-4.446-1.403-6.837l11.435-44.089zm47 159c-146.218 0-236-35.528-236-61 0-10.083 22.953-27.178 65.705-40.607.904 2.026 2.052 3.965 3.449 5.771 5.328 6.887 13.378 10.836 22.085 10.836h104.039c4.229 4.509 10.234 7.333 16.889 7.333h47.667c6.655 0 12.66-2.825 16.889-7.333h104.459c8.668 0 16.696-3.921 22.024-10.758 1.449-1.859 2.63-3.863 3.554-5.959 47.923 13.749 65.24 30.276 65.24 40.717 0 25.472-89.782 61-236 61z"></path>
                                    <path id="XMLID_1081_" d="m393.66 123.91c2.63 0 5.199-1.07 7.069-2.93 1.86-1.86 2.931-4.44 2.931-7.07s-1.07-5.21-2.931-7.07c-1.87-1.86-4.439-2.93-7.069-2.93-2.641 0-5.221 1.07-7.08 2.93-1.86 1.86-2.931 4.43-2.931 7.07 0 2.63 1.07 5.21 2.931 7.07 1.87 1.86 4.44 2.93 7.08 2.93z"></path>
                                </g>
                            </g>
                        </svg>
                        <p>Participer</p>
                    </WaButton>

                    <div id="description-user"> {{this.events.description}} - <a href="#">modifier l'événement</a> </div>

                    <a id="a_block" :href="this.events.website">En savoir plus de l'événement</a>

                    <a id="a_block" style="color: #E91E63;" href="#">Supprimer l'événement</a>
 
                </div>
        </q-card-section>
    </WaCard>
</template>

<script>
import WaCard from 'src/components/ui/WaCard.vue';
import WaButton from 'src/components/ui/WaButton.vue'
import { ApiEvent } from 'src/common/api.service';
import { loadingHandler } from 'src/common/ui.service';
import { slugify } from 'src/common/utils.service';

export default {
    name: 'EventItemView',
    components: { WaCard, WaButton },
    data(){ 
        return {
            events:[],
            user:[],
        }
    },
    methods:{
        async fetchEvents() {
            return await ApiEvent.getEvents()
        },
        redirectTo() {
            this.$router.push({ name: 'profilUser', params: { userSlug: `${ slugify(this.user.username) }` }, query: { id: this.user.id } });
        }
    },
    async mounted() {
        this.events = await loadingHandler(this.fetchEvents)
        this.events = this.events['hydra:member']
        this.events = this.events.filter((event) =>{
            return event.id == this.$route.query.id
        })
        this.events = this.events[0]
        this.user = this.events.author
    },
}
</script>

<style lang="scss" scoped>
    article{
        width: 750px;
    }
    .q-card-custom.q-card.border {
        display: flex;
        justify-content: center;
    }

    #q-card-custom{
        display: flex;
        justify-content: center;
    }
    .q-card-section{
        width:100%;
        justify-content: center;
    }
    .calendar {
        width: 280px;
        background-color: #0d0a09;
        text-align: center;
        
        &::before{
            position: absolute;
            content: " ";
            top: 0;
            height: 10px;
            width: 100%;
            border-radius: 15px 15px 0px 0px;
            background-color: #987ed1;
        }
    }

    #firstDate{
        margin-left: 10px;
    }

    #calandar-eventItem{
        margin-top: -65px;
    }

    .info-user{
        margin-top: 20px;
         #name-user{
            font-size: 25px;
            text-align: center;
        }
        #pseudo-user{
            text-align: center;
            margin-top: 10px;
            span{
                color: #8971ba;
                
            }
            span:hover{
                cursor: pointer;
            }
        }
        #description-user{
            width: 80%;
            margin: 0 auto;
            text-align: center;
            font-size: 15px;
        }
        button {
            background: transparent;
            display: flex;
            border: 1px solid #987ed1;
            font-size: 12px;
            margin: 0 auto;
            text-align: center;
            justify-content: center;
            align-content: center;
            padding: 10px 25px;
            border-radius: 10px;
            margin-top: 25px;
            margin-bottom: 40px;
            cursor: pointer;

            svg {
                width: 25px;
                margin-right: 20px;
                fill: #987ed1;
            }
            p {
                color: #8971ba;
            }

            &:hover {
                transition: 0.2s linear;
                background-color: #987ed1;

                svg {
                    transition: 0.2s linear;
                    fill: white;
                }
                p {
                    transition: 0.2s linear;
                    color:  white;
                }
            }

        }
        
        a {
            color: #8971ba;
        }

        #a_block {
            display: block;
            text-align: center;
            margin-top: 25px;
            font-size: 15px;
        }
      
    }

    
</style>