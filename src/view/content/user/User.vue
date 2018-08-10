<template>
  <el-container>
    <el-header v-if="true">
      <el-form :inline="true"  class="demo-form-inline" size="mini">
       <div class="first-line">
         <el-form-item label="角色名称：">
           <el-input placeholder="角色名称"></el-input>
         </el-form-item>
         <el-form-item label="权限字符：">
           <el-input placeholder="权限字符"></el-input>
         </el-form-item>
         <el-form-item label="角色状态：">
           <el-select>
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域二" value="beijing"></el-option>
           </el-select>
         </el-form-item>
       </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    </el-header>
    <el-main>
      <el-button type="primary" class="add-btn" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button type="danger" class="del-btn" icon="el-icon-delete" @click="del">删除</el-button>
      <div class="table">
      <el-table
        :data="tableDataBegin"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
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
      <div class="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    data () {
      return {
        tableDataBegin: [
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-03',
            name: '王二虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-04',
            name: '王二虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },
          {
            date: '2016-05-05',
            name: '王三虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-06',
            name: '李彦鹏',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        tableDataName: '',
        tableDataEnd: [],
        currentPage: 4,
        pageSize: 2,
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false
      };
    },
    created () {
      this.totalItems = this.tableDataBegin.length;
      if (this.totalItems > this.pageSize) {
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index]);
        }
      } else {
        this.tableDataEnd = this.tableDataBegin;
      }
    },
    methods: {
      add () {
        alert('add')
      },
      del () {
        alert('del')
      },
      handleEdit (index, row) {
        console.log(index, row);
      },
      handleDelete (index, row) {
        console.log(index, row);
      },
      /*    前端搜索功能需要区分是否检索,因为对应的字段的索引不同
          用两个变量接收currentChangePage函数的参数 */
      doFilter () {
        if (this.tableDataName === '') {
          this.$message.warning('查询条件不能为空！');
          return;
        }
        this.tableDataEnd = []
        /* 每次手动将数据置空,因为会出现多次点击搜索情况 */
        this.filterTableDataEnd = []
        this.tableDataBegin.forEach((value, index) => {
          if (value.name) {
            if (value.name.indexOf(this.tableDataName) >= 0) {
              this.filterTableDataEnd.push(value)
            }
          }
        });
        /* 页面数据改变重新统计数据数量和当前页 */
        this.currentPage = 1
        this.totalItems = this.filterTableDataEnd.length
        /* 渲染表格,根据值 */
        this.currentChangePage(this.filterTableDataEnd)
        /* 页面初始化数据需要判断是否检索过 */
        this.flag = true
      },
      openData () {
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(this.currentPage);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        /*  需要判断是否检索 */
        if (!this.flag) {
          this.currentChangePage(this.tableDataEnd)
        } else {
          this.currentChangePage(this.filterTableDataEnd)
        }
      }, /* 组件自带监控当前页码 */
      currentChangePage (list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .el-header
    background #fff
    margin-top 20px
    margin-left 20px
    width 95%
    border-radius 15px
    box-shadow: 1px 1px 3px rgba(0,0,0,.2)
    .first-line
     display flex
     justify-content space-around
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
