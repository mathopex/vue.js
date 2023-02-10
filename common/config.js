let API_URL;
let MERCURE_PUBLIC_URL;

if (process.env.DEV) {
    API_URL = 'https://localhost/'
    MERCURE_PUBLIC_URL = API_URL + '.well-known/mercure'
}

if (process.env.PROD) {
    API_URL = 'http://preprod-api.wizards-alley.com:8081/'
    MERCURE_PUBLIC_URL = API_URL + '.well-known/mercure'
}

export {API_URL, MERCURE_PUBLIC_URL};
