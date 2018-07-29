<template>
  <div>
    <div v-for="item of list" :key="item.id"  @click="click($event)">
      <div class="item" v-if="item.children">
          <i class="iconfont" :class="item.img"></i>
          <span v-if="!show">{{item.name}}</span>
          <i v-if="item.children" class="iconfont icon-zuojiantou"></i>
      </div>
      <div class="item" v-if="!item.children" >
        <i class="iconfont" :class="item.img"></i>
        <span v-if="!show">{{item.name}}</span>
        <i v-if="item.children" class="iconfont icon-zuojiantou"></i>
      </div>
      <up-to-down>
          <child-tree :list="item.children" v-show="false" v-if="isShow" :id ="item.id" class="child" />
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
            }
        },
        methods: {
          click: function (e) {
            if (e.target.nextElementSibling.style.display === null || e.target.nextElementSibling.style.display === 'none') {
              e.target.nextElementSibling.style.display = 'block'
            } else {
              e.target.nextElementSibling.style.display = 'none'
            }
          }
        },
        computed: {
          show () {
            return this.$store.state.leftMenu
          },
          isShow () {
            let show = false;
            if (this.list.children === null && this.list.children.length) {
              show = false
            } else {
              show = true
            }
            return show
          }
        }
    }
</script>

<style lang="stylus" scoped>
  .v-enter,.v-leave-to
    opacity: 0
  .v-enter-active,.v-leave-active
    transition: opacity 3s
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
 .child
   background: #00000030!important
</style>
