import {MERCURE_PUBLIC_URL} from 'src/common/config';
import {MercureVuejs} from "src/common/mercure/mercure";
import mercure from "src/mixins/mercure";
import Logger from "src/common/mercure/logger";


export default ({app}) => {
    Logger.debug = process.env.DEV;
    app.config.globalProperties.$mercure = new MercureVuejs({hubUrl: MERCURE_PUBLIC_URL})

    app.mixin(mercure)
}

export {mercure}

