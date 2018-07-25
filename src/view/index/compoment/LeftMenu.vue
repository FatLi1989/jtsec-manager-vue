<template>
    <div class="menu" :class="{left: Left}">
    </div>
</template>
<script>
    export default {
      name: 'LeftMenu',
      data () {
        return {
          list: [{
            belongsname: '',
            id: 901,
            isleaf: 0,
            name: 'XJBHX-2标项目部',
            pid: '',
            type: '',
            children: [{
              belongsname: '',
              id: 902,
              isleaf: 1,
              name: '综合部(办公室)',
              pid: '901',
              type: ''
            }, {
              belongsname: '',
              id: 903,
              isleaf: 1,
              name: '工程部(工技部/技术部)',
              pid: '901',
              type: ''
            }]
          },
            {
              belongsname: '',
              id: 904,
              isleaf: 1,
              name: '安质部',
              pid: '901',
              type: '',
              children: [{
                belongsname: '',
                id: 907,
                isleaf: 1,
                name: '中心试验室',
                pid: '901',
                type: ''
              }]
            }, {
              belongsname: '',
              id: 908,
              isleaf: 0,
              name: '菜单3',
              pid: '',
              type: ''
            },
            {
              belongsname: '',
              id: 909,
              isleaf: 0,
              name: '菜单4',
              pid: '',
              type: ''
            }
          ]
        }
      },
        computed: {
          Left () {
            return this.$store.state.leftMenu
          }
        }
    }
</script>

<style lang="stylus" scoped>
  .left
    width 50px !important
  .menu
    display flex
    flex-direction column
    position: fixed
    color #eb9316
    z-index 2
    left: 0px
    width: 200px
    height: 100%
    background: rgba(0, 0, 0, 0.71)
    transition : width 1s
</style>
