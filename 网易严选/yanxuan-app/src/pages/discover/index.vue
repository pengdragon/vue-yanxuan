<template>
<div id="discover" class="page">
    <header class="discover-header border-bottom">发现</header>
    <ul class="tab-list border-bottom">
        <li v-for="(item, index) in tabsData" :key="item.tabId"
            class="tab-item" :class="{active: selectIndex == index}"
            @click="selectTabAction(index)">
            {{item.tabName}}
        </li>
    </ul>




</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            selectIndex: 0
        }
    },
    computed: {
        ...mapState({
            tabsData: state=>state.discover.tabs
        })
    },
    methods: {
        selectTabAction(index){
            if(index == this.selectIndex){
                return;
            }
            // 修改选中的下标
            this.selectIndex = index;
            // 获得id
            let {tabId} = this.tabsData[index];
            if(tabId == 7){
                //请求晒单数据
            }else{
                // 请求数据
                this.$store.dispatch('discover/getDiscoverList', tabId);
            }
            
        }
    },
    created(){
        // 请求头部的tab数据
        this.$store.dispatch('discover/getTabs');

        // 请求推荐列表数据
        this.$store.dispatch('discover/getDiscoverList');
    }
}
</script>

<style lang="scss" scoped>
.discover-header{
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
.tab-list{
    display: flex;
    position: absolute;
    top: 44px;
    left: 0;
    width: 100%;
    height: 30px;
    .tab-item{
        flex: 1;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        color: #333;
        border-bottom: 2px solid transparent;
        &.active{
            color: #b4282d;
            border-bottom: 2px solid #b4282d;
        }
    }
}
</style>

