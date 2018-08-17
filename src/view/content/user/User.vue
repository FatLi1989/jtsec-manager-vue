<template>
  <div>
    <form-demo @transmit="paging" :totalCount="totalCount">
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
          :data="userData"
          style="width: 100%">
          <el-table-column
            prop="userId"
            label="用户Id"
            sortable
            width="100">
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
            :formatter="stateFormatter"
            width="150">
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
              <el-button
                size="mini"
                type="warning"
                @click="handleDelete(scope.$index, scope.row)">重置
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </form-demo>
    <div class="dialog" v-if="this.outerMenu">
      <user-dialog></user-dialog>
    </div>
  </div>
</template>
<script>
  import FormDemo from '../../../common/form/Form.vue'
  import Calendar from '../../../common/calendar/Calendar.vue'
  import {mapState} from 'vuex'
  import moment from 'moment'
  import UserDialog from './UserDialog.vue'

  export default {
    data () {
      return {
        userData: [],
        pageInfo: '',
        totalCount: 0,
        time: '',
        UserVo: {
          status: '',
          phonenumber: '',
          loginName: '',
          createTimeBegin: '',
          createTimeEnd: '',
          row: '',
          page: ''
        }
      };
    },
    methods: {
      selectUsers: function () {
        this.$ajax.post('/user/select/all', this.UserVo).then((res) => {
          if (res.data.code === 100) {
            this.userData = res.data.pageInfo.list;
            this.totalCount = res.data.pageInfo.total
          }
        })
      },
      paging: function (pageInfo) {
        this.UserVo.row = pageInfo[0];
        this.UserVo.page = pageInfo[1];
        this.selectUsers();
      },
      stateFormatter (row) {
        return row.status === 0 ? '正常' : row.status === 1 ? '禁用' : '删除'
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
        this.UserVo.loginName = ''
      }
    },
    computed: {
      ...mapState(['pages', 'rows', 'outerMenu'])
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
