import { CHECK_AUTH, LOGIN, LOGOUT, REGISTER } from 'src/store/authModule/actions.type';
import { PURGE_AUTH, SET_AUTH } from 'src/store/authModule/mutations.type';
import ApiService from 'src/common/api.service';
import JwtService from 'src/common/jwt.service';
import { loadingHandler } from 'src/common/ui.service';
import jwt_decode from 'jwt-decode';

export default {
    async [LOGIN](context, datas) {
        try {
            const data = await loadingHandler(async () => {
                const dataToken = await ApiService.post('authentication_token', {
                    email: datas.email,
                    password: datas.password
                });

                const userId = jwt_decode(dataToken.data.token).id;
                JwtService.saveToken(dataToken.data.token);
                const dataUser = await ApiService.get('users', userId);

                return {
                    user: dataUser,
                    token: dataToken.data.token
                };
            }, { message: 'Le choixpeau prend sa décision...', reject: true, errorMessage: "Nom d'utilisateur ou mot de passe incorrect", errorCaptionMessage: "Veuillez réessayer" });

            context.commit(SET_AUTH, data);
        } catch (e) {
            context.commit(PURGE_AUTH);

            return Promise.reject(e);
        }
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    async [REGISTER](context, datas) {
        try {
            const data = await loadingHandler(async () => {
                const dataUser = await ApiService.post('users', datas);
                const dataToken = await ApiService.post('authentication_token', {
                    email: datas.email,
                    password: datas.password
                });

                return {
                    user: dataUser.data,
                    token: dataToken.data.token
                };
            }, { message: 'Le choixpeau prend sa décision...', reject: true });

            context.commit(SET_AUTH, data);
        } catch (e) {
            context.commit(PURGE_AUTH);

            return Promise.reject(e);
        }
    },
    [CHECK_AUTH](context) {
        let jwtToken = JwtService.getToken();

        if (jwtToken) {
            const userId = jwt_decode(jwtToken).id;

            return ApiService.get('users', userId)
                .then(({ data }) => {
                    context.commit(SET_AUTH, { user: data, token: jwtToken });
                })
                .catch(({ response }) => {
                    console.log(response);
                    context.commit(PURGE_AUTH);
                });
        } else {
            context.commit(PURGE_AUTH);
        }
    }
};
