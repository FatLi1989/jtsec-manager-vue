<template>
  <div>
    <div>
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="tree"
        :props="defaultProps"
        :default-expand-all="false"
        node-key="id"
        :filter-node-method="filterNode"
        ref="trees">
      </el-tree>
    </div>
    <div class="footer">
      <el-button type="warning" size="small" round @click="confirm">确定</el-button>
      <el-button type="danger" size="small" round @click="closeInner">关闭</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    props: ['tree'],
    data () {
      return {
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      ...mapMutations(['showOuterMenu', 'showInnerMenu', 'transmitNode']),
      closeInner: function () {
        this.showInnerMenu(!this.innerMenu)
      },
      confirm: function () {
        this.transmitNode(this.$refs.trees.getCurrentNode());
        this.showInnerMenu(!this.innerMenu)
      }
    },
    watch: {
      filterText (val) {
        this.$refs.trees.filter(val);
      }
    },
    computed: {
      ...mapState(['innerMenu'])
    }
  };
</script>

<style lang="stylus" scoped>
 .footer
  position relative
  margin-top 50px
  bottom  0px
  right 0px
  text-align right
</style>
