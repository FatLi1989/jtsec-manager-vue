<template>
  <div>
    <index-footer></index-footer>
    <index-body></index-body>
    <index-header></index-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import IndexFooter from './compoment/Footer'
  import IndexHeader from './compoment/Header'
  import IndexBody from './compoment/Body.vue'

  export default {
    name: 'index',
    components: {
      IndexFooter, IndexHeader, IndexBody
    }
  }
</script>

<style scoped>

</style>
