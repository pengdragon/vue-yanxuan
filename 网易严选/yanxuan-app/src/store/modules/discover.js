import {fetchGet} from 'fetch'
import API from 'API'

const state = {
    tabs: []
};

const mutations = {
    setTabs(state, params){
        state.tabs = params;
    }
}

const actions = {
    async getTabs({commit}){
        let data = await fetchGet(API.TOPIC_FIND_TABS_URL);
        let newData = data.map(({tabId, tabName})=>({tabId, tabName}));
        commit('setTabs', newData);
    },
    async getDiscoverList({commit}, tabId){
        let data = await fetchGet(API.TOPIC_FIND_TAB_DATA_URL, {tabId});
        console.log(data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}