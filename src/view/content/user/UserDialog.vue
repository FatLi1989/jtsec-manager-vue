<template>
  <dia-log>
      <el-form ref="form" :model="UserVo" label-width="80px" size="mini" slot="outer">
        <el-form-item v-show="false" prop="parentId">
          <input v-model="UserVo.userId">
        </el-form-item>
        <el-form-item label="登录名称:" prop="menuType">
          <el-input v-model="UserVo.loginName"></el-input>
        </el-form-item>
        <el-form-item label="用户名称:" prop="name">
          <el-input v-model="UserVo.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="url">
          <el-input type="password" v-model="UserVo.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="perms">
          <el-input v-model="UserVo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="orderNum">
          <el-input v-model="UserVo.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="img">
          <el-select v-model="UserVo.sex" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
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
        <el-form-item label="角色:" prop="visible">
          <el-checkbox-group v-model="UserVo.roleIdList">
            <el-checkbox v-for="role in this.RoleVo" :label="role.roleId" :key="role.roleId">{{role.roleName}}
            </el-checkbox>
          </el-checkbox-group>
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
              show: false
            }
        },
      components: {
        DiaLog
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
        this.$ajax.post('/role/select/all', this.RoleVo).then((res) => {
          if (res.data.code === 100) {
            this.RoleVo = res.data.data;
          }
        });
        if (this.userInfo != null) {
          this.UserVo.userId = this.userInfo.userId;
          this.UserVo.status = this.userInfo.status;
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
  .footer
    position relative
    margin-top 50px
    bottom  0px
    right 0px
    text-align right
</style>
