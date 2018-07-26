<template>
    <div class="menu" :class="{left: show}" >
      <child-tree :list="list"></child-tree>
    </div>
</template>
<script>
  import ChildTree from './tree'

  export default {
    name: 'LeftMenu',
    data () {
      return {
        list: [{
          id: 901,
          name: 'XJBHX-2标项目部',
          children: [{
            id: 902,
            name: '综合部(办公室)'
          }, {
            id: 903,
            name: '工程部(工技部/技术部)'
          }]
        },
          {
            id: 904,
            name: '安质部',
            children: [{
              id: 907,
              name: '中心试验室'
            }]
          }, {
            id: 908,
            name: '菜单3'
          },
          {
            id: 909,
            name: '菜单4'
          }
        ],
        options: {
          propertyNames: {
            'text': 'name',
            'deletion': true
          }
        }
      }
    },
    methods: {
      focus: () => alert(1)
    },
    computed: {
      show () {
        return this.$store.state.leftMenu
      }
    },
    components: {
      ChildTree
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
    z-index 2
    left: 0px
    width: 200px
    height: 100%
    background: rgba(0, 0, 0, 0.71)
    transition : width 1s
</style>
