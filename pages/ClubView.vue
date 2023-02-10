<template>
    <BaseLayoutComponent>
        <template #headerText>
            Les clubs de Wizard's Alley
        </template>

        <ClubList/>
    </BaseLayoutComponent>
</template>

<script>
import BaseLayoutComponent from 'components/BaseLayoutComponent';
import ClubList from 'src/components/club/ClubList';

export default {
    name: 'ClubView',
    components: {
        ClubList,
        BaseLayoutComponent
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss">

</style>

