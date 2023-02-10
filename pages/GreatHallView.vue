<template>
    <BaseLayoutComponent :headerBanner="false">
        <template #filter>
            <PublicationFilterComponent housesFilter @applyFilter="applyFilter" @resetFilter="resetFilter"/>
        </template>

        <ClubListComponent></ClubListComponent>
        <HeaderBanner>Dernières publications de tout Wizard's Alley</HeaderBanner>
        <WelcomeMessageComponent v-if="showWelcomeMessage" @close="showWelcomeMessage = false"/>

        <PublicationListComponent :filters="filters"></PublicationListComponent>
    </BaseLayoutComponent>
</template>

<script>

import WelcomeMessageComponent from 'components/WelcomeMessageComponent';
import ClubListComponent from 'components/club/ClubListComponent';
import BaseLayoutComponent from 'components/BaseLayoutComponent';
import PublicationFilterComponent from 'components/publication/PublicationFilterComponent';
import HeaderBanner from 'components/ui/HeaderBanner';
import {FETCH_PUBLICATIONS} from "src/store/publicationModule/actions.type";
import PublicationListComponent from "components/publication/PublicationListComponent";

export default {
    name: 'GreatHallView',
    components: {
        PublicationListComponent,
        HeaderBanner,
        PublicationFilterComponent,
        BaseLayoutComponent,
        ClubListComponent,
        WelcomeMessageComponent
    },
    data() {
        return {
            showWelcomeMessage: false,
            filters: []
        };
    },
    methods: {
        applyFilter(filters) {
            this.filters = filters
        },
        resetFilter() {
            this.filters = []
        }
    },
};
</script>

<style lang="scss">
</style>

