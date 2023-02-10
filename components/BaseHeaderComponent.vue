<template>
    <q-header id="header" class="flex" elevated reveal>
        <q-toolbar :class="`${isAuthenticated ? 'justify-evenly' : 'justify-between'}`">
            <div class="nav__more gt-xs" v-if="isAuthenticated">
                <q-btn round icon="menu" @click="openDrawer = !openDrawer"></q-btn>
            </div>

            <q-toolbar-title :shrink="true" >
                <router-link class="logo" to="/greathall">
                    <q-icon class="gt-sm justify-start" name="svguse:/images/icons/logo-computer.svg#logo-computer|0 0 505 146"/>
                    <q-icon class="lt-md logo-mobile" name="svguse:/images/icons/logo-mobile.svg#logo-mobile|0 0 589.5 579.33"/>
                </router-link>
            </q-toolbar-title>

            <template v-if="isAuthenticated">
                <q-input model-value="" filled rounded dark label="Albus Dumbledore">
                    <template v-slot:append>
                        <q-icon name="svguse:/images/icons/search.svg#icon-1|0 0 479.997 479.997"/>
                    </template>
                </q-input>
                <div class="flex-center align-center justify-center">
                    <router-link to="/" class="link q-mx-md">
                        <q-icon left name="svguse:/images/icons/notifications.svg#icon-1|0 0 479.997 479.997"/>
                    </router-link>

                    <router-link clickable to="/" class="link q-mx-md">
                        <q-icon left name="svguse:/images/icons/messages.svg#icon-1|0 0 479.997 479.997"/>
                    </router-link>

                    <q-btn label="Ecrire" color="secondary" icon="svguse:/images/icons/register.svg#icon-1|0 0 479.997 479.997" no-caps @click="setPublication" class="q-mx-md"/>

                    <q-avatar class="q-mr-sm q-ml-sm cursor-pointer" square>
                        <img alt="avatar" src="https://cdn-icons-png.flaticon.com/512/195/195138.png"/>

                        <q-menu class="bg-primary text-white" dark style="border-radius: 30px"
                                transition-hide="flip-left" transition-show="flip-right">
                            <q-list style="width: 280px">
                                <q-item v-close-popup clickable>
                                    <q-item-section @click="handlerProfil">
                                        <q-item-label>Afficher mon profil</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item v-close-popup clickable>
                                    <q-item-section @click="handlerLogout">
                                        Déconnexion de @{{ getUser.username }}
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-avatar>
                </div>
            </template>
            <div v-else>
                <router-link to="/login" class="link q-mx-md">
                    <q-icon left name="svguse:/images/icons/login.svg#icon-1|0 0 479.997 479.997"/>
                    Se connecter
                </router-link>
            </div>
        </q-toolbar>

        <q-drawer v-model="openDrawer" show-if-above :width="250" dark bordered v-if="isAuthenticated">
            <q-list padding class="nav__main">
                <q-item clickable to="/greathall" class="link">
                    <q-item-section avatar>
                        <q-icon right name="svguse:/images/icons/greathall.svg#icon-1|0 0 479.997 479.997"/>
                    </q-item-section>

                    <q-item-section>
                        Grande Salle
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple to="/commonroom">
                    <q-item-section avatar>
                        <q-icon right name="svguse:/images/icons/common-room.svg#icon-1|0 0 479.997 479.997"/>
                    </q-item-section>

                    <q-item-section>
                        Abonnements
                    </q-item-section>
                </q-item>

                <q-item active clickable v-ripple to="/news">
                    <q-item-section avatar>
                        <q-icon right name="svguse:/images/icons/news.svg#icon-1|0 0 479.997 479.997"/>
                    </q-item-section>

                    <q-item-section>
                        Actualités
                    </q-item-section>
                </q-item>

                <q-item active clickable v-ripple to="/video">
                    <q-item-section avatar>
                        <q-icon right name="svguse:/images/icons/videos.svg#icon-1|0 0 479.997 479.997"/>
                    </q-item-section>

                    <q-item-section>
                        Vidéos
                    </q-item-section>
                </q-item>

                <q-item active clickable v-ripple to="/clubs">
                    <q-item-section avatar>
                        <q-icon right name="svguse:/images/icons/clubs.svg#icon-1|0 0 479.997 479.997"/>
                    </q-item-section>

                    <q-item-section>
                        Clubs
                    </q-item-section>
                </q-item>

                <q-item active clickable v-ripple to="/events">
                    <q-item-section avatar>
                        <q-icon right name="svguse:/images/icons/events.svg#icon-1|0 0 479.997 479.997"/>
                    </q-item-section>

                    <q-item-section>
                        Événements
                    </q-item-section>
                </q-item>

                <q-item active clickable v-ripple to="/cup">
                    <q-item-section avatar>
                        <q-icon right name="svguse:/images/icons/cups.svg#icon-1|0 0 479.997 479.997"/>
                    </q-item-section>

                    <q-item-section>
                        Coupe des sorciers
                    </q-item-section>
                </q-item>

                <q-item active clickable v-ripple to="/admin">
                    <q-item-section avatar>
                        <q-icon right name="svguse:/images/icons/admin.svg#icon-1|0 0 479.997 479.997"/>
                    </q-item-section>

                    <q-item-section>
                        Admin
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>
    </q-header>
</template>

<script>
import PublicationDialogComponent from 'components/publication/PublicationDialogComponent';
import { mapGetters, mapMutations } from 'vuex';
import { PURGE_AUTH } from 'src/store/authModule/mutations.type';

export default {
    name: 'BaseHeaderComponent',
    data() {
        return {
            openDrawer: true
        };
    },
    methods: {
        ...mapMutations({
            'mutationLogout': PURGE_AUTH
        }),
        setPublication: function () {
            this.$q.dialog({
                component: PublicationDialogComponent
            });
        },
        handlerLogout() {
            this.mutationLogout();
            this.$router.push('/');
        },
        handlerProfil() {
            this.$router.push('/p');
        }
    },
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'getUser'
        ])
    }
};
</script>

<style lang="scss">

#header {
    &.q-header {
        min-height: 75px;
    }

    .q-field {
        width: 60%;

        &__control {
            height: 45px;
            border-radius: 28px;

            &::after {
                content: none;
            }

            &:before {
                border: none;
            }
        }

        &__label {
            top: 12px;
        }

        &__append {
            height: inherit;
        }

        input {
            height: inherit;
        }
    }

    .q-drawer {
        left: 55px;

        &.q-dark {
            background-color: #0e0b09;
            background-position: center;
            background-attachment: scroll;
            background-image: url(../assets/images/common/backgroundGlobal.png);
        }
    }

    .q-toolbar {
        margin: auto;
        padding: 0 75px;

        a {
            font-size: 14px;
            padding: 20px 0;

            &.logo {
                .logo-mobile {
                    &.q-icon {
                        width: 2rem;
                    }
                }

                .q-icon {
                    width: 8rem;
                    height: 100%;

                    > svg {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .q-icon {
                width: 25px;
                height: 25px;

                > svg {
                    width: 100%;
                    height: 100%;
                }
            }

            &:hover {
                span {
                    color: $secondary;
                }

                svg {
                    transition: 0.2s linear;
                    fill: $secondary;
                }
            }
        }
    }

    .nav {
        &__main {
            > a {
                margin: 20px 0;
                border-radius: 55px;
                height: 60px;
                width: 100%;
            }
        }

        &__more {
            padding: 20px 0;
        }

        &__secondary button {
            margin-left: 25px;
        }
    }
}

.lightning {
    filter: invert(99%) sepia(99%) saturate(2%) hue-rotate(36deg) brightness(105%) contrast(101%);
}
</style>
