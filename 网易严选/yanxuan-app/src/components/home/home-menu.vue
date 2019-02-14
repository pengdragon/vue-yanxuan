<template>
<div class="home-menu-wrap">
    <ly-tab v-if="menuList.length>1"
        v-model="selectIndex"
        :items="menuList"
        :options="{activeColor: '#b4282d'}">
    </ly-tab>
    <div class="control">
        <span class="box"></span>
        <van-icon name="arrow-down" :class="{active: isShow}" @click="showAction"/>
    </div>
    <van-popup v-model="isShow"></van-popup>
    <div v-show="isShow" class="wrap border-top">
        <div class="title">全部频道</div>
        <ul class="menu-list">
            <li class="menu-item" v-for="(item, index) in menuList" :key="item.id"
                :class="{active: selectIndex==index}" @click="selectAction(index)">
                <span>{{item.label}}</span>
            </li>
        </ul>
    </div>


</div>
</template>

<script>
import {mapState} from 'vuex'
import LyTab from 'ly-tab'
import { Popup } from 'vant';
export default {
    components: {
        'ly-tab': LyTab.LyTab,
        [Popup.name]: Popup
    },
    data () {
        return {
            isShow: false,
            selectIndex: 0
        }
    },
    computed: {
        ...mapState({
            menuList: state=>state.home.menuList
        })
    },
    watch: {
        // 点击按钮，切换内容页面
        selectIndex(newVal){
            if(newVal == 0){
                this.$router.push('/home/main');
            }
            else{
                let {id, label} = this.menuList[newVal];
                this.$router.push(`/home/menu/${id}/${label}`);
            }
        },
        // 刷新页面时，下标对不齐，取出选中的名字，确定下标
        menuList(){
            if(!this.$route.params.name){
                return;
            }
            // menuList变化，计算选中的下标
            let name = this.$route.params.name;
            this.selectIndex = this.menuList.findIndex((item)=>{
                return item.label == name;
            })
        },
        //保证点击底部tab栏，判断是否路径在/home上，如果是下标就选中第0个
        '$route.path': function(newVal){
            if(newVal == '/home' || newVal == '/home/main'){
                this.selectIndex = 0;
            }
        }
    },
    methods: {
        // 控制遮罩层菜单栏的显示
        showAction(){
            this.isShow = !this.isShow;
        },
        // 切换菜单
        selectAction(index){
            this.selectIndex = index;
            this.showAction();
        }
    },
    created(){
        // 获取数据
        this.$store.dispatch('home/getMenuData'); 
    }
}
</script>

<style lang="scss" scoped>
.home-menu-wrap{
    position: absolute;
    left: 0;
    top: 44px;
    width: 100%;
    .control{
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 100%;
        background: #fff;
        z-index: 3001;
        .van-icon{
            width: 40px;
            line-height: 26px;
            text-align: center;
            color: #999;
            transition: 280ms;
        }
        .van-icon.active{
            transform: rotate(180deg);
        }
        .box{
            width: 20px;
            height: 100%;
            position: absolute;
            left: -20px;
            top: 0;
            background: linear-gradient(to right, rgba(255,255,255, 0.5) 0, rgba(255,255,255,1) 100%);
        }
    }
    .wrap{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3000;
        background: #fff;
        .title{
            height: 26px;
            line-height: 26px;
            padding-left: 10px;
            font-size: 12px;
            color: #333;
        }
        .menu-list{
            overflow: hidden;
            padding: 10px 6px;
            .menu-item{
                width: 25%;
                float: left;
                padding: 6px;
                box-sizing: border-box;
                span{
                    display: block;
                    line-height: 26px;
                    text-align: center;
                    color: #333;
                    font-size: 12px;
                    border: 1px solid #ccc;
                    background-color: #FAFAFA;
                    border-radius: 4px;
                }
                &.active span{
                    color: #b4282d;
                    border: 1px solid #b4282d;
                }
            }
        }
    }
}
</style>

<style>
.home-menu-wrap .ly-tab-list{
    padding: 7px 60px 7px 10px;
}
.van-overlay{
    top: 44px;
}

</style>


