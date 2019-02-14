import {fetchGet} from 'fetch'
import API from 'API'
const state = {
    cateMenu: [],
    selectMenuIndex: 0,
    cateMenuList: {},
    groupData: []
}

const getters = {
    // 根据侧边栏选中的下标，计算id
    selectMenuId(state){
        if(state.cateMenu.length <= 0 ){
            return null;
        }
        let index = state.selectMenuIndex;
        let id = state.cateMenu[index].id;
        return id;
    },
    selectMenuTitle(state){
        if(state.cateMenu.length <= 0 ){
            return null;
        }
        let index = state.selectMenuIndex;
        let name = state.cateMenu[index].name;
        return name;
    }
}

const mutations = {
    setCateMenu(state, params){
        state.cateMenu = params;
        state.selectMenuId = params[0].id;
    },
    setMenuIndex(state, param){
        //在分类页面侧边栏的点击事件触发的
        state.selectMenuIndex = param;
    },
    setCateMenuList(state, params){
        state.cateMenuList = params;
    },
    setGroupData(state, params){
        state.groupData = params;
    }
}

const actions = {
    // 请求菜单栏的侧边栏分类数据
    async getCateMenuData({commit}){
        let data = await fetchGet(API.CATEGOEY_LIST_URL);
        let newData = data.map(({id, name})=>({id, name}));
        commit('setCateMenu', newData);
    },
    async getCateMenuList({commit}, id){
        let data = await fetchGet(API.CATEGOEY_LIST_GROUP_URL, {
            categoryId: id
        });
        // 处理数据
        let bannerUrl = data.currentCategory.wapBannerUrl;
        let categoryGroupList = data.categoryGroupList.map(group=>{
            return {
                id: group.id,
                name: group.name,
                categoryList: group.categoryList.map(({id, name, wapBannerUrl})=>({id, name, bannerUrl: wapBannerUrl}))
            }
        })
        commit('setCateMenuList', {
            bannerUrl,
            categoryGroupList
        });
    },
    async getCateGroupItems({commit}, params){
        let data = await fetchGet(API.CATEGOEY_LIST_GROUP_ITEM_URL, params);
        
        let items = data.itemList.map(item=>{
            return {
                id: item.id,
                primaryPicUrl: item.primaryPicUrl,
                simpleDesc: item.simpleDesc,
                name: item.name,
                retailPrice: item.retailPrice,
                counterPrice: item.counterPrice,
                itemTagList: item.itemTagList.map(({name})=>name),
            }
        })
        commit('setGroupData', items);

    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}