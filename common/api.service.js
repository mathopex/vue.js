import { api } from 'boot/axios';
import JwtService from 'src/common/jwt.service';
import { uriHandler } from 'src/common/uri.service';
import { isEmpty } from 'lodash';

const ApiService = {
    setHeader() {
        if (JwtService.getToken()) {
            api.defaults.headers.common['Authorization'] = `Bearer ${ JwtService.getToken() }`;
        } else {
            api.defaults.headers.common['Authorization'] = '';
        }
    },

    query(resource, params) {
        this.setHeader();
        return api.get(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${ error }`);
        });
    },

    get(resource, slug = '') {
        this.setHeader();
        let url = `${ resource }`;

        if (slug) {
            url += `/${ slug }`;
        }

        return api.get(`${ url }`);
    },

    post(resource, params, config = {}) {
        this.setHeader();
        return api.post(`${ resource }`, params, config);
    },

    update(resource, slug, params) {
        this.setHeader();
        return api.put(`${ resource }/${ slug }`, params);
    },

    put(resource, params) {
        this.setHeader();
        return api.put(`${ resource }`, params);
    },

    delete(resource) {
        this.setHeader();
        return api.delete(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${ error }`);
        });
    }
};

export default ApiService;

export const ApiPublication = {
    getPublications(parameter = {}) {
        let params = '';

        if (!isEmpty(parameter)) {
            params = `?${ parameter.property }[${ parameter.range }]=${ parameter.id }&order[id]`;
        } else {
            params = `?order[id]=desc&order[comments.id]=desc`;
        }

        return ApiService.get(`${ uriHandler('publication') }${ params }`);
    },
    postPublication(parameter = {}) {
        return ApiService.post(`${ uriHandler('publication') }`, parameter, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async getPublicationsByUserId(idUser) {
        return ApiService.get(uriHandler('user'), `${ idUser }/publications`);

    },
    likePublication(parameter = {}) {
        return ApiService.post(`${ uriHandler('publicationLike') }`, parameter);
    },
    dislikePublication({ id }) {
        return ApiService.delete(`${ uriHandler('publicationLike') }/${ id }`);
    },
    addComment(parameter = {}) {
        return ApiService.post(`${ uriHandler('comment') }`, parameter);
    },
    likeComment(parameter = {}) {
        return ApiService.post(`${ uriHandler('commentLike') }`, parameter);
    },
    dislikeComment({ id }) {
        return ApiService.delete(`${ uriHandler('commentLike') }/${ id }`);
    },
    removeComments({ id }) {
        return ApiService.delete(`${ uriHandler('comment') }/${ id }`);
    }
};

export const ApiUser = {
    editUser(id, user) {
        return ApiService.put(`${ uriHandler('user', id) }`, { ...user });
    },
    editUserInformations(id, user) {
        return ApiService.put(`${ uriHandler('userInformations', id) }`, { ...user });
    },
    async getUsers() {
        const { data } =  await ApiService.get(`${ uriHandler('user') }`);
        return data;
    },
     async getUser(id) {
        const { data } =  await ApiService.get(`${ uriHandler('user',id) }`);
        return data;
    },
    editUserMedias(id, medias) {
        return ApiService.put(`${ uriHandler('userMedias', id) }`, { ...medias });
    },
    getFollowings(idUser) {
        return ApiService.get(uriHandler('user'), `${ idUser }/following`);
    },
    getFollowers(idUser) {
        return ApiService.get(uriHandler('user'), `${ idUser }/followers`);
    },
    followUser(parameter = {}) {
        return ApiService.post(uriHandler('follow'), parameter);
    },
    unfollowUser({ id }) {
        return ApiService.delete(`${ uriHandler('follow', id) }`);
    }
};

export const ApiClub = {
    async getClubs() {
        const { data } = await ApiService.get(`${ uriHandler('club') }`);

        return data;
    },
    async getClub(id) {
        const { data } = await ApiService.get(`${ uriHandler('club', id) }`);

        return data;
    }
};
export const ApiCategory = {
    async getCategory(id) {
        const { data } = await ApiService.get(`${ uriHandler('category', id) }`);

        return data;
    }
};

export const ApiEvent = {
    async getEvents() {
        const { data } = await ApiService.get(`${ uriHandler('event') }`);
        return data;
    }
};

export const ApiSpoiler = {
    async getSpoilers() {
        const { data } = await ApiService.get(`${ uriHandler('spoiler') }`);

        return data;
    }
};

