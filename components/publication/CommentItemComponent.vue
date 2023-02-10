<template>
    <div class="container-comment-item row">
        <div class="comment-item col-6">
            <div class="comment-item__content">
                <p class="text-bold">{{ comment.author.username }} <span
                    v-if="comment.author.username === getUser.username">(Moi)</span>
                </p>
                <p class="q-mb-lg comment-item__content_date">
                    {{ $filters.getPlainTextDiffDate(this.comment.createdAt) }}
                    <q-tooltip anchor="top middle" self="bottom middle">
                        <span>le {{ $filters.getPlainTextDiffDate(this.comment.createdAt) }}</span>
                    </q-tooltip>
                </p>
                <p>{{ comment.content }}</p>
            </div>
            <div class="comment-item__actions">
                <a :class="{active: internalLikeByMyself}" class="like-comment" @click="handlerLike">
                    J'aime
                    <span class="like-comment-counter">
                        <q-badge>
                            {{ internalLikeCounter }}
                            <q-tooltip v-if="internalUserWeLikes.length > 0" :offset="[10, 10]" anchor="top middle"
                                       self="bottom middle">
                                Aimé par :
                                <p v-for="(user, key) in internalUserWeLikes.slice(0, 5)" :key="key">{{ user }}</p>
                            </q-tooltip>
                        </q-badge>
                    </span>
                </a>
                <q-btn-dropdown :ripple="false" append class="btn-actions" dense dropdown-icon="more_vert" flat
                                menu-self="top start" size="12px">
                    <q-list dark>
                        <q-item v-for="(item, key) in getMenuItems" :key="key" v-close-popup clickable
                                dense @click="handlerItemClick(item.action)">
                            <q-item-section>
                                <q-item-label>{{ item.libelle }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { ApiPublication } from 'src/common/api.service';

export default {
    name: 'CommentItemComponent',
    components: {},
    props: {
        comment: {
            type: Object
        }
    },
    data() {
        return {
            internalLikeByMyself: false,
            internalLikeCounter: 0,
            internalUserWeLikes: [],
            internalLikeId: -1,
            menuItems: [
                {
                    libelle: 'Supprimer le commentaire',
                    action: 'onRemove',
                    show: () => {
                        return this.comment.author.username === this.getUser.username;
                    }
                },
                {
                    libelle: 'Signaler le commentaire',
                    action: 'onReport',
                    show: () => {
                        return true;
                    }
                }
            ]
        };
    },
    methods: {
        async handlerLike() {
            if (this.clickOnLike) return;
            return this.internalLikeByMyself ? await this.onDislike() : await this.onLike();
        },
        async onLike() {
            const params = { author: this.getUser['@id'], comment: this.comment['@id'] };
            this.clickOnLike = true;

            try {
                const { data } = await ApiPublication.likeComment(params);

                this.internalLikeCounter++;
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
                const { data } = await ApiPublication.dislikeComment(params);

                this.internalLikeCounter--;
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
        async handlerItemClick(action) {
            this[action]();
        },
        async onRemove() {
            this.$emit('remove', this.comment.id);
        }
    },
    computed: {
        ...mapGetters([
            'getUser'
        ]),
        likesNumber() {
            return this.comment.commentLikes.length;
        },
        userWeLiked() {
            return this.comment.commentLikes.map((like) => like.author.username);
        },
        likeByMyself() {
            return this.userWeLiked.includes(this.getUser.username);
        },
        getMenuItems() {
            return this.menuItems.filter((item) => item.show());
        }
    },
    mounted() {
        this.internalLikeCounter = this.likesNumber;
        this.internalUserWeLikes = this.userWeLiked;
        this.internalLikeByMyself = this.likeByMyself;
        const like = this.comment.commentLikes.find((like) => like.author.username === this.getUser.username);
        this.internalLikeId = like ? like['id'] : -1;
    }
};
</script>

<style lang="scss">
.container-comment-item {

    &:hover {
        .comment-item .btn-actions {
            visibility: visible;
        }
    }

    .comment-item {
        position: relative;

        &__content {
            background-color: #221f1d;
            width: 100%;
            border-radius: 10px;
            padding: 8px;

            &_date {
                font-size: 10px;
                color: lighten(#221f1d, 30%);
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        &__actions {
            padding: 0 8px;
        }

        .like-comment {
            cursor: pointer;

            &:hover, &.active {
                color: $secondary;
                text-decoration: underline;
            }

            .like-comment-counter {
                position: absolute;
                bottom: 10px;
                right: -5px;

                .q-badge {
                    background-color: lighten($primary, 10%);
                }
            }

            &.active {
                color: $secondary;
                text-decoration: underline;

                .q-badge {
                    background-color: lighten($secondary, 10%);
                }
            }
        }

        .btn-actions {
            visibility: hidden;
            position: absolute;
            top: 17px;
            right: -35px;
        }
    }
}

</style>
