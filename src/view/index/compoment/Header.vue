<template>
  <div class="header">
      <div class="header-left">
        <img class="header-left-logo" src="../../../resource/img/head-logo.png"/>
      </div>
      <div class="header-button">
        <a class="iconfont" @click="menuClickHandler">&#xe606;</a>
      </div>
      <div class="header-right">
        <div class="header-right-notice">
          <a href="#" class="iconfont">&#xe7a1;</a>
          <span>${{count}}</span>
        </div>
        <div class="header-right-info">
          <img class="header-img" src="../../../resource/img/header-Img.jpg"/>
          <a class="user">{{user}}</a>
        </div>
        <div class="header-right-menu">
          <a href="#" @click="infoClickHandler" class="iconfont">&#xe606;</a>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'IndexHeader',
        data () {
            return {
              user: 'admin'
            }
        },
        methods: {
          menuClickHandler: () => alert(this.$store.state.count),
          infoClickHandler: () => alert(1)
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
      width : 100%
      height : 5
      background: #000000bd
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
