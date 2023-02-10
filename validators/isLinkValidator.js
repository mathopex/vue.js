export const isLink = (value) => {
    const regex = new RegExp('https?://[^\s]+');

    return regex.test(value);
};
