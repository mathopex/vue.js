import ApiService, {ApiPublication} from 'src/common/api.service';
import {FETCH_PUBLICATIONS, POST_LIKE, POST_PUBLICATION} from "src/store/publicationModule/actions.type";

export default {
    async [POST_PUBLICATION](context, params) {
        try {
            const {data} = await ApiPublication.postPublication(params);

            return data['hydra:member']
        } catch (e) {
            return []
        }
    },
    async [FETCH_PUBLICATIONS](context, params = {}) {
        try {
            const {data} = await ApiPublication.getPublications(params);

            return {result: data['hydra:member'], totalItems: data['hydra:totalItems']}
        } catch (e) {
            return []
        }
    }
};
