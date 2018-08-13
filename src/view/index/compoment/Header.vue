<template>
  <div class="header">
    <div class="header-left">
      <img class="header-left-logo" src="../../../resource/img/head-logo.png"/>
    </div>
    <div class="header-button">
      <a class="iconfont" @click="leftMenuClickHandler">&#xe606;</a>
    </div>
    <div class="header-right">
      <div class="header-right-notice">
        <a href="#" class="iconfont">&#xe7a1;</a>
      </div>
      <div class="header-right-info">
        <img class="header-img" src="../../../resource/img/header-Img.jpg"/>
        <el-dropdown class="user">
          <a href="#" >
            {{user}}
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a href="#" style="text-decoration:none" @click="loginOut"><i class="iconfont icon-dengluyemianyonghuming"></i>  退出</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="header-right-menu">
        <a href="#" @click="rightMenuClickHandler" class="iconfont">&#xe606;</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import { mapMutations } from 'vuex'
    import router from '../../../router/router.js'
    export default {
        name: 'IndexHeader',
        data () {
            return {
              user: 'admin',
              leftMenu: true,
              rightMenu: false
            }
        },
        methods: {
          ...mapMutations(['leftMenuState', 'rightMenuState']),
          leftMenuClickHandler: function () {
            this.leftMenu = !this.leftMenu;
            this.leftMenuState(this.leftMenu)
          },
          rightMenuClickHandler: function () {
            this.rightMenu = !this.rightMenu;
            this.rightMenuState(this.rightMenu)
          },
          loginOut: function () {
            this.$ajax.get('loginOut').then((res) => {
              if (res.data.code === 100) {
                router.push('/login')
              }
            })
          }
        }
    }
</script>

<style lang="stylus" scoped>
  .header >>> a
    text-decoration : none
  .header >>> .iconfont
   font-size: 30px
  .header
      display: flex
      position: fixed
      margin: 0;
      padding 0
      top :0
      width : 100%
      height : 5
      background: #2f4050
      z-index : 1
    .header-left
       width: 200px
      .header-left-logo
        width : 200px
        height :50px
    .header-button
        bottom: 10px
        margin-left: 10px
        margin-top : 5px
    .header-right
      margin-left: auto
      margin-right :-30px
      display : flex
      width: 200px
      .header-right-notice
       margin-top :5px
      .header-right-info
        margin-left :5px
        margin-top :6px
        display : flex
        .header-img
          width : 35px
          height : 35px
          border-radius : 35px
        .user
          margin-left : 3px
          margin-top: 8px
      .header-right-menu
        margin-left : 10px
        margin-top : 5px
</style>
