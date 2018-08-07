<template>
  <transition
    type="transition"
    enter-active-class="animated zoomIn v-enter-active"
    leave-active-class="animated zoomOut v-leave-active"
  >
    <slot></slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'upToDown',
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
