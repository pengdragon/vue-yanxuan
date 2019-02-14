import {fetchGet} from 'fetch'
import API from 'API'

const state = {
    // 项目调用购物车数据之前，需要对cartList进行初始化
    // 登录了：从后台购物车的初始数据
    // 没有登录：从本地取得购物车的初始数据
    cartList: JSON.parse(localStorage.getItem('cartData') || '[]')
};

// 判断用户是否登录
// 没有登录，之后每一次的购物车数据操作完，都要将购物车数据进行本地持久化
// 登录了，之后每一次的购物车数据操作完，都要将购物车数据提交给后台
const mutations = {
    // 添加商品
    addGoods(state, params){
        //判断该商品是否存在
        let index = state.cartList.findIndex(item=>{
            return item.id == params.id
        });
        if(index >= 0){
            //存在
            state.cartList[index].count += 1;
        }else{
            //不存在
            params.count = 1;
            params.selected = true;
            state.cartList.push(params);
        }

        localStorage.setItem('cartData', JSON.stringify(state.cartList));
    },
    // 移除商品
    removeGoods(state, params){
        state.cartList = state.cartList.filter(item=>{
            return item.id != params.id;
        })

        localStorage.setItem('cartData', JSON.stringify(state.cartList));
    },
    // 选中或取消选中商品
    selectGoods(state, params){
        let index = state.cartList.findIndex(item=>{
            return item.id == params.id;
        })
        if(index >= 0){
            state.cartList[index].selected = !params.selected;
        }

        localStorage.setItem('cartData', JSON.stringify(state.cartList));

    },
    // 设置商品数据
    setCount(state, params){
        let index = state.cartList.findIndex(item=>{
            return item.id == params.item.id
        });
        if(index >= 0){
            state.cartList[index].count = params.count;
        }

        localStorage.setItem('cartData', JSON.stringify(state.cartList));
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}