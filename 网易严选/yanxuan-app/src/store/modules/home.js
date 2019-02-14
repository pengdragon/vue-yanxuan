import { fetchGet } from 'fetch'
import API from 'API'
const state = {
    total: undefined,
    menuList: [{ id: -1, label: '推荐' }],
    bannerList: [],
    policy: [],
    categoryBanner: '',
    categoryList: [],
    topCateList: [],
    mainCateData: []
}

const mutations = {
    setTotal(state, param) {
        state.total = param;
    },
    setMenuList(state, params) {
        state.menuList = [...state.menuList, ...params];
    },
    setBannerList(state, params) {
        state.bannerList = params;
    },
    setPolicy(state, params) {
        state.policy = params;
    },
    setCategoryData(state, params) {
        state.categoryBanner = params.bannerUrl;
        state.categoryList = params.categoryList;
    },
    setTopCateList(state, params) {
        state.topCateList = params;
    },
    setMainCateData(state, params) {
        state.mainCateData = params;
    }
}

const actions = {
    async getGoodsTotal({ commit }) {
        // 请求严选的商品总数
        let { total } = await fetchGet(API.GOODS_TOTAL_URL);
        console.log('xixiiiii')
        commit('setTotal', total);
    },
    async getMenuData({ commit }) {
        // 请求首页菜单栏的数据
        let data = await fetchGet(API.CATE_LIST_URL);
        // 处理数据
        let newData = data.map(({ id, name }) => ({ id, label: name }));
        // 调用mutations进行赋值
        commit('setMenuList', newData);
    },
    // 请求首页的轮播图数据
    async getBannerData({ commit }) {
        let data = await fetchGet(API.HOME_BANNER_LIST_URL);
        let newData = data.map(({ id, picUrl }) => ({ id, picUrl }));
        commit('setBannerList', newData);
    },
    // 请求网易严选的协议数据
    async getpolicyData({ commit }) {
        let data = await fetchGet(API.POLICY_LIST_URL);
        let newData = data.map(({ desc, icon }) => ({ desc, icon }));
        commit('setPolicy', newData);
    },
    //请求首页的分类菜单的列表数据
    async getCategoryList({ commit }, { id }) {
        let data = await fetchGet(API.HOME_CATE_ITEM_LIST_URL, { id });
        // 处理数据
        let bannerUrl = data.currentCategory.bannerUrl;

        let categoryList = data.categoryItemList.map(({ category, itemList }) => {
            let info = {
                title: category.name,
                subTitle: category.frontName
            };
            let items = itemList.map(item => {
                return {
                    id: item.id,
                    primaryPicUrl: item.primaryPicUrl,
                    simpleDesc: item.simpleDesc,
                    name: item.name,
                    retailPrice: item.retailPrice,
                    counterPrice: item.counterPrice,
                    itemTagList: item.itemTagList.map(({ name }) => name),
                }
            })
            return {
                info,
                items
            }
        })

        // 提交数据
        commit('setCategoryData', {
            bannerUrl,
            categoryList
        })
    },
    // 请求首页推荐底部的列表数据
    async getTopCateList({ commit }) {
        let data = await fetchGet(API.HOME_TOP_CATELIST_URL);
        //处理数据
        let newData = data.map((itemData) => {
            let itemList = itemData.itemList.map(({ id, listPicUrl, name, retailPrice, counterPrice, promTag }) => (
                { id, listPicUrl, name, retailPrice, counterPrice, promTag }
            ));
            return {
                titlePicUrl: itemData.titlePicUrl,
                itemList
            }
        })
        commit('setTopCateList', newData);
    },
    // 请求推荐洁面的分类
    async getMainCateData({ commit }) {
        let data = await fetchGet(API.HOME_CATE_LIST_URL);
        let newData = data.kingKongList.map(({ picUrl, text }) => ({ picUrl, text }));
        commit('setMainCateData', newData);
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

