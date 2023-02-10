<template>
    <q-input :class="styleCss" borderless class="wa-input" v-bind="$attrs" @update:model-value="$emit('update:modelValue', $event)" label-color="black" :model-value="modelValue">
        <template v-slot:before>
            <slot name="before"></slot>
        </template>

        <template v-slot:append>
            <slot name="append"></slot>
        </template>

        <template v-slot:after>
            <slot name="after"></slot>
        </template>
    </q-input>
</template>

<script>
export default {
    name: 'WaInput',
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        margin: {
            type: Boolean,
            default: false
        },
        dense: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        styleCss() {
            return {
                'margin': this.margin,
                'dense': this.dense
            };
        }
    }
};
</script>

<style lang="scss">
.wa-input.q-input.q-field, .wa-input.q-textarea.q-field {
    border-radius: 14px;
    border: 5px solid #221f1d;
    box-shadow: 0 22px 36px -2px rgb(0 0 0 / 24%);
    padding: 10px;

    &.q-field--labeled .q-field__native, &.q-field--labeled .q-field__prefix, &.q-field--labeled .q-field__suffix {
        padding-top: 30px;
    }

    &.margin {
        margin: 25px 0 30px;
    }

    &.dense {
        padding: 0 10px;

        .q-field__control {
            height: 45px;
        }
    }
}
</style>
