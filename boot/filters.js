import { filters } from 'src/mixins/filters';

export default ({app}) => {
    app.config.globalProperties.$filters = filters
}

