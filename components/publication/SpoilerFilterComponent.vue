<template>
    <div id="list-group" class="list-group q-pa-md">
        <q-card-section class="list-group__header justify-center q-mb-md" horizontal>
            <q-btn class="absolute" icon="arrow_back" round style="left: 5px" text-color="black"
                   @click="$emit('backMain')"/>
            <q-item class="list-group__header">
                <q-item-section class="items-center">
                    <q-item-label class="list-group__header--label text-h6">Ajouter une balise spoiler
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-card-section>

        <q-list>
            <q-tab-panel name="spoiler">
                <q-item v-for="(item, key) in spoilers" :key="key" :active="spoiler !== null && item.id === spoiler.id" active-class="bg-secondary"
                        clickable @click="setSpoilerFilter(item)">
                    <q-item-section>{{ item.name }}</q-item-section>
                </q-item>
            </q-tab-panel>
        </q-list>
    </div>
</template>

<script>
import { loadingHandler } from 'src/common/ui.service';
import { ApiSpoiler } from 'src/common/api.service';

export default {
    name: 'SpoilerFilterComponent',
    components: {},
    props: ['modelValue'],
    emits: ['update:modelValue'],
    data() {
        return {
            mainTab: 'spoiler',
            spoilers: [],
            spoiler: null
        };
    },
    methods: {
        async fetchSpoiler() {
            return await ApiSpoiler.getSpoilers();
        },
        setSpoilerFilter(spoiler) {
            if (this.spoiler !== null && this.spoiler.id === spoiler.id) {
                this.spoiler = null;
            } else {
                this.spoiler = spoiler;
            }

            this.$emit('update:modelValue', this.spoiler);
        }
    },
    async mounted() {
        this.spoiler = this.modelValue;
        this.spoilers = await loadingHandler(this.fetchSpoiler);
        this.spoilers = this.spoilers['hydra:member']
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
