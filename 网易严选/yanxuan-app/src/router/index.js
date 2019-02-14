import Vue from 'vue'
import Router from 'vue-router'
// 引入项目中五个tab页面对应的路由配置项
import homeRoute from './homeRoute'
import categoryRoute from './categoryRoute'
import discoverRoute from './discoverRoute'
import cartRoute from './cartRoute'
import mineRoute from './mineRoute'
import goodsRoute from './goodsRoute'
Vue.use(Router);






export default new Router({
  mode: 'history',//需要后台配合
  base: '/莆田学院',
  routes: [
    homeRoute,
    categoryRoute,
    discoverRoute,
    cartRoute,
    mineRoute,
    goodsRoute,
    // 重定向
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
