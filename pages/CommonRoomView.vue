<template>
    <BaseLayoutComponent>
        <template #aside>
            <PublicationFilterComponent followOnly @applyFilter="applyFilter"/>
        </template>

        <template #headerText>
            Dernières publications de celles et ceux que vous suivez
        </template>

        <PublicationListComponent :filter="filter" follow-only></PublicationListComponent>
    </BaseLayoutComponent>
</template>

<script>
import BaseLayoutComponent from 'components/BaseLayoutComponent';
import PublicationFilterComponent from 'components/publication/PublicationFilterComponent';
import PublicationListComponent from "components/publication/PublicationListComponent";

export default {
    name: 'CommonRoomView',
    components: {
        PublicationListComponent,
        PublicationFilterComponent,
        BaseLayoutComponent
    },
    data() {
        return {
            filter: null
        };
    },
    methods: {
        applyFilter(filter) {
            this.filter = filter
        }
    },
};
</script>

<style lang="scss" scoped>
</style>

