import { NAME_PARAMETER_PAGE, URI } from 'src/const/appConsts';

export function uriHandler(name, id) {
    if (!URI[name]) {
        return null;
    }

    return `${ URI[name] }${ id ? '/' + id : '' }`;
}

export function uriPageHandler(page = 1) {
    return `?${ NAME_PARAMETER_PAGE }=${ page }`;
}
