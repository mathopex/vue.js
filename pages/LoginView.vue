<template>
    <q-page id="login" class="column">
        <article class="row justify-between items-center login--header radius text-primary">
            <h2 class="h2">Se connecter sur Wizard's Alley</h2>
        </article>

        <fieldset class="login--body">
            <q-form method="post" class="column radius" @submit="onSubmit">
                <WaInput placeholder="Votre pseudonyme" label="Entrez votre email de sorcier" name="emailemail" v-model="email" type="email" margin/>
                <WaInput placeholder="Votre mot de passe" label="Entrez votre mot de passe" name="password" v-model="password"
                         :type="showPasswd ? 'text' : 'password'" margin>
                    <template #append>
                        <q-icon class="cursor-pointer" @click="showPasswd = !showPasswd"
                                :name="showPasswd ? 'visibility_off' : 'visibility'"/>
                    </template>
                </WaInput>

                <WaButton type="submit" label="Connexion" class="q-px-md q-py-md" no-caps @submit.prevent="onSubmit"/>
            </q-form>
        </fieldset>

        <div class="row justify-center back-to-login">
            <router-link to="/register">S'inscrire à Wizard's Alley</router-link>
        </div>
    </q-page>
</template>

<script>
import WaInput from 'components/ui/WaInput';
import WaButton from 'components/ui/WaButton';
import { LOGIN } from 'src/store/authModule/actions.type';

export default {
    name: 'LoginView',
    components: { WaButton, WaInput },
    data() {
        return {
            email: null,
            password: null,
            showPasswd: false
        };
    },
    methods: {
        async onSubmit() {
            try {
                await this.$store.dispatch(LOGIN, {
                    email: this.email,
                    password: this.password
                });

                await this.$router.push({ name: 'greatHall' });
            } catch (e) {
                console.log(e);
            }
        }
    }
};
</script>

<style scoped lang="scss">
#login {
    flex-direction: column;
    max-width: 890px;
    min-height: auto;
    box-sizing: border-box;
    margin: 30px auto 10px auto;

    .login--header {
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

    .login--body {
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
