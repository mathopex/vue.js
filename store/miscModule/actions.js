import ApiService from 'src/common/api.service';
import {FETCH_CATEGORIES, FETCH_HOUSES} from 'src/store/miscModule/actions.type';
import { uriHandler } from 'src/common/uri.service';

export default {
    async [FETCH_HOUSES]() {
        try {
            const {data} = await ApiService.get(`${ uriHandler('house')}`)

            return data;
        } catch (e) {
            console.error(e)
            return []
        }
    },
    async [FETCH_CATEGORIES]() {
        try {
            const {data} = await ApiService.get(`${ uriHandler('category')}`)

            return data;
        } catch (e) {
            console.error(e)
            return []
        }
    },
};
