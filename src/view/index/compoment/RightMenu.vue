<template>
  <fade-animation>
    <div class="menu" v-show="show">
       <h1>right menu</h1>
    </div>
  </fade-animation>
</template>

<script>
   import FadeAnimation from '../../../common/fade/FadeAnimationRight'
    export default {
        name: 'RightMenu',
        data () {
          return {
          }
        },
      computed: {
          show () {
            return this.$store.state.rightMenu
          }
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
  color white
  background: rgba(0, 0, 0, 0.71)
  z-inde 1
</style>
