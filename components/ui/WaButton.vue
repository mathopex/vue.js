<template>
    <q-btn v-bind="$attrs" @click="$emit('click')">
        <slot></slot>
    </q-btn>
</template>

<script>
export default {
    name: 'WaButton',
    props: ['value']
};
</script>


<style lang="scss">
.q-btn{

}
</style>
