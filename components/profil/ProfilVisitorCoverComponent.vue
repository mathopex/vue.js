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
                    {{ user.username }}
                    
                    
                </div>
                <div id="pseudo-user">@{{ user.username }}</div>
                <q-card-actions align="center">
                    <q-btn :disable="clickOnFollow" class="btn justify-evenly" :class="{ 'followed': followed }" flat :icon="followed ? 'svguse:/images/icons/choixpeau.svg#icon-1': 'svguse:/images/icons/register.svg#icon-1'" no-caps rounded padding="5px" :ripple="false" @click="handlerFollow">
                       <span class=" justify-between">{{ followed ? 'Ne plus suivre' : 'Suivre' }}</span> 
                    </q-btn>
                </q-card-actions>

                <div id="description-user">
                    <template v-if="!userInformation.about">
                        Aucune biographie... Tout sorcier digne de ce nom devrait pourtant en avoir une...
                    </template>

                    <template v-else>
                        {{ userInformation.about }}
                    </template>
     
                    <template v-if="!house">
                        <div id="UserLien">
                            <a :href="userMedias.youtube"> Youtube</a> - 
                            <a :href="userMedias.twitch"> Twitch</a> - 
                            <a :href="userMedias.website"> Website</a> - 
                            <a :href="userMedias.vimeo"> vimeo</a> 
                        </div>

                    </template>

                  
                </div>
            
              
               
               

            </div>
        </div>
    </WaCard>
</template>

<script>
import WaCard from 'components/ui/WaCard';

export default {
    name: 'ProfilCoverComponent',
    components: { 
        WaCard,
    },
    emits: ['onFollow', 'onUnfollow'],
    props:{
        user: {
            type: Object
        },
        userInformation: {
            type: Object
        },
        userMedias: {
            type: Object
        },
        house: {
            type: Object
        },
        followed: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            internalFollowed: false,
            clickOnFollow: false,
        }
    },

}
</script>

<style lang="scss" scoped>

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

            #UserLien {
                margin-top: 10px;
                a {
                    color: #987ed1;
                }
            }
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

.btn {
    width: 150px;
    border: 1px solid $secondary;
    transition: 0.2s linear;

    &:hover {
        color: white;
        background-color: $secondary;
    }

    .q-btn__content {
        justify-content: space-evenly;
    }

    &.followed {
        background-color: $secondary;
        transition: 0.2s linear;

        &:hover {
            background-color: red;
            border: red;
        }
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
