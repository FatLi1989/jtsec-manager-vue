<template>
  <div class="tree-menu">
    <div class="tree-menu-header">
      <form>
        <el-input
          placeholder="输入查询的菜单名称"
          v-model="filterText">
        </el-input>
      </form>
    </div>
    <div class="tree-menu-main">
      <div class="tree-menu-main-button">
        <el-button style="border: #2aabd2 solid 1px" icon="el-icon-plus" round>新增</el-button>
      </div>
      <div class="tree-menu-main-header">
        <dl>
          <dd>菜单名称</dd>
          <dd>序号</dd>
          <dd>请求地址</dd>
          <dd>类型</dd>
          <dd>可见</dd>
          <dd>权限标识</dd>
          <dd>操作</dd>
        </dl>
      </div>
      <div class="tree-menu-main-tree">
        <el-tree
          class="filter-tree"
          :data="menuInfo"
          node-key="id"
          :render-content="renderContent"
          accordion
          :filter-node-method="filterNode"
          ref="tree"
          @node-click="handleNodeClick">
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
              filterText: '',
              defaultProps: {
                children: 'children',
                label: 'name'
              }
            }
        },
      computed: {
        ...mapState(['menuInfo'])
      },
      methods: {
        handleNodeClick (data) {
        },
        filterNode (value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
        },
        renderContent: function (createElement, { node, data, store }) {
           return (createElement('dl', {style: {'display': 'flex'}}, [
             /* 图标菜单名称 */
             createElement('dd', [
               createElement('i', {
                 class: ['iconfont', data.img]
               }),
               createElement('span', [data.name])
             ], {
               style: [{flex: 'auto', display: 'flex', width: '100px', 'text-align': 'center'}]
             }),
             /* 菜单序号 */
             createElement('dd', {
               style: [{flex: 'auto', width: '100px', 'text-align': 'center'}]
             }, [data.orderNum]),
             /* 菜单路径 */
             createElement('dd', {
               style: [{flex: 'auto', width: '100px', 'text-align': 'center'}]
             }, [data.url]),
             /* 菜单类型 */
             createElement('dd', {
               style: [{flex: 'auto', width: '100px', 'text-align': 'center'}]
             }, [data.menuType]),
             /*  菜单是否可见 */
             createElement('dd', {
               style: [{flex: 'auto', width: '100px', 'text-align': 'center'}]
             }, [data.visible]),
             /*  菜单权限 */
             createElement('dd', {
               style: [{flex: 'auto', width: '100px', 'text-align': 'center'}]
             }, [data.perms])
           ]))
        }
      },
      watch: {
        filterText (val) {
          this.$refs.tree.filter(val);
        }
      }
    }
</script>

<style lang="stylus" scoped>
.tree-menu >>> .el-tree-node__content
 height 35px !important
 box-shadow: 0px 0px 1px rgba(0,0,0,.2) !important
.tree-menu
  display flex
  flex-direction column
  width 90%
  margin-left 20px
  .tree-menu-header
   background #fff
   position relative
   margin-top 50px
   border-radius 15px
   box-shadow: 1px 1px 3px rgba(0,0,0,.2)
  .tree-menu-main
   display flex
   flex-direction column
   background #fff
   position relative
   min-height 450px
   overflow-x 0
   overflow-y auto
   margin-top 50px
   border-radius 15px
   box-shadow: 1px 1px 3px rgba(0,0,0,.2)
   .tree-menu-main-button
    position relative
    margin 20px 20px
   .tree-menu-main-header
    dl
     display flex
     dd
       width: 100px
       text-align: center
       margin-top: 10px
       margin-bottom: 10px
       flex: auto
    .tree-menu-main-tree
     position relative
    .tree-menu-main-tree-node
     line-height 30px
</style>
