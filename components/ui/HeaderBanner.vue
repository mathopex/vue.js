<template>
    <article :style="styleObject" class="row justify-between items-center header-page radius text-primary" :class="{'without-img': withoutImg}">
        <h2 class="h2">
            <slot></slot>
        </h2>
    </article>
</template>

<script>

export default {
    name: 'HeaderBanner',
    components: {},
    props: {
        img: {
            type: String
        },
        withoutImg: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    computed: {
        styleObject: function () {
            return !this.withoutImg ? { backgroundImage: this.img ? `url(${ this.img })` : `url(${ require('./../../assets/images/common/newsfeed.jpg') })` } : null;
        }
    }
};
</script>

<style lang="scss" scoped>
.header-page {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-size: cover;
    background-attachment: scroll;
    color: #ffffff;
    margin: 0 0 25px;
    padding: 35px 25px;
    background-position: top;
    border: 5px solid #221f1d !important;

    h2 {
        font-size: 14px;
        line-height: 20px;
        text-align: left;
        font-weight: bold;
        max-width: 33%;
    }

    &.without-img {
        background: rgba(70, 62, 58, 0.178)
    }
}
</style>
