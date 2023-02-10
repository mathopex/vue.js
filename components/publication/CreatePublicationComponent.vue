<template>
    <div id="create-publication">
        <q-card-section class="justify-center" horizontal>
            <q-item class="create-publication__header">
                <q-item-section class="items-center">
                    <q-item-label class="create-publication__header--label text-h6">Créer une publication</q-item-label>
                </q-item-section>
            </q-item>
        </q-card-section>
        <q-separator color="white" inset spaced="md"></q-separator>
        <q-card-section class="bg-primary text-secondary">
            <q-item class="create-publication__user">
                <q-item-section avatar>
                    <q-avatar class="create-publication__user--avatar" size="3rem" square>
                        <img alt="avatar" src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>

                <q-item-section class="create-publication__user--informations" side>
                    <q-item-label class="create-publication__user--name" lines="2">{{
                            this.getUser.username
                        }}
                    </q-item-label>
                    <q-item-label caption class="create-publication__user--category">
                        {{ this.getUser.role.description }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-card-section>
        <q-card-section class="create-publication__text-editor">
            <q-input v-model="publicationContent" autogrow
                     class="q-px-md"
                     placeholder="Expecto patronum !" type="textarea" @update:model-value="$emit('update:modelValue', publicationContent)"
            />
        </q-card-section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CreatePublicationComponent',
    components: {},
    props: ['modelValue'],
    emits: ['update:modelValue'],
    data() {
        return {
            publicationContent: null,
        };
    },
    methods: {},
    computed: {
        ...mapGetters([
            'getUser'
        ])
    }
};
</script>

<style lang="scss">
#create-publication {
    .create-publication__header {
        padding: 0;
    }

    .create-publication__text-editor {
        .q-field--standard .q-field__control:before {
            content: unset;
        }
    }

    .create-publication__user--category {
        color: $secondary;
    }

    .q-textarea .q-field__control {
        min-height: 165px;
    }
}
</style>
