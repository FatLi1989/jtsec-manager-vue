<template>
  <div>
    <zoom-in-hinge-out>
      <div class="menu" v-if="!leftMenu">
        <child-tree :list="this.menuInfo"></child-tree>
      </div>
    </zoom-in-hinge-out>

    <zoom-in-hinge-out>
      <div class="menu left" v-if="leftMenu">
        <i class="iconfont item" :class="item.img" v-for="item of list" :key="item.id"></i>
      </div>
    </zoom-in-hinge-out>
  </div>
</template>
<script>
  import ChildTree from './tree'
  import ZoomInHingeOut from '../../../common/fade/FadeAnimationleft'
  import FadeAnimation from '../../../common/fade/FadeAnimationRight'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'LeftMenu',
    data () {
      return {
        options: {
          propertyNames: {
            'text': 'name',
            'deletion': true
          }
        }
      }
    },
    methods: {
      focus: () => alert(1),
      ...mapMutations(['setMenuInfo'])
    },
    computed: {
      ...mapState(['leftMenu', 'menuInfo'])
    },
    components: {
      ChildTree, ZoomInHingeOut, FadeAnimation
    }
  }
</script>

<style lang="stylus" scoped>
  .v-enter, .v-leave-to
    opacity: 0
  .v-enter-active, .v-leave-active
    transition: opacity 0.1s
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
    &:hover
     background rgba(0,0,0,0.5)
</style>
