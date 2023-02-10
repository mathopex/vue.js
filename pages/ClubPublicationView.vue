<template>
    <BaseLayoutComponent :imgHeaderBanner="getImgBanner">
        <template #headerText>
            Publications du club <span v-if="club">"{{ club.name }}"</span>
        </template>

        <PublicationListComponent :byClub="club"/>
    </BaseLayoutComponent>
</template>

<script>
import BaseLayoutComponent from 'components/BaseLayoutComponent';
import PublicationListComponent from 'components/publication/PublicationListComponent';
import { loadingHandler } from 'src/common/ui.service';
import { ApiClub } from 'src/common/api.service';

export default {
    name: 'ClubPublicationView',
    props: {
        clubSlug: {
            type: String
        }
    },
    components: {
        PublicationListComponent,
        BaseLayoutComponent
    },
    data() {
        return {
            club: null
        };
    },
    methods: {},
    computed: {
        getImgBanner() {
            return `${ require('./../assets/images/clubs/' + this.clubSlug + '.jpg') }`;
        }
    },
    async created() {
        const idClub = this.$route.query.id;

        this.club = await loadingHandler(() => ApiClub.getClub(idClub), { errorMessage: 'Une erreur est survenue lors de la récupération du club' });
    },
    beforeRouteUpdate(to) {
        const idClub = to.query.id;

        if (!idClub) {
            return this.$router.push('/clubs');
        }
    }
};
</script>

<style lang="scss">

</style>

