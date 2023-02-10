import { ApiUser } from 'src/common/api.service';
import { EDIT_USER, EDIT_USER_INFORMATIONS, EDIT_USER_MEDIAS, FETCH_USER_FOLLOWINGS } from 'src/store/userModule/actions.type';
import { toast } from 'src/common/ui.service';
import { CHECK_AUTH } from 'src/store/authModule/actions.type';

export default {
    async [FETCH_USER_FOLLOWINGS](context, { idUser }) {
        try {
            const { data } = await ApiUser.getFollowings({ idUser: idUser });

            return data['hydra:member'];
        } catch (e) {
            console.log('Error : ' + e);

            return [];
        }
    },
    async [EDIT_USER](context, { idUser, user }) {
        try {
            const { data } = await ApiUser.editUser(idUser, user);

            await context.dispatch(CHECK_AUTH);

            return data;
        } catch (e) {
            console.log(e);
            toast.negative({
                message: 'Une erreur est survenue',
                caption: 'Impossible de modifier votre profil'
            });

            return undefined;
        }
    },
    async [EDIT_USER_INFORMATIONS](context, { idUser, user }) {
        try {
            const { data } = await ApiUser.editUserInformations(idUser, user);

            await context.dispatch(CHECK_AUTH);

            return data;
        } catch (e) {
            console.log(e);
            toast.negative({
                message: 'Une erreur est survenue',
                caption: 'Impossible de modifier votre profil'
            });

            return undefined;
        }
    },
    async [EDIT_USER_MEDIAS](context, { idUser, user }) {
        try {
            const { data } = await ApiUser.editUserMedias(idUser, user);

            await context.dispatch(CHECK_AUTH);

            return data;
        } catch (e) {
            console.log(e);
            toast.negative({
                message: 'Une erreur est survenue',
                caption: 'Impossible de modifier votre profil'
            });

            return undefined;
        }
    }
};
