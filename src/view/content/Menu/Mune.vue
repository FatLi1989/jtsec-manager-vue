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
        <el-button style="border: #2aabd2 solid 1px" icon="el-icon-plus" round @click="addMenu">新增</el-button>
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
        :data="this.Menus"
        node-key="id"
        :render-content="renderContent"
        :expand-on-click-node="false"
        accordion
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree>
    </div>
    <div class="dialog" v-if="this.outerMenu">
      <menu-dialog :node="tNode"></menu-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import MenuDialog from './MenuDialog'

  export default {
    data () {
      return {
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        showMenu: false,
        tNode: {}
      }
    },
    computed: {
      ...mapState(['allMenus', 'outerMenu']),
      Menus: function () {
        return this.allMenus
      }
    },
    methods: {
      ...mapMutations(['showOuterMenu', 'AllMenus']),
      addMenu () {
        this.tNode = null;
        this.showOuterMenu(!this.outerMenu)
      },
      filterNode (value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      renderContent: function (createElement, {node, data, store}) {
        return (createElement('dl', {class: ['menu-dl']}, [
          /* 图标 */
          createElement('i', {class: ['iconfont menu-i', data.img]}),
          /* 菜单名称 */
          createElement('dd', {
            class: ['menu-dd'],
            style: {'margin-left': '5px !important', width: '55px', textAlign: 'left'}
          }, [data.name]),
          /* 菜单序号 */
          createElement('dd', {class: ['menu-dd'], style: {'margin-left': '60px'}}, [data.orderNum]),
          /* 菜单路径 */
          createElement('dd', {class: ['menu-dd'], style: {'margin-left': '55px'}}, [data.url]),
          /* 菜单类型   data.menuType */
          createElement('dd', {style: {'margin-left': '75px', 'margin-top': '25px', width: '50px'}}, [
            createElement('el-row', [
              data.menuType === 'M' ? (createElement('el-button',
                {attrs: {'type': 'primary', 'round': 'round', 'size': 'mini'}}, ['目录'])) : data.menuType === 'C' ? (createElement('el-button',
                {attrs: {'type': 'warning', 'round': 'round', 'size': 'mini'}}, ['菜单'])) : data.menuType === 'F' ? (createElement('el-button',
                {attrs: {'type': 'danger', 'round': 'round', 'size': 'mini'}}, ['按钮'])) : ''
            ])
          ]),
          /*  菜单是否可见 */
          createElement('dd', {style: {'margin-left': '100px', 'margin-top': '25px', width: '50px'}}, [
            createElement('el-row', [
              createElement('el-button',
                {attrs: {'type': 'success', 'round': 'round', 'size': 'mini'}}, [
                  data.visible === 0 ? '显示' : '隐藏'
                ])
            ])
          ]),
          /*  菜单权限 */
          createElement('dd', {class: ['menu-dd'], style: {'margin-left': '80px', width: '50px'}}, [data.perms]),
          /*  菜单操作 */
          createElement('dd', {style: {'margin-left': '120px', 'margin-top': '25px'}}, [
            createElement('div', {style: {'width': '100px'}}, [
              createElement('el-row', [
                createElement('el-button', {
                  attrs: {
                    'type': 'primary',
                    'icon': 'el-icon-edit',
                    'circle': 'circle',
                    'size': 'mini'
                  },
                  style: {'margin-left': '10px'},
                  on: {click: this.edit}
                }, []),
                createElement('el-button', {
                  attrs: {
                    'type': 'danger',
                    'icon': 'el-icon-delete',
                    'circle': 'circle',
                    'size': 'mini'
                  },
                  style: {'margin-left': '5px'},
                  on: {click: this.del}
                }, [])
              ])
            ])
          ])
        ]))
      },
      del: function () {
        let node = this.$refs.tree.getCurrentNode();
        if (node === null) {
          this.$message({
            type: 'warning',
            message: '没有选中菜单啊'
          });
          return;
        }
        if (node.children.length !== 0) {
          this.$message({
            type: 'warning',
            message: '不能删,先删子菜单去吧'
          });
          return;
        }
        this.$confirm('此操作将永久删除' + node.name + '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.get('/menu/del/' + node.id).then((res) => {
            if (res.data.code === 100) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              location.reload()
            } else {
              this.$message({
                type: 'success',
                message: res.data.msg
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      edit: function () {
        let node = this.$refs.tree.getCurrentNode();
        if (node === null) {
          this.$message({
            type: 'warning',
            message: '没有选中菜单啊'
          });
          return;
        }
        this.tNode = node;
        this.showOuterMenu(!this.outerMenu)
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val);
      }
    },
    components: {MenuDialog},
    created: function () {
      this.$ajax.get('/menu/select/all').then((res) => {
        if (res.data != null && res.data.code === 100) {
          this.AllMenus(res.data.data)
        }
      })
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
  width 20px
.tree-menu >>> .menu-dd
  text-align: center
  margin-top: 30px
  width 100px
  margin-bottom: 10px
  flex: auto
.tree-menu
  display flex
  flex-direction column
  width 97%
  margin-left 20px
  .dialog
   box-shadow: 0px 0px 1px rgba(0,0,0,3)
   border-radius 15px
  .tree-menu-header
   background #fff
   position relative
   margin-top 20px
   border-radius 15px
   box-shadow: 1px 1px 3px rgba(0,0,0,.2)
  .tree-menu-main
   display flex
   flex-direction column
   background #fff
   position relative
   height 79vh
   overflow-x 0
   overflow-y auto
   margin-top 20px
   border-radius 15px
   box-shadow: 1px 1px 3px rgba(0,0,0,.2)
   &::-webkit-scrollbar
    width: 5px
    height: 10px
   &::-webkit-scrollbar-track
    margin-top 5px
    margin-bottom 5px
    box-shadow: 1px 1px 5px rgba(0,0,0,.2) inset
    border-radius: 10px;
    background: rgba(0,0,0,0.1);
   &::-webkit-scrollbar-thumb
    border-radius 10px
    height: 5px
    background-clip: border-box
    box-shadow: 0 0 0 5px rgba(0,0,0,.2) inset
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
