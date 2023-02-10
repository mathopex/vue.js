<template>  
    <BaseLayoutComponent :headerBanner="false">
        <template #filter>
            <NewsItemFilterComponent @applyFilter="setFilter" @resetFilter="resetFilter"/> 
        </template>

        <HeaderBanner>Toutes les actualités des projets francophones de Harry Potter</HeaderBanner>
        <PublicationListComponent :byCategory="category"></PublicationListComponent>
    
</BaseLayoutComponent>
</template>

<script>
import NewsItemFilterComponent from 'components/NewsItemFilterComponent';
import BaseLayoutComponent from 'components/BaseLayoutComponent';
import PublicationListComponent from "components/publication/PublicationListComponent";
import HeaderBanner from 'components/ui/HeaderBanner';

export default {
    name: 'NewsView',
    components: {
    BaseLayoutComponent,
    NewsItemFilterComponent,
    PublicationListComponent,
    HeaderBanner,
},
    data() {
        return {
            category:[],
        };
    },
    methods: {
        setFilter(categoryFilter) {
            this.category = categoryFilter
        },
        resetFilter(reset) {
            this.category = reset
        }
    },
};
</script>

<style scoped>
    #section{
        display: flex;
        flex-direction: row-reverse;
    }

</style>

