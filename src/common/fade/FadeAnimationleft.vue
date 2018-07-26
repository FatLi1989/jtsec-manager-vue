<template>
    <transition
      type="transition"
      enter-active-class="animated rollIn v-enter-active"
      leave-active-class="animated rollOut v-leave-active">
        <slot></slot>
    </transition>
</template>
<script>
    export default {
        name: 'ZoomInHingeOut'
    }
</script>

<style scoped>

</style>
