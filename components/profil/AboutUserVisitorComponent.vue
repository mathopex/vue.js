<template>
    <div id="about-user-spec" class="row">
        <WaCard v-for="(item, key) in getLibelleAboutItem()" :key="key" class="col-4 text-center cursor-pointer" tag="div" hovered @click="handleTab(item)">
            <q-icon :name="item.icon" class="icon" size="5em"></q-icon>
            <p>{{ item.libelle }}</p>
        </WaCard>
    </div>

    <div id="about-user-details" class="column justify-between" v-if="tabSelected">
        <HeaderBanner without-img>
            <h2 class="h2">{{ tabSelected.libelleSection }}</h2>
        </HeaderBanner>

        <div class="row followers-section" v-if="tabSelected.name === 'followers' || tabSelected.name === 'followings'">
            <UserItem v-for="(information, key) in getInformations(tabSelected.name)" :key="key" :user="information" :followed="followedByMe(information)"/>
        </div>

        <div class="row publications-section" v-if="tabSelected.name === 'publications'">
            <PublicationItemComponent v-for="publication in getInformations(tabSelected.name)" :key="publication.id"
                                      :publication="publication" class="col-12"/>
        </div>
    </div>
</template>

<script>

import WaCard from 'components/ui/WaCard';
import { slugify, stringFormat } from 'src/common/utils.service';
import { BADGES, HOUSES, keyHydraMember, keyHydraTotalItems } from 'src/const/appConsts';
import { loadingHandler } from 'src/common/ui.service';
import { ApiPublication, ApiUser } from 'src/common/api.service';
import { isNil } from 'lodash';
import HeaderBanner from 'components/ui/HeaderBanner';
import UserItem from '../explorer/UserItem';
import PublicationItemComponent from 'components/publication/PublicationItemComponent';

export default {
    name: 'AboutUserComponent',
    components: { PublicationItemComponent, UserItem, HeaderBanner, WaCard },
    props: {
        user: {
            type: Object,
        },
        userInformation: {
            type: Object,
        },
        role: {
            type: Object
        }
    },
    data() {
        return {
            aboutItems: [
                {
                    name: 'house',
                    libelle: '{0}',
                    libelleSection: '',
                    icon: 'img:images/houses/'
                },
                {
                    name: 'role',
                    libelle: '{0} ',
                    libelleSection: '',
                    icon: 'img:images/badges/'
                },
                {
                    name: 'publications',
                    libelle: 'Publications ({0})',
                    libelleSection: 'Dernières publications',
                    icon: 'svguse:images/icons/write.svg#icon-1'
                },
                {
                    name: 'events',
                    libelle: 'Participations aux événements',
                    libelleSection: 'Participations aux événéments',
                    icon: 'svguse:/images/icons/events.svg#icon-1|0 0 479.997 479.997'
                },
                {
                    name: 'followings',
                    libelle: '{0} abonnements',
                    libelleSection: 'Abonnements',
                    icon: 'svguse:images/icons/choixpeau.svg#icon-1'
                },
                {
                    name: 'followers',
                    libelle: '{0} abonnés',
                    libelleSection: 'Abonnés',
                    icon: 'svguse:images/icons/choixpeau.svg#icon-1'
                }

            ],
            informations: {},
            
            tabSelected: null
        };
    },
    methods: {
        async fetchUserInformations() {
            const idUser = this.user.id;
            const publications = await ApiPublication.getPublicationsByUserId(idUser);
            const followers = await ApiUser.getFollowers(idUser);
            const followings = await ApiUser.getFollowings(idUser);

            return { publications, followers, followings };
        },
        getLibelleAboutItem() {
            return this.aboutItems.map((item) => {
                let name = item.name;
                let libelle = null;
                let icon = item.icon;
                const userInformations = this.userInformation

                if (name === 'house') {
                    if (!isNil(userInformations.house)) {
                        libelle = stringFormat(item.libelle, userInformations.house.name);
                        icon = `${ item.icon }${ HOUSES[userInformations.house.name.toLowerCase()] }.png`;
                    } else {
                        libelle = stringFormat(item.libelle, 'Communautée Magique');
                        icon = 'svguse:images/icons/news.svg#icon-1';
                    }
                }

                if (name === 'role') {
  
                    if (!isNil(userInformations.house)) {
                        libelle = stringFormat(item.libelle, this.user.role.description, userInformations.category.name ?? 'Sorcier');
                        let badgeImg = BADGES[this.user.role.role];
                        
                        if (!badgeImg) {
                            badgeImg = `${ HOUSES[userInformations.house.name.toLowerCase()] }`;
                        }

                        icon = `${ item.icon }${ badgeImg }.png`;
                    }

                    if(this.role.id === 6) {

                        libelle = stringFormat(item.libelle , userInformations.category.name);
                        icon = 'svguse:images/icons/news.svg#icon-1';
                    }   
                }
                if(name === 'fandom')
                {
                    libelle = stringFormat(item.libelle, 'membre de la Charte du fandom');
                    let badgeImg = BADGES[this.user.role.role];
                    icon = `${ item.icon }${ badgeImg }.png`;
                }
                
                // if(name === 'testeur')
                // {
                //     libelle = stringFormat(item.libelle,'Gardien de la plume magique' ,"Testeur de wizard's Alley");
                // }

                if (name === 'publications') {
                    libelle = stringFormat(item.libelle, this.getInformations('publications', true));
                }

                if (name === 'events') {
                    libelle = stringFormat(item.libelle);
                }

                if (name === 'followings') {
                    libelle = stringFormat(item.libelle, this.getInformations('followings', true));
                }

                if (name === 'followers') {
                    libelle = stringFormat(item.libelle, this.getInformations('followers', true));
                }

                return { ...item, name, libelle, icon };
            });
        },
        getInformations(item, totalItems = false) {
            if (totalItems) {
                return this.informations[item] && this.informations[item][keyHydraTotalItems] ? this.informations[item][keyHydraTotalItems] : 0;
            }

            return this.informations[item] && this.informations[item][keyHydraMember] ? this.informations[item][keyHydraMember] : [];

        },
        handleTab(item) {
            this.tabSelected = item;
             if(this.tabSelected.name === 'house'){
                this.$router.push({ name: 'UserFilter', params: { filterSlug:`${ slugify(this.tabSelected.libelle) }`}, query: { id: this.user.userInformations.house.id } })
            } else {
                this.$router.push({ name: 'UserFilter', params: { filterSlug:`${ slugify(this.tabSelected.libelle) }`}, query: { id: this.user.userInformations.category.id } })
            }

        },
        async onUnfollow() {
            const params = { user: this.user.id, follower: this.getUser.id };
            this.clickOnFollow = true;

            try {
                const { data } = await ApiUser.unfollowUser(params);

                return data[keyHydraMember];
            } catch (e) {
                return [];
            } finally {
                setTimeout(() => this.clickOnFollow = false, 1000);
            }
        },
        async onFollow() {
            const params = { id: 1 };
            this.clickOnFollow = true;

            try {
                const { data } = await ApiUser.followUser(params);

                return data[keyHydraMember];
            } catch (e) {
                return [];
            } finally {
                setTimeout(() => this.clickOnFollow = false, 1000);
            }
        },
        followedByMe(item) {
            return this.informations['followers'][keyHydraMember].find((user) => item.id === user.id);
        },

        addBadgeProfile() {

            this.aboutItems.splice(2, 0, {
                name: 'fandom',
                libelle: '{0}',
                libelleSection: 'Membre de la Charte  du fandom',
                icon: 'img:images/badges/'
            })


            // this.aboutItems.splice(2, 0, {
            // name: 'testeur',
            // libelle: '{0} ({1})',
            // libelleSection: '',
            // icon: 'img:images/badges/plume.png'
            // })

            return this.aboutItems
        }
    },
    async created() {
        this.informations = await loadingHandler(this.fetchUserInformations);
    },
   async mounted(){
        if(this.role.id === 6 ){
             this.addBadgeProfile()
        }
    }
};
</script>

<style lang="scss">
#about-user-spec {
    .q-card {
        padding: 1rem;
    }

    .icon > svg {
        width: 5em;
        height: 3em;
    }
}

</style>
