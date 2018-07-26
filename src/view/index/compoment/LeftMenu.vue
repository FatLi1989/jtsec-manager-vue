<template>
  <div>
    <zoom-in-hinge-out>
      <div class="menu" v-if="!show">
        <child-tree :list="list"></child-tree>
      </div>
    </zoom-in-hinge-out>

    <zoom-in-hinge-out>
      <div class="menu left" v-if="show">
        <i class="iconfont item" v-for="item of list" :key="item.id">&#xe64d;</i>
      </div>
    </zoom-in-hinge-out>
  </div>
</template>
<script>
  import ChildTree from './tree'
  import ZoomInHingeOut from '../../../common/fade/FadeAnimationleft'
  import FadeAnimation from '../../../common/fade/FadeAnimationRight'

  export default {
    name: 'LeftMenu',
    data () {
      return {
        list: [{
          id: 901,
          name: 'XJBHX-2标项目部',
          children: [{
            id: 902,
            name: '综合部(办公室)'
          }, {
            id: 903,
            name: '工程部(工技部/技术部)'
          }]
        },
          {
            id: 904,
            name: '安质部',
            children: [{
              id: 907,
              name: '中心试验室'
            }]
          }, {
            id: 908,
            name: '菜单3'
          },
          {
            id: 909,
            name: '菜单4'
          }
        ],
        options: {
          propertyNames: {
            'text': 'name',
            'deletion': true
          }
        }
      }
    },
    methods: {
      focus: () => alert(1)
    },
    computed: {
      show () {
        return this.$store.state.leftMenu
      }
    },
    components: {
      ChildTree, ZoomInHingeOut, FadeAnimation
    }
  }
</script>

<style lang="stylus" scoped>
  .v-enter, v-leave-to
    opacity: 0
  .v-enter-active, v-leave-active
    transition: opacity 0.5s
  .left
    width 50px !important
  .menu
    display flex
    flex-direction column
    position: fixed
    overflow auto
    z-index 2
    left: 0px
    width: 200px
    height: 100%
    background: rgba(0, 0, 0, 0.71)
    transition : width 1s
   .item
    width 100%
    height 50px
    line-height 50px
    padding-left 15px
    background transparent
    color #fff
    font-size 900
</style>
