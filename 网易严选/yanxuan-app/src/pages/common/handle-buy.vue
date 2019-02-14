<template>
<div class="page subpage" id="buy">
    立即购买
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
            // 进不了购买页面
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
