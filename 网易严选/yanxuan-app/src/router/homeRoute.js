export default {
    path: '/home',
    component: () => import('@pages/home/index'),
    children: [
        {
            alias: '',
            path: 'main',
            component: () => import('@components/home/home-main-content')
        },
        {
            path: 'menu/:id/:name',
            component: () => import('@components/home/home-menu-content'),
            props: true
        },
        //下面的还未写
        {
            path: 'categorylist/:id/:name',
            components: {
                'default': () => import('@components/home/home-main-content'),
                'subpage': () => import('@pages/home/category-list')
            },
            props: {
                subpage: true
            }
        }
    ]
}