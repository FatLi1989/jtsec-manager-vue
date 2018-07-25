<template>
  <transition
    type="transition"
    enter-active-class="animated fadeInRight v-enter-active"
    leave-active-class="animated fadeOutRight v-leave-active">
    <slot></slot>
  </transition>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'FadeAnimation',
        data () {
            return {
            }
        }
    }
</script>
<style lang="stylus" scoped>

</style>
