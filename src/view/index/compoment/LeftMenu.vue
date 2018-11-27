<template>
  <div>
    <zoom-in-hinge-out>
      <div class="menu" v-if="!leftMenu">
        <child-tree :list="this.menuInfo"></child-tree>
      </div>
    </zoom-in-hinge-out>

    <zoom-in-hinge-out>
      <div class="menu left" v-if="leftMenu">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="true">
          <el-menu-item v-for="item of this.menuInfo" :key="item.id" index="item.id">
            <i class="iconfont item" :class="item.img"  ></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
    </zoom-in-hinge-out>
  </div>
</template>
<script>
  import ChildTree from './tree'
  import ZoomInHingeOut from '../../../common/fade/FadeAnimationleft'
  import FadeAnimation from '../../../common/fade/FadeAnimationRight'
  import {mapState, mapMutations} from 'vuex'

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
    transition: opacity 1s
  .left
    width 50px !important
  .el-menu-vertical-demo >>> .el-menu-item
    background #2f4050
  .el-menu-vertical-demo:not(.el-menu--collapse)
    width: 50px !important
    min-height: 400px
    .item
     width 100%
     height 50px
     line-height 50px
     background transparent
     border-left #2aabd2
     color #fff
     font-size 900
     &:hover
       background rgba(0, 0, 0, 0.5)
  .menu
    display flex
    flex-direction column
    position: fixed
    overflow auto
    z-index 2
    left: 0px
    width: 200px
    height: 100%
    background: #2f4050
    transition: width 1s
</style>
