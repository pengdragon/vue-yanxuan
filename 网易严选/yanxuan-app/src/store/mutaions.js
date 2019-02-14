export default {
    setUserInfo(state, params){
        state.username = params.username;
        state.headerImg = params.headerImg;
    }
}