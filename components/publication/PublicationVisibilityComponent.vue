<template>
    <div id="list-group" class="list-group q-pa-md">
        <q-card-section class="list-group__header justify-center q-mb-md" horizontal>
            <q-btn class="absolute" icon="arrow_back" round style="left: 5px" text-color="black"
                   @click="$emit('backMain')"/>
            <q-item class="list-group__header">
                <q-item-section class="items-center">
                    <q-item-label class="list-group__header--label text-h6">Choisissez la visibilité de votre
                        publication
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-card-section>

        <q-list>
            <q-tab-panel name="spoiler">
                <q-item v-for="(item, key) in visibilityList" :key="key" v-ripple tag="label">
                    <q-item-section avatar>
                        <q-radio :val="item.id" @update:model-value="setVisibility(item)" v-model="visibility.id"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ item.description }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-tab-panel>
        </q-list>
    </div>
</template>

<script>
import { isEmpty } from 'lodash';

export const defaultValueVisibility = {
    id: 1,
    libelle: 'Publier dans la grande salle',
    property: 'public',
    value: true,
    description: 'Visible par tous le monde',
    default: true
};

export default {
    name: 'PublicationVisibilityComponent',
    components: {},
    props: ['modelValue'],
    emits: ['backMain', 'update:modelValue'],
    data() {
        return {
            mainTab: 'spoiler',
            visibilityList: [
                {
                    id: 1,
                    libelle: 'Publier dans la grande salle',
                    property: 'public',
                    value: true,
                    description: 'Visible par tous le monde',
                    default: true
                },
                {
                    id: 2,
                    libelle: 'Ne pas publier dans la grande salle',
                    property: 'public',
                    value: false,
                    description: 'Visible uniquement par ceux qui vous suivent',
                    default: false
                }
            ],
            visibility: null
        };
    },
    methods: {
        setVisibility(visibility) {
            if (this.visibility !== null && this.visibility.id === visibility.id) {
                this.visibility = null;
            } else {
                this.visibility = visibility;
            }

            this.$emit('update:modelValue', this.visibility);
        }
    },
    async created() {
        if (isEmpty(this.modelValue)) {
            this.visibility = this.visibilityList.find((item) => item.default);
        } else {
            this.visibility = this.modelValue;
        }
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
