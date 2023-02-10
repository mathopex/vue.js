<template>
    <div id="publication-list">
        <q-infinite-scroll :disable="noMorePublications" debounce="5000" @load="onLoad">
            <PublicationItemComponent v-for="publication in publicationsFilter" :key="publication.id"
                                      :publication="publication"/>
            <template v-slot:loading>
                <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px"/>
                </div>
            </template>
        </q-infinite-scroll>
        <p v-if="noMorePublications" class="text-center q-px-lg q-py-lg">Vous avez vu toutes les publications</p>
    </div>
</template>

<script>
import { FETCH_PUBLICATIONS } from 'src/store/publicationModule/actions.type';
import PublicationItemComponent from 'components/publication/PublicationItemComponent';
import { isEmpty, isNil } from 'lodash';
import { FILTER_CLUB_TYPE, FILTER_HOUSE_TYPE, FILTER_ROLE_TYPE,FILTER_CATERORY_TYPE } from 'components/publication/PublicationFilterComponent';
import { mapGetters } from 'vuex';
import { FETCH_USER_FOLLOWINGS } from 'src/store/userModule/actions.type';

const PUBLICATIONS_TOPIC = 'publications/{id}';

export default {
    name: 'PublicationListComponent',
    components: { PublicationItemComponent },
    props: {
        filters: {
            type: Array,
            default: () => []
        },
        followOnly: {
            type: Boolean,
            default: false
        },
        byClub: {
            type: Object,
            default: () => {}
        },
        byCategory: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            publications: [],
            followings: [],
            noMorePublications: false
        };
    },
    computed: {
        ...mapGetters([
            'getUser'
        ]),
        lastIdRetrieve() {
            if (!isEmpty(this.publications)) {
                return this.publications[this.publications.length - 1].id;
            }
            return null;
        },
        publicationsFilter() {
            let publications = this.publications;

            if (this.followOnly) {
                publications = publications.filter((publication) => this.followingsIds.includes(publication.author.id));
            } else {
                publications = publications.filter((publication) => publication.public || publication.author.id === this.getUser.id);
            }

            if (!isEmpty(this.byClub)) {
                publications = publications.filter((publication) => publication.club && publication.club.id === this.byClub.id);
            }
            if (!isEmpty(this.byCategory)) {
                publications = publications.filter((item) =>{
                    return this.byCategory.some((filter) => {
                        if(filter.filterType === FILTER_CATERORY_TYPE) {
                            return filter.filterValue === item.author.userInformations.category.id
                        }
                    })
                })  
            }

            if (!isEmpty(this.filters)) {
                publications = publications.filter((item) => {
                    return this.filters.some((filter) => {
                        if (filter.filterType === FILTER_HOUSE_TYPE) {
                            if (!isNil(item.author.userInformations.house)) { //__ si maison vide alors c'est un compte pro
                                return filter.filterValue === item.author.userInformations.house.id;
                            }

                            return false;
                        }

                        if (filter.filterType === FILTER_ROLE_TYPE) {
                            if (Array.isArray(filter.filterValue)) {
                                return filter.filterValue.includes(item.author.role.id);
                            }

                            return item.author.role.id === filter.filterValue;
                        }

                        if (filter.filterType === FILTER_CLUB_TYPE) {
                            if (Array.isArray(filter.filterValue)) {
                                return filter.filterValue.includes(item.author.role.id);
                            }

                            return item.author.role.id === filter.filterValue;
                        }

                        if (filter.filterType === FILTER_CATERORY_TYPE) {
                            if (Array.isArray(filter.filterValue)) {
                                return filter.filterValue.includes(item.author.role.id);
                            }

                            return item.author.role.id === filter.filterValue;
                        }

                    });       
                }, this);
            }

            return publications;
        },
        followingsIds() {
            return this.followings.map((following) => following.user.id);
        }
    },
    methods: {
        async fetchPublications(params = {}) {
            return await this.$store.dispatch(FETCH_PUBLICATIONS, params);
        },
        async fetchFollowings(params = {}) {
            return await this.$store.dispatch(FETCH_USER_FOLLOWINGS, params);
        },
        async onLoad(index, done) {
            let params = {};

            if (!isEmpty(this.publications)) {
                params = { property: 'id', range: 'lt', id: this.lastIdRetrieve };
            }

            const { result, totalItems } = await this.fetchPublications(params);

            if (totalItems > 0) {
                this.publications.push(...result);
                this.noMorePublications = false;
                done();
            } else {
                this.noMorePublications = true;
            }
        }
    },
    mercure: {
        [PUBLICATIONS_TOPIC](params) {
            this.publications.unshift(params);
        }
    },
    async mounted() {
        this.followings = await this.fetchFollowings({ idUser: this.getUser.id });
    }
};
</script>

<style scoped>

</style>
