import { PURGE_AUTH, SET_AUTH, SET_ERROR } from 'src/store/authModule/mutations.type';
import JwtService from 'src/common/jwt.service';
import { Notify } from 'quasar';

export default {
    [SET_ERROR](state, error) {
        state.errors = error;
        Notify.create(error.errors || error.message || error);
    },
    [SET_AUTH](state, payload) {
        state.isAuthenticated = true;
        state.user = payload.user;
        state.errors = {};

        if (!JwtService.getToken() || payload.token) {
            state.token = payload.token;
            JwtService.saveToken(payload.token);
        }
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.token = null;
        state.errors = {};
        JwtService.destroyToken();
    }
};
