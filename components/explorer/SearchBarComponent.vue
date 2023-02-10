<template>
    <WaCard class="search-bar">
        <WaInput v-model="search" input-class="input" placeholder="Pseudo à rechercher">
            <template #after>
                <q-btn color="secondary" icon-right="search" rounded></q-btn>
            </template>
        </WaInput>
    </WaCard>
</template>

<script>
import WaCard from 'components/ui/WaCard';
import WaInput from 'components/ui/WaInput';

export default {
    name: 'SearchBarComponent',
    components: { WaInput, WaCard },
    data: function () {
        return {
            search: ''
        };
    }
};
</script>

<style lang="scss">
.q-field__marginal, .q-field-control {
    height: 20px;
}

.search-bar .q-card {
    padding: 15px;
}

label {
    height: 50px;
    margin: 0;
    background-color: black;
}

.input {
    padding: 0;
    height: 20px;
}
</style>
