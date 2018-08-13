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
          ['icon-tianchongzhuye', 'icon-biji', 'icon-cheng', 'icon-dianhua', 'icon-shou'],
          ['icon-diannao', 'icon-celianggongju', 'icon-lou', 'icon-xuexiao', 'icon-youxiang'],
          ['icon-fangzi', 'icon-fangdajing', 'icon-jiangbei', 'icon-sikao', 'icon-dilixueyuan'],
          ['icon-zidian', 'icon-dilixueboshi', 'icon-diqiuyi', 'icon-tubiaoku', 'icon-xiuli'],
          ['icon-ren', 'icon-shu', 'icon-huaxueyongpin', 'icon-xinfeng', 'icon-shuzhuo'],
          ['icon-jiayouzhan', 'icon-yonghu3', 'icon-yonghu2', 'icon-caidan', 'icon-yonghu1'],
          [' icon-yonghuqun', 'icon-quanxianguanli', 'icon-caidanguanli', 'icon-yonghu', 'icon-f11-copy1-copy'],
          ['icon-xitongjiankongguanli', 'icon-gongju', 'icon-kl-xtjk', 'icon-xitongguanli', 'icon-icon-bars']
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
  &::-webkit-scrollbar
    width: 5px
    height: 10px
  &::-webkit-scrollbar-track
    margin-top 5px
    margin-bottom 5px
    box-shadow: 1px 1px 5px rgba(0,0,0,.2) inset
    border-radius: 10px;
    background: rgba(0,0,0,0.1);
  &::-webkit-scrollbar-thumb
    border-radius 10px
    height: 5px
    background-clip: border-box
    box-shadow: 0 0 0 5px rgba(0,0,0,.2) inset
   dl
    display flex
    margin-top 5px
    dd
     flex auto
</style>
