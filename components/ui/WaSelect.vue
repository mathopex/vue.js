<template>
    <q-select :input-class="'wa-select'" borderless dark
              model-value="value" v-bind="$attrs" @change="$emit('change', $event.target.value)"></q-select>
</template>

<script>
export default {
    name: 'WaSelect',
    props: ['value']
};
</script>

<style lang="scss">
.q-select.q-field {
    margin: 25px 0 30px;
    border-radius: 14px;
    border: 5px solid #221f1d;
    box-shadow: 0 22px 36px -2px rgb(0 0 0 / 24%);
    padding: 10px;

    &.q-field--labeled .q-field__native, &.q-field--labeled .q-field__prefix, &.q-field--labeled .q-field__suffix {
        padding-top: 30px;
    }
}
</style>

