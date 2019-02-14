<template>
<nav class="tab-bar border-top">
    <template v-for="tabItem in tabList">
        <router-link :key="tabItem.path" class="tab-item" 
            :to="tabItem.path">
            <span class="icon"></span>
            <span class="text">{{tabItem.name}}</span>
        </router-link>
    </template>
</nav>
</template>

<script>
export default {
    data(){
        return {
            tabList: [
                {name: '首页', path: '/home'},
                {name: '分类', path: '/category'},
                // {name: '识物', path: '/discover'},
                {name: '购物车', path: '/cart'},
                {name: '个人', path: '/mine'}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-bar{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    display: flex;
    .tab-item{
        flex: 1;
        padding-top: 4px;
        span{
            display: block;
            &.icon{
                width: 26px;
                height: 26px;
                margin: 0 auto;
                background-image: url(../../asset/tabs.png);
                background-repeat: no-repeat;
                background-size: 100%;
            }
            &.text{
                padding-top: 2px;
                font-size: 12px;
                color: #333;
                text-align: center;
            }
        }
        &.router-link-active .text{
            color: #E43929;
        }
    }
}

.tab-item:nth-of-type(1){
    .icon{
        background-position: 0 -155px;
    }
}
.tab-item:nth-of-type(1).router-link-active{
    .icon{
        background-position: 0 -124px;
    }
}
.tab-item:nth-of-type(2){
    .icon{
        background-position: 0 -93px;
    }
}
.tab-item:nth-of-type(2).router-link-active{
    .icon{
        background-position: 0 -62px;
    }
}
.tab-item:nth-of-type(3){
    .icon{
        background-position: 0 -217px;
    }
}
.tab-item:nth-of-type(3).router-link-active{
    .icon{
        background-position: 0 -186px;
    }
}
.tab-item:nth-of-type(4){
    .icon{
        background-position: 0 -31px;
    }
}
.tab-item:nth-of-type(4).router-link-active{
    .icon{
        background-position: 0 0;
    }
}
.tab-item:nth-of-type(5){
    .icon{
        background-position: 0 -279px;
    }
}
.tab-item:nth-of-type(5).router-link-active{
    .icon{
        background-position: 0 -248px;
    }
}
</style>


