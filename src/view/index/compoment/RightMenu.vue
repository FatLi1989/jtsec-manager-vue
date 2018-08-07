<template>
  <fade-animation>
    <div class="menu" v-show="show">
       <h1>right menu</h1>
    </div>
  </fade-animation>
</template>

<script>
   import FadeAnimation from '../../../common/fade/FadeAnimationRight'
   import { mapState } from 'vuex'
    export default {
        name: 'RightMenu',
        data () {
          return {
          }
        },
      computed: {
        ...mapState({show: 'rightMenu'})
      },
      components: {
        FadeAnimation
      }
    }
</script>

<style lang="stylus" scoped>
 .v-enter, .v-leave-to
  opacity: 0
 .v-enter-active, .v-leave-active
  transition: opacity  1s
 .menu
  position: fixed
  width: 200px
  height: 100%
  right: 0px
  color black
  background: #fff
  z-inde 1
</style>
