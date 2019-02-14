<template>
<div class="top-cate-view">
    <img :src="data.titlePicUrl"/>
    <div class="list-wrap" ref="wrap">
        <ul ref="scroll">
            <li v-for="item in data.itemList" :key="item.id"
                class="list-item"  @click="goDetail(item)"> 
                <img :src="item.listPicUrl"/>
                <h3 class="title">{{item.name}}</h3>
                <p class="price">
                    <span>¥{{item.retailPrice}}</span>
                    <span v-if="item.retailPrice !== item.counterPrice">¥{{item.counterPrice}}</span>
                </p>
                <p class="tip" v-if="item.promTag">
                    <span>{{item.promTag}}</span>
                </p>
            </li>
            <li class="show-more">
                <span>查看更多</span>
                <van-icon name="arrow"/>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'top-cate-view',
    props: ['data'],
    methods: {
        goDetail(item){
            this.$router.push(`/itemdetail/${item.id}`);
        }
    },
    mounted(){
        let width = 90 * (this.data.itemList.length+1);
        this.$refs.scroll.style.width = `${width}px`;
        let scroll = new BScroll(this.$refs.wrap, {
            scrollY: false,
            scrollX: true,
            click: true,
            tap: true
        });
    }
}
</script>

<style lang="scss" scoped>
.top-cate-view{
    padding-bottom: 5px;
    border-bottom: 10px solid #f4f4f4;
    img{
        width: 100%;
        display: block;
    }
    .list-wrap{
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        overflow: hidden;
        ul{
            overflow: hidden;
            width: 1000px;
        }
        .list-item{
            width: 80px;
            float: left;
            padding: 0 5px;
            img{
                background-color: #f4f4f4;
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
                    line-height: 12px;
                    padding: 1px 4px;
                    border: 1px solid #b4282d;
                    color: #b4282d;
                    border-radius: 4px;
                }
            }
        }
        .show-more{
            width: 80px;
            height: 80px;
            margin: 0 5px;
            background: #f4f4f4;
            text-align: center;
            line-height: 80px;
            font-size: 14px;
            color: #666;
            float: left;
        }
    }
}
</style>
