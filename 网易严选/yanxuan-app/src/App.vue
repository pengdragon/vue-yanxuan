<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <router-view name="detail"/>

    <tab-bar></tab-bar>

    <!-- 登录界面 -->
    <LoginPage v-if="showLogin" :successPath="loginSuccessPath"/>
  </div>
</template>

<script>
import LoginPage from "@pages/common/login";
export default {
  components: {
    LoginPage
  },
  data() {
    return {
      showLogin: false,
      loginSuccessPath: ""
    };
  },
  created() {
    this.$center.$on("toggle-login", path => {
      this.showLogin = !this.showLogin;
      this.loginSuccessPath = path;
    });
  }
};
</script>

<style>
</style>
