<template>
  <div>
    <form-demo @transmit="paging" :totalCount="totalCount" @delete="del" @show="showForm">
      <el-form :inline="true" class="el-form" size="mini" slot="header">
        <div class="condition-form">
          <el-form-item label="任务名称：">
            <el-input v-model="RoleVo.roleName" placeholder="任务名称"></el-input>
          </el-form-item>
          <el-form-item label="方法名称：">
            <el-input v-model="RoleVo.roleKey" placeholder="方法名称"></el-input>
          </el-form-item>
          <el-form-item label="任务状态：">
            <el-select v-model="RoleVo.status">
              <el-option value="0" label="正常"></el-option>
              <el-option value="1" label="禁用"></el-option>
              <el-option value="2" label="删除"></el-option>
            </el-select>
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
          :data="roleData"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="任务名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="roleKey"
            label="任务组名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="roleSort"
            label="方法名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            label="方法参数"
            sortable
            :formatter="stateFormatter"
            width="100">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="执行表达式"
            type="data"
            :formatter="createTimeFormatter"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            prop="status"
            label="任务状态"
            type="data"
            :formatter="createTimeFormatter"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            type="data"
            :formatter="createTimeFormatter"
            sortable
            width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">启动
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">暂停
              </el-button>
              <el-button
                type="warning"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </form-demo>
    <div class="dialog" v-if="this.outerMenu">
      <role-dialog :roleInfo="this.roleInfo" :showDialog="this.show"></role-dialog >
    </div>
  </div>
</template>
<script>
  import FormDemo from '../../../common/form/Form.vue'
  import Calendar from '../../../common/calendar/Calendar.vue'
  import {mapState, mapMutations} from 'vuex'
  import moment from 'moment'
  import RoleDialog from './QuartzDialog.vue'

  export default {
    data () {
      return {
        roleData: [],
        pageInfo: '',
        totalCount: 0,
        time: '',
        show: '',
        RoleVo: {
          roleId: '',
          roleName: '',
          createTime: '',
          status: '',
          roleKey: '',
          createTimeBegin: '',
          createTimeEnd: '',
          row: '',
          page: '',
          roleIdList: []
        },
        roleInfo: {}
      };
    },
    methods: {
      ...mapMutations(['reloadData', 'showOuterMenu']),
      selectRoles: function () {
        this.$ajax.post('/role/select/all', this.RoleVo).then((res) => {
          if (res.data.code === 100) {
            this.roleData = res.data.pageInfo.list;
            this.totalCount = res.data.pageInfo.total
          }
        })
        this.reloadData(false);
      },
      paging: function (pageInfo) {
        this.RoleVo.row = pageInfo[0];
        this.RoleVo.page = pageInfo[1];
        this.selectRoles();
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
        this.selectRoles()
      },
      transmit: function (time) {
        this.RoleVo.createTimeBegin = time[0];
        this.RoleVo.createTimeEnd = time[1]
      },
      clear: function () {
        this.RoleVo.status = '';
        this.RoleVo.roleName = '';
        this.RoleVo.roleKey = '';
        this.RoleVo.createTimeBegin = '';
        this.RoleVo.createTimeEnd = ''
      },
      del: function () {
        if (this.RoleVo.roleIdList.length === 0) {
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
          this.$ajax.post('/role/del', this.RoleVo).then((res) => {
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
        this.RoleVo.roleIdList.length = 0;
        selection.forEach((value, index, arr) => {
          if (!this.RoleVo.roleIdList.includes(value.roleId)) {
            this.RoleVo.roleIdList.push(value.roleId)
          }
        });
      },
      handleEdit: function (index, row) {
        this.$ajax.get('/role/select/' + row.roleId).then((res) => {
          if (res.data.code === 100) {
            this.roleInfo = res.data.data;
            this.showOuterMenu(!this.outerMenu);
          }
        });
      },
      handleDelete: function (index, row) {
        this.showOuterMenu(!this.outerMenu);
      },
      showForm: function () {
        this.roleInfo = null;
      }
    },
    computed: {
      ...mapState(['pages', 'rows', 'outerMenu', 'reload'])
    },
    watch: {
      reload (val) {
        if (val === true) {
          this.selectRoles()
        }
      }
    },
    components: {FormDemo, Calendar, RoleDialog},
    created: function () {
      this.RoleVo.row = this.rows;
      this.RoleVo.page = this.pages;
      this.selectRoles()
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
