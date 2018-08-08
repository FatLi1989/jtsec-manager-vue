<template>
  <flip-in-out-x>
    <div class="icon-template">
      <div v-for="(icons, index) of iconList" v-bind:key="index">
        <dl>
          <dd v-for="(icon, index) of icons" :key="index">
            <i class="iconfont" :class="icon" @click="iconClick($event)"></i>
          </dd>
        </dl>
      </div>
    </div>
  </flip-in-out-x>
</template>

<script type="text/ecmascript-6">
  import FlipInOutX from '../fade/FlipInOutX.vue'

  export default {
    data () {
      return {
        iconList: [
          ['icon-xitongjiankongguanli', 'icon-xitongjiankong', 'icon-gongju', 'icon-kl-xtjk', 'icon-xitongguanli'],
          ['icon-xitongjiankongguanli', 'icon-xitongjiankong', 'icon-gongju', 'icon-kl-xtjk', 'icon-xitongguanli'],
          ['icon-zhuye', 'icon-tongzhi1', 'icon-icon-bars', 'icon-dengluyemianyonghuming', 'icon-guanbi'],
          ['icon-zhuye', 'icon-tongzhi1', 'icon-icon-bars', 'icon-dengluyemianyonghuming', 'icon-guanbi'],
          ['icon-zhuye', 'icon-tongzhi1', 'icon-icon-bars', 'icon-dengluyemianyonghuming', 'icon-guanbi'],
          ['icon-zhuye', 'icon-tongzhi1', 'icon-icon-bars', 'icon-dengluyemianyonghuming', 'icon-guanbi']
        ]
      }
    },
    components: {FlipInOutX},
    methods: {
      iconClick: function (e) {
        this.$emit('transmit', e.target.getAttribute('class').replace('iconfont ', '').trim())
      }
    }
  }
</script>

<style lang="stylus" scoped>
.v-enter,.v-leave-to
  opacity: 0
.v-enter-active,.v-leave-active
  transition: opacity 1s
.icon-template >>> .iconfont
  &:hover
    background-color: #1d9d74;
    color: #ffffff;
.icon-template
  overflow-x hidden
  overflow-y auto
  width 300px
  height 200px
  border-radius 5px
 dl
  display flex
  margin-top 5px
  dd
   flex auto
</style>
