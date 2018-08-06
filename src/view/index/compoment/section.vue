<template>
  <div class="index-body">
    <left-menu></left-menu>
    <div class="index-body-content" :class="{leftMenuClass: leftMenu, rightMenuClass: rightMenu}">
      <router-view></router-view>
    </div>
    <right-menu></right-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  import LeftMenu from './LeftMenu'
  import RightMenu from './RightMenu'
    export default {
      data () {
        return {
        }
      },
      components: {
        LeftMenu, RightMenu
      },
      computed: {
        ...mapState(['leftMenu', 'rightMenu'])
      }
    }
</script>

<style lang="stylus" scoped>
.rightMenuClass
 margin-right 200px
.leftMenuClass
 margin-left 50px !important
.index-body
  display flex
  flex :1
  margin-top 50px
  .index-body-content
    flex 1
    margin-left 200px
    background whitesmoke
    color black
    transition : margin-left 1s, margin-right 1s
</style>
