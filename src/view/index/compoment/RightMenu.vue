<template>
  <div class="menu" v-show="show">
    {{show}}
  </div>
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
 .menu
  position: fixed
  width: 200px
  height: 100%
  right: 0px
  background: black
</style>
