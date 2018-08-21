<template>
  <div>
    <div class="tree">
      <el-tree
        node-key="id"
        :data="tree"
        show-checkbox
        :props="defaultProps"
        :default-expand-all="false"
        :default-checked-keys="this.default"
        :check-strictly="true"
        ref="trees">
      </el-tree>
    </div>
    <div class="btn">
      <el-button @click="getNodes" type="primary">菜单确认键<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    props: ['tree', 'default'],
    data () {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        nodeArray: []
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
      },
      getNodes () {
        let nodes = this.$refs.trees.getCheckedNodes();
        this.nodeArray.length = 0;
        nodes.forEach((val) => {
          this.nodeArray.push(val.id);
        });
        this.$emit('transmit', this.nodeArray);
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
  .tree
    margin-top 10px
  .btn
    margin-top 5px
    margin-left 200px
  .footer
    position relative
    margin-top 50px
    bottom  0px
    right 0px
    text-align right
</style>
