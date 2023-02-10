<template>
    <q-card-section class="publication-card--section-comment">
        <div class="row justify-center publication-card--section-comment__input">
            <q-input v-model="comment" autogrow filled placeholder="Ecrivez un commentaire..."
                     @keyup.enter.prevent="addComment"/>
        </div>

        <div v-for="(comment, index) in commentsLoaded"
             :key="index" class="publication-card--section-comment__list">
            <CommentItemComponent :comment="comment" @remove="onRemove"></CommentItemComponent>
        </div>

        <div v-if="internalCommentsCounter > maxCommentsToShow">
            <a class="show-more-comments" @click="loadMore">Voir plus de commentaires</a>
        </div>
    </q-card-section>
</template>

<script>

import { mapGetters } from 'vuex';
import { ApiPublication } from 'src/common/api.service';
import { isEmpty } from 'lodash';
import CommentItemComponent from 'components/publication/CommentItemComponent';
import { keyHydraMember } from 'src/const/appConsts';

export default {
    name: 'CommentListComponent',
    components: { CommentItemComponent },
    emits: ['addComment'],
    props: {
        comments: {
            type: Array
        }
    },
    data() {
        return {
            comment: null,
            internalComments: [],
            internalCommentsCounter: 0,
            maxCommentsToShow: 5
        };
    },
    methods: {
        async addComment(e) {
            e.preventDefault();

            if (!isEmpty(this.comment)) {
                this.$emit('addComment', this.comment);
                this.comment = null;
            }
        },
        async onRemove(id) {
            try {
                const { data } = await ApiPublication.removeComments({ id: id });
                this.internalCommentsCounter--;
                this.internalComments.splice(this.internalComments.findIndex((comment) => comment.id === id), 1);

                return data[keyHydraMember];
            } catch (e) {
                console.log(e);
            }
        },
        loadMore() {
            if (this.maxCommentsToShow < this.internalCommentsCounter) {
                this.maxCommentsToShow = this.maxCommentsToShow + 3;
            }
        }
    },
    computed: {
        ...mapGetters([
            'getUser'
        ]),
        commentsLoaded() {
            return this.internalComments.slice(0, this.maxCommentsToShow);
        }
    },
    created() {
        this.internalComments = this.comments;
        this.internalCommentsCounter = this.internalComments.length;
    }
};
</script>

<style lang="scss">
$background-color: #191512;

.publication-card {
    &--section-comment {

        &__input {
            label {
                width: 100%;
            }

            .q-field--filled .q-field__control {
                border-radius: 15px;
                background-color: #221f1d !important;
            }

            label, .q-field__control {
                min-height: 20px;
            }
        }

        &__list {
            padding: 8px;
            margin: 10px 5px;
        }

        .show-more-comments {
            cursor: pointer;

            &:hover {
                color: $secondary;
                text-decoration: underline;
            }
        }
    }
}
</style>
