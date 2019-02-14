<template>
<div class="page subpage" id="login">
    <div class="close" @click="backAction">
        <van-icon name="cross"/>
    </div>
    <img class="logo" src="/images/logo2.png"/>
    <div class="handle">
        <input type="text" class="border" placeholder="用户名" ref="user"/>
        <input type="password" placeholder="密码" ref="psd"/>
        <div class="confirm" @click="handleLoginAction">登录</div>
        <p class="reg-btn" @click="showRegAction">
            <span>立即注册</span>
            <van-icon name="arrow"/>
        </p>
    </div>
    <p class="info">以严谨的态度，为中国消费者甄选天下优品</p>
</div>  
</template>

<script>
import { Toast } from 'vant'
import {mapActions} from 'vuex'
export default {
    props: ['path'],
    methods: {
        ...mapActions(['loginAction']),
        handleLoginAction(){
            // 登录事件
            // 获得输入的内容
            let params = {
                username: this.$refs.user.value,
                password: this.$refs.psd.value
            }
            if(params.username && params.password){
                //登录
                this.loginAction(params).then(result=>{
                    if(result == 0){
                        //登录成功
                        //显示之前没有进得去的页面
                        console.log('显示对应登录成功后的页面');
                        this.$router.push(this.path);
                        this.backAction();
                    }else{
                        //登录失败
                    }
                })
            }
            else{
                Toast('输入不能为空');
            }

        },
        backAction(){
            this.$center.$emit('toggle-login');
        },
        showRegAction(){
            this.$emit('change');
        }
    }
}
</script>

<style>

</style>



