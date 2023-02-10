<template>
    <BaseLayoutComponent :header-banner="false">
        <ProfilCoverComponent :user="getUser"/>
        <AboutUserComponent :user="getUser"/>
    </BaseLayoutComponent>
</template>

<script>
import BaseLayoutComponent from 'components/BaseLayoutComponent';
import ProfilCoverComponent from "components/profil/ProfilCoverComponent";
import AboutUserComponent from "components/profil/AboutUserComponent";
import {mapGetters} from "vuex";


export default {
    name: 'ProfilView',
    components: {
        ProfilCoverComponent,
        BaseLayoutComponent,
        AboutUserComponent
    },
    data() {
        return {
            users: []
        };
    },
    computed: {
        ...mapGetters([
            "getUser"
        ]),
    },
}

</script>

<style lang="scss" scoped>

</style>



