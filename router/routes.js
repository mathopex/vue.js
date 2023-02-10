const routes = [
    {
        path: '/',
        component: () => import('layouts/RegisterLayout.vue'),
        children: [
            {
                path: '/',
                name: 'homeRegister',
                component: () => import('pages/HomeAuthenticationView.vue')
            },
            {
                path: '/login',
                name: 'login',
                component: () => import('pages/LoginView.vue')
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('pages/RegisterView.vue')
            }
        ],
        meta: { onlyPublic: true }
    },
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '/greathall',
                name: 'greatHall',
                component: () => import('pages/GreatHallView.vue')
            },
            {
                path: '/commonroom',
                name: 'commonRoom',
                component: () => import('pages/CommonRoomView.vue')
            },
            {
                path: '/news',
                name: 'news',
                component: () => import('pages/NewsView.vue')
            },
            {
                path: '/videos',
                name: 'videos',
                component: () => import('pages/VideoView.vue')
            },
            {
                path: '/clubs',
                name: 'clubs',
                component: () => import('pages/ClubView.vue')
            },
            {
                path: '/clubs/:clubSlug',
                name: 'clubsPublication',
                component: () => import('pages/ClubPublicationView.vue'),
                props: (route) => ({
                    ...route.params
                })
            },
            {
                path: '/events',
                name: 'events',
                component: () => import('pages/EventView.vue')
            },
            {
                path: '/events/:eventSlug',
                name: 'eventItemView',
                component: () => import('pages/EventItemView.vue'),
                props: (route) => ({
                    ...route.params
                })
            },
            {
                path: '/cup',
                name: 'cup',
                component: () => import('pages/CupView.vue')
            },
            {
                path: '/explorer',
                name: 'explorer',
                component: () => import('pages/SearchView.vue')
            },
            {
                path: '/explorer/:filterSlug',
                name: 'UserFilter',
                component: () => import('pages/SearchView.vue'),
                props: (route) => ({
                    ...route.params
                })
            },
            {
                path: '/p/:profilSlug',
                name: 'profilUser',
                component: () => import('src/pages/ProfilVisitorView.vue'),
                props: (route) => ({
                    ...route.params
                })
            },
            {
                path: '/p',
                name: 'profil',
                component: () => import('pages/ProfilView.vue'),
            },
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue')
    }
];
export default routes;
