<template>
<div id="cart" class="page">
    <header class="cart-header border-bottom">购物车</header>

    <scroller class="cart-content">

        <van-swipe-cell  v-for="item in cartList" :key="item.id" :right-width="65">
            <van-cell-group class="cart-item">
                <input type="checkbox" :checked="item.selected" @input="selectItem($event, item)">
                <img :src="item.mainPicUrl"/>
                <div class="item-content">
                    <h3>{{item.name}}</h3>
                    <p>{{item.price}}</p>
                </div>
                <div class="item-handler">
                    <van-stepper disable-input :value="item.count" @input="handleInput($event, item)"/>
                </div>
            </van-cell-group>
            <span slot="right" @click="handleRemove(item)">删除</span>
        </van-swipe-cell>

    </scroller>
    

    <van-submit-bar class="border-top"
        :price="count"
        button-text="下单"
        @submit="onSubmit"
    />
    
</div>
</template>

<script>
import {mapState} from 'vuex'
import { SwipeCell, CellGroup, Cell, Stepper, SubmitBar } from 'vant';
export default {
    components: {
        [SwipeCell.name]: SwipeCell,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        [Stepper.name]: Stepper,
        [SubmitBar.name]: SubmitBar
    },
    computed: {
        ...mapState({
            cartList: state=>state.cart.cartList
        }),
        count(){
            let tmp = 0;
            this.cartList.forEach(item=>{
                if(item.selected){
                    tmp += item.price * item.count;
                }
            })
            //价格单位为：分
            return tmp*100;
        }
    },
    methods: {
        handleInput(count, item){
            if(count == 0){
                return;
            }
            //修改购物车中的商品数据
            this.$store.commit('cart/setCount', {
                item,
                count
            })
        },
        selectItem(ev, item){
            //选中商品的点击事件
            console.log(ev.target.checked);//true  false
            console.log(item.selected);
            this.$store.commit('cart/selectGoods', item);

        },
        handleRemove(item){
            //从购物车中删除商品
            this.$store.commit('cart/removeGoods', item);
        },
        onSubmit(){
            //结算点击事件
        }
    }
}
</script>

<style lang="scss">
#cart .cart-header{
    width: 100%;
    height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 16px;
    font-weight: bold;
    color: #b4282d;
    text-align: center;
    line-height: 44px;
}
#cart .cart-content{
    width: 100%;
    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 0;
    overflow: hidden;
    .cart-item{
        display: flex;
        padding: 10px;
        img{
            width: 80px;
            height: 80px;
        }
        .item-content{
            flex: 1;
        }
        .item-handler{
            flex: 1;
        }
    }
}
#cart .van-submit-bar{
    position: absolute;
}
#cart .van-submit-bar .van-button {
    background: #b4282d;
}
.van-button--danger{
    border: none;
}
#cart .van-submit-bar__price{
    color: #b4282d;
}
</style>

