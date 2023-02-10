<template>
    <BaseLayoutComponent :header-banner="false">
        <ProfilVisitorCoverComponant :user="user" :userInformation="userInformations" :userMedias="userMedia"  :house="house"></ProfilVisitorCoverComponant>
        <AboutUserVisitorComponent :user="user"  :userInformation="userInformations" :role="role"  />
    </BaseLayoutComponent>
</template>

<script>
    import AboutUserVisitorComponent from "components/profil/AboutUserVisitorComponent";
    import BaseLayoutComponent from 'components/BaseLayoutComponent';
    import { ApiUser } from 'src/common/api.service';
    import { loadingHandler } from 'src/common/ui.service';
    import ProfilVisitorCoverComponant from 'src/components/profil/ProfilVisitorCoverComponent';
    export default {
        name: 'ProfilView',
    components: {
    BaseLayoutComponent,
    ProfilVisitorCoverComponant,
    AboutUserVisitorComponent
    },
    data() {
        return {
            user:[],
            userInformations:[],
            role:[],
            userMedia:[],
            house:[],
        }
    },
    methods: {
        async fetchuser() {
            return await ApiUser.getUser(this.$route.query.id)
        }
    },
    async mounted() {
        this.user = await loadingHandler(this.fetchuser)
        this.userInformations = this.user.userInformations
        this.role = this.user.role
        this.userMedia = this.user.userMedias
        this.house = this.userInformations.house
    }
}

</script>

<style lang="scss" scoped>

</style>



