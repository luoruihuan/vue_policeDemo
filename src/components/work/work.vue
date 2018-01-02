<template>
  <div>
    <div class="top"></div>
    <div class="content clearfix">
      <div class="choose_time">
        数据范围：{{begin_time | formatTime}}至{{end_time | formatTime}} <span class="choose pointer" @click="showCalendar">重新选择时间</span>
      </div>
      <transition name="slide">
        <div v-show="isShow" class="calendar">
          <calendar v-on:hideCalendar="hideCalendar"></calendar>
        </div>
      </transition>
      <div class="inner left float_left">
        <div class="upper"><h2 class="type">市级单位考核排名
          <!--<span class="look float_right">查看完整榜单<span
            class="iconfont icon-you1 float_right"></span></span>--></h2>
          <div id="cityLevel_chart"></div>
        </div>
        <div class="lower"><h2 class="type">区县级单位考核排名<!--<span class="look float_right">查看完整榜单<span
          class="iconfont icon-you1"></span></span>--></h2>
          <div id="countyLevel_chart"></div>
        </div>
      </div>
      <div class="inner c float_left">
        <div class="upper"><h2 class="type">报送采分<!--<span class="look float_right">查看完整榜单<span
          class="iconfont icon-you1 float_right"></span></span>--></h2>
          <div id="center_chart"></div>
        </div>
        <m-line :vertical="false"></m-line>
        <div class="lower">
          <div class="trend">
            <!-- <h2 class="type">上报信息量<span class="look float_right">查看完整榜单<span
             class="iconfont icon-you1 float_right"></span></span></h2>-->
            <div id="trend_chart"></div>
          </div>
          <div class="count">
            <div class="i left float_left">
              <ul class="clearfix ri">
                <li class="float_right"><span class="right ">省厅</span><span class="left "><span
                  class="num">90</span>条</span></li>
                <li class="float_right"><span class="right ">市级单位</span><span class="left "><span class="num">90</span>条</span>
                </li>
                <li class="float_right"><span class="right ">区县级单位</span><span class="left "><span
                  class="num">1890</span>条</span></li>
              </ul>
            </div>
            <div class="i middle float_left center">
              总报送<br/><span class="num">164</span>
            </div>
            <div class="i right float_left">
              <ul class="clearfix">
                <li class="float_left"><span class="left "><span class="num">90</span>条</span><span
                  class="right ">采分</span></li>
                <li class="float_left"><span class="left "><span class="num">90</span>条</span><span
                  class="right ">转研判</span></li>
                <li class="float_left"><span class="left "><span class="num">1890</span>条</span><span class="right ">转报公安部</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="inner right float_left">
        <div class="upper">
          <div class="task"><h2 class="type">专项任务<!--<span class="look float_right">查看完整榜单<span
            class="iconfont icon-you1 float_right"></span></span>--></h2>
            <div id="task_chart"></div>
          </div>
          <m-line :vertical="false"></m-line>
          <div class="city">
            <h2 class="type type_2">市级单位任务完成率排名<!--<span class="look float_right">查看完整榜单<span
              class="iconfont icon-you1 float_right"></span></span>--></h2>
            <div class="rankings clearfix">
              <div v-for="i in city_rates" class="ranking float_left">
                <ring :circleCss="circleCss" :rate="i.rate">
                  <!--<span slot="text">{{i.name}}<br/>-->
                  <span slot="text">{{i.name}}<br/>
                    <span
                      style="color: #6ee4ff; font-weight: bold">{{parseFloat(i.rate) * 100 + '%'}}</span></span>
                </ring>
              </div>
            </div>
          </div>
          <m-line :vertical="false"></m-line>
          <div class="county">
            <h2 class="type type_2">区县级单位任务完成率排名<!--<span class="look float_right">查看完整榜单<span
              class="iconfont icon-you1 float_right"></span></span>--></h2>
            <div class="rankings clearfix">
              <div v-for="i in county_rates" class="ranking float_left">
                <ring :circleCss="circleCss" :rate="i.rate">
                  <span slot="text">{{i.name}}<br/><span
                    style="color: #6ee4ff; font-weight: bold ">{{parseFloat(i.rate) * 100 + '%'}}</span></span>
                </ring>
              </div>
            </div>
          </div>
        </div>
        <div class="lower">
          <h2 class="type">档案库新增<span class="look float_right">查看完整榜单<span
            class="iconfont icon-you1 float_right"></span></span></h2>
          <ul class="files clearfix">
            <li class="count person center float_left"><span class="num">17</span><br/><span class="name">重点人</span>
            </li>
            <li class="count team center float_left"><span class="num">91</span><br/><span class="name">重点组织</span></li>
            <li class="count web center float_left"><span class="num">52</span><br/><span class="name">重点网站</span></li>
            <li class="count event center float_left"><span class="num">9</span><br/><span class="name">网上事件</span></li>
            <li class="count account center float_left"><span class="num">32</span><br/><span class="name">涉恐账号</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import '../../../static/guangdong.js'
  import moment from 'moment'
  import {mapState} from 'vuex'

  import MLine from 'components/my-line/my-line'
  import Calendar from 'components/calendar/calendar'
  import Ring from 'components/circle/circle'
  export default {
    props: {},
    data () {
      return {
        isShow: false,
        city_rates: [
          {
            name: '深圳',
            rate: 0.74
          },
          {
            name: '广州',
            rate: 0.52
          },
          {
            name: '东莞',
            rate: 0.45
          }
        ],
        county_rates: [
          {
            name: '东莞',
            rate: 0.34
          },
          {
            name: '深圳',
            rate: 0.62
          },
          {
            name: '江门',
            rate: 0.95
          }
        ],
        circleCss: {
          circle_scale: 90,
          innerC_width: 8,
          borderColor_on: '#11BAF2',
          borderColor_off: 'transparent',
          outC_width: 1,
          distance: 0,
          outC_color: '#11BAF2',
          color: '#fff',
          font_size: '19px',
          font_family: 'MicrosoftYaHei'
        }
      }
    },
    created () {
      this._setScale()
      window.onresize = () => {
        this._setScale()
      }
    },
    mounted () {
      this.echartInit();
    },
    methods: {
      backCenter () {
        this.$emit('backCenter')
      },
      showCalendar () {
        console.log(this.isShow);
        this.isShow = !this.isShow
      },
      hideCalendar () {
        this.isShow = false
      },
      _setScale () {
        let width = document.documentElement.clientWidth
        if (width <= 1366) {
          this.circleCss = {
            circle_scale: 70,
            innerC_width: 6,
            borderColor_on: '#0D9CE8',
            borderColor_off: 'transparent',
            outC_width: 1,
            distance: 0,
            outC_color: '#0D9CE8',
            color: '#fff',
            font_size: '14px',
            font_family: 'MicrosoftYaHei'
          }
        }
      },
      echartInit () {
        /*省市*/
        let cityLevel_chart = echarts.init(document.getElementById('cityLevel_chart'))
        cityLevel_chart.setOption({
          backgroundColor: "#0b1f44",
          color: ["#e64c66", "#62a6bd", "#2f4b7a", "#353952"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            bottom: '4%',
            right: '5%',
            data: ['资料档案', '处置得分', '上报得分', '网格化管理'],
            textStyle: {
              color: '#70e4fd',
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: "#365a8e"
              }
            },
            axisLabel: {
              textStyle: {
                color: '#0b1f44',
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
            },
          },
          yAxis: {
            type: 'category',
            data: ['深圳', '广州', '东莞', '惠州', '汕头', '江门', '珠海', '中山', '佛山', '江门'],
            axisLabel: {
              textStyle: {
                color: '#70e4fd',
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#365a8e",
              }
            }
          },
          series: [
            {
              name: '资料档案',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data: [29, 13, 21, 26, 12, 25, 52, 34, 52, 20]
            },
            {
              name: '处置得分',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data: [41, 12, 2, 4, 90, 20, 10, 30, 30, 10]
            },
            {
              name: '上报得分',
              type: 'bar',
              stack: '总量',
              barWidth: 15,
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data: [42, 21, 23, 53, 43, 13, 43, 52, 12, 4]
            },
            {
              name: '网格化管理',
              type: 'bar',
              stack: '总量',
              barWidth: 15,
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#70e4fd',
                  }
                }
              },
              data: [12, 42, 1, 10, 2, 24, 27, 42, 24, 20]
            }
          ]

        })

        /*县级*/
        let countyLevel_chart = echarts.init(document.getElementById('countyLevel_chart'))
        countyLevel_chart.setOption({
          backgroundColor: "#0b1f44",
          color: ["#e64c66", "#62a6bd", "#2f4b7a",],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            bottom: '4%',
            right: '5%',
            data: ['资料档案', '处置得分', '上报得分',],
            textStyle: {
              color: '#70e4fd',
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: "#365a8e"
              }
            },
            axisLabel: {
              textStyle: {
                color: '#0b1f44',
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
            },
          },
          yAxis: {
            type: 'category',
            data: ['深圳', '广州', '东莞', '惠州', '汕头', '江门', '珠海', '中山', '佛山', '江门'],
            axisLabel: {
              textStyle: {
                color: '#70e4fd',
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#365a8e",
              }
            }
          },
          series: [
            {
              name: '资料档案',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data: [29, 13, 21, 26, 12, 25, 52, 34, 52, 20]
            },
            {
              name: '处置得分',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data: [41, 12, 2, 4, 90, 20, 10, 30, 30, 10]
            },
            {
              name: '上报得分',
              type: 'bar',
              stack: '总量',
              barWidth: 15,
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: '#70e4fd',
                  }
                }
              },
              data: [42, 21, 23, 53, 43, 13, 43, 52, 12, 4]
            },
          ]

        })

        /*上报信息量*/
        let trend_chart = echarts.init(document.getElementById('trend_chart'));
        trend_chart.setOption({
          tooltip: {trigger: 'axis'},
          legend: {
            top: 10,
            right: 20,
            data: [{name: '上报信息量', icon: 'bar'}, {name: '采分信息量', icon: 'bar'}],
            textStyle: {fontSize: 12, color: '#fff'}
          },
          grid: {left: '3%', right: '4%', bottom: '10%', containLabel: true},
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            splitLine: {show: false},
            axisTick: {show: false},
            axisLine: {lineStyle: {color: '#357ec8', width: 3, type: 'solid'}},
            axisLabel: {splitNumber: 13, textStyle: {color: '#eff9ff'}},
            data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            axisLabel: {
              textStyle: {
                color: '#70e4fd',
              }
            },
          }],
          yAxis: [{
            type: 'value', splitLine: {show: false}, axisTick: {show: false},
            axisLine: {lineStyle: {color: '#357ec8', width: 3, type: 'solid'}},
            axisLabel: {splitNumber: 13, textStyle: {color: '#eff9ff'}}, axisLabel: {
              textStyle: {
                color: '#70e4fd',
              }
            },
          }],
          series: [{
            name: '上报信息量', type: 'line', symbol: 'none', smooth: true, itemStyle: {normal: {color: '#35ea8b'}},
            areaStyle: {
              normal: {
                color: 'rgba(114, 233, 200, 0.3)',
              }
            },
            data: [120, 132, 101, 134, 90, 230, 210, 134, 90, 230, 210, 500]
          },
            {
              name: '采分信息量', type: 'line', symbol: 'none', smooth: true, itemStyle: {normal: {color: '#fcb251'}},
              areaStyle: {
                normal: {
                  color: 'rgba(243, 176, 85, 0.3)',
                }
              },
              data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 180]
            }]
        });

        /*专项任务*/
        let task_chart = echarts.init(document.getElementById('task_chart'))
        task_chart.setOption({

          title: {
            text: "总体完成率",
            x: 'center',
            y: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 20,
              color: '#7e8492'
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              color: ['#6ee4fe', '#e64c66', '#79ce93', '#e399b4', '#fbb150'],
              avoidLabelOverlap: false,
              //文字在环形内的定位
              label: {
                /*  normal: {
                 show: false,
                 position: 'center'
                 },*/
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              //改成true 就会显示细条
              labelLine: {
                normal: {
                  show: true,
                  x: "right"
                }
              },
              data: [
                {value: 335, name: '落地调查'},
                {value: 310, name: '舆情导控'},
                {value: 234, name: '其他信息'},
                {value: 310, name: '信息验证'},
                {value: 234, name: '有害信息'}

              ]
            }
          ]
        })

        /*报送采分地图*/
        let center_chart = echarts.init(document.getElementById('center_chart'))
        center_chart.setOption({
          title: {text: '在岗率', textStyle: {fontSize: 14, fontWeight: '600', color: '#26b6fd'}, left: 19, top: 5,},
          tooltip: {trigger: 'item'}, legend: {},
          visualMap: {
            min: 0,
            max: 1000,
            text: ['高', '低'],
            right: '5%',
            top: 'bottom',
            calculable: true,
            color: ['#32c1e9', '#30f2f1', '#359ce1', '#367fdb', '#31e1ee'],
            textStyle: {
              color: '#30edef'
            }
          },
          series: [{
            name: '在岗人数',
            type: 'map',
            mapType: 'guangdong',
            roam: false,
            left: '9%',
            top: '1%',
            right: '5%',
            bottom: '1%',
            label: {normal: {show: true}, emphasis: {show: true, textStyle: {color: 'red'}}},
            itemStyle: {normal: {color: '#ff9b62', label: {show: true, textStyle: {color: '#a06e28', fontSize: 15}}}},
            data: [
              {name: '广州市', value: 999},
              {name: '韶关市', value: 210},
              {name: '深圳市', value: 850},
              {name: '珠海市', value: 500},
              {name: '汕头市', value: 400},
              {name: '佛山市', value: 100},
              {name: '江门市', value: 999},
              {name: '湛江市', value: 888},
              {name: '茂名市', value: 999},
              {name: '肇庆市', value: 999},
              {name: '惠州市', value: 996},
              {name: '梅州市', value: 800},
              {name: '汕尾市', value: 168},
              {name: '河源市', value: 777},
              {name: '阳江市', value: 900},
              {name: '清远市', value: 900},
              {name: '东莞市', value: 777},
              {name: '中山市', value: 238},
              {name: '潮州市', value: 438},
              {name: '揭阳市', value: 600},
              {name: '云浮市', value: 266},
            ]
          }]
        });


        window.onresize = function () {
          cityLevel_chart.resize();
          countyLevel_chart.resize();
          trend_chart.resize();
          center_chart.resize();
        }
      },
    },
    components: {
      MLine,
      Calendar,
      Ring
    },
    computed: {
      ...mapState([
        'end_time',
        'begin_time'
      ])
    },
    filters: {
      formatTime (val) {
        return moment(val).format('YYYY-MM-DD')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"

  .type
    color #6ee4ff
    font-size $font-size-medium-xx
    text-align left
    font-weight bold
    padding 18px
    &.type_2
      font-weight normal
    .look
      color #5592dc
      height 18px
      line-height 18px
      font-size $font-size-small
    @media screen and (max-width 1366px)
      &
        font-size $font-size-medium-x
        padding 14px

  .top
    height 71px
    width 100%
    position absolute
    top 0
    z-index 12
    background url(top.png) center / cover

  .content
    padding 10px
    height calc(100vh - 10px)
    background url(bg.png) center / cover
    .choose_time
      height 65px
      line-height 40px
      padding-top 25px
      font-size $font-size-large
      font-weight 600
      position relative
      z-index 14
      color #5493DA
      @media screen and (max-width 1366px)
        &
          font-size $font-size-medium-xx
      .choose
        font-size $font-size-medium
        color #376299
        text-decoration underline
        @media screen and (max-width 1366px)
          &
            font-size $font-size-small
    .calendar
      height 124px
      background linear-gradient(to right, #041134, #10264B, #050E2E)
      position absolute
      top 75px
      left 10px
      right 10px
      overflow hidden
      z-index 4
      &.slide-enter-active, &.slide-leave-active
        transition all .8s
      &.slide-enter, &.slide-leave-active
        height 0
        opacity 0
    .inner
      height calc(100vh - 85px)

      &.left
        width 32%
        .upper, .lower
          background url(city.png) top left / 100% 100%
          background-origin border-box
        .upper
          margin-bottom 10px
          height calc(50% - 10px)
          #cityLevel_chart
            height calc(100% - 55px)
            width calc(100% - 2px)
            margin 0 1px
        .lower
          height 50%
          #countyLevel_chart
            height calc(100% - 55px)
            width calc(100% - 2px)
            margin 0 1px

      &.c
        width calc(36% - 20px)
        background url(c.png) no-repeat top left / 100% 100%
        margin 0 10px
        .upper
          height 55%
          #center_chart
            height calc(100% - 54px)
            margin 0 auto
        .lower
          height calc(45% - 2px)
          .trend
            height 55%
            #trend_chart
              height 100%
          .count
            margin 0 10px 10px 10px
            height calc(45% - 15px)
            .i
              width 33.3%
              height 100%
              position relative
              &.middle
                background url(send.png) top left / 100% 100%
                line-height 1.4
                font-size 24px
                color #eff9ff
                padding-top 35px
                @media screen and (max-width 1366px)
                  &
                    padding-top 20px
                    font-size $font-size-large
                .num
                  font-size 44px
                  font-weight bold
                  @media screen and (max-width 1366px)
                    &
                      padding-top 20px
                      font-size 34px
              &.left, &.right
                height 100%
                font-size $font-size-medium-x
                @media screen and (max-width 1366px)
                  &
                    font-size $font-size-small
                ul
                  width 102%
                  position absolute
                  top 50%
                  margin-top -75px
                  &.ri
                    right 0
                  @media screen and (max-width 1366px)
                    &
                      margin-top -51px
                  li
                    .left
                      display inline-block
                      height 42px
                      margin 3px 5px
                      line-height 42px
                      width 70px
                      font-size $font-size-medium-x
                      background url(arraw.png) top left / 100% 100%
                      @media screen and (max-width 1366px)
                        &
                          width 58px
                          line-height 30px
                          font-size $font-size-small
                          height 30px
                          margin 2px 5px
                      .num
                        padding 0 3px 0 5px
                        font-size $font-size-medium-xx
                        font-weight bold
                        @media screen and (max-width 1366px)
                          font-size $font-size-medium

                    .right
                      line-height 32px
                      font-size $font-size-medium-x
                      color #0e9de9
                      @media screen and (max-width 1280px)
                        font-size $font-size-medium
      &.right
        width 32%
        .upper
          margin-bottom 10px
          height calc(78% - 10px)
          background url(c.png) no-repeat top left / 100% 100%
          .task
            height 46%
            #task_chart
              height calc(100% - 54px)
          .city
            height 27%
            .rankings
              margin 0 20px
              .ranking
                width 33.3%
          .county
            height 27%
            .rankings
              margin 0 20px
              .ranking
                width 33.3%
        .lower
          height 22%
          background url(file.png) no-repeat top left / 100% 100%
          .files
            border-top 1px solid #294F8D
            height calc(100% - 56px)
            @media screen and (max-width 1366px)
              &
                height calc(100% - 46px)
            .count
              width 20%
              height 100%
              border-right 1px solid #1C385D
              &.person
                border-bottom 4px solid #61DAFA
              &.team
                border-bottom 4px solid #F05D7C
                .num
                  color #3680db
              &.web
                border-bottom 4px solid #FDCC62
              &.event
                border-bottom 4px solid #429CE9
                .num
                  color #3680db
              &.account
                border-bottom 4px solid #40F2A8
                border-right none
              .num
                font-size 48px
                font-family Impact
                line-height 1.8
                color #6ee4ff
                @media screen and (max-width 1366px)
                  &
                    font-size 36px
                    line-height 1.5
              .name
                color #5592dc
                font-size $font-size-medium-x
                @media screen and (max-width 1366px)
                  &
                    font-size $font-size-medium

</style>
