<template>
    <WaCard class="col-6" v-on="$attrs">
        <q-card-section :style="styleCss">
            <q-img class="justify-center items-center" height="90px" width="100%">
                <div class="absolute-center text-center">
                    {{ club.name }}
                </div>
            </q-img>
        </q-card-section>
    </WaCard>
</template>

<script>

import WaCard from 'components/ui/WaCard';
import { slugify } from 'src/common/utils.service';

export default {
    name: 'ClubItem',
    components: { WaCard },
    props: {
        club: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        styleCss() {
            return {
                backgroundImage: `url(${ require('./../../assets/images/clubs/' + slugify(this.club.name) + '.jpg') })`
            };
        }
    }
};
</script>

<style lang="scss" scoped>
.q-card__section {
    padding: 0;
}

.q-img__content > div {
    background: none;
    width: 100%;
}

.q-img__content > div:hover {
    cursor: pointer;
}

</style>
