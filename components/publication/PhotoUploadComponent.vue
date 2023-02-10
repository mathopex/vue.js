<template>
    <div id="photo-upload" class="column justify-center" style="" @click="pickFiles" @dragover.prevent="dragOver"
         @dragleave.prevent="dragLeave" @drop.prevent="drop">
        <q-icon class="absolute all-pointer-events close" color="black" name="cancel" size="45px"
                @click.stop.prevent="close"></q-icon>
        <q-file ref="q-file" v-model="file" class="input-file" @input="loadPhoto"/>
        <div v-if="!url" class="column justify-center items-center placeholder">
            <p class="placeholder__title">Ajouter une photo</p>
            <p class="placeholder__sub-title"> ou faites glisser-déposer</p>
        </div>
        <q-img :src="url"></q-img>
    </div>
</template>

<script>
export default {
    name: 'PhotoUploadComponent',
    components: {},
    props: {},
    data() {
        return {
            file: [],
            url: null
        };
    },
    methods: {
        pickFiles(evt) {
            this.$refs['q-file'].pickFiles(evt);
        },
        loadPhoto(file) {
            this.file = file;
            this.url = URL.createObjectURL(this.file);
            this.$emit('input', this.file);
        },
        close() {
            this.file = [];
            this.url = null;
            this.$emit('clear');
        },
        dragOver() {
        },
        dragLeave(e) {
        },
        drop(e) {
            const file = e.dataTransfer.files[0];
            this.loadPhoto(file);
        }
    }
};
</script>

<style lang="scss">
#photo-upload {
    background-color: #dadce1;
    min-height: 300px;
    border-radius: 15px;
    margin: 10px;
    cursor: pointer;

    .close {
        top: 8px;
        right: 20px;
        z-index: 1;
    }

    .input-file {
        max-width: 300px;
        display: none;
    }

    .placeholder {
        color: black;

        &__title {
            color: black;
            font-size: 1.5rem;
        }

        &__sub-title {
            color: grey;
            font-size: 1rem;
            text-align: center;
        }
    }
}
</style>
