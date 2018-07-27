<template>
   <transition
     type="transition"
     enter-active-class="animated fadeInDown v-enter-active"
     leave-active-class="animated fadeOutUp v-leave-active"
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
