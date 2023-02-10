//state, getters, rootState, rootGetters
export default {
    getUser(state) {
        return state.user;
    },
    getUserInformations(state) {
        return state.user.userInformations;
    },
    isAuthenticated(state) {
        return state.isAuthenticated && !!state.user;
    },
};
