<template>
  <div>
    <div v-for="item of list" :key="item.id">
      <div class="item" :state="state" @click="click">
        <i class="iconfont" :class="item.img"></i>
        <span v-if="!show">{{item.name}}</span>
        <i v-if="item.children" class="iconfont icon-zuojiantou"></i>
      </div>
      <up-to-down>
        <div v-if="item.children && showM" class="item-child">
          <child-tree :list="item.children " :key="item.id" class="child" />
        </div>
      </up-to-down>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import UpToDown from '../../../common/fade/UpToDown'
   export default {
     name: 'ChildTree',
     components: {UpToDown},
     props: {
          list: Array
        },
        data () {
            return {
              showM: false,
              state: 'close'
            }
        },
        methods: {
          click: function (e) {
            e.target.getAttribute('state') === 'close' ? e.target.setAttribute('state', 'open') : e.target.setAttribute('state', 'close');
            e.target.getAttribute('state') === 'close' ? (this.$data.showM = false) : (this.$data.showM = true)
            console.log(this.$data.showM)
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
  .v-enter,.v-leave-to
    opacity: 0
  .v-enter-active,.v-leave-active
    transition: opacity 1s
  .item
   width 100%
   height 50px
   line-height 50px
   padding-left 15px
   background transparent
   color #fff
   font-size 900
   &:hover
     background #ffffff7a
  .icon-zuojiantou
    float right
    margin-right 8px
 .item-child
   background: #00000030!important
</style>
