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
  import IndexBody from './compoment/section.vue'
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'index',
    components: {
      IndexFooter, IndexHeader, IndexBody
    },
    computed: {
      ...mapState(['userInfo', 'menuInfo'])
    },
    methods: {
      ...mapMutations(['setMenuInfo'])
    },
    created: function () {
        this.$ajax.post('index', {
          loginName: this.userInfo[0],
          password: this.userInfo[1]
        }).then((res) => {
          if (res.data != null && res.data.code === 100) {
            this.setMenuInfo(res.data.data.menuVo)
          }
        })
    }
  }
</script>
<style lang="stylus" scoped>
  .index
    display flex
    height 100vh
</style>
