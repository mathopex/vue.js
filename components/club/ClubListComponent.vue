<template>
    <div v-if="clubs" class="group-list">

    </div>
</template>

<script>
import { ApiClub } from 'src/common/api.service';
import { slugify } from 'src/common/utils.service';

export default {
    name: 'ClubListComponent',
    data() {
        return {
            clubs: []
        };
    },
    computed: {},
    methods: {
        async fetchClubs() {
            return await ApiClub.getClubs();
        },
        clubUrl(name) {
            return `club/${ slugify(name) }`;
        },
        getClubImg(clubName) {
            return require('./../../assets/images/clubs/' + slugify(clubName) + '.jpg');
        }
    },
    async mounted() {
        this.clubs = await this.fetchClubs();
        this.clubs = this.clubs['hydra:member']
    }
};
</script>

<style lang="scss" scoped>
.group-list {
    margin-bottom: 25px;
}


</style>
