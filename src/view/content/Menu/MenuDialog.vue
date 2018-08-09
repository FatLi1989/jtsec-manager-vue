<template>
  <dia-log>
    <el-form ref="form" :model="MenuVo" label-width="80px" size="mini" slot="outer">
      <el-form-item label="上级菜单:">
        <input class="input" v-model="nodeName" readonly="readonly" placeholder="主目录" @click="mainMenu"/>
      </el-form-item>
      <el-form-item v-show="false" prop="parentId">
        <input  v-model="MenuVo.parentId">
      </el-form-item>
      <el-form-item label="菜单类型:" prop="menuType">
        <el-radio-group v-model="MenuVo.menuType">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称:" prop="name">
        <el-input v-model="MenuVo.name"></el-input>
      </el-form-item>
      <el-form-item label="请求地址:" prop="url">
        <el-input v-model="MenuVo.url"></el-input>
      </el-form-item>
      <el-form-item label="权限标识:" prop="perms">
        <el-input v-model="MenuVo.perms"></el-input>
      </el-form-item>
      <el-form-item label="显示排序:" prop="orderNum">
        <el-input v-model="MenuVo.orderNum"></el-input>
      </el-form-item>
      <el-form-item label="图标:" prop="img">
        <input v-model="MenuVo.img" class="input" readonly="readonly" placeholder="选择图标" @click="showIcon"/>
        <icon v-if="iconS" @transmit="iconStyle"></icon>
      </el-form-item>
      <el-form-item label="菜单状态:" prop="visible">
        <el-radio v-model="MenuVo.visible" :label="0">显示</el-radio>
        <el-radio v-model="MenuVo.visible" :label="1">隐藏</el-radio>
      </el-form-item>
      <div class="footer">
        <el-button type="warning" size="small" round @click="submit">提交</el-button>
        <el-button type="danger" size="small" round @click="closeOuter">关闭</el-button>
      </div>
    </el-form>
    <tree :tree="this.allMenus" slot="inner"></tree>
  </dia-log>
</template>
<script type="text/ecmascript-6">
  import DiaLog from '../../../common/dialog/Dialog'
  import Icon from '../../../common/icon/Icon'
  import Tree from '../../../common/tree/Tree'
  import { mapMutations, mapState } from 'vuex'

  export default {
    props: ['node'],
    data () {
      return {
        MenuVo: {
          id: '',
          name: '',
          url: '',
          img: '',
          parentId: '',
          orderNum: '',
          menuType: '',
          visible: '',
          perms: ''
        },
        iconS: false
      }
    },
    components: {DiaLog, Tree, Icon},
    methods: {
      ...mapMutations(['showInnerMenu', 'transmitNode', 'showOuterMenu']),
      mainMenu: function () {
        this.showInnerMenu(!this.innerMenu);
      },
      closeOuter: function () {
        this.showOuterMenu(!this.outerMenu)
      },
      submit: function () {
        this.$ajax.post('/menu/editMenu', this.MenuVo).then((res) => {
          if (res.data.code === 100) {
            this.showOuterMenu(!this.outerMenu);
            location.reload();
          }
        })
      },
      showIcon: function () {
        this.iconS = !this.iconS
      },
      iconStyle: function (style) {
        this.MenuVo.img = style;
        this.iconS = !this.iconS
      }
    },
    destroyed: function () {
    },
    computed: {
      ...mapState(['innerMenu', 'allMenus', 'treeNode', 'outerMenu']),
      nodeName () {
        return this.treeNode === '' ? '' : this.treeNode.name
      },
      pId () {
        return (this.treeNode === '' || undefined) ? 0 : this.treeNode.id
      }
    },
    watch: {
      pId: function (val, oldVal) {
        this.MenuVo.parentId = val
      }
    },
    created: function () {
      this.transmitNode('')
      if (this.node != null) {
        this.MenuVo.id = this.node.id;
        this.MenuVo.name = this.node.name;
        this.MenuVo.url = this.node.url;
        this.MenuVo.img = this.node.img;
        this.MenuVo.perms = this.node.perms;
        if (this.node.menuType === 'M') {
          this.MenuVo.menuType = 1
        }
        if (this.node.menuType === 'C') {
          this.MenuVo.menuType = 2
        }
        if (this.node.menuType === 'F') {
          this.MenuVo.menuType = 3
        }
        this.MenuVo.visible = this.node.visible;
        this.MenuVo.orderNum = this.node.orderNum;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .input
    border #2aabd2 solid 1px
    border-radius 10px
    text-align center
    font-family "Albertus MT"
    width 300px
    background #FFFFFF
  .footer
    position relative
    margin-top 50px
    bottom  0px
    right 0px
    text-align right
</style>
