<template>
  <zoom-in-to-out>
    <el-dialog
      :before-close="closeOuterByX"
      :visible.sync="outerVisible">
      <slot name="outer"></slot>
      <el-dialog
        width="40%"
        :before-close="closeInnerByX"
        :visible.sync="innerVisible"
        append-to-body>
        <slot name="inner"></slot>
      </el-dialog>
    </el-dialog>
  </zoom-in-to-out>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import ZoomInToOut from '../fade/ZoomInToOut.vue'
  export default {
    data () {
      return {
      }
    },
    components: {ZoomInToOut},
    methods: {
      ...mapMutations(['showOuterMenu', 'showInnerMenu']),
      closeOuterByX: function () {
        this.showOuterMenu(!this.outerMenu)
      },
      closeInnerByX: function () {
        this.showInnerMenu(!this.innerMenu)
      }
    },
    computed: {
      ...mapState(['outerMenu', 'innerMenu']),
      outerVisible () {
        return this.outerMenu
      },
      innerVisible () {
        return this.innerMenu
      }
    }
  }
</script>

<style lang="stylus" scoped>
.v-enter,.v-leave-to
  opacity: 0
.v-enter-active,.v-leave-active
  transition: opacity 1s
</style>
