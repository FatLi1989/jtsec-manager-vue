<template>
  <div class="index-body">
    <left-menu></left-menu>
    <div class="index-body-content" :class="{leftMenuClass: left, rightMenuClass: right}">
      <router-view></router-view>
    </div>
    <right-menu></right-menu>
  </div>
</template>

<script type="text/ecmascript-6">
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
        right () {
          return this.$store.state.rightMenu
        },
        left () {
          return this.$store.state.leftMenu
        }
      },
      mounted: function () {
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
    background white
    color black
    transition : margin-left 1s, margin-right 1s
</style>
