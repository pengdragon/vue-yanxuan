<template>
<scroller class="main">
    <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
            <img :src="item.picUrl"/>
        </van-swipe-item>
    </van-swipe>

    <ul class="policy-list">
        <li class="policy-item" v-for="item in policy" :key="item.desc">
            <img :src="item.icon"/>
            <span>{{item.desc}}</span>
        </li>
    </ul>

    <ul class="cate-list">
        <li v-for="item in mainCateData" :key="item.text"
            class="cate-item"  @click="goCateListPage(item.text)">
            <img :src="item.picUrl"/>
            <p>{{item.text}}</p>
        </li>
    </ul>


    <template v-for="cateData in topCateList">
        <top-cate-view :key="cateData.titlePicUrl" :data="cateData"/>
    </template>


</scroller>
</template>

<script>
import {mapState} from 'vuex'
import { Swipe, SwipeItem } from 'vant';
import TopCateView from './home-top-cate-view'

export default {
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [TopCateView.name]: TopCateView
    },
    computed: {
        ...mapState({
            bannerList: state=>state.home.bannerList,
            policy: state=>state.home.policy,
            topCateList: state=>state.home.topCateList,
            mainCateData: state=>state.home.mainCateData,
            menuList: state=>state.home.menuList
        })
    },
    methods: {
        goCateListPage(text){
            // 获得需要进入列表页面的id,和名字
            let {id, label} = this.menuList.find(item=>{
                return item.label == text;
            })
            this.$router.push(`/home/categorylist/${id}/${label}`);
        }
    },
    created(){
        // 请求推荐界面的数据
        // 轮播图
        this.$store.dispatch('home/getBannerData');
        // 网易严选的协议
        this.$store.dispatch('home/getpolicyData');
        // 请求推荐界面的列表数据
        this.$store.dispatch('home/getMainCateData');

        // 请求推荐底部的列表数据
        this.$store.dispatch('home/getTopCateList');
    }
}
</script>

<style lang="scss" scoped>
.main{
    .policy-list{
        padding: 6px 2px;
        display: flex;
        background: #fff;
        .policy-item{
            flex: 1;
            overflow: hidden;
            img{
                width: 14px;
                height: 14px;
                float: left;
            }
            span{
                font-size: 12px;
                color: #b4282d;
                line-height: 14px;
                float: left;
            }
        }
    }
    .cate-list{
        overflow: hidden;
        padding: 5px;
        background: #fff;
        .cate-item{
            width: 20%;
            padding: 5px;
            box-sizing: border-box;
            float: left;
            img{
                width: 100%;
            }
            p{
                font-size: 12px;
                text-align: center;
                counter-reset: #333;
                line-height: 24px;
            }
        }
    }
}
</style>

<style>
.van-swipe-item img{
    width: 100%;
    display: block;
}
.van-swipe__indicator{
    width: 16px;
    height: 3px;
    border-radius: 0;
}
</style>
