<template>
  <div class="block">
    <el-date-picker
      v-model="time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="change">
    </el-date-picker>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'Calendar',
      data () {
        return {
          time: ''
        }
      },
      methods: {
        change: function () {
          if (this.time === null) {
            this.time = ''
          }
          this.$emit('transmitTime', this.time)
        }
      }
    }
</script>

<style scoped>

</style>
