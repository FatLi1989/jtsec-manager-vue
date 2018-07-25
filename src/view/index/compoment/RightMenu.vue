<template>
  <transition>
    <div class="menu" v-show="show">
     <h1>right menu</h1>
    </div>
  </transition>
</template>

<script>
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
      }
    }
</script>

<style lang="stylus" scoped>
 .v-enter, .v-leave-to
  opacity: 0
 .v-enter-active, .v-leave-active
  transition: opacity  2s
 .menu
  position: fixed
  width: 200px
  height: 100%
  right: 0px
  color white
  background: rgba(0, 0, 0, 0.71)
</style>
