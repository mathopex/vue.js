<template>
    <q-card class="q-card-custom" :class="{ 'border' : bordered, 'hover': hovered }" v-bind="$attrs">
        <slot></slot>
    </q-card>
</template>

<script>
import { QCard } from 'quasar';

export default {
    name: 'WaCard',
    inheritAttrs: false,
    props: {
        bordered: {
            type: Boolean,
            default: true
        },
        hovered: {
            type: Boolean,
            default: false
        },
    }
};
</script>

<style lang="scss">
.q-card-custom {
    min-width: fit-content;

    &.q-card {
        border-radius: 10px;
        background: rgba(70, 62, 58, 0.178);

        &.border {
            border: 5px solid #221f1d;
            margin: 0 0 15px;
        }

        &.hover:hover {
            background: rgba(39, 30, 25, 0.3);
            transition: 0.2s linear;
        }
    }
}

</style>
