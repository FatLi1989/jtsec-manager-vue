<template>
  <!-- 登录框 -->
  <div>
    <div class="input-group login-user">
      <i class="iconfont form-control-feedback">&#xe64d;</i>
      <input type="text" class="form-control input " placeholder="用户名" aria-describedby="basic-addon1"
             v-model="username">
    </div>
    <div class="input-group login-password">
      <i class="iconfont form-control-feedback">&#xe612;</i>
      <input type="password" class="form-control input" placeholder="密码" aria-describedby="basic-addon2"
             v-model="password">
    </div>
    <div class="input-group login-remember">
      <input class="i-checks" type="checkbox" name="rememberme" v-model="rememberMe"/>&nbsp;&nbsp;记住我
      <button type="button" class=" btn bg-primary" style="margin-top: 10px; width: 220px" @click="login()">登陆
      </button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        username: '',
        password: '',
        rememberMe: false
      }
    },
    methods: {
      login: function () {
        this.$emit('transmit', [this.username, this.password, this.rememberMe])
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .login-user
    margin-top 5px
    .form-control-feedback
      left 0.1px
    .input
      background :rgba(0,0,0,0)
      text-align center
      color black
      width 220px
      border-radius 10px
  .login-password
    margin-top: 20px
    .form-control-feedback
      left 0.1px
    .input
      background :rgba(0,0,0,0)
      text-align center
      color black
      width 220px
      border-radius 10px
  .login-remember
    margin-top 10px
</style>
