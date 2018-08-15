<template>
  <form-demo @transmit="paging">
    <el-form :inline="true" class="el-form" size="mini" slot="header">
      <div class="condition-form">
        <el-form-item label="登录名称：">
          <el-input placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码吗：">
          <el-input placeholder="权限字符"></el-input>
        </el-form-item>
        <el-form-item label="用户状态：">
          <el-select>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：">
          <calendar></calendar>
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
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">重置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </form-demo>
</template>
<script>
  import FormDemo from '../../../common/form/Form.vue'
  import Calendar from '../../../common/calendar/Calendar.vue'
  import {mapState} from 'vuex'
  import moment from 'moment'

  export default {
    data () {
      return {
        userData: [],
        row: '',
        page: ''
      };
    },
    methods: {
      selectUsers: function (row, page) {
        this.$ajax.post('/user/select/all', [row, page]).then((res) => {
          if (res.data.code === 100) {
            console.log(res.data.data);
            this.userData = res.data.data
          }
        })
      },
      paging: function (row, page) {
        this.selectUsers(row, page);
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
      }
    },
    computed: {
      ...mapState(['pages', 'rows'])
    },
    components: {FormDemo, Calendar},
    created: function () {
      this.selectUsers(this.pages, this.rows)
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
</style>
