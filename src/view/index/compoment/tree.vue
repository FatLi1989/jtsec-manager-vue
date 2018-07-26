<template>
  <div>
    <div v-for="item of list" :key="item.id">
      <div class="item">
        <i class="iconfont">&#xe64d;</i>
        <span v-if="!show">{{item.name}}</span>
      </div>
      <div v-if="item.children" class="item-child">
        <child-tree :list="item.children" :key="item.id" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'ChildTree',
        props: {
          list: Array
        },
        data () {
            return {
              showM: false
            }
        },
        methods: {
          showMenu: () => {
            this.showM = !this.showM
            alert(this.showM)
          }
        },
        computed: {
          show () {
            return this.$store.state.leftMenu
          }
        }
    }
</script>

<style lang="stylus" scoped>
  .item
   width 100%
   height 50px
   line-height 50px
   padding-left 15px
   background transparent
   color #fff
   font-size 900
 .item-child
   padding-left 15px
</style>
