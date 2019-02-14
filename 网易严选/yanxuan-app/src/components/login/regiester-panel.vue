<template>
<div class="page subpage" id="regiester">
    <div class="close" @click="backAction">
        <van-icon name="cross"/>
    </div>
    <img class="logo" src="/images/logo2.png"/>
    <div class="handle">
        <input type="text" class="border" placeholder="用户名" ref="user"/>
        <input type="password" placeholder="密码" ref="psd"/>
        <input type="password" placeholder="确认密码" ref="rePsd"/>
        <div class="confirm" @click="handleRegAction">注册</div>
        <p class="reg-btn" @click="showLoginAction">
            <span>已有账号，立即登录</span>
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
    methods: {
        ...mapActions(['regiesterAction']),
        // 注册按钮事件
        handleRegAction(){
            let user = this.$refs.user.value;
            let psd = this.$refs.psd.value;
            let rePsd = this.$refs.rePsd.value;
            if(user && psd && rePsd){
                if(psd === rePsd){
                    this.regiesterAction({username: user, password: psd}).then((result)=>{
                        if(result==0){
                            Toast('注册成功');
                            this.$emit('change');
                        }
                    })
                }else{
                    Toast('两次密码不一致');
                }
            }else{
                Toast('输入不能为空');
            }
        },
        // 切换登录
        showLoginAction(){
            this.$emit('change');
        },
        // 返回
        backAction(){
            this.$center.$emit('toggle-login');
        }
    }
}
</script>

<style>

</style>
