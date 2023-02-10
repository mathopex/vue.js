export const slugify = (str, separator = '-') => {
    return str
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
};

export const stringFormat = (value, ...args) => {
    return value.replace(/{([0-9]+)}/g, function (match, index) {
        // check if the argument is there
        return typeof args[index] == 'undefined' ? match : args[index];
    });
};

export const toCapitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
