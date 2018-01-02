<template>
  <div class="background">
    <div class="top"></div>
    <div class="main">
      <div class="toolbar">
        <ul>
          <li v-for="t in listData" class="toolbar-title pointer" :class='{active: t.title == currentData1.title}'>
            {{t.title}}
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="content-left">
          <div class="orgin-content">
            <p>首发溯源</p>
            <ul>
              <li class="pointer" v-for="(o,index) in orginSpecies" :class="{current:index===0}">{{o}} <span
                class="triangle"></span>
              </li>
            </ul>
            <div class="text-content">
              <p>【时间】 2017-12-30 11:30</p>
              <p>【平台】 新浪微博</p>
              <div>重庆市巴南区新鸥鹏地产虚假宣传、欺骗消费者、其物管也打砸业主商铺....沆瀣一气！业主伸冤无门...！试问天理何在？公道何在？ ​​​​</div>
              <footer>
                <span>人物 张旺财</span>
                <span>地点：广东</span>
                <span>组织：白莲教</span>
              </footer>
            </div>
          </div>

          <div class="orgin-chart1">
            <div class="value-style">影响力评估 <span>81.9</span></div>
            <div class='value-td'>
              <goal-table></goal-table>
            </div>
            <div id='value-chart'></div>
            <my-line :width="'100%'"></my-line>
          </div>
          <div id="orgin-analyse"></div>
        </div>
        <my-line :vertical="true"></my-line>
        <div class="content-center">
          <div id="map-chart2"></div>
          <div class="date-select">
            <div class="timeaxis">
              <span class="reduce iconfont icon-zuo1 pointer"></span>
              <div v-for="i in 5">
						                <span class="date1"
                                  :class='{ active: dateFormat(startDate,i-1) == dateFormat(selectedDate,0)}'>{{startDate + (i - 1) * 24 * 60 * 60 * 1000 | timeToDate}}日</span>
                <span class="circle pointer" @click="selectDate(i)"></span>
                <span class="circle-big1"
                      :class='{ active: dateFormat(startDate,i-1) == dateFormat(selectedDate,0)}'></span>
                <span class="circle-big2"
                      :class='{ active: dateFormat(startDate,i-1) == dateFormat(selectedDate,0)}'></span>
                <span class="circle-big3"
                      :class='{ active: dateFormat(startDate,i-1) == dateFormat(selectedDate,0)}'></span>
              </div>
              <span class="add iconfont icon-you1 pointer"></span>
            </div>
          </div>
          <div class="content-include">
            <p>事件涉及相关</p>
            <ul class="files clearfix">
              <li class="count person center float_left"><span class="num">17</span><br/><span class="name">重点人</span>
              </li>
              <li class="count team center float_left"><span class="num">91</span><br/><span class="name">重点组织</span>
              </li>
              <li class="count web center float_left"><span class="num">52</span><br/><span class="name">重点网站</span>
              </li>
              <li class="count event center float_left"><span class="num">9</span><br/><span class="name">子话题</span>
              </li>
              </li>
            </ul>
          </div>
        </div>
        <my-line :vertical="true"></my-line>
        <div class="content-right">
          <div id="right-1"></div>
          <my-line :width="'100%'"></my-line>
          <div class="right-2"></div>
          <my-line :width="'100%'"></my-line>
          <div class="right-3">
            <p class="right-3-title">行动性线索相关内容</p>
            <div class="right-3-content-full" ref="outer">
              <div class="scroll_bar float_right">
                <div class="bar" ref="bar" @mousedown="down($event)"></div>
              </div>
              <div class="inner" ref="inner">
                <div class="right-3-content" v-for="data in currentData1.relative_content">
                  <p>{{data.content}}</p>
                  <p>【聚焦】 人物:{{data.figure}} 地点:{{data.address}} 组织:{{data.organization}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import'../../../static/china.js'
  import myLine from '../my-line/my-line'
  import goalTable from '../goal-table/goal-table'
  export default {
    props: {},
    filters: {
      timeToDate (val) {
        return new Date(val).getDate()
      }
    },
    components: {myLine, goalTable},
    data () {
      var _data = {}
      _data.listData = [
        {
          title: '王杰谈被下毒'
        },
        {
          title: '王杰谈被下毒2'
        },
        {
          title: '王杰谈被下毒3'
        },
        {
          title: '王杰谈被下毒4'
        },
        {
          title: '王杰谈被下毒5'
        }
      ]
      _data.currentData1 = {
        title: '王杰谈被下毒',
        orgin: '论坛',
        orgin_content: '1111111111111111111111111111111111111111111',
        relative_content: [
          {
            content: '重庆市巴南区新鸥鹏地产虚假宣传、欺骗消费者、其物管也打砸业主商铺....沆瀣一气！业主伸冤无门...！试问天理何在？公道何在？',
            figure: '张旺财',
            address: '广东',
            organization: '白莲教'
          }, {
            content: '6月25日是第二十七个全国“土地日”，为贯彻落实“十分珍惜、合理利用土地和切实保护耕地”的基本国策，建设资源节约型社会，广安市前锋区国土资源分局周密部署，精心策划，采取多种形式的宣传手段，有重点、有组织、分层次的开展土地日宣传活动，广泛深入地宣传当前国土资源国情、国策、国法。',
            figure: '张旺财',
            address: '广东',
            organization: '白莲教'
          }, {
            content: '据中国地震台网正式测定，新疆喀什地区塔什库尔干塔吉克自治县5月11日5时58分发生5.5级地震，震源深度8千米，震中距塔县县城约21.6千米。',
            figure: '张旺财',
            address: '广东',
            organization: '白莲教'
          }, {
            content: '昨天黑龙江省拜泉县三屯，刘宝玉家被偷了三个孩子，有一个陌生人，刚把孩子迷晕，幸好被胡云田及时发现，偷孩子的两个人被抓了起来，现关在派出所。',
            figure: '张旺财',
            address: '广东',
            organization: '白莲教'
          }, {
            content: '110已经证实！！全市通缉！！不求点赞只求扩散！抢孩子的也是真的，那的朋友说的紧急通知：请大家注意：家里有孩子的 大人都要看好',
            figure: '张旺财',
            address: '广东',
            organization: '白莲教'
          }, {
            content: '这是事实！让更多的人知道，转一次可能就能拯救几个孩子的生命。学校的老师发过来的，群多的都转一下！生命可贵！太可怕了。',
            figure: '张旺财',
            address: '广东',
            organization: '白莲教'
          }, {
            content: '在微信圈发一下，提醒各位父母，孩子贪玩，时时关注玩耍去向。莫一时大意，丢了孩子。请看管好自己的宝贝儿！',
            figure: '张旺财',
            address: '广东',
            organization: '白莲教'
          }
        ]
      }
      // 首发溯源平台类型
      _data.orginSpecies = ['论坛', '新闻', '微博', 'APP', '博客']
      _data.startDate = ''
      _data.selectedDate = ''
      return _data
    },
    created () {
      this.startDate = new Date().getTime() - 2 * 24 * 60 * 60 * 1000
      this.selectedDate = new Date().getTime()
    },
    mounted(){
      let vm = this
      this.echartInit()
      // 初始化滚动条滑块的高度
      this._setScrollHeight()
      // 监听浏览器窗口大小更改滑块的高度
      window.onresize = function () {
        vm._setScrollHeight()
      }
      // 绑定鼠标滚轮事件
      this.$refs.outer.onmousewheel = this._scroll
      // 兼容火狐
      if (this.$refs.outer.addEventListener) {
        this.$refs.outer.addEventListener('DOMMouseScroll', this._scroll)
      }
//      this.$refs.bar.onmousedown = this._down
    },
    methods: {
      // 鼠标拖拽滑动
      down (e) {
        let outer = this.$refs.outer
        let outerH
        outerH = outer.offsetHeight
        let bar = this.$refs.bar
        let inner = this.$refs.inner
        let innerH
        innerH = inner.offsetHeight
        let scale = outerH / innerH
        e = e || event
        // 鼠标初始位置
        let begin = e.clientY
        // 滑块初始top
        let beginT = bar.offsetTop
        document.onmousemove = function (e) {
          e = e || event
          // 鼠标当前位置
          let end = e.clientY
          // 鼠标移动的距离
          let dis = end - begin
          // 滑块当前位置
          let top = beginT + dis
          if (top < 0) {
            top = 0
          } else if (top > outerH - bar.clientHeight) {
            top = outerH - bar.clientHeight
          }
          bar.style.top = top + 'px'
          inner.style.top = -top / scale + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          document.releaseCapture && document.releaseCapture()
        }
        return false
      },
      // 鼠标滚轮滑动
      _scroll(e) {
        let outer = this.$refs.outer
        let outerH
        outerH = outer.offsetHeight
        let bar = this.$refs.bar
        let inner = this.$refs.inner
        let innerH
        innerH = inner.offsetHeight
        let scale = outerH / innerH
        e = e || event
        // 每滚动一次滚轮 滑块滑动的距离
        var add = 5
        // 滑块距离滑动区域顶部的距离
        let top
        top = bar.offsetTop
        if (e.detail < 0 || e.wheelDelta > 0) {
          top = top - add
          if (top < 0) {
            top = 0
          }
        } else {
          top = top + add
          if (top > outerH - bar.offsetHeight) {
            top = outerH - bar.offsetHeight
          }
        }
        // 设置滑块的位置
        bar.style.top = top + 'px'
        // 设置内容的位置
        inner.style.top = -top / scale + 'px'
//        }
        // 取消系统默认滚动事件
        e.preventDefault && e.preventDefault()
        return false
      },
      // 设置滑块的高度
      _setScrollHeight () {
        // 设置滚动条滑块的高度
        let outer = this.$refs.outer
        let outerH
        outerH = outer.offsetHeight
        let bar = this.$refs.bar
        let inner = this.$refs.inner
        let innerH
        innerH = inner.offsetHeight
        let scale = outerH / innerH
        bar.style.height = outerH * scale + 'px'
      },
      dateFormat (val, i) {
        return new Date(val + i * 24 * 60 * 60 * 1000).toLocaleDateString()
      },
      selectDate (i) {
        this.selectedDate = this.startDate + (i - 1) * 24 * 60 * 60 * 1000
      },
      echartInit () {
        let myChart1 = echarts.init(document.getElementById('value-chart'));
        myChart1.setOption({
          grid: {x: 35, y: 35, x2: 10, y2: 25},
          color: ['#5ad3ff', '#41cfd1', '#ec555e', '#3580dd', '#a78be0', '#e49ae5', '#79d185'],
          tooltip: {trigger: 'item', formatter: "{a} <br/>{b} : {c} ({d}%)"},
          toolbox: {
            show: false, eature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['pie', 'funnel']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          series: [{
            name: '情感分布',
            type: 'pie',
            radius: [30, '85%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            roseType: 'area',
            label: {normal: {show: true}, emphasis: {show: true}, textStyle: {color: 'red'}},
            lableLine: {normal: {show: true}, emphasis: {show: true}},
            data: [{value: 10, name: '负面'},
              {value: 5, name: '中立'},
              {value: 15, name: '正面'},
              {value: 25, name: '疑似正面'},
              {value: 20, name: '疑似负面'},]
          }]
        });
        let myChart2 = echarts.init(document.getElementById("orgin-analyse"));
        myChart2.setOption({
          title: {text: '阶段演化分析', textStyle: {fontSize: 18, fontWeight: '600', color: '#87effe'}, left: 10, top: 5,},
          tooltip: {trigger: 'axis'},
//							legend: {top:10,right:30,data:[{name:'负面',icon:'bar'},{name:'中性',icon:'bar'}],textStyle: {fontSize: 12,color: '#fff'}},
          grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
          xAxis: [{
            type: 'category', boundaryGap: false, splitLine: {show: false}, axisTick: {show: false},
            axisLine: {lineStyle: {color: '#357ec8', width: 3, type: 'solid'}},
            axisLabel: {splitNumber: 13, textStyle: {color: '#eff9ff'}},
            data: ['0', '03', '06', '09', '12', '15', '18', '21', '24']
          }],
          yAxis: [{
            type: 'value', splitLine: {show: false}, axisTick: {show: false},
            axisLine: {lineStyle: {color: '#357ec8', width: 3, type: 'solid'}},
            axisLabel: {splitNumber: 13, textStyle: {color: '#eff9ff'}}
          }],
          series: [{
            name: '负面', type: 'line', symbol: 'none', smooth: true, itemStyle: {normal: {color: '#87effe'}},
            areaStyle: {normal: {color: 'rgba(135, 239, 254, 0.1)'}},
            data: [120, 132, 101, 134, 90, 230, 210, 134, 90]
          },
          ]
        });

        let myChart3 = echarts.init(document.getElementById('right-1'));
        myChart3.setOption({
          grid: {x: 55, y: 50, x2: 25, y2: 25,},
          legend: {
            top: 20,
            right: 10,
            data: [{name: '境内', icon: 'bar'}, {name: '境外', icon: 'bar'}],
            textStyle: {fontSize: 12, color: '#fff'}
          },
          tooltip: {
            trigger: 'axis', position: function (pt) {
              return [pt[0], '10%']
            }
          },
          title: {text: '境内外媒体传播统计', left: 3, top: 3, textStyle: {fontSize: 18, fontWeight: '600', color: '#87effe'}},
          xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {show: true, lineStyle: {color: ['#335c9e']}},
            axisLine: {show: false, lineStyle: {color: '#4a6272'}},
            axisTick: {show: false},
            axisLabel: {splitNumber: 10},
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
          },
          yAxis: {
            type: 'value',
            boundaryGap: false,
            axisLine: {show: false, lineStyle: {color: '#4a6272'}},
            axisTick: {show: false},
            splitLine: {show: true, lineStyle: {color: ['#335c9e']}}
          },
          series: [{
            name: '境内', type: 'line', smooth: true, symbol: 'none', sampling: 'average',
            itemStyle: {normal: {color: '#be6163'}},
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#213455'
                }, {offset: 1, color: '#213455'}])
              }
            },
            data: [11, 1, 12, 33, 4, 45, 65, 76, 38, 49, 10, 51, 12, 14, 78, 12, 88, 69, 44, 88, 99, 69, 44, 88, 99]
          },
            {
              name: '境外', type: 'line', smooth: true, symbol: 'none', sampling: 'average',
              itemStyle: {normal: {color: '#17adb4'}},
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#213455'
                  }, {offset: 1, color: '#213455'}])
                }
              },
              data: [12, 14, 78, 12, 88, 69, 44, 88, 99, 69, 44, 88, 99, 11, 1, 12, 33, 4, 45, 65, 76, 38, 49, 10, 51]
            }
          ]
        });
        let myChart4 = echarts.init(document.getElementById('map-chart2'));
        var geoCoordMap = {
          '上海': [121.4648, 31.2891],
          '东莞': [113.8953, 22.901],
          '东营': [118.7073, 37.5513],
          '中山': [113.4229, 22.478],
          '临汾': [111.4783, 36.1615],
          '临沂': [118.3118, 35.2936],
          '丹东': [124.541, 40.4242],
          '丽水': [119.5642, 28.1854],
          '乌鲁木齐': [87.9236, 43.5883],
          '佛山': [112.8955, 23.1097],
          '保定': [115.0488, 39.0948],
          '兰州': [103.5901, 36.3043],
          '包头': [110.3467, 41.4899],
          '北京': [116.4551, 40.2539],
          '北海': [109.314, 21.6211],
          '南京': [118.8062, 31.9208],
          '南宁': [108.479, 23.1152],
          '南昌': [116.0046, 28.6633],
          '南通': [121.1023, 32.1625],
          '厦门': [118.1689, 24.6478],
          '台州': [121.1353, 28.6688],
          '合肥': [117.29, 32.0581],
          '呼和浩特': [111.4124, 40.4901],
          '咸阳': [108.4131, 34.8706],
          '哈尔滨': [127.9688, 45.368],
          '唐山': [118.4766, 39.6826],
          '嘉兴': [120.9155, 30.6354],
          '大同': [113.7854, 39.8035],
          '大连': [122.2229, 39.4409],
          '天津': [117.4219, 39.4189],
          '太原': [112.3352, 37.9413],
          '威海': [121.9482, 37.1393],
          '宁波': [121.5967, 29.6466],
          '宝鸡': [107.1826, 34.3433],
          '宿迁': [118.5535, 33.7775],
          '常州': [119.4543, 31.5582],
          '广州': [113.5107, 23.2196],
          '廊坊': [116.521, 39.0509],
          '延安': [109.1052, 36.4252],
          '张家口': [115.1477, 40.8527],
          '徐州': [117.5208, 34.3268],
          '德州': [116.6858, 37.2107],
          '惠州': [114.6204, 23.1647],
          '成都': [103.9526, 30.7617],
          '扬州': [119.4653, 32.8162],
          '承德': [117.5757, 41.4075],
          '拉萨': [91.1865, 30.1465],
          '无锡': [120.3442, 31.5527],
          '日照': [119.2786, 35.5023],
          '昆明': [102.9199, 25.4663],
          '杭州': [119.5313, 29.8773],
          '枣庄': [117.323, 34.8926],
          '柳州': [109.3799, 24.9774],
          '株洲': [113.5327, 27.0319],
          '武汉': [114.3896, 30.6628],
          '汕头': [117.1692, 23.3405],
          '江门': [112.6318, 22.1484],
          '沈阳': [123.1238, 42.1216],
          '沧州': [116.8286, 38.2104],
          '河源': [114.917, 23.9722],
          '泉州': [118.3228, 25.1147],
          '泰安': [117.0264, 36.0516],
          '泰州': [120.0586, 32.5525],
          '济南': [117.1582, 36.8701],
          '济宁': [116.8286, 35.3375],
          '海口': [110.3893, 19.8516],
          '淄博': [118.0371, 36.6064],
          '淮安': [118.927, 33.4039],
          '深圳': [114.5435, 22.5439],
          '清远': [112.9175, 24.3292],
          '温州': [120.498, 27.8119],
          '渭南': [109.7864, 35.0299],
          '湖州': [119.8608, 30.7782],
          '湘潭': [112.5439, 27.7075],
          '滨州': [117.8174, 37.4963],
          '潍坊': [119.0918, 36.524],
          '烟台': [120.7397, 37.5128],
          '玉溪': [101.9312, 23.8898],
          '珠海': [113.7305, 22.1155],
          '盐城': [120.2234, 33.5577],
          '盘锦': [121.9482, 41.0449],
          '石家庄': [114.4995, 38.1006],
          '福州': [119.4543, 25.9222],
          '秦皇岛': [119.2126, 40.0232],
          '绍兴': [120.564, 29.7565],
          '聊城': [115.9167, 36.4032],
          '肇庆': [112.1265, 23.5822],
          '舟山': [122.2559, 30.2234],
          '苏州': [120.6519, 31.3989],
          '莱芜': [117.6526, 36.2714],
          '菏泽': [115.6201, 35.2057],
          '营口': [122.4316, 40.4297],
          '葫芦岛': [120.1575, 40.578],
          '衡水': [115.8838, 37.7161],
          '衢州': [118.6853, 28.8666],
          '西宁': [101.4038, 36.8207],
          '西安': [109.1162, 34.2004],
          '贵阳': [106.6992, 26.7682],
          '连云港': [119.1248, 34.552],
          '邢台': [114.8071, 37.2821],
          '邯郸': [114.4775, 36.535],
          '郑州': [113.4668, 34.6234],
          '鄂尔多斯': [108.9734, 39.2487],
          '重庆': [107.7539, 30.1904],
          '金华': [120.0037, 29.1028],
          '铜川': [109.0393, 35.1947],
          '银川': [106.3586, 38.1775],
          '镇江': [119.4763, 31.9702],
          '长春': [125.8154, 44.2584],
          '长沙': [113.0823, 28.2568],
          '长治': [112.8625, 36.4746],
          '阳泉': [113.4778, 38.0951],
          '青岛': [120.4651, 36.3373],
          '韶关': [113.7964, 24.7028]
        };

        var BJData = [
          [{name: '北京'}, {name: '上海', value: 95}],
          [{name: '北京'}, {name: '广州', value: 90}],
          [{name: '北京'}, {name: '大连', value: 80}],
          [{name: '北京'}, {name: '南宁', value: 70}],
          [{name: '北京'}, {name: '南昌', value: 60}],
          [{name: '北京'}, {name: '拉萨', value: 50}],
          [{name: '北京'}, {name: '长春', value: 40}],
          [{name: '北京'}, {name: '包头', value: 30}],
          [{name: '北京'}, {name: '重庆', value: 20}],
          [{name: '北京'}, {name: '常州', value: 10}]
        ];

        var SHData = [
          [{name: '上海'}, {name: '包头', value: 95}],
          [{name: '上海'}, {name: '昆明', value: 90}],
          [{name: '上海'}, {name: '广州', value: 80}],
          [{name: '上海'}, {name: '郑州', value: 70}],
          [{name: '上海'}, {name: '长春', value: 60}],
          [{name: '上海'}, {name: '重庆', value: 50}],
          [{name: '上海'}, {name: '长沙', value: 40}],
          [{name: '上海'}, {name: '北京', value: 30}],
          [{name: '上海'}, {name: '丹东', value: 20}],
          [{name: '上海'}, {name: '大连', value: 10}]
        ];

        var GZData = [
          [{name: '广州'}, {name: '福州', value: 95}],
          [{name: '广州'}, {name: '太原', value: 90}],
          [{name: '广州'}, {name: '长春', value: 80}],
          [{name: '广州'}, {name: '重庆', value: 70}],
          [{name: '广州'}, {name: '西安', value: 60}],
          [{name: '广州'}, {name: '成都', value: 50}],
          [{name: '广州'}, {name: '常州', value: 40}],
          [{name: '广州'}, {name: '北京', value: 30}],
          [{name: '广州'}, {name: '北海', value: 20}],
          [{name: '广州'}, {name: '海口', value: 10}]
        ];

        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
              });
            }
          }
          return res;
        };

        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        var series = [];
        [['北京', BJData], ['上海', SHData], ['广州', GZData]].forEach(function (item, i) {
          series.push({
              name: item[0] + ' Top10',
              type: 'lines',
              zlevel: 1,
              effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 0,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + ' Top10',
              type: 'lines',
              zlevel: 2,
              symbol: ['none', 'arrow'],
              symbolSize: 10,
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 1,
                  opacity: 0.6,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + ' Top10',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke'
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: '{b}'
                }
              },
              symbolSize: function (val) {
                return val[2] / 8;
              },
              itemStyle: {
                normal: {
                  color: color[i]
                }
              },
              data: item[1].map(function (dataItem) {
                return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
              })
            });
        });
        myChart4.setOption({
          title: {
            text: '模拟迁徙',
            subtext: '数据纯属虚构',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: ['北京 Top10', '上海 Top10', '广州 Top10'],
            textStyle: {
              color: '#fff'
            },
            selectedMode: 'single'
          },
          geo: {
            map: 'china',
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false,
            itemStyle: {
              normal: {areaColor: 'rgba(54,128,219,0.1)', borderColor: 'rgba(54,128,219,0.8)'},
              emphasis: {areaColor: 'rgba(48,225,238,0.8)'}
            }
          },
          series: series


        });
        window.onresize = function () {
          myChart1.resize();
          myChart2.resize();
          myChart3.resize();
          myChart4.resize();
        }


      }
    },
    computed: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"

  .background
    height 100%
    width 100%
    position absolute
    top 0
    background url(resource/background.png) center / cover

  .top
    height 71px
    width 100%
    z-index 12
    background url(resource/top.png) center / cover

  .main
    width calc(100% - 28px)
    height calc(100% - 91px)
    margin 10px 13px
    z-index 120000
    background url(resource/all.png) top left / 100% 100%
    background-origin border-box

  .toolbar
    height 50px
    text-align: center
    .toolbar-title
      width 13%
      display inline-block
      padding 10px 0
      margin 0 5px
      text-align center
      background url(resource/c_off.png) top left / 100% 100%
      color white
      font-weight 600
      &:first-child
        background url(resource/left_off.png) top left / 100% 100%
      &:last-child
        background url(resource/right_off.png) top left / 100% 100%
      @media screen and (max-width 1366px)
        &
          padding 5px 0
      &:hover, &.active
        background url(resource/c_on.png) top left / 100% 100%
        color #112D5B
      &:first-child:hover, &:first-child.active
        background url(resource/left_on.png) top left / 100% 100%
      &:last-child:hover, &:last-child.active
        background url(resource/right_on.png) top left / 100% 100%

  .content
    height calc(100% - 50px)
    padding 1% 2%

  .content-left, .content-center, .content-right
    float left
    height 100%

  .content-left
    padding-right 2%

  .content-center
    padding 0 2%

  .content-left, .content-right
    width calc(30% - 1px)

  .orgin-content
    height 167px
    @media screen and (max-width 1366px)
      &
        height 149px
    > p
      width 100%
      color #93FDFD
      font-size $font-size-medium-xx
      font-weight 600
      margin-bottom 15px
    > ul
      float left
      width 20%
      > li
        position relative
        width 56px
        font-size $font-size-small
        font-family SimSun
        height 24px
        line-height 24px
        background-color #245288
        margin-bottom 3px
        margin-left 10px
        padding-left 20px
        @media screen and (max-width 1366px)
          &
            height 20px
            line-height 20px
            font-size $font-size-small-s
        &.current, &:hover
          width 66px
          margin-left 0
          background-color #F05C7C
    > .text-content
      position relative
      float left
      width 80%
      height 80%
      padding-left 5px
      color #5592dc
      line-height 1.4
      font-family SimSun
      font-size $font-size-small
      @media screen and (max-width 1366px)
        &
          font-size $font-size-small-s
      > p
        margin-bottom 5px
      > div
        word-wrap break-word
        margin-top 10px
      > footer
        position absolute
        bottom 5px

  .orgin-chart1
    height calc(40% - 2px)
    > .value-style
      color #93FDFD
      text-align center
      border-radius 20px
      background-color #143362
      width 44%
      padding 6px 10px
      margin 6px auto
      @media screen and (max-width 1366px)
        &
          font-size $font-size-medium
          padding 3px 6px
          width 38%
      > span
        color #EE5357
        font-size $font-size-large
        @media screen and (max-width 1366px)
          font-size $font-size-medium-xx
    > .value-td
      height 50px
      width 100%
    > #value-chart
      height calc(100% - 90px)
      width 100%

  #orgin-analyse
    height 30%
    width 100%

  .content-center
    width 40%

  #map-chart2
    height 60%

  .date-select
    height 16%
    padding-top 5%

    .timeaxis
      border-top 1px dashed #7AFAFF
      position relative
      .reduce
        position absolute
        top -13px
        left -15px
        color #7AFAFF
        font-size $font-size-large-xx
      .add
        position absolute
        top -13px
        right -13px
        font-size $font-size-large-xx
        color #7AFAFF
      > div
        position relative
        float left;
        width calc(100% / 6)
        border-right 1px dashed #7AFAFF
        height 32px
        > .date1
          position absolute
          bottom -30px
          right -20px
          display block
          text-align center
          width 40px
          font-weight bold
          font-size $font-size-medium
          line-height 25px
          height 25px
          border-radius 0 0 3px 3px / 0 0 3px 3px
    .date1.active
      color #2d5593
      position relative
      background #60FBFD
      &:before
        content ''
        top -15px
        left 0
        position absolute
        display inline-block
        border-right 20px solid transparent
        border-left 20px solid transparent
        border-top 0 solid transparent
        border-bottom 15px solid #60FBFD

  .content-include
    height 20%
    > p
      padding 2% 1%
      color #88EDFF
      font-size $font-size-medium-xx
      font-weight 600
    .files
      height calc(100% - 26px)
      background url(resource/file.png) top left / 100% 100%
      background-origin border-box
      @media screen and (max-width 1366px)
        &
          height calc(100% - 22px)
      .count
        width 25%
        height 100%
        border-right 1px solid #477EBE
        &.person
          border-bottom 6px solid #61DAFA
        &.team
          border-bottom 6px solid #F05D7C
        &.web
          border-bottom 6px solid #FDCC62
        &.event
          border-bottom 6px solid #429CE9
          .num
            color #fff
        &.event
          border-bottom 6px solid #40F2A8
          border-right none
        .num
          font-size 48px
          font-family Impact
          line-height 1.8
          @media screen and (max-width 1366px)
            &
              font-size 32px
              line-height 1.5
        .name
          color #5592dc
          font-size $font-size-medium-x
          @media screen and (max-width 1366px)
            &
              font-size $font-size-medium

  .content-right
    padding-left 2%

  #right-1
    height 35%

  .right-2
    height 30%

  .right-3
    height 35%

  .right-3-title
    padding 15px 0 5px 0
    color #77FCFE
    font-size $font-size-medium-x
    font-weight 600

  .right-3-content-full
    height 78%
    font-family SimSun
    color #68AFEA
    overflow hidden
    .inner
      position relative
    .scroll_bar
      height 100%
      width 10px
      position relative
      z-index 4
      background #1E3A6D
      .bar
        width 100%
        top 0
        background #68AFEA
        position absolute

  .right-3-content
    border-bottom 1px dotted #5592dc
    padding 2% 0
    margin-right 10px
    font-size $font-size-small
    > p:first-child
      height 70%
      word-wrap break-word
      line-height 150%
      overflow hidden
    > p:last-child
      height 30%
      padding-top 6px

  .circle
    position: absolute
    right -10px
    top -10px
    display block
    width 20px
    height 20px
    border-radius 50%
    background-color #69AFEA

  .circle-big1, .circle-big2, .circle-big3
    position absolute
    display none
    border-radius 50%

  .circle-big1.active, .circle-big2.active, .circle-big3.active
    display block

  .circle-big1
    width 34px
    height 34px
    right -17px
    top -17px
    z-index 10
    background-color #60FBFD

  .circle-big2
    width 30px
    height 30px
    right -15px
    top -15px
    z-index 20
    background-color #335C9A

  .circle-big3
    width 24px
    height 24px
    right -12px
    top -12px
    z-index 30
    background-color #60FBFD

  .triangle
    position absolute
    bottom 0
    left 0
    width: 0;
    height: 0;
    border-bottom: 6px solid #0C1B44;
    border-right: 6px solid transparent;
    display block
</style>
