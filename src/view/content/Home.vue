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
           return (createElement('dl', {class: ['menu-dl']}, [
             /* 图标 */
             createElement('i', {class: ['iconfont menu-i', data.img]}),
             /* 菜单名称 */
             createElement('dd', {class: ['menu-dd'], style: {'margin-left': '5px !important', width: 'auto'}}, [data.name]),
             /* 菜单序号 */
             createElement('dd', {class: ['menu-dd'], style: {'margin-left': '60px'}}, [data.orderNum]),
             /* 菜单路径 */
             createElement('dd', {class: ['menu-dd'], style: {'margin-left': '55px'}}, [data.url]),
             /* 菜单类型   data.menuType */
             createElement('dd', {style: {'margin-left': '90px', 'margin-top': '25px'}}, [
               createElement('el-row', [
                 createElement('el-button',
                   {attrs: {'type': 'primary', 'round': 'round', 'size': 'mini'}}, [
                     data.menuType === 'M' ? '目录' : '', data.menuType === 'C' ? '菜单' : '', data.menuType === 'F' ? '按钮' : ''
                   ])
               ])
             ]),
             /*  菜单是否可见 */
             createElement('dd', {style: {'margin-left': '90px', 'margin-top': '25px'}}, [
               createElement('el-row', [
                 createElement('el-button',
                   {attrs: {'type': 'success', 'round': 'round', 'size': 'mini'}}, [
                      data.visible === 0 ? '显示' : '隐藏'
                 ])
             ])
             ]),
             /*  菜单权限 */
             createElement('dd', {class: ['menu-dd'], style: {'margin-left': '55px', width: '50px'}}, [data.perms]),
             /*  菜单操作 */
             createElement('dd', {style: {'margin-left': '90px', 'margin-top': '25px'}}, [
               createElement('div', {style: {'width': '100px'}}, [
                 createElement('el-row', [
                   createElement('el-button', {attrs: {'type': 'primary', 'icon': 'el-icon-edit', 'circle': 'circle', 'size': 'mini'}, style: {'margin-left': '10px'}}, [
                   ]),
                   createElement('el-button', {attrs: {'type': 'warning', 'icon': 'el-icon-plus', 'circle': 'circle', 'size': 'mini'}, style: {'margin-left': '5px'}}, [
                   ]),
                   createElement('el-button', {attrs: {'type': 'danger', 'icon': 'el-icon-delete', 'circle': 'circle', 'size': 'mini'}, style: {'margin-left': '5px'}}, [
                   ])
                 ])
               ])
             ])
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
 padding-left 0px !important
 box-shadow: 0px 0px 1px rgba(0,0,0,.2) !important
.tree-menu >>> .filter-tree
 position relative !important
.tree-menu >>> .menu-dl
  display flex
.tree-menu >>> .menu-i
  margin-top: 30px
.tree-menu >>> .menu-dd
  text-align: center
  margin-top: 30px
  width 100px
  margin-bottom: 10px
  flex: auto
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
       width: 150px
       text-align: center
       margin-top: 10px
       margin-bottom: 10px
    .tree-menu-main-tree-node
     line-height 30px
</style>
