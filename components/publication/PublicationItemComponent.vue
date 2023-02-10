<template>
    <WaCard id="publication-card" class="publication-card q-mb-lg" v-bind="$attrs">
        <q-card-section v-if="publication.lounge" class="publication-card--section-group">
            <a :href="redirectTo(publication.club)">{{ publication.club.name }}</a>
        </q-card-section>

        <q-card-section class="publication-card--section-header bg-primary text-secondary">
            <q-item>
                <q-item-section avatar class="publication-card--section-header">
                    <q-avatar class="publication-card--section-header-avatar" size="3rem" square>
                        <img alt="avatar" src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>

                <q-item-section class="publication-card--section-header-user" side>
                    <q-item-label class="publication-card--section-header-user-name" lines="1">
                        <span @click="handlerProfil(publication.author)">{{ publication.author.username }}</span><span v-if="isMe">(Moi)</span>
                    </q-item-label>
                    <q-item-label caption class="publication-card--section-header-user-category">
                        {{ publication.author.userInformations.category.name }}
                    </q-item-label>
                    <q-item-label caption class="publication-card--section-header-date">
                        {{ $filters.getPlainTextDiffDate(this.publication.createdAt) }}
                        <q-tooltip anchor="top middle" self="bottom middle">
                            <p>le {{ $filters.getPlainTextDiffDate(this.publication.createdAt) }}</p>
                        </q-tooltip>
                    </q-item-label>
                    <q-badge v-if="!publication.public" color="blue">
                        Abonné seulement
                    </q-badge>
                </q-item-section>
            </q-item>
        </q-card-section>

        <q-card-section class="bg-primary publication-card-section__body">
            <q-item-section class="publication-card-section__body-content">
                {{ publication.content }}
            </q-item-section>

            <q-item-section v-if="publication.filePath" class="publication-card-section__body-image-wrapper">
                <q-img :src="publication.fileUrl" class="publication-card-section__body-image-wrapper"
                       width="100%"></q-img>
            </q-item-section>
        </q-card-section>

        <q-card-section class="publication-card--section-footer">
            <div class="row justify-center">
                <div class="col text-center">
                    <q-btn :class="{active: internalLikeByMyself, clicked: clickOnLike}" :disable="clickOnLike" :ripple="false" class="like" flat
                           icon="favorite" size="1.1em" style="text-transform: capitalize;" @click="handlerLike">
                        <q-tooltip v-if="internalUserWeLikes.length > 0" :offset="[10, 10]" anchor="top middle"
                                   self="bottom middle">
                            <p v-for="(user, key) in internalUserWeLikes" :key="key">{{ user }}</p>
                        </q-tooltip>
                        {{ internalLikesNumber }}
                    </q-btn>
                </div>
                <div class="col text-center">
                    <q-btn flat icon="comment" size="1.1em" style="text-transform: capitalize;"
                           @click="showComments = !showComments">
                        <span class="q-mx-sm"></span>
                        {{ internalCommentsCounter }}
                    </q-btn>
                </div>
                <div class="col text-center">
                    <q-btn color="primary" flat icon="share" size="1.1em" style="text-transform: capitalize;"/>
                </div>
            </div>
        </q-card-section>

        <CommentListComponent v-if="showComments" :comments="internalComments" @addComment="addComment"></CommentListComponent>
    </WaCard>
</template>

<script>

import WaCard from 'components/ui/WaCard';
import { mapGetters } from 'vuex';
import { slugify } from 'src/common/utils.service';
import { ApiPublication } from 'src/common/api.service';
import { isEmpty } from 'lodash';
import CommentListComponent from 'components/publication/CommentListComponent';

export default {
    name: 'PublicationItemComponent',
    components: { CommentListComponent, WaCard },
    props: {
        publication: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            clickOnLike: false,
            internalLikesNumber: 0,
            internalUserWeLikes: [],
            internalLikeByMyself: false,
            internalLikeId: -1,
            showComments: false,
            internalCommentsCounter: 0,
            internalComments: []
        };
    },
    computed: {
        ...mapGetters([
            "getUser"
        ]),
    },
    methods: {
        redirectTo(club) {
            return this.$router.resolve({ name: 'clubsPublication', params: { clubSlug: `${ slugify(club.name) }` }, query: { id: club.id } }).href;
        },
        handlerProfil(author){
           if(author.id === this.getUser.id){
                return this.$router.push('/p');
           } else {
                return this.$router.push({ name: 'profilUser', params: { profilSlug: `${ slugify(author.username) }` }, query: { id: author.id } });
           }
            
        
        },
        async handlerLike() {
            return this.internalLikeByMyself ? await this.onDislike() : await this.onLike();
        },
        async onLike() {
            const params = { author: this.getUser['@id'], publication: this.publication['@id'] };
            this.clickOnLike = true;

            try {
                const { data } = await ApiPublication.likePublication(params);

                this.internalLikesNumber++;
                this.internalLikeByMyself = true;
                this.internalUserWeLikes.push(this.getUser.username);
                this.internalLikeId = data['id'];

                return data['hydra:member'];
            } catch (e) {
                return [];
            } finally {
                setTimeout(() => this.clickOnLike = false, 1000);
            }
        },
        async onDislike() {
            const params = { id: this.internalLikeId };
            this.clickOnLike = true;

            try {
                const { data } = await ApiPublication.dislikePublication(params);

                this.internalLikesNumber--;
                this.internalLikeByMyself = !this.internalLikeByMyself;
                const userWeLiked = this.internalUserWeLikes;
                userWeLiked.splice(userWeLiked.findIndex((username) => username === this.getUser.username), 1);
                this.internalLikeId = -1;

                return data['hydra:member'];
            } catch (e) {
                return [];
            } finally {
                setTimeout(() => this.clickOnLike = false, 1000);
            }
        },
        async addComment(comment) {
            if (!isEmpty(comment)) {
                const params = {
                    author: this.getUser['@id'],
                    content: comment,
                    publication: this.publication['@id']
                };

                try {
                    const { data } = await ApiPublication.addComment(params);

                    this.internalComments.unshift(data);

                    this.internalCommentsCounter++;
                } catch (e) {
                    return null;
                }
            }
        }
    },
    computed: {
        ...mapGetters([
            'getUser'
        ]),
        likesNumber() {
            return this.publication.likes.length;
        },
        userWeLiked() {
            return this.publication.likes.map((like) => like.author.username);
        },
        likeByMyself() {
            return this.userWeLiked.includes(this.getUser.username);
        },
        isMe() {
            return this.publication.author.id === this.getUser.id
        }

    },
    mounted() {
        this.internalLikesNumber = this.likesNumber;
        this.internalUserWeLikes = this.userWeLiked;
        this.internalLikeByMyself = this.likeByMyself;

        const like = this.publication.likes.find((like) => like.author.username === this.getUser.username);
        this.internalLikeId = like ? like['id'] : -1;
        this.internalComments = this.publication.comments;
        this.internalCommentsCounter = this.internalComments.length;
    }
};
</script>

<style lang="scss">
$background-color: #191512;
 span {
    cursor: pointer;
 }
.publication-card {
    @keyframes rebounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-5px);
        }
        60% {
            transform: translateY(-3px);
        }
    }

    .like {
        &.active i {
            color: $secondary;
        }

        &.clicked i {
            animation: rebounce 1s 1 ease;
        }
    }


    .q-card {
        background: none;
    }

    &--section-group {
        background-color: $border-color;
    }

    &--section-header {
        &-user {
            &-name {
                margin-bottom: 5px;
                font-size: 14px;
            }

            &-category {
                font-size: 12px;
                color: $secondary;
                margin: 5px 0;
            }
        }

        &-date {
            font-size: 10px;
            color: #ffffff;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    &--section-footer {
        background-color: $border-color;

        .q-btn__content > * {
            color: white;
        }
    }
}


</style>
