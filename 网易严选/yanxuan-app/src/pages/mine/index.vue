<template>
<div id="mine" class="page">
    <h1>个人</h1>
</div>
</template>

<script>
import center from '../../tools/center'
export default {
    beforeRouteEnter(to, from, next){
        //路由守卫的方法
        
        // 判断用户是否登录了
        let userToken = localStorage.getItem('userToken');

        if(userToken){
            // 路由守卫通过
            next();
        }else{
            // 去到登录页面
            center.$emit('toggle-login', to.fullPath);
            // 进不了个人页面
            next(false);
        }

    },
    created(){
        console.log('购买页面初始化完成');
    }
}
</script>

<style>

</style>
