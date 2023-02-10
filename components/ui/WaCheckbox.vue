<template>
    <q-checkbox dense v-bind="$attrs" @update:modelValue="$emit('update:modelValue', $event)" :model-value="modelValue">
        <slot></slot>
    </q-checkbox>
</template>

<script>
export default {
    name: 'WaCheckbox',
    emits: ['update:modelValue'],
    props: ['modelValue'],
};
</script>

<style lang="scss">
.q-checkbox {
    border-radius: 14px;
    padding: 10px;

    &.q-field--labeled .q-field__native, &.q-field--labeled .q-field__prefix, &.q-field--labeled .q-field__suffix {
        padding-top: 30px;
    }
}
</style>
