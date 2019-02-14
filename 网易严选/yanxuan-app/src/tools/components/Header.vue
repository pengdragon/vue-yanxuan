<template>
    <header class="sub-header border-bottom">
        <van-icon name="arrow-left" @click="backAction"/>
        <h1 class="title">{{title}}</h1>
    </header>
</template>

<script>
export default {
    name: 'app-header',
    props: {
        title: String
    },
    methods: {
        backAction(){
            this.$router.back();
        }
    }
}
</script>

<style lang="scss" scoped>
.sub-header{
    width: 100%;
    height: 44px;
    .title{
        width: 70%;
        height: 100%;
        text-align: center;
        line-height: 44px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin: 0 auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .van-icon{
        position: absolute;
        top: 0;
        left: 0;
        padding: 14px;
    }
}
</style>

