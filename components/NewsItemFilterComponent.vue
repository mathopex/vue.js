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
import { FETCH_CATEGORIES } from 'src/store/miscModule/actions.type';
import { loadingHandler } from 'src/common/ui.service';
import { FILTER_CATERORY_TYPE } from 'components/publication/PublicationFilterComponent';
import { isEmpty, map } from 'lodash';

export default {
    name: 'NewsItem',
    components: { WaButton },
    data() {
        return {
            categorys:[],
            filtersGroups: [
                {
                    filterTitle: 'Parcourir les catégories',
                    filterType: 'chip',
                    items: []
                },
               
            ],
            filters: []
        };
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
            this.$emit('resetFilter', this.filters);
        },

        async fetchCategorie() {
            return await this.$store.dispatch(FETCH_CATEGORIES)
        },

        createCategoryList() {
            for(var i = 1; i < this.categorys.length ; i++){  
                this.filtersGroups[0].items.push({
                    filterValue: this.categorys[i].id,
                    filterType: FILTER_CATERORY_TYPE,
                    filterName: this.categorys[i].name,
                    id: i,
                })
            }
            return this.filtersGroups[0].items
        }
    },
    async mounted() {
        this.categorys = await loadingHandler(this.fetchCategorie);
        this.categorys = this.categorys['hydra:member']
        this.createCategoryList()
    }


}

</script>

<style lang="scss" scoped>

.a{
    display: block;
    opacity: 0.7;
    transition: 0.2s linear;
    margin-top: 4vh;

    &:hover{
        opacity: 1;
        cursor: pointer;
    }

    .head-news{
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: space-between;
    }

    svg{
        width: 15px;
        height: 15px;
        fill: #ffffff;
        margin-left: 14px;
        transition: 0.2s linear;
    }

    p{
        opacity: 0.8;
    }
}
</style>