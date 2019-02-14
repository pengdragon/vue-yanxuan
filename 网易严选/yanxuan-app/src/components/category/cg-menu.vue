<template>
<scroller class="category-menu border-right">
    <nav class="menu-wrap">
        <li v-for="(item, index) in cateMenu" :key="item.id"
            class="category-item" :class="{active: index == selectIndex}"
            @click="selectMenuAction(index)">
            <span>{{item.name}}</span>
        </li>
    </nav>
</scroller>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            selectIndex: state=>state.category.selectMenuIndex,
            cateMenu: state=>state.category.cateMenu
        })
    },
    methods: {
        selectMenuAction(index){
            // 修改选中的样式
            // 修改id
            this.$store.commit('category/setMenuIndex', index);
        }
    },
    created(){
        this.$store.dispatch('category/getCateMenuData');
    }
}
</script>

<style lang="scss" scoped>
.category-item{
    padding: 10px 0;
    span{
        display: block;
        font-size: 14px;
        color: #333;
        text-align: center;
        line-height: 44px;
        border-left: 3px solid transparent;
    }
    &.active span{
        border-left: 3px solid #ab2b2b;
        color: #ab2b2b;
    }
}
</style>
