<template>
  <dia-log>
    <el-form ref="form" :model="UserVo" label-width="80px" size="mini" slot="outer">
      <el-form-item v-show="false" prop="parentId">
        <label>
          <input v-model="UserVo.userId">
        </label>
      </el-form-item>
      <el-form-item label="角色名称:" prop="menuType">
        <el-input v-model="UserVo.loginName"></el-input>
      </el-form-item>
      <el-form-item label="权限字符:" prop="name">
        <el-input v-model="UserVo.userName"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序:" prop="url">
        <el-input v-model="UserVo.userName"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-switch
          v-model="UserVo.status"
          active-text="正常"
          active-value="0"
          active-color="#409EFF"
          inactive-value="1"
          inactive-text="禁用">
        </el-switch>
      </el-form-item>
      <el-form-item label="备注:" prop="visible">
        <el-input v-model="UserVo.userName"></el-input>
      </el-form-item>
      <el-form-item label="菜单权限:" prop="visible">
        <check-box-tree :tree="menus" class="tree"></check-box-tree>
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
    props: ['showDialog', 'userInfo'],
    data () {
      return {
        UserVo: {
          userId: '',
          status: '',
          phonenumber: '',
          password: '',
          loginName: '',
          userName: '',
          email: '',
          sex: '',
          roles: [],
          roleIdList: []
        },
        RoleVo: [],
        show: false,
        menus: []
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
        this.$ajax.post('/user/edit', this.UserVo).then((res) => {
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
      })
      this.$ajax.post('/role/select/all', this.RoleVo).then((res) => {
        if (res.data.code === 100) {
          this.RoleVo = res.data.data;
        }
      });
      if (this.userInfo != null) {
        this.UserVo.userId = this.userInfo.userId;
        this.UserVo.status = this.userInfo.status;
        console.log(this.UserVo.status)
        this.UserVo.phonenumber = this.userInfo.phonenumber;
        this.UserVo.loginName = this.userInfo.loginName;
        this.UserVo.userName = this.userInfo.userName;
        this.UserVo.email = this.userInfo.email
        this.UserVo.password = this.userInfo.password;
        this.UserVo.sex = this.userInfo.sex;
        if (this.userInfo.roles != null) {
          this.userInfo.roles.forEach((val) => {
            this.UserVo.roleIdList.push(val.roleId)
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
