<template>
    <BaseLayoutComponent :header-banner="false">

        <template #filter>
            
            <SearchBarComponent/>
            <UserFilterComponent housesFilter @applyFilter="applyFilter" @resetFilter="resetFilter"/>
        </template>


            <div class="row q-col-gutter-sm">
                <div class="col-3">
                    <UserList :filters="filters"/>
                </div>
            </div>

    </BaseLayoutComponent>

</template>

<script>
import SearchBarComponent from 'src/components/explorer/SearchBarComponent';
import UserList from 'src/components/explorer/UserList';
import BaseLayoutComponent from 'components/BaseLayoutComponent';
import UserFilterComponent from 'src/components/explorer/UserFilterComponent';

export default {
    name: 'SearchView',
    components: { BaseLayoutComponent, UserList, SearchBarComponent, UserFilterComponent },
    data() {
        return {
            search: '',
            filters:[]
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
