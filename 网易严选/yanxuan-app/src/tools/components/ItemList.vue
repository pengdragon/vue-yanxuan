<template>
<ul class="item-list">
    <li v-for="item in list" :key="item.id"
        class="item" @click="goDetail(item)">
        <!-- <img :src="item.primaryPicUrl"/> -->
        <div class="img-info">
            <img v-lazy="item.primaryPicUrl" >
            <p>{{item.simpleDesc}}</p>
        </div>
        <h3 class="title">{{item.name}}</h3>
        <p class="price">
            <span>¥{{item.retailPrice}}</span>
            <span v-if="item.retailPrice!==item.counterPrice">¥{{item.counterPrice}}</span>
        </p>
        <p class="tip">
            <span v-for="tip in item.itemTagList" :key="tip">
                {{tip}}
            </span>
        </p>
    </li>
</ul>
</template>

<script>
export default {
    name: 'item-list',
    props: {
        list: Array
    },
    methods: {
        goDetail(item){
            this.$router.push(`/itemdetail/${item.id}`);
        }
    }
}
</script>

<style lang="scss" scoped>
.item-list{
    overflow: hidden;
    .item{
        width: 50%;
        float: left;
        padding-top: 10px;
        box-sizing: border-box;
        &:nth-of-type(odd){
            padding-left: 10px;
            padding-right: 5px;
        }
        &:nth-of-type(even){
            padding-left: 5px;
            padding-right: 10px;
        }
        .img-info{
            border-radius: 4px;
            overflow: hidden;
            background-color: #f4f4f4;
            img{
                width: 100%; 
                display: block;
            }
            p{
                color: #9F8A60;
                background: #F1ECE2;
                font-size: 12px;
                line-height: 16px;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis; 
                padding: 0 4px;
            }
        }
        .title{
            font-size: 14px;
            color: #333;
            line-height: 24px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis; 
        }
        .price{
            line-height: 26px;
            overflow: hidden;
            span:nth-of-type(1){
                font-size: 14px;
                color: #b4282d;
                float: left;
            }
            span:nth-of-type(2){
                font-size: 12px;
                color: #b4282d;
                text-decoration: line-through;
                color: #999;
                padding-left: 4px;
                float: left;
            }
        }
        .tip{
            height: 20px;
            span{
                font-size: 12px;
                padding: 2px 4px;
                border: 1px solid #b4282d;
                color: #b4282d;
                border-radius: 4px;
            }
        }
    }
}
</style>

