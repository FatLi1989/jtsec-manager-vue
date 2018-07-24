<template>
  <div class="index-body">
    <div :style="LeftMenuObject">
      菜单1
    </div>
    <div class="index-body-content">
      内容
    </div>
    <div :style="RightMenuObject">
      菜单2
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
              LeftMenuObject: {
                position: 'flex',
                left: '0px',
                width: '20%'
              },
              RightMenuObject: {
                position: 'flex',
                width: '20%',
                right: '0px'
              }
            }
        }
    }
</script>

<style lang="stylus" scoped>
.index-body
  display flex
  flex :1
  margin-top 50px
  .index-body-content
   flex 1
   background rosybrown
</style>
