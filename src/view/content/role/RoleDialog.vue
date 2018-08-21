<template>
  <dia-log>
    <el-form ref="form" :model="RoleVo" label-width="80px" size="mini" slot="outer">
      <el-form-item v-show="false">
        <label>
          <input v-model="RoleVo.roleId">
        </label>
      </el-form-item>
      <el-form-item label="角色名称:" prop="menuType">
        <el-input v-model="RoleVo.roleName"></el-input>
      </el-form-item>
      <el-form-item label="权限字符:" prop="name">
        <el-input v-model="RoleVo.roleKey"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序:" prop="url">
        <el-input v-model="RoleVo.roleSort"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-switch
          v-model="RoleVo.status"
          active-text="正常"
          active-value="0"
          active-color="#409EFF"
          inactive-value="1"
          inactive-text="禁用">
        </el-switch>
      </el-form-item>
      <el-form-item label="备注:" prop="visible">
        <el-input v-model="RoleVo.remark"></el-input>
      </el-form-item>
      <el-form-item label="菜单权限:" prop="visible">
        <check-box-tree :tree="menus" :default="defaultChecked" class="tree" @transmit="transmitTree"></check-box-tree>
      </el-form-item>
      <div class="footer">
        <el-button type="warning" size="small" round @click="submit">提交</el-button>
        <el-button type="danger" size="small" round @click="closeOuter">关闭</el-button>
      </div>
    </el-form>
  </dia-log>
</template>

<script type="text/ecmascript-6">
  import { mapMutations, mapState } from 'vuex'
  import DiaLog from '../../../common/dialog/Dialog'
  import CheckBoxTree from '../../../common/tree/CheckBoxTree.vue'
  export default {
    props: ['showDialog', 'roleInfo'],
    data () {
      return {
        RoleVo: {
          roleId: '',
          status: '',
          roleKey: '',
          remark: '',
          roleName: '',
          roleSort: '',
          menuIdList: []
        },
        show: false,
        menus: [],
        defaultChecked: []
      }
    },
    components: {
      DiaLog, CheckBoxTree
    },
    methods: {
      ...mapMutations(['showOuterMenu', 'reloadData']),
      closeOuter: function () {
        this.showOuterMenu(!this.outerMenu)
      },
      submit: function () {
          if (this.RoleVo.menuIdList.length === 0) {
            this.$notify({
              title: '提示',
              message: '选菜单,点按钮',
              type: 'warning'
            });
            return;
          }
          this.$ajax.post('/role/eidt', this.RoleVo).then((res) => {
          if (res.data.code === 100) {
            this.showOuterMenu(!this.outerMenu);
            this.reloadData(true);
            this.$notify({
              title: '提示',
              message: res.data.meg,
              type: 'success'
            });
          }
        })
      },
      transmitTree: function (val) {
        this.RoleVo.menuIdList.length = 0;
        this.RoleVo.menuIdList = val;
      }
    },
    computed: {
      ...mapState(['outerMenu'])
    },
    created: function () {
      this.$ajax.get('/menu/select/all').then((res) => {
        if (res.data != null && res.data.code === 100) {
          this.menus = res.data.data;
          this.reloadData(false)
        }
      });
      if (this.roleInfo != null) {
        this.RoleVo.roleId = this.roleInfo.roleId;
        this.RoleVo.status = this.roleInfo.status;
        this.RoleVo.roleKey = this.roleInfo.roleKey;
        this.RoleVo.remark = this.roleInfo.remark;
        this.RoleVo.roleName = this.roleInfo.roleName;
        this.RoleVo.roleSort = this.roleInfo.roleSort;
        if (this.roleInfo.menus != null) {
          this.roleInfo.menus.forEach((val) => {
            this.defaultChecked.push(val.menuId)
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .tree
    margin-top 5px
  .footer
    position relative
    margin-top 50px
    bottom  0px
    right 0px
    text-align right
</style>
