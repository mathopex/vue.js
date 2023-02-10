<template>
    <div class="rules-card">
        <WaCard class="rules-card__rules">
            <div>
                <q-card-section class="wrapper-title bg-primary text-secondary">
                    <div class="title text-h2">Réglement de la Coupe</div>
                </q-card-section>

                <q-card-actions align="center" class="bg-primary" vertical>
                    <q-list>
                        <q-item>
                            <q-item-section>
                                <q-item-label class="subtitle">Lire le règlement complet de la coupe</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-icon name="chevron_right" right size="25px"/>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-actions>
            </div>
        </WaCard>
        <WaCard class="rules-card__informations">
            <div>
                <q-card-section class="wrapper-title bg-primary text-secondary">
                    <div class="title text-h2">Comment gagner des points ?</div>
                </q-card-section>

                <q-card-section class="bg-primary" vertical>
                    <h2 class="h2">Comment gagner des points ?</h2>
                    <p>Soyez un(e) grand(e) sorcier(e) de Wizard's&nbsp;Alley
                        en suivant ce petit guide qui vous permettra de remporter
                        des points pour la Coupe des Sorciers&nbsp;!</p>
                    <p>Plus vous êtes actif sur Wizard's&nbsp;Alley, plus vous allez gagner des points:</p>
                    <ul>
                        <li>En complétant votre profil;</li>
                        <li>En écrivant une nouvelle publication;</li>
                        <li>En commentant une publication;</li>
                        <li>En lisant des articles des Communautés&nbsp;Magiques;</li>
                        <li>En participant à un événement;</li>
                        <li>En parrainant des ami(e)s;</li>
                    </ul>
                    <p>Les points attribués pour chacune des actions ci-dessus sont fixes,
                        mais secrets pour préserver le fonctionnement de la coupe.</p>
                    <p>Vous pouvez aussi gagner des points attribués par les rédacteurs, modérateurs
                        et administrateurs pour des jeux spéciaux, ou pour votre aide à la vie du site.</p>
                </q-card-section>
            </div>
        </WaCard>
    </div>
</template>

<script>
import WaCard from 'components/ui/WaCard';

export default {
    name: 'CupRulesComponent',
    components: { WaCard },
    props: {
        followOnly: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss">
.rules-card {
    .q-card {
        background: none;

        .wrapper-title {
            padding: 10% 10% 1px;

            .title {
                color: $secondary;
                margin-bottom: 4vh;
                font-size: 14px;
                line-height: 20px;
                text-align: left;
                font-weight: bold;

                &::after {
                    display: inline-block;
                    content: "";
                    width: 100%;
                    height: 1px;
                    background-color: $secondary;
                    margin-top: 25px;
                }
            }
        }

        .q-item {
            margin-bottom: 20px;

            .subtitle {
                font-size: 13px;
                line-height: 20px;
            }
        }
    }
}
</style>
