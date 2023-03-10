export const dialogMixin = {
    props: {},
    emits: [
        // REQUIRED
        'ok', 'hide'
    ],
    methods: {
        // following method is REQUIRED
        // (don't change its name --> "show")
        show() {
            this.$refs.dialog.show();
        },

        // following method is REQUIRED
        // (don't change its name --> "hide")
        hide() {
            this.$refs.dialog.hide();
        },

        onDialogHide() {
            // required to be emitted
            // when QDialog emits "hide" event
            this.$emit('hide');
        },

        onOKClick() {
            // on OK, it is REQUIRED to
            // emit "ok" event (with optional payload)
            // before hiding the QDialog
            this.$emit('ok');
            // or with payload: this.$emit('ok', { ... })

            // then hiding dialog
            this.hide();
        },

        onCancelClick() {
            // we just need to hide the dialog
            this.hide();
        }
    }
};
