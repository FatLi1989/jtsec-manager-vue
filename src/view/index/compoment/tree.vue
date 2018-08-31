<template>
  <div>
    <div v-for="item of list" :key="item.id">
      <div class="item" v-if="(item.children.length === 0 ? false : true)" @click="click(item)">
        <i class="iconfont" :class="item.img"></i>
        <span v-if="!leftMenu">{{item.name}}</span>
        <i v-if="(item.expanded === false ? true : false)" class="iconfont icon-zuojiantou"></i>
        <i v-else-if="(item.expanded === false ? false : true)" class="iconfont icon-f11-copy1-copy"></i>
      </div>
      <div class="item item-link" v-if="(item.children.length === 0 ? true : false)">
        <router-link :to="item.url" class="link">
          <i class="iconfont" :class="item.img"></i>
          <span v-if="!leftMenu">{{item.name}}</span>
        </router-link>
      </div>
      <up-to-down>
        <child-tree :list="item.children" v-show="item.expanded" v-if="(item.children.length === 0 ? false : true)"
                    class="child"/>
      </up-to-down>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import UpToDown from '../../../common/fade/UpToDown'
  import { mapState } from 'vuex'
   export default {
     name: 'ChildTree',
     components: {UpToDown},
     props: {
          list: Array
        },
        data () {
            return {
              menu: Array
            }
        },
        methods: {
          click: function (item) {
            item.expanded = !item.expanded
          }
        },
        computed: {
          ...mapState(['leftMenu'])
        }
    }
</script>
<style lang="stylus" scoped>
  .v-enter,.v-leave-to
    opacity: 0
  .v-enter-active,.v-leave-active
    transition: opacity 0.4s
  .item
   width 100%
   height 50px
   line-height 50px
   padding-left 15px
   background transparent
   color #fff
   font-size 900
   span
     margin-left 10px
   &:hover
     background #ffffff7a
  .link
    text-decoration none
    color white
  .icon-zuojiantou, .icon-f11-copy1-copy
    float right
    margin-right 8px
 .child
   background: rgba(0,0,0,0.5)!important
</style>
