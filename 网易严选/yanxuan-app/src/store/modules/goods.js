import {fetchGet} from 'fetch'
import API from 'API'

const state = {
    id: '',
    bannerUrls: [],
    goodsDetail: '',
    goodsInfo: {}
};

const mutations = {
    setId(state, param){
        state.id = param;
    },
    setBannerUrls(state, params){
        state.bannerUrls = params;
    },
    setGoodInfo(state, params){
        state.goodsInfo = params;
    },
    setGoodDetail(state, params){
        state.goodsDetail = params;
    }
}

const actions = {
    async getGoodsDetail({commit}, id){
        let data = await fetchGet(API.ITEM_DETAIL_URL, {id});
        // 处理商品轮播图
        let bannerUrls = [data.primaryPicUrl, 
                            data.itemDetail.picUrl1,
                            data.itemDetail.picUrl2,
                            data.itemDetail.picUrl3,
                            data.itemDetail.picUrl4];
        bannerUrls = bannerUrls.filter(item=>item);
        commit('setBannerUrls', bannerUrls);
        // 商品主要信息
        let info = {
            characteristicList: data.characteristicList,
            retailPrice: data.retailPrice,
            counterPrice: data.counterPrice,
            itemTagList: data.itemTagList.map(({name})=>({name})),
            name: data.name,
            simpleDesc: data.simpleDesc,
            commentCount: data.commentCount>999?'999+':data.commentCount
        }
        commit('setGoodInfo', info);
        // 详情
        commit('setGoodDetail', data.itemDetail.detailHtml);

    },
    removeGoodsData({commit}){
        commit('setBannerUrls', []);
        commit('setGoodInfo', '');
        commit('setGoodDetail', {});
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}