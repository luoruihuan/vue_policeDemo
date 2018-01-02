<template>
  <div class="center">
    <div class="top"></div>
    <div class="content">
      <div class="inner_wrapper">
        <div class="up">
          <div class="menu">全省网警在岗在线分布</div>
          <div class="menu">全省志愿者在岗子在线分布</div>
        </div>
        <div class="inner clearfix">
          <div class="left float_left">
            <div class="upper">
              <calendar></calendar>
            </div>
            <div class="middle">
              <h2 class="type">广东省公安厅网警总队</h2>
              <ul class="counts">
                <li class="count float_left"><span class="total num">{{province_total}}</span><br/><span class="name">全省总人数</span></li>
                <li class="count float_left"><span class="online num">{{net_online}}</span><br/><span class="name">巡查端在线</span></li>
                <li class="count float_left"><span class="p_online num">{{major_online}}</span><br/><span class="name">管理端在线</span></li>
                <li class="count float_left"><span class="together num">{{both_online}}</span><br/><span class="name">两端同时在线</span></li>
              </ul>
            </div>
            <div class="lower">
                <div class="xc_ol dislockline float_left">
                	<div class="xc_ols makecenter">
                			<div class="xc_olsa makecenter">
		                			<ring :circleCss="onlinea_circleCss" :rate="0.63"></ring>
                			</div>
                			<div class='xc_olsb makecenter'>
                					<div class="w25%">
                            <ring :circleCss="onlineb_circleCss" :rate="0.85">
					                    <span slot="text">
						                    	总体在岗率<br/>
						                    	<span style="font-size:36px;color:#32e98c;">{{online_rate}}</span><span style="font-size:30px;color:#32e98c;"></span>
					                    </span>
                            </ring>
                          </div>
                			</div>
                	</div>
                </div>
                <div class="xc_detail dislockline float_left">
                     <div class="xc_details makecenter">
                         <ul class="xd_boxs ">
                           <li></li>
                           <li>巡查员在线</li>
                           <li>{{online_patroller}}人</li>
                         </ul>
                         <ul class="xd_boxs">
                           <li style="background: #32e98c;"></li>
                           <li style="color: #32e98c;">研判调度员在线</li>
                           <li style="color: #32e98c;">{{online_dispatcher}}人</li>
                         </ul>
                     </div>
                </div>
            </div>
          </div>
          <m-line :vertical="true"></m-line>
          <div class="c float_left">
            <div class="upper">
            		<h2 class="type">在岗人数</h2>
            		<div id='center_map'></div>
            </div>
            <div class="lower">
              <div class="rankings">
                <div class="ranking float_left">
                  <div class="name report"></div>
                  <ring :circleCss="report_circleCss">
                    <span slot="text">N0.1<br/><span style="font-size: 16px; color: #ffffff">福田</span></span>
                  </ring>
                  <div class="level"><span class="top2">N0.2</span> <span>罗湖</span></div>
                  <div class="level"><span class="top3">N0.3</span> <span>龙岗</span></div>
                </div>
                <div class="ranking float_left">
                  <div class="name use"></div>
                  <ring :circleCss="use_circleCss">
                    <span slot="text">N0.1<br/><span style="font-size: 16px; color: #ffffff">福田</span></span>
                  </ring>
                  <div class="level"><span class="top2">N0.2</span> <span>罗湖</span></div>
                  <div class="level"><span class="top3">N0.3</span> <span>龙岗</span></div>
                </div>
                <div class="ranking float_left">
                  <div class="name send"></div>
                  <ring :circleCss="send_circleCss">
                      <span slot="text">N0.1<br/><span style="font-size: 16px; color: #ffffff">福田</span></span>
                  </ring>
                  <div class="level"><span class="top2">N0.2</span> <span>罗湖</span></div>
                  <div class="level"><span class="top3">N0.3</span> <span>龙岗</span></div>
                </div>
              </div>
            </div>
          </div>
          <m-line :vertical="true"></m-line>
          <div class="right float_left">
            <div class="upper">
            	<h2 class="type">全省24小时在岗率排名Top10</h2>
            	<div id="police_ow"></div>
            </div>
            <div class="middle">
              <m-line :vertical="false"></m-line>
              <h2 class="type">全省24小时警力在线分布</h2>
              <div id="police_ol"></div>
            </div>
            <div class="lower">
	              <m-line :vertical="false"></m-line>
	              <h2 class="type">全省警力任务分派</h2>
	              <div id="police_fp"></div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
	import echarts from 'echarts'
	import'../../../static/guangdong.js'
  import MLine from 'components/my-line/my-line'
  import Ring from 'components/circle/circle'
  import Calendar from 'components/marxin-calendar/marxin-calendar'

  export default {
    props: {},
    data () {
      return {
        onlinea_circleCss: {
          circle_scale: 180,
          innerC_width: 8,
          borderColor_on: '#43d3ff',
          borderColor_off: '#00408e',
          outC_width: 0,
          outC_color: 'red',
          distance: 0,
          color: '#5592dc',
          font_size: '16px',
          font_family: 'MicrosoftYaHei'
        },
        onlineb_circleCss: {
          circle_scale: 140,
          innerC_width: 8,
          borderColor_on: '#32e98c',
          borderColor_off: '#00408e',
          outC_width: 0,
          outC_color: '#FFCCCC',
          distance: 0,
          color: '#5592dc',
          font_size: '12px',
          font_family: 'MicrosoftYaHei'
        },
        report_circleCss: {
          circle_scale: 100,
          innerC_width: 8,
          borderColor_on: '#f9ae44',
          outC_width: 0,
          outC_color: '#FFCCCC',
          distance: 10,
          color: '#f9ae44',
          font_size: '26px',
          font_family: 'Impact'
        },
        use_circleCss: {
          circle_scale: 100,
          innerC_width: 8,
          borderColor_on: '#2ED0FE',
          outC_width: 0,
          outC_color: '#FFCCCC',
          distance: 10,
          color: '#2ED0FE',
          font_size: '26px',
          font_family: 'Impact'
        },
        send_circleCss: {
          circle_scale: 100,
          innerC_width: 8,
          borderColor_on: '#32e98c',
          outC_width: 0,
          outC_color: '#FFCCCC',
          distance: 10,
          color: '#32e98c',
          font_size: '26px',
          font_family: 'Impact'
        },
        province_total: 0, // 全省总人数
        net_online: 0, // 巡查端在线
        major_online: 0, // 管理端在线
        both_online: 0, // 两段同时在线
        online_rate: 0, // 总在岗率
        online_total: 0, // 总在线人数
        online_patroller: 0, // 巡查员在线
        patroller_rate: 44,
        online_dispatcher: 0 // 调度员在线
      }
    },
    created () {
      let url = `apiv1/statistics/GetPoliceOnline?fields=&query=&sortby=OnlineRate&order=desc`
      this.axios.get(url)
        .then(response => {
          let data = response.data.Data
          data.forEach(item => {
            this.province_total += (Math.floor(100 * item.OnlineTotal / item.OnlineRate))
            this.net_online += item.OnlinePatrollerTotal
            this.major_online += item.OnlineDispatcherTotal
            this.both_online += item.OnlineBothTotal
            this.online_total += item.OnlineTotal
            this.online_patroller += (item.OnlinePatrollerRate * Math.floor(item.OnlineTotal / item.OnlineRate))
            this.online_dispatcher += (item.OnlineDispatcherRate * Math.floor(item.OnlineTotal / item.OnlineRate))
          })
          this.online_rate = Math.floor(100 * this.online_total / this.province_total) + '%'

        })
    },
    mounted(){this.echartInit();},
    methods: {
      backCenter () {this.$emit('backCenter')},
  		echartInit(){
  				let myChart1 = echarts.init(document.getElementById('center_map'));
  				myChart1.setOption({
  						title: {text: '在岗率',textStyle: {fontSize: 14,fontWeight: '600',color: '#26b6fd'},left:19,top:5,},
						  tooltip:{ trigger: 'item'},legend: {},
						    dataRange: {
						        right:20,bottom:20,
						        splitList: [
						            {start: 500, end: 1000},
						            {start: 200, end: 500},
						            {start: 100, end: 200},
						            {start: 50, end: 100},
						            {start: 0, end:50}
						        ],
						        color: ['#18ffa5', '#18e6a9', '#19c8ad','#1ba1b1','#1b81b4'],
						        textStyle: {fontSize: 14,fontWeight: '600',color: '#26b6fd'}
    						},
						    series:[{name:'在岗人数',type:'map',mapType:'guangdong',roam:false,left:'9%',top:'1%',right:'5%',bottom:'1%',
						            label: {normal: {show: true},emphasis: {show: true,textStyle:{color:'red'}}},
						            itemStyle:{normal: {color:'#ff9b62',label:{show:true,textStyle:{color:'#a06e28',fontSize:15}}}},
						            data:[
						                {name: '广州市',value:999 },
						                {name: '韶关市',value:210},
						                {name: '深圳市',value: 850},
						                {name: '珠海市',value: 500},
						                {name: '汕头市',value:400},
						                {name: '佛山市',value: 100},
						                {name: '江门市',value: 999},
						                {name: '湛江市',value: 888 },
						                {name: '茂名市',value: 999},
						                {name: '肇庆市',value: 999 },
						                {name: '惠州市',value: 996},
						                {name: '梅州市',value: 800},
						                {name: '汕尾市',value: 168 },
						                {name: '河源市',value: 777},
						                {name: '阳江市',value: 900},
						                {name: '清远市',value: 900},
						                {name: '东莞市',value: 777},
						                {name: '中山市',value: 238},
						                {name: '潮州市',value: 438 },
						                {name: '揭阳市',value: 600 },
						                {name: '云浮市',value: 266},
						          ]}]
  				});
  				let myChart2 = echarts.init(document.getElementById('police_ol'));
  				myChart2.setOption({
  						grid:{x:55,y:25,x2:25,y2:25,},
							legend:{top:0,right:10,data:[{name:'境内',icon:'bar'},{name:'境外',icon:'bar'}],textStyle: {fontSize: 12,color: '#fff'}},
					    tooltip:{trigger: 'axis',position: function (pt) {return [pt[0],'10%']}},
						  xAxis:{type:'category',boundaryGap: false,splitLine:{show: true,lineStyle:{ color: ['#335c9e']}},
				        		 axisLine: {show:false,lineStyle:{color: '#4a6272'}},axisTick:{show:false},axisLabel:{splitNumber:10},
				        		 data:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
						  			},
						  yAxis: {type: 'value',boundaryGap: false,axisLine: {show:false,lineStyle:{color: '#4a6272'}},axisTick:{show:false},
						  				splitLine:{show: true,lineStyle:{ color: ['#335c9e']}}},
						  series:[{name:'境内',type:'line',smooth:true,symbol:'none',sampling: 'average',
						            itemStyle: {normal:{color: '#be6163'}},
						            areaStyle: {normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: '#213455'},{offset: 1,color: '#213455'}])}},
						            data:[11,1,12,33,4,45,65,76,38,49,10,51,12,14,78,12,88,69,44,88,99,69,44,88,99]
						  				},
						  				{name:'境外',type:'line',smooth:true,symbol:'none',sampling: 'average',
						            itemStyle: {normal:{color: '#17adb4'}},
						            areaStyle: {normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: '#213455'},{offset: 1,color: '#213455'}])}},
						            data:[12,14,78,12,88,69,44,88,99,69,44,88,99,11,1,12,33,4,45,65,76,38,49,10,51]
						  			}
						  ]
  				});
  				let myChart3 = echarts.init(document.getElementById('police_fp'));
  				myChart3.setOption({
							    tooltip: {},
							    radar: {
							    		 center: ['75%', '50%'],
				               radius: '70%',
							        indicator: [
							           { name: '单条', max: 6500},
							           { name: '导控', max: 16000},
							           { name: '异地', max: 30000},
							           { name: '溯源', max: 38000},
							           { name: '落地', max: 52000},
							           { name: '综报', max: 25000}
							        ]
							    },
							    series: [{
										        name: '预算 vs 开销（Budget vs spending）',
										        type: 'radar',
										        areaStyle: {normal: {}},
										        data : [
										            {value : [4300, 10000, 28000, 35000, 50000, 19000],name : '总任务量'},
										            {value : [5000, 14000, 28000, 31000, 42000, 21000],name : '完成量'}
										        ]
							    				},
							    				{
									            name: '访问来源',
									            type: 'pie',
									            radius : '80%',
									            center: ['30%', '50%'],
									            data:[
									                {value:335, name:'总体完成'},
									                {value:310, name:'未完成'},
									            ],
									            itemStyle: {
									                emphasis: {
									                    shadowBlur: 10,
									                    shadowOffsetX: 0,
									                    shadowColor: 'rgba(0, 0, 0, 1)'
									                }
									            }
									       }
							    ]
  				});
  				let myChart4 = echarts.init(document.getElementById('police_ow'));
  				var dataAxis = ['广州','韶关','深圳','珠海','汕头','佛山','江门','湛江','茂名','肇庆'];
//      ,'惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮'
					var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220,333];
					var yMax = 500;
					var dataShadow = [];
					for (var i = 0; i < data.length; i++) {
					    dataShadow.push(yMax);
					}
  				myChart4.setOption({
  							grid:{x:35,y:8,x2:25,y2:40},
  							xAxis: {
						        data: dataAxis,
						        axisTick: {show: false},
						        axisLine: {show: false},
						        axisLabel: {rotate:0,textStyle:{color:'#87baf8',fontSize:12}, interval:0},
						    },
						    yAxis: {
						        axisLine: {show: false},
						        axisTick: {show: false},
						        axisLabel: {textStyle:{color:'#87baf8',fontSize:12}},
						        splitLine:{show:true,lineStyle: {color: '#091839'}}
						    },
						    dataZoom: [{type: 'inside'}],
						    series: [
						        {
						            type: 'bar',
						            itemStyle: {normal: {color: '#081735',barBorderRadius: 10,}},
						            barGap:'-100%',
						            barCategoryGap:'40%',
						            data: dataShadow,
						            animation:true
						        },
						        {
						            type: 'bar',
						            animation:true,
						            itemStyle: {
						                normal: {barBorderRadius: 10,
						                    color: new echarts.graphic.LinearGradient(
						                        0, 0, 0, 1,
						                        [
						                            {offset: 0, color: '#1933db'},
						                            {offset: 0.5, color: '#1965db'},
						                            {offset: 1, color: '#1995db'}
						                        ]
						                    ),

						                },
						                emphasis: {barBorderRadius: 10,
						                    color: new echarts.graphic.LinearGradient(
						                        0, 0, 0, 1,
						                        [
						                            {offset: 0, color: '#2378f7'},
						                            {offset: 0.7, color: '#2378f7'},
						                            {offset: 1, color: '#83bff6'}
						                        ]
						                    )
						                }
						            },
						            data: data
						        }
						    ]
  				});
  				window.onresize = function(){
		            myChart1.resize();
		            myChart2.resize();
	           		myChart3.resize();
	           		myChart4.resize();
    			}

  		}
    },
    components: {
      MLine,
      Ring,
      Calendar
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
    padding 21px
    @media screen and (max-width 1366px)
      &
        font-size $font-size-medium-x
        padding 18px


  .top
    height 71px
    width 100%
    position absolute
    top 0
    z-index 12
    background url(top.png) center / cover

  .content
    padding 10px
    background url(bg.png) center / cover
    .inner_wrapper
      margin-top 70px
      background url(all.png) top left / 100% 100%
      background-origin border-box
      height calc(100vh - 90px)

      .up
        height 37px
        line-height 37px
        font-size $font-size-large
        @media screen and (max-width 1366px)
          &
            height 26px
            line-height 26px
            font-size $font-size-medium-x
        .menu
          height 100%
          width 21%
          display inline-block
          font-weight bold
          &:first-child
            background url(left.png) top left / 100% 100%
            color #142B5D
          &:last-child
            background url(right.png) top left / 100% 100%
            color #0B214A

      .inner
        height calc(100% - 37px)
        width 100%
        @media screen and (max-width 1366px)
          &
            height calc(100% - 26px)

        .left
          width calc(28% - 1px)
          height 100%
          .upper
            height 40%
          .middle
            height 23%
            background url(person.png) top left / 100% 100%
            background-origin border-box
            .counts
              padding-top 10px
              @media screen and (max-width 1366px)
                &
                  padding-top 0
              .count
                width 25%
                height 80px
                border-right  1px solid #3B6CAB
                @media screen and (max-width 1366px)
                  &
                    height 60px
                &:last-child
                  border-right none
                .name
                  color #36609A
                  font-size $font-size-medium
                  @media screen and (max-width 1366px)
                    &
                      font-size $font-size-small
                .num
                  font-size 36px
                  font-family Impact
                  line-height 60px
                  @media screen and (max-width 1366px)
                    &
                      font-size $font-size-large-xx
                      line-height 40px
                  &.total
                    color #26b6fd
                  &.online
                    color #32E98C
                  &.p_online
                    color #32E98C
                  &.together
                    color #F9AE44
          .lower
            height 37%

        .c
          width 38.5%
          height 100%
          padding 0 8px 15px 8px
          .upper
            height 65%
          .lower
            height 35%
            background url(rank.png) top left / 100% 100%
            background-origin border-box
            .rankings
              margin 0 20px
              height 100%
              .ranking
                width 33.3%
                height 100%

                .name
                  border-bottom none
                  border-left 30px solid transparent
                  border-right 30px solid transparent
                  width 90%
                  position relative
                  margin 0 auto
                  &:after
                    width 100%
                    height 40px
                    position absolute
                    top -40px
                    line-height 40px
                    left 0
                    font-size $font-size-medium-xx
                    @media screen and (max-width 1366px)
                      &
                        font-size $font-size-medium-x
                        height 25px
                        line-height 25px
                        top -25px
                  &.report
                    border-top 40px solid #F9AE44
                    @media screen and (max-width 1366px)
                      &
                        border-top 25px solid #F9AE44
                    &:after
                      content '报送榜'
                  &.use
                    border-top 40px solid #27B7FD
                    @media screen and (max-width 1366px)
                      &
                        border-top 25px solid #27B7FD
                    &:after
                      content '采用率榜'
                  &.send
                    border-top 40px solid #32E98C
                    @media screen and (max-width 1366px)
                      &
                        border-top 25px solid #32E98C
                    &:after
                      content '报送榜'

                .level
                  line-height 40px
                  height 40px
                  font-size $font-size-medium-x
                  font-family Impact
                  @media screen and (max-width 1366px)
                    &
                      line-height 20px
                      height 20px
                      font-size $font-size-small
                  span
                    display inline-block
                  .top2
                    color #508FCE
                    font-size $font-size-large-xx
                    @media screen and (max-width 1366px)
                      &
                        font-size $font-size-medium-xx
                  .top3
                    font-size $font-size-large-xx
                    color #3B6BA8
                    @media screen and (max-width 1366px)
                      &
                        font-size $font-size-medium-xx


        .right
          width calc(33.5% - 1px)
          height 100%
          .upper
            height 35%
          .middle
            height 33%
          .lower
            height 32%
    /*全部地图样式*/
		#center_map
			height calc(100% - 70px)
			width 100%
		#police_ol
			height calc(100% - 70px)
			width 100%
		#police_fp
			height calc(100% - 70px)
			width 100%
		#police_ow
			height calc(100% - 70px)
			width 100%

  .xc_ol
    height 100%
    width 60%
    position relative
    .xc_ols
    	height 200px
    	width 200px
    	.xc_olsa
    	  height 180px
    	  width 180px
    	  z-index 15
    	.xc_olsb
    		height 140px
    		width 140px
    		z-index 15
  .xc_detail
    position relative
    height 100%
    width   40%
    .xc_details
      text-align left
      height 155px
      width 130px
      .xd_boxs
        height 90px
        li:nth-child(1)
          height 11px
          width 2.5em
          background #43d3ff
          border-radius 20px
        li:nth-child(2)
          line-height 35px
          font-size 16px
          font-family  'Microsoft-Bold'
          color #43d3ff
        li:nth-child(3)
          font-size 16px
          color #43d3ff
          font-family  'Microsoft-Bold'
  </style>
