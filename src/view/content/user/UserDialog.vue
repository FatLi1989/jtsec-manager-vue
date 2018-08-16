<template>
  <dia-log>
    <el-form ref="form" :model="MenuVo" label-width="80px" size="mini" slot="outer">
      <el-form-item v-show="false" prop="parentId">
        <input v-model="MenuVo.parentId">
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
  </dia-log>
</template>

<script type="text/ecmascript-6">
  import DiaLog from '../../../common/dialog/Dialog'
    export default {
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
              iconS: false,
              show: true
            }
        },
      components: {
        DiaLog
      }
    }
</script>

<style lang="stylus" scoped>
  .footer
    position relative
    margin-top 50px
    bottom  0px
    right 0px
    text-align right
</style>
