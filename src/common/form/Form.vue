<template>
  <el-container>
    <el-header v-if="true">
      <slot name="header"></slot>
      <el-button type="primary" class="select-button" @click="onSubmit">查询</el-button>
    </el-header>
    <el-main>
      <el-button type="primary" class="add-btn" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button type="danger" class="del-btn" icon="el-icon-delete" @click="del">删除</el-button>
      <div class="table">
        <slot name="body"></slot>
      </div>
      <div class="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPages"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="currentSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100">
          </el-pagination>
        </div>
    </el-main>
  </el-container>
</template>

<script type="text/ecmascript-6">
    import { mapMutations } from 'vuex'

    export default {
      name: 'FormDemo',
      methods: {
        ...mapMutations(['currentPage', 'currentSize']),
        onSubmit: function () {

        },
        add: function () {

        },
        del: function () {

        },
        transmit: function (currentSize, currentPage) {
          this.$emit('transmit', [currentSize, currentPage])
        },
        handleSizeChange (val) {
          this.currentSize = val;
          this.transmit(this.currentSizes, this.currentPages)
        },
        handleCurrentChange (val) {
          this.currentPage = val;
          this.transmit(this.currentSizes, this.currentPages)
        }
      },
      data () {
        return {
          currentPages: 1,
          currentSizes: 10
        };
      },
      created: function () {
        this.currentPage(this.currentPages);
        this.currentSize(this.currentSizes)
      }
    }
</script>

<style lang="stylus" scoped>
  .el-header
    display flex
    background #fff
    margin-top 20px
    margin-left 20px
    height 100px !important
    width 95%
    border-radius 15px
    box-shadow: 1px 1px 3px rgba(0,0,0,.2)
    .select-button
      text-align center
      position relative
      height 40px !important
      bottom -58px !important
      border-radius 100px
  .el-main
    background #fff
    margin-top 30px
    margin-left 20px
    height 75vh
    width 95%
    border-radius 15px
    box-shadow: 1px 1px 3px rgba(0,0,0,.2)
    /*滚动条样式*/
    &::-webkit-scrollbar
      width: 5px
      height: 10px
    /*滚动条里面轨道*/
    &::-webkit-scrollbar-track
      margin-top 5px
      margin-bottom 5px
      box-shadow: 1px 1px 5px rgba(0,0,0,.2) inset
      border-radius: 10px;
      background: rgba(0,0,0,0.1);
    /*滚动条里面小方块*/
    &::-webkit-scrollbar-thumb
      border-radius 10px
      height: 5px
      background-clip: border-box
      box-shadow: 0 0 0 5px rgba(0,0,0,.2) inset
    .add-btn
      height 40px
      color  #66b1ff
      float left
      border-radius 100px 0px 0px 100px
      width 100px
      background whitesmoke
    .del-btn
      height 40px
      color #f56c6c
      float left
      margin-left 0px
      border-radius 0px 100px 100px 0px
      width 100px
      background whitesmoke
    .table
      margin-top 20px
  .footer
    position relative
    height 40px
    margin-top 50px
    text-align right
    background #fff
    margin-left 21%
    width 80%
</style>
