<template>
  <transition
    type="transition"
    enter-active-class="animated flipInX v-enter-active"
    leave-active-class="animated flipOutX v-leave-active"
  >
    <slot></slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'flipX',
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
