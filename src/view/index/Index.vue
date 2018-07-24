<template>
  <div class="index">
    <index-header></index-header>
    <index-body></index-body>
    <index-footer></index-footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import IndexFooter from './compoment/Footer'
  import IndexHeader from './compoment/Header'
  import IndexBody from './compoment/Body.vue'
  import store from '../../store'

  export default {
    name: 'index',
    store,
    components: {
      IndexFooter, IndexHeader, IndexBody
    }
  }
</script>
<style lang="stylus" scoped>
.index
  display: flex
  overflow-scrolling auto
  flex-direction: column
  min-height: 100vh
  background: rebeccapurple
</style>
