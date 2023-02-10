//__ ID ROLE en BDD
export const ROLE_ADMIN = 1;
export const ROLE_SUPER_ADMIN = 2;
export const ROLE_USER = 3;
export const ROLE_PRO_FANDOM = 4;
export const ROLE_REDACTEUR = 5;
export const ROLE_PRO = 6;

export const HOUSES = {
    'poufsouffle': 'hufflepuff',
    'gryffondor': 'gryffindor',
    'serdaigle': 'ravenclaw',
    'serpentard': 'slytherin'
};

export const BADGES = {
    'ROLE_ADMIN': 'admin',
    'ROLE_REDACTEUR': 'redacteur',
    'ROLE_PRO_FANDOM': 'fandom'
};

export const MEDIA_LINKS = [
    'soundcloud',
    'website',
    'youtube',
    'tipeee',
    'twitch',
    'vimeo'
];

//__ URI des routes API
export const URI = {
    userInformations: '/user_informations',
    userMedias: '/user_medias',
    role: '/roles',
    house: '/houses',
    publication: '/publications',
    category: '/categories',
    follow: '/follows',
    user: '/users',
    group: '/groups',
    club: '/clubs',
    event: '/events',
    spoiler: '/spoilers',
    publicationLike: '/publication_likes',
    comment: '/comments',
    commentLike: '/comment_likes'
};

//__ Nom du paramétre à passer pour gérer la pagination côté api
export const NAME_PARAMETER_PAGE = 'page';

//__ ID du role à attribuer par défaut (pour sorcier et communaute)
export const ID_ROLE_WIZARD = ROLE_USER;
export const ID_ROLE_COMMUNITY = ROLE_PRO;

//__ ID categorie à attribuer par défaut
export const ID_CATEGORY_DEFAULT = 1;

//__ NAME des types groupe
export const GROUP_CLUB_NAME = 'club';
export const GROUP_EVENT_NAME = 'event';

export const TYPE_ACCOUNT_WIZARD = 'wizard'
export const TYPE_ACCOUNT_COMMUNITY = 'community'

export const keyHydraMember = 'hydra:member'
export const keyHydraTotalItems = 'hydra:totalItems'

