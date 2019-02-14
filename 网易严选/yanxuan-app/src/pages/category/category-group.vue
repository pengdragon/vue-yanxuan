<template>
<div class="page subpage" id="group">
    <app-header :title="name"/>

    <ly-tab
        v-model="selectIndex"
        :items="menu"
        :options="{activeColor: '#b4282d'}">
    </ly-tab>

    <scroller class="group-content" ref="scroll">
        <item-list :list="groupData"/>
    </scroller>
    
</div>
</template>

<script>
import LyTab from 'ly-tab'
import {mapGetters, mapState} from 'vuex'
export default {
    props: ['id'],
    components: {
        'ly-tab': LyTab.LyTab
    },
    data(){
        return {
            selectIndex: 0
        }
    },
    computed: {
        ...mapState({
            cateMenuList: state=>state.category.cateMenuList,
            groupData: state=>state.category.groupData
        }),
        ...mapGetters({
            categoryId: 'category/selectMenuId',
            name: 'category/selectMenuTitle'
        }),
        // 根据vuex仓库中的cateMenuList计算头部tab的数据
        menu(){
            let {categoryGroupList} = this.cateMenuList;
            if(!categoryGroupList){
                return [];
            }
            let newData = [];
            categoryGroupList.forEach(({categoryList})=>{
                let arr = categoryList.map(({name, id})=>({label: name, id}));
                newData = [...newData, ...arr];
            })
            return newData;
        }
    },
    watch: {
        selectIndex(newVal){
            let newid = this.menu[newVal].id;
            //tab切换，重新请求列表数据
            this.$store.dispatch('category/getCateGroupItems', {
                categoryId: this.categoryId,
                subCategoryId: newid
            })
            // 视图滚动到最顶部
            this.$refs.scroll.scrollTo(0, 0);
        }
    },
    created(){
        //请求列表数据
        this.$store.dispatch('category/getCateGroupItems', {
            categoryId: this.categoryId,
            subCategoryId: this.id
        })

        // 计算那个tab选中
        this.selectIndex = this.menu.findIndex(({id})=>{
            return id == this.id
        })
    }
}
</script>

<style lang="scss" scoped>
.group-content{
    width: 100%;
    top: 70px;
    bottom: 0;
    left: 0;
    position: absolute;
    overflow: hidden;
}
</style>


<style>
#group .ly-tab-list{
    padding: 7px 10px 7px 10px;
}
</style>
