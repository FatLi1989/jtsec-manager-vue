<template>
  <dia-log>
    <el-form ref="form" :model="JobVo" label-width="80px" size="mini" slot="outer">
      <el-form-item v-show="false">
        <input v-model="JobVo.jobId">
      </el-form-item>
      <el-form-item label="任务名称:" prop="menuType">
        <el-input v-model="JobVo.jobName"></el-input>
      </el-form-item>
      <el-form-item label="任务组名:" prop="name">
        <el-input v-model="JobVo.jobGroup"></el-input>
      </el-form-item>
      <el-form-item label="方法名称:" prop="url">
        <el-input v-model="JobVo.methodName"></el-input>
      </el-form-item>
      <el-form-item label="方法参数:" prop="url">
        <el-input v-model="JobVo.params"></el-input>
      </el-form-item>
      <el-form-item label="cron:" prop="url">
        <el-input v-model="JobVo.cronExpression"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-switch
          v-model="JobVo.status"
          active-text="执行"
          :active-value="0"
          active-color="#409EFF"
          :inactive-value="1"
          inactive-text="暂停">
        </el-switch>
      </el-form-item>
      <el-form-item label="备注:" prop="visible">
        <el-input v-model="JobVo.remark"></el-input>
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
    props: ['showDialog', 'jobInfo'],
    data () {
      return {
        JobVo: {
          jobId: '',
          jobName: '',
          jobGroup: '',
          methodName: '',
          params: '',
          cronExpression: '',
          status: '',
          remark: '',
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
        this.$ajax.post('/analysis/job/eidt', this.JobVo).then((res) => {
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
        this.JobVo.menuIdList.length = 0;
        this.JobVo.menuIdList = val;
      }
    },
    computed: {
      ...mapState(['outerMenu'])
    },
    created: function () {
      if (this.jobInfo != null) {
        this.JobVo.jobId = this.jobInfo.jobId;
        this.JobVo.status = this.jobInfo.status;
        this.JobVo.jobName = this.jobInfo.jobName;
        this.JobVo.jobGroup = this.jobInfo.jobGroup;
        this.JobVo.methodName = this.jobInfo.methodName;
        this.JobVo.params = this.jobInfo.params;
        this.JobVo.cronExpression = this.jobInfo.cronExpression;
        this.JobVo.remark = this.jobInfo.remark;
      }
      console.log(this.JobVo.status)
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
