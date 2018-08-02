<template>
  <div>
    <div class="login-video">
      <video class="video" autoplay loop>
        <source src="@/resource/video/Ipad.mp4" type="video/webm"/>
      </video>
    </div>
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
      <transition
        appear
        enter-active-class="animated rollIn  v-enter-active"
        leave-active-class="animated rollOut v-leave-active"
        appear-active-class="animated rollIn"
      >
      <!-- 右侧信息 -->
      <div class="col-xs-3 login-content-right">
        <form autocomplete="off">
          <component :is="componentName" @transmit="login"></component>
        </form>
      </div>
      </transition>
    </div>
    <transition
      enter-active-class="animated zoomIn  v-enter-active"
      leave-active-class="animated zoomOut v-leave-active"
    >
      <div class="message" v-if="showMessage">{{message}}</div>
    </transition>
  </div>
</template>

<script>
  import SignIn from './componet/SignIn'
  import SignUp from './componet/SignUp'
  import router from '../../router/router.js'
  import {mapMutations} from 'vuex'

  export default {
    name: 'Login',
    data () {
      return {
        componentName: 'SignIn',
        userInfo: '',
        message: '',
        showMessage: false
      }
    },
    methods: {
      ToRegister: function () {
        this.componentName = 'SignUp'
      },
      ...mapMutations(['loginInfo']),
      login: function (userInfo) {
        this.loginInfo(userInfo)
        this.$ajax.post('login', {
          loginName: userInfo[0],
          password: userInfo[1],
          rememberMe: userInfo[2]
        })
          .then((response) => {
            if (response.data != null && response.data.code === 100) {
              router.push('/index')
            } else {
              this.message = response.data.meg
              this.showMessage = true
            }
          })
      }
    },
    watch: {
      showMessage: function (newMsg, oldMeg) {
        let _this = this
        setTimeout(function () {
          _this.showMessage = false
        }, 3000)
      }
    },
    components: {
      SignIn, SignUp
    }
  }
</script>

<style lang="stylus" scoped>
  .v-enter,.v-leave-to
    opacity: 0
  .v-enter-active,.v-leave-active
    transition: opacity 1s
  .message
    position fixed
    left  45%
    top   38%
    text-align center
    width 120px
    line-height 50px
    color white
    background rgba(0,0,0,0.3)
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
    display flex
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
