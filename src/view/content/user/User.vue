<template>
  <div>
    <form-demo @transmit="paging" :totalCount="totalCount" @delete="del" @show="showForm">
      <el-form :inline="true" class="el-form" size="mini" slot="header">
        <div class="condition-form">
          <el-form-item label="登录名称：">
            <el-input v-model="UserVo.loginName" placeholder="登录名称"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="UserVo.phonenumber" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item label="用户状态：">
            <el-select v-model="UserVo.status">
              <el-option value="0" label="正常"></el-option>
              <el-option value="1" label="禁用"></el-option>
              <el-option value="2" label="删除"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间：">
            <calendar @transmitTime="transmit"></calendar>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="select-button" @click="onSubmit">查询</el-button>
            <el-button type="warning" class="select-button" @click="clear">清空</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div slot="body">
        <el-table
          @select="select"
          :data="userData"
          v-loading="load"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :stripe="true"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="loginName"
            label="登录名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="phonenumber"
            label="手机"
            width="150">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            width="150">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 0 ? 'success' : 'danger' "
              disable-transitions>{{scope.row.status === 0 ? '正常' : scope.row.status === 1 ? '禁用' : '删除' }}</el-tag>
          </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            type="data"
            :formatter="createTimeFormatter"
            sortable
            width="200">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </form-demo>
    <div class="dialog" v-if="this.outerMenu">
      <user-dialog :userInfo="this.userInfo" :showDialog="this.show"></user-dialog>
    </div>
  </div>
</template>
<script>
  import FormDemo from '../../../common/form/Form.vue'
  import Calendar from '../../../common/calendar/Calendar.vue'
  import {mapState, mapMutations} from 'vuex'
  import moment from 'moment'
  import UserDialog from './UserDialog.vue'

  export default {
    data () {
      return {
        userData: [],
        pageInfo: '',
        totalCount: 0,
        time: '',
        show: '',
        UserVo: {
          userId: '',
          status: '',
          phonenumber: '',
          loginName: '',
          createTimeBegin: '',
          createTimeEnd: '',
          row: '',
          page: '',
          userIdList: []
        },
        userInfo: {}
      };
    },
    methods: {
      ...mapMutations(['reloadData', 'showOuterMenu']),
      selectUsers: function () {
        this.load = true;
        this.$ajax.post('/user/select/all', this.UserVo).then((res) => {
          if (res.data.code === 100) {
            this.userData = res.data.pageInfo.list;
            this.totalCount = res.data.pageInfo.total;
            this.load = false
          }
        });
        this.reloadData(false);
      },
      paging: function (pageInfo) {
        this.UserVo.row = pageInfo[0];
        this.UserVo.page = pageInfo[1];
        this.selectUsers();
      },
      createTimeFormatter (row) {
        var date = row.createTime;
        if (date === undefined) {
          return '';
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      },
      onSubmit: function () {
        this.selectUsers()
      },
      transmit: function (time) {
        this.UserVo.createTimeBegin = time[0];
        this.UserVo.createTimeEnd = time[1]
      },
      clear: function () {
        this.UserVo.status = '';
        this.UserVo.phonenumber = '';
        this.UserVo.loginName = '';
        this.UserVo.createTimeBegin = '';
        this.UserVo.createTimeEnd = ''
      },
      del: function () {
        if (this.UserVo.userIdList.length === 0) {
          this.$notify({
            title: '提示',
            message: '快去勾选数据',
            type: 'error'
          });
          return;
        }
        this.$confirm('此操作将永久删除是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.post('/user/del', this.UserVo).then((res) => {
            if (res.data.code === 100) {
              this.$notify({
                title: '成功',
                message: res.data.meg,
                type: 'success'
              });
              this.reloadData(true)
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg
              });
            }
          })
        }).catch(() => {
          this.$notify.info({
            title: '消息',
            message: '已取消删除'
          });
        });
      },
      select: function (selection) {
        this.UserVo.userIdList.length = 0;
        selection.forEach((value, index, arr) => {
          if (!this.UserVo.userIdList.includes(value.userId)) {
            this.UserVo.userIdList.push(value.userId)
          }
        });
      },
      handleEdit: function (index, row) {
        this.$ajax.get('/user/select/' + row.userId).then((res) => {
          if (res.data.code === 100) {
            this.userInfo = res.data.data;
            this.showOuterMenu(!this.outerMenu);
          }
        });
      },
      handleDelete: function (index, row) {
        this.showOuterMenu(!this.outerMenu);
      },
      showForm: function () {
        this.userInfo = null;
      }
    },
    computed: {
      ...mapState(['pages', 'rows', 'outerMenu', 'reload'])
    },
    watch: {
      reload (val) {
        if (val === true) {
          this.selectUsers()
        }
      }
    },
    components: {FormDemo, Calendar, UserDialog},
    created: function () {
      this.UserVo.row = this.rows;
      this.UserVo.page = this.pages;
      this.selectUsers()
    }
  };
</script>
<style lang="stylus" scoped>
  .el-form
    width 90%
    height 100px !important
    .condition-form
      display flex
      flex-wrap wrap
      margin-top 10px
      justify-content space-between
      .select-button
        text-align center
        border-radius 100px
</style>
