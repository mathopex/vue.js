<template>
    <div>
        <template v-if="vertical">
            <WaCard>
                <q-footer id="footer" :class="{'vertical': vertical}">
                    <q-toolbar class="column">
                        <ul :class="{ 'row items-center': !vertical, 'column items-start': vertical }" class="justify-between">
                            <li>
                                <router-link to="/team">L'équipe de Wizard's Alley</router-link>
                            </li>
                            <li>
                                <router-link to="/legals">Mentions légales</router-link>
                            </li>
                            <li>
                                <router-link to="/terms">Conditions générales d'utilisation</router-link>
                            </li>
                            <li>
                                <router-link to="/rules">Règlement intérieur</router-link>
                            </li>
                            <li>
                                <router-link target="_blank" to="https://instagram.com/thewizardsalley">Instagram</router-link>
                            </li>
                            <li>
                                <router-link target="_blank" to="https://www.facebook.com/thewizardsalley">Facebook</router-link>
                            </li>
                            <li>
                                <router-link target="_blank" to="https://twitter.com/wizardsalley">Twitter</router-link>
                            </li>
                            <li>
                                <router-link target="_blank" to="https://discord.gg/2dUFzZHFvW">Discord</router-link>
                            </li>
                            <li>
                                <router-link target="_blank" to="https://medium.com/thewizardsalley">Medium</router-link>
                            </li>
                        </ul>

                        <ul :class="{['items-start']: vertical, ['items-center']: !vertical}" class="column justify-center">
                            <li>
                                <router-link to="https://wizards-alley.com">2022 ©Wizard's Alley</router-link>
                            </li>
                            <li>
                                <p>Wizard's Alley est un site de fans non-officiel, en aucun cas affilié à J.K. Rowling, Warner
                                    Media, Scholastic, Bloomsbury, Gallimard. « Harry Potter »
                                    et toutes les marques dérivées sont la propriété et le copyright de Warner Bros et de J.K.
                                    Rowling.
                                </p>
                            </li>
                        </ul>
                    </q-toolbar>
                </q-footer>
            </WaCard>
        </template>
        <template v-else>
            <q-footer id="footer" :class="{'vertical': vertical}">
                <q-toolbar class="column">
                    <ul :class="{ 'row items-center': !vertical, 'column items-start': vertical }" class="justify-between">
                        <li>
                            <router-link to="/team">L'équipe de Wizard's Alley</router-link>
                        </li>
                        <li>
                            <router-link to="/legals">Mentions légales</router-link>
                        </li>
                        <li>
                            <router-link to="/terms">Conditions générales d'utilisation</router-link>
                        </li>
                        <li>
                            <router-link to="/rules">Règlement intérieur</router-link>
                        </li>
                        <li>
                            <router-link target="_blank" to="https://instagram.com/thewizardsalley">Instagram</router-link>
                        </li>
                        <li>
                            <router-link target="_blank" to="https://www.facebook.com/thewizardsalley">Facebook</router-link>
                        </li>
                        <li>
                            <router-link target="_blank" to="https://twitter.com/wizardsalley">Twitter</router-link>
                        </li>
                        <li>
                            <router-link target="_blank" to="https://discord.gg/2dUFzZHFvW">Discord</router-link>
                        </li>
                        <li>
                            <router-link target="_blank" to="https://medium.com/thewizardsalley">Medium</router-link>
                        </li>
                    </ul>

                    <ul :class="{['items-start']: vertical, ['items-center']: !vertical}" class="column justify-center">
                        <li>
                            <router-link to="https://wizards-alley.com">2022 ©Wizard's Alley</router-link>
                        </li>
                        <li>
                            <p>Wizard's Alley est un site de fans non-officiel, en aucun cas affilié à J.K. Rowling, Warner
                                Media, Scholastic, Bloomsbury, Gallimard. « Harry Potter »
                                et toutes les marques dérivées sont la propriété et le copyright de Warner Bros et de J.K.
                                Rowling.
                            </p>
                        </li>
                    </ul>
                </q-toolbar>
            </q-footer>
        </template>
    </div>

</template>

<script>
import WaCard from 'components/ui/WaCard';

export default {
    name: 'BaseFooterComponent',
    components: { WaCard },
    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>

#footer {
    ul {
        width: 100%;

        li {
            margin: 10px;

            a {
                border-bottom: 1px solid transparent;
                transition: 0.2s linear;

                &:hover {
                    color: $secondary;
                    border-color: $secondary;
                }
            }

            p, a {
                font-size: 12px;
                line-height: 25px;
                padding-bottom: 5px;
            }
        }
    }

    &.vertical {
        position: initial;
    }
}

.lightning {
    filter: invert(99%) sepia(99%) saturate(2%) hue-rotate(36deg) brightness(105%) contrast(101%);
}
</style>
