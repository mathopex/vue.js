<template>
    <q-layout view="hhh Lpr lfr">
        <BaseHeaderComponent/>

        <q-page-container class="wrapper-container">
            <q-page>
                <router-view></router-view>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import BaseHeaderComponent from 'components/BaseHeaderComponent';

export default {
    name: 'MainLayout',
    components: { BaseHeaderComponent }
};
</script>

<style lang="scss" scoped>

section{
    width: 68%;
}
</style>
