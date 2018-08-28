<template>
  <div>
    <form-demo @transmit="paging" :totalCount="totalCount" @delete="del" @show="showForm">
      <el-form :inline="true" class="el-form" size="mini" slot="header">
        <div class="condition-form">
          <el-form-item label="任务名称：">
            <el-input v-model="JobVo.jobName" placeholder="任务名称"></el-input>
          </el-form-item>
          <el-form-item label="方法名称：">
            <el-input v-model="JobVo.methodName" placeholder="方法名称"></el-input>
          </el-form-item>
          <el-form-item label="任务状态：">
            <el-select v-model="JobVo.status">
              <el-option value="0" label="执行"></el-option>
              <el-option value="1" label="暂停"></el-option>
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
          :data="jobData"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="jobName"
            label="任务名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="jobGroup"
            label="任务组名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="methodName"
            label="方法名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="params"
            label="方法参数"
            width="100">
          </el-table-column>
          <el-table-column
            prop="cronExpression"
            label="执行表达式"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            prop="status"
            label="任务状态"
            sortable
            width="150">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === 0 ? 'success' : 'danger' "
                disable-transitions>{{scope.row.status === 0 ? '执行' : scope.row.status === 1 ? '暂停' : '删除' }}</el-tag>
            </template>
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
                :type="scope.row.status === 0 ? 'warning' : 'primary'"
                :icon="scope.row.status === 0 ? 'el-icon-time' : 'el-icon-caret-right'"
                size="mini"
                @click="handleStatus(scope.$index, scope.row)">{{scope.row.status === 0 ? '暂停' : '启用'}}
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="handleRun(scope.$index, scope.row)"><i class="el-icon-caret-right">执行</i>
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit">编辑</i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </form-demo>
    <div class="dialog" v-if="this.outerMenu">
      <job-dialog :jobInfo="this.jobInfo" :showDialog="this.show"></job-dialog>
    </div>
  </div>
</template>
<script>
  import FormDemo from '../../../common/form/Form.vue'
  import Calendar from '../../../common/calendar/Calendar.vue'
  import {mapState, mapMutations} from 'vuex'
  import moment from 'moment'
  import JobDialog from './JobDialog.vue'

  export default {
    data () {
      return {
        jobData: [],
        pageInfo: '',
        totalCount: 0,
        time: '',
        show: '',
        JobVo: {
          jobId: '',
          jobName: '',
          methodName: '',
          status: '',
          row: '',
          page: '',
          jobIdList: []
        },
        jobInfo: {}
      };
    },
    methods: {
      ...mapMutations(['reloadData', 'showOuterMenu']),
      selectJobs: function () {
        this.$ajax.post('/job/select/all', this.JobVo).then((res) => {
          if (res.data.code === 100) {
            this.jobData = res.data.pageInfo.list;
            this.totalCount = res.data.pageInfo.total
          }
        });
        this.reloadData(false);
      },
      paging: function (pageInfo) {
        this.RoleVo.row = pageInfo[0];
        this.RoleVo.page = pageInfo[1];
        this.selectJobs();
      },
      stateFormatter (row) {
        return row.status === 0 ? '正常' : row.status === 1 ? '暂停' : '删除'
      },
      createTimeFormatter (row) {
        var date = row.createTime;
        if (date === undefined) {
          return '';
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      },
      onSubmit: function () {
        this.selectJobs()
      },
      transmit: function (time) {
        this.RoleVo.createTimeBegin = time[0];
        this.RoleVo.createTimeEnd = time[1]
      },
      clear: function () {
        this.JobVo.jobName = '';
        this.JobVo.methodName = '';
        this.JobVo.status = '';
      },
      del: function () {
        if (this.JobVo.jobIdList.length === 0) {
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
          this.$ajax.post('/job/del', this.JobVo).then((res) => {
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
                message: res.data.meg
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
        this.JobVo.jobIdList.length = 0;
        selection.forEach((value, index, arr) => {
          if (!this.JobVo.jobIdList.includes(value.jobId)) {
            this.JobVo.jobIdList.push(value.jobId)
          }
        });
      },
      handleStatus: function (index, row) {
        let jobId = row.jobId;
        let status = null;
        if (row.status === 0) {
          status = 1
        } else if (row.status === 1) {
           status = 0
        }
        this.$ajax.post('/job/changeStatus', {jobId: jobId, status: status}).then((res) => {
          if (res.data.code === 100) {
            this.$notify({
              title: '提示',
              message: res.data.meg,
              type: 'success'
            });
            this.reloadData(true);
          }
        });
      },
      handleRun: function (index, row) {
        this.$ajax.get('/job/run/' + row.jobId).then((res) => {
          if (res.data.code === 100) {
            this.$notify({
              title: '提示',
              message: res.data.meg,
              type: 'success'
            });
            this.reloadData(true);
          }
        });
      },
      handleEdit: function (index, row) {
        this.$ajax.get('/job/select/' + row.jobId).then((res) => {
          if (res.data.code === 100) {
            this.jobInfo = res.data.data;
            this.showOuterMenu(!this.outerMenu);
          }
        });
      },
      showForm: function () {
        this.jobInfo = null;
      }
    },
    computed: {
      ...mapState(['pages', 'rows', 'outerMenu', 'reload'])
    },
    watch: {
      reload (val) {
        if (val === true) {
          this.selectJobs()
        }
      }
    },
    components: {FormDemo, Calendar, JobDialog},
    created: function () {
      this.JobVo.row = this.rows;
      this.JobVo.page = this.pages;
      this.selectJobs()
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
  .el-button--mini
    padding: 7px 6px
</style>
