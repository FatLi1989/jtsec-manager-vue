<template>
  <div class="home">
    <div class="header">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) of this.img" :key="index">
          <img class="img" :src="item">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <chart :options="polar"/>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <chart :options="cake"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        img: [
          'http://47.95.0.193:9001/img/light.jpg',
          'http://47.95.0.193:9001/img/time.jpg',
          'http://47.95.0.193:9001/img/night.jpg'
        ],
        polar: {
          title: {
            text: '柱状图'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
        cake: {
          backgroundColor: '#2c343c',
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              data: [
                {value: 235, name: '视频广告'},
                {value: 274, name: '联盟广告'},
                {value: 310, name: '邮件营销'},
                {value: 335, name: '直接访问'},
                {value: 400, name: '搜索引擎'}
              ],
              roseType: 'angle',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    created: function () {
      this.$notify({
        title: '欢迎使用国保金泰安全管理框架',
        type: 'success'
      });
    }
  }
</script>

<style lang="stylus" scoped>
  .home
    display flex
    flex-direction column
    .header
     background #fff
    .img
      width 620px
      height 200px
     .el-carousel__item h3
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    .el-carousel__item:nth-child(2n)
      background-color: #99a9bf;
    .el-carousel__item:nth-child(2n+1)
      background-color: #d3dce6;
    .main >>> .grid-content
      width auto
      height auto
      border-radius 15px
      background #fff
      box-shadow: 1px 1px 3px rgba(0,0,0,.2)
      margin-top 15px
      margin-left 10px
</style>
