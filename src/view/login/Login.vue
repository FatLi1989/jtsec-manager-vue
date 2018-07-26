<template>
  <div>
    <div class="login-video">
      <video class="video" autoplay loop>
        <source src="@/resource/video/Ipad.mp4" type="video/webm"/>
      </video>
    </div>
    <transition
      appear
      enter-active-class="v-enter-active"
      appear-active-class="animated rollIn"
    >
    <div class="row login-content ">
      <!-- 左侧信息 -->
      <div class="col-xs-3 login-content-left">
        <h4><img src="../../resource/img/Logo.png"/><strong style="color: red;font-size: 30px">&nbsp;&nbsp;国保金泰</strong></h4>
        <ul class="m-b">
          <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> Author : NovLi</li>
          <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> Author : YunYang</li>
          <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> Author : DaLao</li>
          <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> Author : WuHan</li>
        </ul>
        <strong>还没有账号？ <a href="#" @click="ToRegister()">立即注册&raquo;</a></strong>
      </div>
      <!-- 右侧信息 -->
      <div class="col-xs-3 login-content-right">
        <form autocomplete="off">
          <component :is="componentName" @transmit="login"></component>
        </form>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
  import SignIn from './componet/SignIn'
  import SignUp from './componet/SignUp'
  import axios from 'axios'
  import Qs from 'qs'
  import router from '../../router/router.js'
  export default {
    name: 'Login',
    data () {
      return {
        componentName: 'SignIn',
        userInfo: ''
      }
    },
    methods: {
      ToRegister: function () {
        this.componentName = 'SignUp'
      },
      login: (userInfo) => {
        axios.post('http://localhost:9527/jtsec/login', Qs.stringify({
          username: userInfo[0],
          password: userInfo[1],
          rememberMe: userInfo[2]
        }))
          .then((response) => {
            if (response.data != null) {
              router.push('/index')
            }
          })
      }
    },
    components: {
      SignIn, SignUp
    }
  }
</script>

<style lang="stylus" scoped>
  .login-video
    height: auto;
    width: auto;
    position: fixed;
    min-width: 100%;
    min-height: 100%;
    right: 0px;
    bottom: 0px;
    background-size: cover;
    filter: blur(4px);
    .video
      width : 100%
  .login-content
    position: absolute;
    margin-top: 200px;
    color: rgba(255, 255, 255, .95);
    background-size: cover;
    font-family: "open sans", "Lantinghei SC", Helvetica, Arial, sans-serif;
    font-size: 16px;
    .login-content-left
      background-size: cover;
      color: rgba(255, 255, 255, .95);
      margin-left : 250px
      width: 400px
    .login-content-right
      margin-left: 150px;
      padding: 30px;
      background-color: rgba(255, 255, 255, 0);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 30px;
</style>
