import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import tools from './tools'
import center from './tools/center'

Vue.use(tools);
//Vue.use(tools)执行以下这些 将组件添加到全局上
// install(Vue){
//   Vue.use(Icon);
//   Vue.use(Toast);
//   Vue.use(Lazyload);

//   Vue.component('tab-bar', TabBar);
//   Vue.component(Scroller.name, Scroller);
//   Vue.component(ItemList.name, ItemList);
//   Vue.component(Header.name, Header);

// }
Vue.prototype.$center = center;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

