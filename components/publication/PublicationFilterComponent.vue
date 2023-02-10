<template>
    <q-expansion-item class="q-mb-lg publication-card--section-group radius" icon="menu" label="Trier par">
        <q-card class="publication-card--section-group column">
            <q-card-section v-for="(filterGroup, key) in filtersGroups" :key="key" class="q-gutter-sm">
                <p>{{ filterGroup.filterTitle }}</p>
                <template v-if="filterGroup.filterType === 'chip'">
                    <q-chip v-for="filterItem in filterGroup.items" :key="filterItem.id"
                            v-model:selected="filterItem.checked" :color="`${filterItem.chipOptions === undefined ? 'secondary' : filterItem.chipOptions.color }`"
                            :icon="`${filterItem.chipOptions === undefined ? 'fa fa-hat-wizard' : 'img:' + filterItem.chipOptions.icon }`"
                            :text-color="`${filterItem.chipOptions === undefined ? 'primary' : filterItem.chipOptions.textColor }`"
                            clickable @click="applyFilter(filterItem)">
                        {{ filterItem.filterName }}
                    </q-chip>
                </template>
            </q-card-section>

            <q-card-actions v-if="!filtersIsEmpty">
                <WaButton class="q-mt-sm full-width" color="primary" label="Oubliette" @click="resetFilter()"/>
            </q-card-actions>
        </q-card>
    </q-expansion-item>
</template>

<script>
import WaButton from 'components/ui/WaButton';
import { isEmpty, map } from 'lodash';

export const FILTER_HOUSE_TYPE = 'house';
export const FILTER_ROLE_TYPE = 'role';
export const FILTER_CLUB_TYPE = 'club';
export const FILTER_CATERORY_TYPE = 'categorie';

export default {
    name: 'PublicationFilterComponent',
    components: { WaButton },
    data() {
        return {
            filtersGroups: [
                {
                    filterTitle: 'Maison',
                    filterType: 'chip',
                    items: [
                        {
                            id: 1,
                            filterName: 'Gryffondor',
                            filterType: FILTER_HOUSE_TYPE,
                            filterValue: 1,
                            chipOptions: {
                                color: 'secondary-gryffindor',
                                textColor: 'primary-gryffindor',
                                icon: require('../../assets/images/houses/gryffindor.png')
                            }
                        },
                        {
                            id: 2,
                            filterName: 'Poufsouffle',
                            filterType: FILTER_HOUSE_TYPE,
                            filterValue: 2,
                            chipOptions: {
                                color: 'secondary-hufflepuff',
                                textColor: 'primary-hufflepuff',
                                icon: require('../../assets/images/houses/hufflepuff.png')

                            }
                        },
                        {
                            id: 3,
                            filterName: 'Serdaigle',
                            filterType: FILTER_HOUSE_TYPE,
                            filterValue: 3,
                            chipOptions: {
                                color: 'primary-ravenclaw',
                                textColor: 'secondary-ravenclaw',
                                icon: require('../../assets/images/houses/ravenclaw.png')
                            }
                        },
                        {
                            id: 4,
                            filterName: 'Serpentard',
                            filterType: FILTER_HOUSE_TYPE,
                            filterValue: 4,
                            chipOptions: {
                                color: 'primary-slytherin',
                                textColor: 'secondary-slytherin',
                                icon: require('../../assets/images/houses/slytherin.png')

                            }
                        }
                    ]
                },
                {
                    filterTitle: 'Type de publication',
                    filterType: 'chip',
                    items: [
                        {
                            id: 1,
                            filterName: 'Publications des Sorcier(e)s',
                            filterType: FILTER_ROLE_TYPE,
                            filterValue: 3 //__ id role user simple
                        },
                        {
                            id: 2,
                            filterName: 'Publications des Communautés Magiques',
                            filterType: FILTER_ROLE_TYPE,
                            filterValue: [1, 2, 4, 5, 6] //__ id role user pro
                        }
                    ]
                }
            ],
            filters: []
        };
    },
    props: {
        defaultFilter: {
            type: Boolean,
            default: true
        },
        categoryFilter: {
            type: Boolean,
            default: false
        },
        housesFilter: {
            type: Boolean,
            default: false
        },
        followOnly: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        filtersIsEmpty() {
            return isEmpty(this.filters);
        }
    },
    methods: {
        applyFilter(filterItem) {
            if (filterItem.checked) {
                this.filters.push(filterItem);
            } else {
                const start = this.filters.findIndex((element) => element.id === filterItem.id && element.filterType === filterItem.filterType);
                this.filters.splice(start, 1);
            }

            this.$emit('applyFilter', this.filters);
        },
        resetFilter() {
            this.filters = [];
            map(this.filtersGroups, (group) => map(group.items, (item) => item.checked = false));
            this.$emit('resetFilter');
        }
    }
};
</script>

<style lang="scss">
.publication-card--section-group {
    .q-chip__content {
        color: unset;
    }
}
</style>
