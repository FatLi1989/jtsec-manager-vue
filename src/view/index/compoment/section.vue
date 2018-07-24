<template>
  <div class="index-body">
    <left-menu></left-menu>
    <div class="index-body-content">
      <div v-for="(item, indexs) in list" :key="indexs">
        <span>{{item}}</span>
      </div>
    </div>
    <right-menu></right-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import leftMenu from './LeftMenu'
  import rightMenu from './RightMenu'
    export default {
        data () {
            return {
              list: []
            }
        },
      components: {
        leftMenu, rightMenu
      },
      mounted: function () {
         let _this = this;
          for (let i = 0; i < 100; i++) {
            _this.list.push(i)
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
    margin-left 200px
    margin-right 200px
    background white
    color black
</style>
