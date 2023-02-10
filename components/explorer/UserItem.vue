<template>
    <WaCard class="user-card row justify-center">
        <div class="head-user relative-position col-12" @click="handlerProfil(user)">
            <q-img src="https://wizards-alley.com/p/cover/default.jpg" class="cover-picture"/>

            <div class="profil-picture absolute-center" style="background-image: url('https://wizards-alley.com/p/img/default.jpg')">
                <q-icon v-if="user.role.id === 3" :name="housesBages(user)" class="badge" ></q-icon>
            </div>
        </div>
        <div class="user-informations column">
            <q-card-section class="text-center">
                <p class="name-user" @click="handlerProfil(user)">{{ user.username }}</p>
            </q-card-section>
            <q-card-actions align="center">
                <q-btn :disable="clickOnFollow" class="btn justify-evenly" :class="{ 'followed': followed }" flat :icon="followed ? 'svguse:/images/icons/choixpeau.svg#icon-1': 'svguse:/images/icons/register.svg#icon-1'" no-caps rounded padding="5px" :ripple="false" @click="handlerFollow">
                    {{ followed ? 'Ne plus suivre' : 'Suivre' }}
                </q-btn>
            </q-card-actions>
        </div>
    </WaCard>
</template>

<script>
import WaCard from 'components/ui/WaCard';
import { HOUSES } from 'src/const/appConsts';
import { mapGetters } from 'vuex';

export default {
    name: 'UserItem',
    components: { WaCard },
    emits: ['onFollow', 'onUnfollow'],
    props: {
        user: {
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
            icon : 'img:images/houses/'
        };
    },
    computed: {
         ...mapGetters([
            "getUser"
         ]),

    },
    methods: {
        async handlerFollow() {
            return this.followed ? this.$emit('onFollow', this.user) : this.$emit('onUnfollow', this.user);
        },
        housesBages(user) {
            return `${ this.icon }${ HOUSES[user.userInformations.house.name.toLowerCase()] }.png`
        },
        handlerProfil(user){
           if(user.id === this.getUser.id){
                return this.$router.push('/p');
           } else {
                return this.$router.push({ name: 'profilUser', params: { profilSlug: `${ slugify(user.username) }` }, query: { id: user.id } });
           }
            
        
    },
    async created() {
        this.internalFollowed = this.followed;

    },
    }
};

</script>

<style lang="scss" scoped>
.user-card {


    .head-user {
        cursor: pointer;
        .cover-picture {
            width: 100%;
            height: 20vh;
            background-size: cover;
            background-position: center;
            background-attachment: scroll;
            border-radius: 15px 15px 0 0;
        }

        .profil-picture {
            cursor: pointer;
            width: 60px;
            background-size: cover;
            background-position: center;
            background-attachment: scroll;
            height: 55px;
            border-radius: 15px;
            top: 20vh;

            .badge {
                cursor: pointer;
                width: 40px;
                height: 40px;
                left: 40px;
                top: 30px;
            }
        }
    }

    .user-informations {
        padding: 55px 0 0;

        .name-user {
            cursor: pointer;
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
    }
}
</style>
