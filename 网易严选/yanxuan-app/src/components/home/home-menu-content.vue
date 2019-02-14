<template>
<scroller class="menu">
    <div class="banner">
        <img :src="categoryBanner"/>
    </div>

    <div class="category-list" v-for="categoryContent in categoryList" 
        :key="categoryContent.info.title">
        <h3>{{categoryContent.info.title}}</h3>
        <h6>{{categoryContent.info.subTitle}}</h6>
        <item-list :list="categoryContent.items"/>
    </div>  
   

</scroller>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props: ['id', 'name'],
    computed: {
        ...mapState({
            categoryBanner: state=>state.home.categoryBanner,
            categoryList: state=>state.home.categoryList
        })
    },
    watch: {
        id: {
            //每一次id变化，重新请求分类列表数据
            handler(newVal){
                newVal && this.$store.dispatch('home/getCategoryList', {id: newVal});
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss" scoped>
.menu{
    .banner img{
        width: 100%;
        display: block;
    }
    .category-list{
        border-top: 8px solid #fdfdfd;
        h3{
            text-align: center;
            color: #333;
            font-size: 16px;
            line-height: 28px;
        }
        h6{
            text-align: center;
            color: #999;
            font-size: 12px;
        }
    }
}
</style>

