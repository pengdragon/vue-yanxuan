import { Icon, Toast, Lazyload } from 'vant';
import TabBar from './components/TabBar'
import Scroller from './components/Scroller'
import ItemList from './components/ItemList'
import Header from './components/Header'



export default {
    install(Vue){
        Vue.use(Icon);
        Vue.use(Toast);
        Vue.use(Lazyload);

        Vue.component('tab-bar', TabBar);
        Vue.component(Scroller.name, Scroller);
        Vue.component(ItemList.name, ItemList);
        Vue.component(Header.name, Header);
        
    }
}