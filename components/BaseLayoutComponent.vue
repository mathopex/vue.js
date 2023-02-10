<template>
    <div class="row wrapper-page justify-center">
        <SectionComponent>
            <slot name="filter"></slot>

            <HeaderBanner v-if="headerBanner" :img="imgHeaderBanner">
                <slot name="headerText"></slot>
            </HeaderBanner>

            <slot></slot>
        </SectionComponent>
    </div>
</template>

<script>
import SectionComponent from 'components/BaseSectionComponent';
import HeaderBanner from 'components/ui/HeaderBanner';

export default {
    name: 'BaseLayoutComponent',
    components: { HeaderBanner, SectionComponent },
    props: {
        headerBanner: {
            type: Boolean,
            default: true
        },
        imgHeaderBanner: {
            type: String
        }
    },
    data() {
        return {};
    },
    computed: {}
};
</script>

<style lang="scss">
#footer {

}
</style>
