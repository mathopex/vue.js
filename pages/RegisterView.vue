<template>
    <q-page id="register" class="column">
        <article class="row justify-between items-center register--header radius text-primary">
            <h2 class="h2">S'inscrire sur Wizard's Alley</h2>
        </article>

        <fieldset class="register--body">
            <q-form method="post" class="column radius" @submit="onSubmit">
                <WaInput placeholder="Patmol" label="Pseudonyme" name="pseudo" v-model="v$.pseudo.$model"
                         :error="v$.pseudo.$invalid" margin/>
                <WaInput placeholder="Jean Dupond" label="Nom et Prénom" name="name" v-model="v$.fullname.$model"
                         :error="v$.fullname.$invalid" margin/>
                <WaInput placeholder="Adresse mail" label="Adresse mail" name="mail" type="email"
                         v-model="v$.email.$model" :error="v$.email.$invalid" margin/>
                <WaInput placeholder="Gilderoy Lockhart, Ordre de Merlin, troisième classe..." rows="5" cols="30"
                         label="Courte biographie" name="about" maxlength="600" type="textarea"
                         v-model="v$.biographie.$model" :error="v$.biographie.$invalid" margin/>

                <WaInput placeholder="FelixFelicis" label="Mot de passe" name="password"
                         :type="showPwd ? 'text' : 'password'" v-model="v$.passwordConfirm.$model"
                         :error="v$.passwordConfirm.$invalid" margin>
                    <template #append>
                        <q-icon class="cursor-pointer" @click="showPwd = !showPwd"
                                :name="showPwd ? 'visibility_off' : 'visibility'"/>
                    </template>
                </WaInput>

                <WaInput placeholder="FelixFelicis" label="Confirmation de mot de passe" name="confirm-password"
                         :type="showConfirmPwd ? 'text' : 'password'" v-model="v$.password.$model"
                         :error="v$.password.$invalid" margin>
                    <template #append>
                        <q-icon class="cursor-pointer" @click="showConfirmPwd = !showConfirmPwd"
                                :name="showConfirmPwd ? 'visibility_off' : 'visibility'"/>
                    </template>
                </WaInput>

                <WaSelect borderless v-model="house" emit-value map-options :options="housesList"
                          :option-label="(item) => item === null ? null : item.name"
                          :option-value="(item) => item === null ? null : item.id"
                          label="Maison d'appartenance (ne pourra plus être modifié)" :error="!house"
                          v-if="!isCommunityAccount"/>

                <WaSelect borderless v-model="category" emit-value map-options :options="categoriesList"
                          :option-label="(item) => item === null ? null : item.name"
                          :option-value="(item) => item === null ? null : item.id"
                          label="Catégorie de votre communauté" :error="!category" v-if="isCommunityAccount"/>

                <router-link to="/rules" target="_blank">Lire le règlement intérieur</router-link>
                <router-link to="/terms" target="_blank">Lire les conditions générales d'utilisation</router-link>

                <div class="column checkbox">
                    <WaCheckbox v-model="v$.cbCGU.$model" name="cbCGU">J'accepte le Règlement Intérieur ainsi que les
                        Conditions Générales d'Utilisation
                    </WaCheckbox>
                    <WaCheckbox v-model="v$.cbAgeLimit.$model" name="cbAgeLimit">Je certifie avoir plus de 15 ans
                    </WaCheckbox>
                </div>

                <WaButton type="submit" label="Créer mon compte" class="q-px-md q-py-md" no-caps
                          :disabled="v$.$invalid"/>
            </q-form>
        </fieldset>
        <div class="row justify-center back-to-login">
            <router-link to="/login">Se connecter à Wizard's Alley</router-link>
        </div>
    </q-page>
</template>

<script>
import WaInput from 'components/ui/WaInput';
import WaSelect from 'components/ui/WaSelect';
import WaCheckbox from 'components/ui/WaCheckbox';
import WaButton from 'components/ui/WaButton';
import { REGISTER } from 'src/store/authModule/actions.type';
import { FETCH_CATEGORIES, FETCH_HOUSES } from 'src/store/miscModule/actions.type';
import { uriHandler } from 'src/common/uri.service';
import { ID_CATEGORY_DEFAULT, ID_ROLE_COMMUNITY, ID_ROLE_WIZARD, TYPE_ACCOUNT_COMMUNITY } from 'src/const/appConsts';
import useVuelidate from '@vuelidate/core';
import { email, maxLength, minLength, sameAs, required } from '@vuelidate/validators';

export default {
    name: 'RegisterView',
    components: { WaButton, WaCheckbox, WaSelect, WaInput },
    setup() {
        return {
            v$: useVuelidate()
        };
    },
    data() {
        return {
            pseudo: '',
            fullname: '',
            email: '',
            biographie: '',
            house: null,
            category: ID_CATEGORY_DEFAULT,
            cbAgeLimit: false,
            cbCGU: false,
            password: '',
            passwordConfirm: '',
            housesList: [],
            categoriesList: [],
            showPwd: false,
            showConfirmPwd: false
        };
    },
    validations() {
        return {
            pseudo: {
                required,
                maxLength: maxLength(30)
            },
            fullname: {
                required,
                maxLength: maxLength(30)
            },
            email: {
                required,
                email
            },
            password: {
                required,
                maxLength: maxLength(30),
                minLength: minLength(6)
            },
            passwordConfirm: {
                required,
                sameAs: sameAs(this.password)
            },
            biographie: {
                maxLength: maxLength(600)
            },
            cbCGU: {
                required,
                sameAs: sameAs(true)
            },
            cbAgeLimit: {
                required,
                sameAs: sameAs(true)
            }
        };
    },
    methods: {
        async onSubmit() {
            this.v$.$touch();

            if (!this.v$.$invalid) {
                try {
                    await this.$store.dispatch(REGISTER, {
                        username: this.pseudo,
                        fullname: this.fullname,
                        email: this.email,
                        cgaAgeLimit: this.cbAgeLimit,
                        cbCGU: this.cbCGU,
                        role: uriHandler('role', this.idRole),
                        password: this.password,
                        userInformations: {
                            about: this.biographie,
                            house: this.house !== null ? uriHandler('house', this.house) : null,
                            category: uriHandler('category', this.category),
                            accept_terms: true
                        },
                        userMedias: {}
                    });

                    this.$router.push({ name: 'greatHall' });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    },
    computed: {
        idRole() {
            if (this.$route.query.type === TYPE_ACCOUNT_COMMUNITY) {
                return ID_ROLE_COMMUNITY;
            }

            return ID_ROLE_WIZARD;
        },
        isCommunityAccount() {
            return this.$route.query.type === TYPE_ACCOUNT_COMMUNITY;
        }
    },
    async mounted() {
        this.housesList = await this.$store.dispatch(FETCH_HOUSES);
        this.housesList = this.housesList['hydra:member']
        this.categoriesList = await this.$store.dispatch(FETCH_CATEGORIES);
        this.categoriesList = this.categoriesList['hydra:member']
    }
};
</script>

<style scoped lang="scss">
#register {
    flex-direction: column;
    max-width: 890px;
    min-height: auto;
    box-sizing: border-box;
    margin: 30px auto 10px auto;

    .register--header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-size: cover;
        background-attachment: scroll;
        color: #ffffff;
        margin-bottom: 25px;
        padding: 1% 4%;
        background-image: url(../assets/images/common/newsfeed.jpg) !important;
        background-position: top;
        border: 5px solid #221f1d !important;

        h2 {
            font-size: 14px;
            line-height: 20px;
            text-align: left;
            font-weight: bold;
            max-width: 33%;
        }
    }

    .register--body {
        padding: 25px 25px;
        border-radius: 15px;
        margin-bottom: 25px;
        background: rgba(70, 62, 58, 0.178) scroll center;
        color: #ffffff;
        box-sizing: border-box;
        transition: 0.2s linear;

        p {
            margin-bottom: 15px;
            line-height: 25px;
            font-size: 13px;
            font-weight: bold;
        }

        .checkbox {
            > div {
                background-color: rgba(0, 0, 0, 0.56);
                padding: 20px;
                margin-bottom: 15px;
                line-height: 25px;
            }
        }
    }

    a {
        color: $secondary;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.2s linear;
        margin-bottom: 30px;

        &:hover {
            color: $secondary;
            border-color: $secondary;
        }
    }
}
</style>
