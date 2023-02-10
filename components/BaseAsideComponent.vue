<template>
    <div class="q-mt-md q-mr-sm">
        <slot>
            <PublicationsFilterComponent></PublicationsFilterComponent>
        </slot>
        <Footer/>
    </div>
</template>

<script>
import PublicationsFilterComponent from 'components/publication/PublicationFilterComponent';

export default {
    name: 'AsideComponent',
    components: { PublicationsFilterComponent },
    props: {},
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
#footer {

}
</style>
