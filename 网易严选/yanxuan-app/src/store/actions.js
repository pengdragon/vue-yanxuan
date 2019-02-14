import {fetchPost} from 'fetch'
import API from 'API'

export default {
    async loginAction({commit}, params){
        let data = await fetchPost(API.LOGIN_URL, params);

        // 保存用户登录状态token
        localStorage.setItem('userToken', data.token);
        // 将用户信息保存在store中
        commit('setUserInfo', data);
        return 0; 
    },
    async regiesterAction({commit}, params){
        let data = await fetchPost(API.REGIESTER_URL, params);
        return 0;
    }   

}