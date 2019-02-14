<template>
<div>
    <div class="page subpage" id="detail">
        <app-header :title="goodsInfo.name"/>
        <scroller class="goods-content">
            <div v-if="bannerUrls.length>0" class="banner">
                <!-- 轮播图 -->
                <van-swipe :autoplay="3000" :show-indicators="false"
                    @change="pageChange">
                    <van-swipe-item v-for="(bannerImg, index) in bannerUrls" :key="index">
                        <img :src="bannerImg"/>
                    </van-swipe-item>
                </van-swipe>
                <!-- 页码 -->
                <span class="indicator">{{swipeIndex}}/{{bannerUrls.length}}</span>
            </div>
            <ul class="characteristic">
                <li class="characteristic-item" v-for="(item, i) in goodsInfo.characteristicList"
                    :key="i">
                    <img :src="item.picUrl"/>
                    <p>
                        <span v-for="(value, j) in item.simpleDescList" :key="j">
                            {{value}}
                        </span>
                    </p>
                </li>
            </ul>
            <!-- 商品基础信息 -->
            <p class="price">
                <span>¥{{goodsInfo.retailPrice}}</span>
                <span>¥{{goodsInfo.counterPrice}}.00</span>
            </p>
            <div class="tip">
                <span v-for="(item, index) in goodsInfo.itemTagList" :key="index">
                    {{item.name}}<van-icon name="arrow"/>
                </span>
            </div>
            <div class="main">
                <div class="title">
                    <h3>{{goodsInfo.name}}</h3>
                    <h6>{{goodsInfo.simpleDesc}}</h6>
                </div>
                <div class="comment-icon">
                    <p>{{goodsInfo.commentCount}}</p>
                    <p>用户评价</p>
                    <van-icon name="arrow"/>
                </div>
            </div>

            <!-- 用户操作列表 -->
            <div class="handle">
                <van-cell title="请选择规格数量" is-link />
                <van-cell title="限制：特价商品不可与优惠券叠加使用" />
                <van-cell title="配送：请选择配送地址" is-link />
                <van-cell :title="'积分：购买最高得'+Math.floor(goodsInfo.retailPrice/10)+'积分'" is-link />
            </div>

            <!-- 商品详情 -->
            <div class="detail" v-if="goodsDetail" v-html="goodsDetail"></div>

        </scroller>
        <div class="tool-bar border-top">
            <div class="contact border-right">
                <van-icon name="service-o"/>
            </div>
            <div class="buy border-right" @click="buyAction">
                立即购买
            </div>
            <div class="add-cart" @click="addCartAction">
                加入购物车
            </div>
        </div>
    </div>
    <router-view/>
</div>
</template>

<script>
import {mapState} from 'vuex'
import { Swipe, SwipeItem, Toast, Cell } from 'vant';

export default {
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Cell.name]: Cell
    },
    props: ['id'],  
    data(){
        return {
            swipeIndex: 1
        }
    },
    computed: {
        ...mapState({
            bannerUrls: state=>state.goods.bannerUrls,
            goodsInfo: state=>state.goods.goodsInfo,
            goodsDetail: state=>state.goods.goodsDetail
        })
    },
    methods: {
        pageChange(index){
            //显示页码
            this.swipeIndex = index+1;
        },
        buyAction(){
            //立即购买按钮的点击事件
            // 判断用户是否登录
            // 没有登录就跳转到登录页面
            // 登陆了，就显示立即购买页面
            // 路由守卫实现
            this.$router.push('/itemdetail/'+this.id+'/buy');
        },
        addCartAction(){
            //将商品信息放在购物车中
            this.$store.commit('cart/addGoods', {
                id: this.id,
                name: this.goodsInfo.name,
                price: this.goodsInfo.retailPrice,
                mainPicUrl: this.bannerUrls[0]
            });
            Toast('添加成功');
        }
    },
    created(){
        // 保存商品id
        this.$store.commit('goods/setId', this.id);
        //请求商品详情数据
        this.$store.dispatch('goods/getGoodsDetail', this.id);
    },
    beforeDestroy(){
        //清除数据
        this.$store.dispatch('goods/removeGoodsData');
    }
    
}
</script>

<style lang="scss" scoped>
.goods-content{
    width: 100%;
    position: absolute;
    top: 44px;
    left: 0;
    bottom: 50px;
    overflow: hidden;
    .van-swipe img{
        width: 100%;
    }
    .banner{
        position: relative;
        .indicator{
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 4px;
            background: #fff;
            border-radius: 3px;
            color: #333;
            transform: scale(0.6);
        }
    }
    .characteristic{
        background: #F9F9F9;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        .characteristic-item{
            flex: 1;
            img{
                height: 30px;
                float: left;
                border-radius: 50%;
            }
            p{
                padding-left: 35px;
                font-size: 12px;
                span{
                    display: block;
                    color: #333;
                    line-height: 15px;
                }
            }

        }
    }
    .price{
        padding: 10px;
        :nth-of-type(1){
            font-size: 20px;
            font-weight: bold;
            color: #b4282d;
        }
        :nth-of-type(2){
            padding-left: 5px;
            font-size: 14px;
            color: #999;
            text-decoration: line-through;
        }
    }
    .tip {
        overflow: hidden;
        padding: 0 10px;
        span{
            float: left;
            font-size: 12px;
            padding: 2px 4px;
            border: 1px solid #b4282d;
            color: #b4282d;
            border-radius: 4px;
        }
    }
    .main{
        padding: 15px 10px;
        display: flex;
        border-bottom: 8px solid #efefef;
        .title{
            flex: 1;
            h3{
                font-size: 14px;
                font-weight: bold;
                color: #333;
            }
            h6{
                padding-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
        .comment-icon{
            border-left: 1px dashed #999;
            width: 80px;
            position: relative;
            p{
                text-align: center;
            }
            p:nth-of-type(1){
                font-size: 14px;
                font-weight: bold;
                color: #b4282d;
            }
            p:nth-of-type(2){
                padding-top: 5px;
                font-size: 12px;
                color: #999;
            }
            .van-icon{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                color: #666;
            }
        }
    }
    .handle{
        border-bottom: 8px solid #efefef;
    }
    

}
.tool-bar{
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    div{
        text-align: center;
        line-height: 50px;
        font-size: 14px;
    }
    .contact{
        width: 50px;
        .van-icon{
            line-height: 50px;
            font-size: 25px;
        }
    }
    .buy{
        flex: 1;
        color: #333;
    }
    .add-cart{
        flex: 1;
        background: #b4282d;
        color: #fff;
    }
}
</style>
<style lang="scss">
#detail{
    .goods-content .detail img{
        display: block;
        width: 100%;
    }
    .handle .van-cell__title{
        fontsize: 14px;
        color: #666;
    }
}
</style>


