<template>
  <div class="index-body">
    <div class="index-body-left-menu">
      菜单1
    </div>
    <div class="index-body-content">
      内容
    </div>
    <div class="index-body-right-menu">
      菜单2
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style lang="stylus" scoped>
.index-body
  display flex
  padding-bottom : 80%
  .index-body-left-menu
    border black solid
    width : 20%
    top: 50px
  .index-body-content
    flex-grow :1
    border black solid
  .index-body-right-menu
    right :0px
    border black solid
    width : 20%
</style>
