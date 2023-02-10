<template>
    <div id="list-group" class="list-group q-pa-md">
        <q-card-section class="list-group__header justify-center q-mb-md" horizontal>
            <q-btn class="absolute" icon="arrow_back" round style="left: 5px" text-color="black"
                   @click="$emit('backMain')"/>
            <q-item class="list-group__header">
                <q-item-section class="items-center">
                    <q-item-label class="list-group__header--label text-h6">Publier dans un club ou dans un
                        évenement
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-card-section>

        <q-tabs v-model="mainTab" active-color="primary" align="justify" class="q-mb-md" dense
                indicator-color="primary">
            <q-tab v-for="(club, key) in getClubs" :key="key" :label="key" :name="key"/>
        </q-tabs>

        <q-tab-panels v-for="(clubs, key) in getClubs" :key="key" v-model="mainTab" animated>
            <q-tab-panel :name="key">
                <q-item v-for="(item, key) in clubs" :key="key" :active="isActive(item)" active-class="bg-secondary"
                        clickable @click="setClub(item)">
                    <q-item-section>{{ item.name }}</q-item-section>
                </q-item>
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script>
import { loadingHandler } from 'src/common/ui.service';
import { ApiClub } from 'src/common/api.service';
import { groupBy } from 'lodash/collection';

export default {
    name: 'AddClubComponent',
    components: {},
    props: ['modelValue'],
    emits: ['backMain', 'update:modelValue'],
    data() {
        return {
            mainTab: 'Clubs',
            clubs: [],
            club: null
        };
    },
    computed: {
        getClubs() {
            return groupBy(this.clubs, 'type.libelle');
        }
    },
    methods: {
        async fetchClubs() {
            return await ApiClub.getClubs();
        },
        setClub(club) {
            if (this.club !== null && this.club.id === club.id) {
                this.club = null;
            } else {
                this.club = club;
            }

            this.$emit('update:modelValue', this.club);
        },
        isActive(item) {
            return this.club !== null && item.id === this.club.id;
        }
    },
    async mounted() {
        this.club = this.modelValue;
        this.clubs = await loadingHandler(this.fetchClubs);
        this.clubs = this.clubs['hydra:member']
    }
};
</script>

<style lang="scss">
#list-group {
    .q-tab-panels {
        background: inherit;
    }
}
</style>
