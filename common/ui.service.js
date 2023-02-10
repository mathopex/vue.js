import { Loading, Notify } from 'quasar';
import _ from 'lodash';

/**
 * Handler générique pour les traitements long
 * - Affiche un loader
 * - Lance la callback
 * - Masque le loader
 * @param callback
 * @param {{errorMessage: null, errorCaptionMessage: null, message: string}} opt
 *  - reject pour récupérer l'erreur
 * @returns {Promise<void>}
 */
export const loadingHandler = async (callback, opt = { message: 'Chargement', errorMessage: null, errorCaptionMessage: null }) => {
    Loading.show({
        message: 'Chargement', ...opt
    });

    try {
        let datas = await callback();

        if (datas) {
            let datasFormatted = datas;

            if (Array.isArray(datas)) {
                datasFormatted = _.map(datas, (data) => {
                    if (data.hasOwnProperty('request')) {
                        return data.data;
                    }

                    return data;
                });
            } else {
                if (datas.hasOwnProperty('request')) {
                    return datas.data;
                } else {
                    _.forEach(datas, (data, key) => {
                        if (data.hasOwnProperty('request')) {
                            datasFormatted[key] = data.data;
                        }
                    });
                }
            }

            return datasFormatted;
        }

        return datas;
    } catch (e) {
        console.log(e);
        toast.negative({
            message: opt.errorMessage ? opt.errorMessage : 'Une erreur est survenue',
            caption: opt.errorCaptionMessage ? opt.errorCaptionMessage : 'Veuillez réessayer plus tard'
        });

        return opt.reject ? Promise.reject(e) : undefined;
    } finally {
        Loading.hide();
    }
};

/**
 * Raccourcis pour les notify
 * @type {{
 * positive: function (opt: {}),
 * negative: function (opt: {}),
 * warning: function (opt: {}),
 * info: function (opt: {}),
 * }}
 */
export const toast = {};
['positive', 'negative', 'warning', 'info'].forEach((color) => {
    toast[color] = (opt = {}) => {
        const _opt = typeof opt === 'string' ? { message: opt } : opt;
        return Notify.create({
            color, ..._opt
        });
    };
});
