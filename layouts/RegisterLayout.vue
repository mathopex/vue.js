<template>
    <q-layout view="hhh Lpr lfr">
        <BaseHeaderComponent/>

        <q-page-container class="wrapper">
            <router-view/>
        </q-page-container>

        <BaseFooterComponent/>
    </q-layout>
</template>


<script>
import BaseHeaderComponent from 'components/BaseHeaderComponent';
import BaseFooterComponent from 'components/BaseFooterComponent';

export default {
    name: 'RegisterLayout',
    components: { BaseFooterComponent, BaseHeaderComponent }
};
</script>

<style lang="scss" scoped>

</style>
