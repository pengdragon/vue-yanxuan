<template>
<scroller class="category-menu-list" ref="scroll">

    <img class="banner" :src="cateMenuList.bannerUrl"/>

    <div class="group" v-for="group in cateMenuList.categoryGroupList" :key="group.id">
        
        <h3 v-if="group.name" class="group-title border-bottom">{{group.name}}</h3>
        <ul class="group-list">
            <li v-for="item in group.categoryList" :key="item.id"
                class="group-item" @click="goCategoryGroup(item)">
                <img :src="item.bannerUrl"/>
                <p>{{item.name}}</p>
            </li>
        </ul>
        
    </div>

</scroller>
</template>

<script>
import {mapState, mapGetters} from 'vuex' 
export default {
    computed: {
        ...mapState({
            cateMenuList: state=>state.category.cateMenuList
        }),
        ...mapGetters({
            menuId: 'category/selectMenuId'
        })
    },
    watch: {
        menuId(){
            // 请求数据
            this.$store.dispatch('category/getCateMenuList', this.menuId);
            // 滚动视图滚动到最顶部
            this.$refs.scroll.scrollTo(0, 0);
        }
    },
    methods: {
        //进入列表下一页
        goCategoryGroup(item){
            console.log(item);
            this.$router.push(`/category/group/${item.id}`);
        }
    },
    created(){
        this.$store.dispatch('category/getCateMenuList');
    }
}
</script>

<style lang="scss" scoped>
.category-menu-list{
    padding: 10px;
    box-sizing: border-box;
    .banner{
        width: 100%;
    }
    .group{
        .group-title{
            font-size: 14px;
            font-weight: bold;
            padding: 8px 0;
        }
        .group-list{
            overflow: hidden;
            padding: 10px 0;
            .group-item{
                width: 33.33%;
                float: left;
                img{
                    width: 90%;
                    margin: 0 auto;
                    display: block;
                }
                p{
                    padding: 0 5px;
                    text-align: center;
                    font-size: 12px;
                    color: #333;
                    line-height: 16px;
                    height: 32px;
                    overflow: hidden;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                }
            }
        }
    }
}
</style>


