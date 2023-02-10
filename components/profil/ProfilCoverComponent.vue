<template>
    <WaCard id="profil-cover">
        <div id="show-user" class="radius">
            <div id="head-user">
                <div id="cover-user" style="background-image: url('/images/profil/cover_default.jpg');">
                    <a>
                        <q-icon left name="svguse:/images/icons/picture.svg#icon-1|0 0 479.997 479.997" id="icon-picture"/>
                    </a>
                </div>
                <div class="profil-user" style="background-image: url('/images/profil/profil_default.jpg');border-radius: 15px">
                    <avatar-cropper upload-url="/files/upload"/>
                    <a>
                        <q-icon left name="svguse:/images/icons/picture.svg#icon-1|0 0 479.997 479.997" id="icon-picture"/>
                    </a>
                </div>
            </div>

            <div id="infos-user" class="column justify-center q-px-lg q-py-lg">
                <div id="name-user">
                    {{ user.username }} -
                    <a class="link">
                        <span v-if="editUsernameInProgress" @click="editUsernameInProgress = !editUsernameInProgress">Annuler la modification</span>
                        <span v-else @click="editUsernameInProgress = !editUsernameInProgress">Modifier</span>
                    </a>

                    <div class="row justify-center items-center q-pa-lg" v-if="editUsernameInProgress">
                        <WaInput v-model="internalUsername" dense class="q-mx-lg"></WaInput>
                        <WaButton :loading="usernameSubmiting" @click="editName">Modifier</WaButton>
                    </div>
                </div>
                <div id="pseudo-user">@{{ user.username }}</div>
                <div id="description-user">
                    <template v-if="!user.userInformations.about">
                        Aucune biographie... Tout sorcier digne de ce nom devrait pourtant en avoir une...
                    </template>
                    <template v-else>{{ user.userInformations.about }}</template>
                    -
                    <a class="link">
                        <span v-if="editBioInProgress" @click="editBioInProgress = !editBioInProgress">Annuler la modification</span>
                        <span v-else @click="editBioInProgress = !editBioInProgress">Modifier</span>
                    </a>

                    <div class="row justify-center items-center q-pa-lg" v-if="editBioInProgress">
                        <WaInput v-model="internalBiography" dense class="q-mx-lg"></WaInput>
                        <WaButton :loading="biographySubmiting" @click="editBiography">Modifier</WaButton>
                    </div>
                </div>

                <div id="links-user">
                    <ul class="justify-center q-pt-lg q-px-lg q-my-md q-col-gutter-xs" :class="{'column' : editLinkInProgress, 'row': !editLinkInProgress}" v-if="getLinks">
                        <template v-if="!editLinkInProgress">
                            <li v-for="(link, key) in getLinksFilled" :key="key" class="col-4 justify-center">
                                <a class="link" :href="link.value">
                                    <span>{{ $filters.toCapitalize(link.name) }}</span>
                                </a>
                            </li>
                        </template>

                        <template v-if="editLinkInProgress">
                            <li v-for="(v, key) in getLinks" :key="key" class="col-4 justify-center q-py-md">
                                <WaInput v-model="v$.getLinks.$model[key].value" dense :label="$filters.toCapitalize(v.name)" class="q-mx-sm" :error="v$.getLinks.$each.$response.$data[key].value.$invalid"></WaInput>
                            </li>

                            <WaButton @click="editLinks">Modifier</WaButton>
                        </template>
                    </ul>
                    <a class="link">
                        <span v-if="editLinkInProgress" @click="editLinkInProgress = !editLinkInProgress">Annuler la modification</span>
                        <span v-else @click="editLinkInProgress = !editLinkInProgress">{{ getLinksFilled.length > 0 ? 'Modifier un lien' : 'Ajouter un lien' }}</span>
                    </a>
                </div>
            </div>
        </div>
    </WaCard>
</template>

<script>
import WaCard from 'components/ui/WaCard';
import WaInput from 'components/ui/WaInput';
import WaButton from 'components/ui/WaButton';
import { EDIT_USER, EDIT_USER_INFORMATIONS, EDIT_USER_MEDIAS } from 'src/store/userModule/actions.type';
import { MEDIA_LINKS } from 'src/const/appConsts';
import { isLink } from 'src/validators/isLinkValidator';
import useVuelidate from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';

export default {
    name: 'ProfilCoverComponent',
    components: {
        WaButton, WaInput, WaCard
    },
    props: {
        user: {
            type: Object,
        }
    },
    setup() {
        return {
            v$: useVuelidate()
        };
    },
    data() {
        return {
            internalUser: null,
            internalUsername: null,
            internalBiography: null,
            internalLinks: null,
            usernameSubmiting: false,
            biographySubmiting: false,
            linksSubmiting: false,
            editUsernameInProgress: false,
            editBioInProgress: false,
            editLinkInProgress: false
        };
    },
    validations() {
        return {
            getLinks: {
                $each: helpers.forEach({
                    value: {
                        isLink
                    }
                })
            }
        };
    },
    methods: {
        async editName() {
            this.usernameSubmiting = true;

            const data = await this.$store.dispatch(EDIT_USER, { idUser: this.user.id, user: { username: this.internalUsername } });

            if (data) {
                this.internalUser.username = data.username;
            }

            this.usernameSubmiting = false;
            this.editUsernameInProgress = false;
        },
        async editBiography() {
            this.biographySubmiting = true;

            const data = await this.$store.dispatch(EDIT_USER_INFORMATIONS, { idUser: this.user.id, user: { about: this.internalBiography } });

            if (data) {
                this.internalUser.userInformations.about = data.about;
            }

            this.biographySubmiting = false;
            this.editBioInProgress = false;
        },
        async editLinks() {
            this.linksSubmiting = true;
            let links = {};

            this.getLinks.forEach(function (link, index) {
                links[link.name] = link.value;
            });

            const data = await this.$store.dispatch(EDIT_USER_MEDIAS, { idUser: this.user.id, user: links });

            if (data) {
                this.internalUser.userMedias = { ...data };
            }

            this.linksSubmiting = false;
            this.editLinkInProgress = false;
        },
        actionInProgress() {

        }
    },
    computed: {
        getLinks() {
            return MEDIA_LINKS.map((link) => {
                if (this.user.userMedias[link] !== 'undefined') {
                    return { name: link, value: this.user.userMedias[link] };
                }

                return false;
            });
        },
        getLinksFilled() {
            return this.getLinks.filter((link) => link.value);
        }
    },
    mounted() {
        this.internalLinks = this.getLinks;
        this.internalUser = this.user;
        this.internalUsername = this.user.username;
        this.internalBiography = this.user.userInformations.about;
    }
};
</script>

<style lang="scss">

#show-user {
    position: relative;
    width: 100%;

    #icon-picture, #icon-picture > svg {
        width: 5em;
        height: 5em;
    }

    #head-user {
        #cover-user {
            position: relative;
            width: 100%;
            padding-top: 300px;
            background-size: cover;
            background-position: center;
            background-attachment: scroll;
            border-radius: 10px 10px 0px 0px;
        }

        .profil-user {
            position: absolute;
            height: 150px;
            width: 150px;
            top: 200px;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            text-align: center;
            background-position: center;
            background-size: cover;
        }
    }

    #infos-user {
        padding: 10vh 5% 5vh;
        background: rgba(70, 62, 58, 0.178);
        border-radius: 0 10px;
        text-align: center;

        #name-user {
            font-size: 25px;
            line-height: 30px;
            margin: 0 0 15px;
            text-align: center;
            color: #ffffff;
        }

        #pseudo-user {
            font-size: 15px;
            margin-bottom: 2vh;
            text-align: center;
            color: $secondary;
        }

        #description-user {
            width: 80%;
            margin: 0 auto;
            text-align: center;
            font-size: 15px;
            line-height: 30px;
            overflow: hidden;
        }
    }
}

@media screen and (max-height: 925px) {
    #show-user #infos-user {
        padding-top: 100px;
    }
}

@media screen and (max-height: 700px) {
    #show-user #infos-user {
        padding-top: 100px;
    }
}

@media screen and (max-height: 430px) {
    #show-user #infos-user {
        padding-top: 35vh;
    }
}


#show-user #cover-user a, #show-user .profil-user a {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0.5;
    transition: 0.2s linear;
}

#show-user #cover-user a:hover, #show-user .profil-user a:hover {
    opacity: 1;
}

#show-user #cover-user a {
    border-radius: 5px 5px 0px 0px;
}

#show-user .profil-user a {
    border-radius: 15px;
}

#show-user .follow, #show-user .unfollow {
    margin-top: 20px;
    margin-bottom: 20px;
}

#link-user {
    margin-top: 25px;
    justify-content: center;
    align-items: center;
    align-items: center;
}

@media screen and (max-width: 900px) {
    #cover-user {
        padding-top: 165px;
    }

    #head-user .profil-user {
        top: 130px;
    }

    #show-user #name-user {
        padding-top: 0vh;
        font-size: 20px;
        line-height: 30px;
    }

    #show-user #description-user, #name-user a, #description-user a, #link-user a {
        font-size: 13px;
        line-height: 35px;
    }

    #show-user #infos-user {
        padding-top: 155px !important;
    }
}

</style>
