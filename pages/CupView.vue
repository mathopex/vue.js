<template>
    <BaseLayoutComponent>
        <template #aside>
            <CupRulesComponent/>
        </template>

        <template #headerText>
            Les clubs de Wizard's Alley
        </template>
    </BaseLayoutComponent>
</template>

<script>
import BaseLayoutComponent from 'components/BaseLayoutComponent';
import CupRulesComponent from 'components/CupRulesComponent';

export default {
    name: 'CupView',
    components: {
        CupRulesComponent,
        BaseLayoutComponent
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>

</style>

