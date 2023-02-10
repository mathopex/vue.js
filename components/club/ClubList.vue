<template>
    <div class="row club-list q-col-gutter-sm">
        <ClubItem v-for="(club, i) in clubs" :key="i" :club="club" class="club-item" @click="redirectTo(club)"></ClubItem>
    </div>
</template>

<script>
import ClubItem from './ClubItem';
import { loadingHandler } from 'src/common/ui.service';
import { ApiClub } from 'src/common/api.service';
import { slugify } from 'src/common/utils.service';

export default {
    name: 'ClubList',
    components: { ClubItem },
    data() {
        return {
            clubs: []
        };
    },
    methods: {
        async fetchClubs() {
            return await ApiClub.getClubs();
        },
        redirectTo(club) {
            this.$router.push({ name: 'clubsPublication', params: { clubSlug: `${ slugify(club.name) }` }, query: { id: club.id } });
        }
    },
    async mounted() {
        this.clubs = await loadingHandler(this.fetchClubs);
        this.clubs = this.clubs['hydra:member']
    }
};
</script>

<style scoped>
.club-item {
    cursor: pointer;
}
</style>
