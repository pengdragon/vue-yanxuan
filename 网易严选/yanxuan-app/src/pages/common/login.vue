<template>
<transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
    <div class="login-wrap page subpage">

        <transition-group enter-active-class="flipInY">

            <login-panel :path="successPath" key="1" v-if="flag=='login'" @change="show('login')"/>
            
            <regiester-panel key="2" v-if="flag=='regiester'" @change="show('reg')"/>
        
        </transition-group>

    </div>
</transition>
</template>

<script>
// 登录组件
import LoginPanel from '@components/login/login-panel'
// 注册
import RegiesterPanel from '@components/login/regiester-panel'
export default {
    props: ['successPath'],
    components: {
        'login-panel': LoginPanel,
        'regiester-panel': RegiesterPanel
    },
    data(){
        return {
            flag: 'login'
        }
    },
    methods: {
        show(flag){
            if(flag === 'login'){
                this.flag = 'regiester';
            }else if(flag === 'reg'){
                this.flag = 'login';
            }
        }
    }
}
</script>

<style lang="scss">
.login-wrap{
    .flipInY, .flipOutY{
        animation-duration: 1s;
    }
    .close{
        position: absolute;
        top: 20px;
        right: 20px;
        .van-icon{
            font-size: 25px;
            padding: 8px;
            border-radius: 50%;
            color: #fff;
            background: rgba(0,0,0,0.3);
        }
    }
    .logo{
        width: 40%;
        margin: 35% auto;
    }
    .handle{
        position: absolute;
        width: 70%;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        input{
            display: block;
            border: none;
            border-radius: 0;
            outline: none;
            border: 1px solid #666;
            width: 100%;
            height: 30px;
            box-sizing: border-box;
            line-height: 30px;
            font-size: 14px;
            margin: 10px auto;
        }
        .confirm{
            width: 100%;
            height: 40px;
            background: #B4282D;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
        }
        .reg-btn{
            padding: 15px 0;
            text-align: center;
            font-size: 14px;
            color: #333;
            .van-icon{
                top: 2px;
            }
        }
    }
    .info{
        position: absolute;
        width: 100%;
        text-align: center;
        left: 0;
        bottom: 50px;
        font-size: 12px;
        color: #999;
    }
}
</style>

