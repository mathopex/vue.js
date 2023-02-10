<template>
    <q-dialog id="q-dialog-custom" ref="dialog" @hide="onDialogHide">
        <WaCard class="q-dialog-plugin">
            <q-form ref="form" @submit="submitPublication">
                <transition :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass" duration="50"
                            mode="out-in">
                    <component :is="currentComponent" v-model="form[getBindPropertyFromComponent]"
                               @action="addAction" @backMain="backMain"></component>
                </transition>
                <q-card-section v-if="innerComponent" class="create-publication__component">
                    <component :is="innerComponent" v-model="form[getBindPropertyFromInnerComponent]"
                               @clear="clearInnerComponent"></component>
                </q-card-section>
                <template v-if="isMainComponent">
                    <q-chip v-if="form.lounge" class="q-py-md q-px-md" color="secondary" icon="groups" outline
                            text-color="white">
                        <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle">
                            Publier dans le groupe
                        </q-tooltip>
                        {{ form.lounge.name }}
                    </q-chip>
                    <q-chip v-if="form.spoiler" class="q-py-md q-px-md" color="secondary" icon="hide_image" outline
                            text-color="white">
                        <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle">
                            Filtre anti-spoiler
                        </q-tooltip>
                        {{ form.spoiler.name }}
                    </q-chip>
                    <q-chip v-if="form.public" class="q-py-md q-px-md" color="secondary" icon="visibility" outline
                            text-color="white">
                        <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle">
                            Visibilité de la publication
                        </q-tooltip>
                        {{ form.public.description }}
                    </q-chip>
                    <q-card-actions align="evenly" class="q-ma-md create-publication__actions">
                        <div>Ajouter à votre publication</div>
                        <div class="btn-action">
                            <q-btn v-for="item of menuItemsBtn" :key="item.id" :icon="item.icon"
                                   flat
                                   @click="openMenu(item.id)">
                                <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle">
                                    {{ item.informations }}
                                </q-tooltip>
                            </q-btn>
                        </div>
                    </q-card-actions>
                    <q-card-actions align="evenly" class="q-ma-md create-publication__submit">
                        <WaButton class="full-width" type="submit">Partager ma publication</WaButton>
                    </q-card-actions>
                </template>
            </q-form>
        </WaCard>
    </q-dialog>
</template>

<script>

import WaCard from 'components/ui/WaCard';
import CreatePublicationComponent from 'components/publication/CreatePublicationComponent';
import ListClubComponent from 'components/publication/AddClubComponent';
import SpoilerFilterComponent from 'components/publication/SpoilerFilterComponent';
import { dialogMixin } from 'src/mixins/dialog';
import WaButton from 'components/ui/WaButton';
import PhotoUploadComponent from 'components/publication/PhotoUploadComponent';
import { mapGetters } from 'vuex';
import { loadingHandler } from 'src/common/ui.service';
import { POST_PUBLICATION } from 'src/store/publicationModule/actions.type';
import PublicationVisibilityComponent, { defaultValueVisibility } from 'components/publication/PublicationVisibilityComponent';

const MAIN_COMPONENT = 'CreatePublicationComponent';

export default {
    name: 'PublicationDialogComponent',
    components: {
        WaCard,
        WaButton,
        CreatePublicationComponent,
        ListGroupComponent: ListClubComponent,
        SpoilerFilterComponent,
        PhotoUploadComponent,
        PublicationVisibilityComponent
    },
    props: {},
    mixins: [dialogMixin],
    data() {
        return {
            mainComponent: MAIN_COMPONENT,
            currentComponent: MAIN_COMPONENT,
            innerComponent: null,
            menuItems: [
                {
                    id: 1,
                    icon: 'photo',
                    informations: 'Ajouter une photo',
                    component: 'PhotoUploadComponent',
                    property: 'file',
                    extern: false
                },
                {
                    id: 2,
                    icon: 'write',
                    informations: 'Créer une publication',
                    component: 'CreatePublicationComponent',
                    property: 'content',
                    extern: false
                },
                {
                    id: 3,
                    icon: 'groups',
                    informations: 'Ajouter un théme ou publier dans un évenement',
                    component: 'ListGroupComponent',
                    property: 'lounge',
                    extern: true
                },
                {
                    id: 4,
                    icon: 'hide_image',
                    informations: 'Ajouter une balise spoiler',
                    component: 'SpoilerFilterComponent',
                    property: 'spoiler',
                    extern: true
                },
                {
                    id: 5,
                    icon: 'visibility',
                    informations: 'Visibilité de la publication',
                    component: 'PublicationVisibilityComponent',
                    property: 'public',
                    extern: true
                }
            ],
            form: {
                public: defaultValueVisibility
            }
        };
    },
    computed: {
        ...mapGetters([
            'getUser'
        ]),
        enterActiveClass() {
            if (this.isMainComponent) {
                return 'animated slideInLeft';
            }

            return 'animated slideInRight';
        },
        leaveActiveClass() {
            if (this.isMainComponent) {
                return 'animated slideOutRight';
            }

            return 'animated slideOutLeft';
        },
        isMainComponent() {
            return this.currentComponent === this.mainComponent;
        },
        menuItemsBtn() {
            return this.menuItems.filter((item) => item.component !== MAIN_COMPONENT);
        },
        getBindPropertyFromComponent() {
            const item = this.menuItems.find((item) => item.component === this.currentComponent);

            if (item && !this.form.hasOwnProperty(item.property)) {
                if (this.form.hasOwnProperty(item.defaultValue)) {
                    this.createFormProperty(item.property, item.defaultValue);
                }

                this.createFormProperty(item.property, '');
            }

            return item.property;
        },
        getBindPropertyFromInnerComponent() {
            const item = this.menuItems.find((item) => item.component === this.innerComponent);

            if (item && !this.form.hasOwnProperty(item.property)) {
                this.createFormProperty(item.property, '');
            }

            return item.property;
        }
    },
    methods: {
        async submitPublication(e) {
            const formData = new FormData();

            for (let [key, value] of Object.entries(this.form)) {
                if (typeof value === 'object') {
                    if (value instanceof File) {
                        formData.append(key, value);
                    } else if (value.hasOwnProperty('property')) {
                        formData.append(value['property'], value['value']);
                    } else {
                        formData.append(key, value['@id']);
                    }
                } else {
                    formData.append(key, value);
                }
            }

            formData.append('author', this.getUser['@id']);

            await loadingHandler(() => this.$store.dispatch(POST_PUBLICATION, formData), {
                message: 'Contrôle du ministére de la magie en cours...',
                errorMessage: 'Impossible d\'ajouter la publication.'
            });

            this.empty();
        },
        createFormProperty(property, value) {
            this.form[property] = value;
        },
        openMenu(id) {
            const menuItem = this.menuItems.find((item) => item.id === id);
            if (menuItem.extern) {
                this.currentComponent = menuItem.component;
                this.clearInnerComponent();
            } else {
                this.innerComponent = menuItem.component;
            }
        },
        clearInnerComponent() {
            this.innerComponent = null;
        },
        empty() {
            this.innerComponent = null;
            this.form = {};
            this.currentComponent = MAIN_COMPONENT;
            this.onDialogHide();
        },
        backMain() {
            this.currentComponent = MAIN_COMPONENT;
        },
        addAction(param) {
            this.form[param.property] = param.value;
        }
    }
};
</script>

<style lang="scss">
#q-dialog-custom {
    width: 100%;

    .q-dialog-plugin {
        width: 600px;
        max-width: 600px;
    }

    .q-card {
        background-color: #1b1714;
        overflow: hidden;

        &__section {
            padding-inline: inherit;
            padding-block: 0;
        }

        .create-publication__actions {
            border: 1px solid white;
            border-radius: 10px;
        }

        .q-item__label--header {
            font-size: 1.2rem;
        }

        .q-editor {
            background-color: rgba(11, 127, 199, 0);
        }
    }
}

</style>
