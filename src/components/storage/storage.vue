<template>
  <div class='center'>
    <div class="top"></div>
    <div class="bottom">
      <section class="left_box dislockline"><!--左测内容-->
        <div class="lb_top"><!--左上内容-->
          <div class="clues_show dislockline" v-for='(msg,i) in msgShow'><!---->
            <div class="clues_left dislockline">
              <div class="cl_img makecenter"
                   :style="{backgroundColor:msg.bgColor,backgroundImage:'url('+msg.bgUrl+')',borderColor:msg.borderColor}"></div>
              <div v-if="i==0" class='cl_tips'>+{{data.PeopleAddedToday}}</div>
            </div>
            <div class="clues_right dislockline">
              <div class="clues_rbox makecenter">
                <p class="clues_title fontomit">{{msg.txt}}</p>
                <p class="clues_nums" :style='{color:msg.bgColor}'>{{msg.num}}</p>
              </div>
            </div>
          </div>
        </div>
        <myLine></myLine>
        <div class="lb_bottom">
          <p class="lbb_title">今日新增</p>
          <div class="lbb_box" v-for='add in addShow'>
            <div class="lbb_content makecenter">
              <p class='td_title'>{{add.name}}</p>
              <div class='td_box'>
                <ul class='td_detail dislockline makecenter'>
                  <li class="td_name dislockline">在控人数</li>
                  <li class="td_boxs dislockline"><span class="td_change dislockline"
                                                        :style='{width:add.controlRate}'></span></li>
                  <li class="td_num dislockline"><span>+</span><span>{{add.controlNum}}</span></li>
                </ul>
              </div>
              <div class='td_box'>
                <ul class='td_detail dislockline makecenter'>
                  <li class="td_name dislockline">信息条数</li>
                  <li class="td_boxs dislockline"><span class="td_change td_changes dislockline"
                                                        :style='{width:add.msgRate}'></span></li>
                  <li class="td_num dislockline"><span>+</span><span>{{add.msgNum}}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div><!--左下内容-->
      </section>
      <section class="right_box dislockline"><!--右侧内容-->
        <div class="rb_title">
          <ul>
            <li v-for="(i,index) in msgShow" class="dislockline" :class="{active:index === cindex}"
                @click="cIndex($event, index)">{{i.txt}}
            </li>
          </ul>
        </div>
        <div class="rb_detail">
          <div class="detail_prop dislockline" @click="prevShow">
            <div class="prop_img makecenter"></div>
          </div>
          <div class="detail_box dislockline">
            <!--重点作者-->
            <div class="dimg_box dislockline" v-for='del in detailShow.slice(page*4, (page+1)*4)'>
              <div class="dimg_content dislockline">
                <div class='dimg_con makecenter'>
                  <img :src="del.src" class="dislockline makecenter"/>
                </div>
              </div>
              <div class="dimg_titles dislockline">
                <p class="dimg_titlesa fontomit"><span>{{del.id}}</span></p>
                <p class="dimg_titlesb fontomit"><span>发帖：</span><span>{{del.nums}}</span></p>
              </div>
            </div>
          </div>
          <div class="detail_next dislockline" @click="nextShow">
            <div class="next_img makecenter"></div>
          </div>
        </div>
        <div class="rb_paper">
          <div class="rb_papera dislockline">
            <p class="hot_p">最热信息</p>
            <div class='hot_detail'>
              <ul class="hot_box" v-for='hot in hotShow'>
                <li class="hot_img  dislockline"></li>
                <li class="hot_txt fontomit dislockline">{{hot.txt}}</li>
                <li class="hot_sours fontomit dislockline">{{hot.source}}</li>
              </ul>
            </div>
          </div>
          <div class="rb_paperb dislockline">
            <p class="hot_p">发文走势</p>
            <div class='hot_detail' id='rb_pchart'></div>
          </div>
        </div>
        <div id="rb_echart"></div>
      </section>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import moment from 'moment'
  import myLine from '../my-line/my-line.vue'
  export default {
    components: {myLine},
    props: {},
    data(){
      return {
        cindex: 0,
        page: 0,
        data: {},
        trendArr: [],
        msgShow: [
          {bgUrl: '../../../static/person.png', bgColor: '#4fc4f6', borderColor: '#214f7d', txt: '重点人员', num: 17},
          {bgUrl: '../../../static/organize.png', bgColor: '#c95a7d', borderColor: '#46345a', txt: '重点组织', num: 9},
          {bgUrl: '../../../static/zhendi.png', bgColor: '#dbab6c', borderColor: '#4b4a52', txt: '重点阵地', num: 73},
          {bgUrl: '../../../static/theme.png', bgColor: '#3c84db', borderColor: '#1c4177', txt: '重点专题', num: 66}
        ],
        addShow: [
          {name: '重点人员', controlNum: '10', msgNum: '152', controlRate: '48%', msgRate: '70%'},
          {name: '重点组织', controlNum: '2', msgNum: '3258', controlRate: '38%', msgRate: '60%'},
          {name: '重点阵地', controlNum: '12', msgNum: '8541', controlRate: '28%', msgRate: '50%'},
          {name: '重点专题', controlNum: '5', msgNum: '258', controlRate: '18%', msgRate: '40%'},
        ],
        hotShow: [
          {txt: '919大型客机再获30架订单', source: '百度贴吧'},
          {txt: '919大型客机再获30架订单', source: '百度贴吧'},
          {txt: '919大型客机再获30架订单', source: '百度贴吧'},
          {txt: '919大型客机再获30架订单', source: '百度贴吧'},
          {txt: '919大型客机再获30架订单', source: '百度贴吧'}
        ],
        detailShow: [
          {id: '回忆小马甲a', nums: 1100, src: '../../../static/police.gif'},
          {id: '回忆小马甲b', nums: 1200, src: '../../../static/police.gif'},
          {id: '回忆小马甲c', nums: 1300, src: '../../../static/police.gif'},
          {id: '回忆小马甲d', nums: 1400, src: '../../../static/police.gif'},
          {id: '小马甲e', nums: 1500, src: '../../../static/police.gif'},
          {id: '小马甲a', nums: 1100, src: '../../../static/police.gif'},
          {id: '小马甲b', nums: 1200, src: '../../../static/police.gif'},
          {id: '小马甲c', nums: 1300, src: '../../../static/police.gif'},
          {id: '小马甲d', nums: 1400, src: '../../../static/police.gif'},
          {id: '小马甲e', nums: 1500, src: '../../../static/police.gif'}
        ]
      }
    },
    created () {
      // 时间戳
      let time = moment(new Date().getTime()).format('YYYY-MM-DD')
      console.log(time)
      // 今日新增 (数据库没有当天时间数据 待改）
      let url = `apiv1/statistics/GetClueProfile?query=StsDate%3A${'2017-05-30'}`
      this.axios.get(url)
        .then(response => {
          this.data = response.data.Data[0]
          this.msgShow[0].num = this.data.PeopleTotal
          this.msgShow[1].num = this.data.OrganTotal
          this.msgShow[2].num = this.data.WebsiteTotal
          this.msgShow[3].num = this.data.EventTotal
          this.addShow.forEach((item, index) => {
            if (index === 0) {
              item.controlNum = this.data.PeopleAddedToday
              item.msgNum = this.data.PeopleCollectedToday
              item.controlRate = (100 * this.data.PeopleAddedToday / this.data.PeopleTotal).toFixed(2) + "%"
              item.msgRate = (100 * this.data.PeopleCollectedToday / this.data.PeopleCollectedTotal).toFixed(2) + "%"
            }
            if (index === 1) {
              item.controlNum = this.data.OrganAddedToday
              item.magNum = this.data.OrganCollectedToday
              item.controlRate = (100 * this.data.OrganAddedToday / this.data.OrganTotal).toFixed(2) + "%"
              item.msgRate = (100 * this.data.OrganCollectedToday / this.data.OrganCollectedTotal).toFixed(2) + "%"
            }
            if (index === 2) {
              item.controlNum = this.data.WebsiteAddedToday
              item.msgNum = this.data.WebsiteCollectedToday
              item.controlRate = (100 * this.data.WebsiteAddedToday / this.data.website_total).toFixed(2) + "%"
              item.msgRate = (100 * this.data.WebsiteCollectedToday / this.data.website_collected_total).toFixed(2) + "%"
            }
            if (index === 3) {
              item.controlNum = this.data.EventAddedToday
              item.msgNum = this.data.EventCollectedToday
              item.controlRate = (100 * this.data.EventAddedToday / this.data.EventTotal).toFixed(2) + "%"
              item.msgRate = (100 * this.data.EventCollectedToday / this.data.EventCollectedTotal).toFixed(2) + "%"
            }
          })
        })
        .catch(error => {
          console.log(error);
        })
      // 发文走势 （待确定：发文走势统计的是每天的数据还是每小时的数据，暂时用天数统计）
      let trendUrl = `apiv1/statistics/GetPoplePublish`
      this.axios.get(trendUrl)
        .then(response => {
          let data = response.data.Data
          this.trendArr = data.map(item => {
            return item.Total
          })
          this.echartInit()
        })
        .catch(error => {
          console.log(error)
        })
      // 最热信息
      let hottestUrl = `apiv1/statistics/GetTopNews?sortby=SearchTotal%2CCreateDt&order=desc&limit=5&fields=NewsTitle%2CNewsSource`;
      this.axios.get(hottestUrl)
        .then(response => {
          response.data.Data.forEach((item, index) => {
            this.hotShow[index].txt = item.NewsTitle
            this.hotShow[index].source = item.NewsSource
            console.log(item);
          })
        })
    },
    mounted () {
    },
    methods: {
      prevShow () {
        this.page--
        if (this.page < 0) {
          this.page = this.totalPage
        }
      },
      nextShow () {
        this.page++
        if (this.page > this.totalPage) {
          this.page = 0
        }
      },
      echartInit () {
        let myChart1 = echarts.init(document.getElementById('rb_pchart'));
        myChart1.setOption({
          grid: {x: 35, y: 15, x2: 25, y2: 25,},
          tooltip: {
            trigger: 'axis', position: function (pt) {
              return [pt[0], '10%']
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {show: true, lineStyle: {color: ['#335c9e']}},
            axisLine: {show: false, lineStyle: {color: '#5b6a7e'}},
            axisTick: {show: false},
            axisLabel: {splitNumber: 10},
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
          },
          yAxis: {
            type: 'value',
            boundaryGap: false,
            axisLine: {show: false, lineStyle: {color: '#5b6a7e'}},
            axisTick: {show: false},
            splitLine: {show: true, lineStyle: {color: ['#22406d']}}
          },
          series: [{
            name: '境内', type: 'line', smooth: true, symbol: 'none', sampling: 'average',
            itemStyle: {normal: {color: '#109a9f'}},
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#213455'
                }, {offset: 1, color: '#213455'}])
              }
            },
            data: this.trendArr
          },
          ]
        });
        let myChart2 = echarts.init(document.getElementById('rb_echart'));
        myChart2.setOption({
          title: {text: ''},
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          label: {normal: {show: true, textStyle: {fontSize: 12}}},
          legend: {
            x: "10", y: '10', show: true,
            data: [{name: '发帖平台', textStyle: {fontSize: 14, color: "#16ff49", fontFamily: 'SimSun'}},
              {name: '涉及组织', textStyle: {fontSize: 14, color: "#ee51e3", fontFamily: 'SimSun'}},
              {name: '涉及人员', textStyle: {fontSize: 14, color: "#12ffff", fontFamily: 'SimSun'}},
              {name: '涉及事件', textStyle: {fontSize: 14, color: "#ff9949", fontFamily: 'SimSun'}},
            ]
          },
          series: [
            {
              type: 'graph',
              layout: 'force',
              symbolSize: 45,
              focusNodeAdjacency: true,
              roam: false,
              cursor: 'pointer',
              categories: [
                {name: '发帖平台', itemStyle: {normal: {color: "#16ff49",}}},
                {name: '涉及组织', itemStyle: {normal: {color: "#ee51e3",}}},
                {name: '涉及人员', itemStyle: {normal: {color: "#12ffff",}}},
                {name: '涉及事件', itemStyle: {normal: {color: "#ff9949",}}}],
              label: {normal: {show: true, textStyle: {fontSize: 12}}},
              force: {repulsion: 1000},
              edgeSymbolSize: [4, 50],
              edgeLabel: {normal: {show: true, textStyle: {fontSize: 10}, formatter: "{c}"}},
              data: [{name: '李小二', draggable: true,},
                {name: '百度贴吧', category: 0, draggable: true,},
                {name: '蒙圈贴吧', category: 1, draggable: true,},
                {name: '书脸', category: 1, draggable: true,},
                {name: '假装蒙圈', category: 2, draggable: true,},
                {name: '正经蒙圈', category: 3, draggable: true,},
                {name: '王小二', category: 1, draggable: true,},
                {name: '白莲教', category: 3, draggable: true,},
                {name: '李小翠', category: 2, draggable: true,},
                {name: '青龙教', category: 0, draggable: true,}],
              links: [{source: 0, target: 1, value: '嘿嘿嘿'},
                {source: 0, target: 2, value: '涉及组织'},
                {source: 0, target: 3, value: '涉及人员'},
                {source: 0, target: 4, value: '发帖平台'},
                {source: 1, target: 2, value: '涉及人员'},
                {source: 0, target: 5, value: '涉及人员'},
                {source: 4, target: 5, value: '姑姑'},
                {source: 2, target: 8, value: '叔叔'},
                {source: 0, target: 12, value: '发帖平台'},
                {source: 6, target: 11, value: '爱人'},
                {source: 6, target: 3, value: '发帖平台'},
                {source: 7, target: 5, value: '发帖平台'},
                {source: 9, target: 0, value: '发帖平台'},
                {source: 3, target: 10, value: '发帖平台'},
                {source: 2, target: 11, value: '同学'}],
              lineStyle: {normal: {opacity: 0.9, width: 1, curveness: 0}}
            }
          ]
        });
        window.onresize = function () {
          myChart1.resize();
          myChart2.resize();
        }
      },
      cIndex (e, index) {
        this.cindex = index
      }
    },
    computed: {
      totalPage () {
        return Math.ceil(this.detailShow.length / 4) - 1
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"
  .center
    height 100%
    width 100%

  /*头部部分*/
  .top
    height 71px
    width 100%
    background url(topp.png) center / 100% 100%
    background-origin border-box

  /*下部内容部分*/
  .bottom
    height calc(100% - 88px)
    width calc(100% - 28px)
    margin auto
    margin-top 10px

  .left_box
    position relative
    height calc(100% + 40px)
    width 34.5%
    top -40px
    background url(left.png) center / 100% 100%
    background-origin border-box

  .lb_top
    height 35%
    width 94%
    margin auto
    margin-bottom 0.5%

  .clues_show
    height calc(50% - 3px)
    width calc(50% - 3px)
    vertical-align top

  .clues_left
    height 100%
    position relative
    width calc(65% - 3px)
    vertical-align top

  .cl_img
    height 85px
    width 85px
    border-radius 50%
    border-width 8px
    border-style solid
    background center / 100% 100%

  .cl_tips
    height 35px
    width 35px
    border-radius 50%
    line-height 35px
    font-weight bold
    background-color #e64c65
    position absolute
    top 0px
    right 0px
    @media screen and (min-width 1300px)
      &
        top 5px
        right 5px
    @media screen and (min-width 1600px)
      &
        top 10px
        right 10px
    @media screen and (min-width 1800px)
      &
        top 17px
        right 17px

    &:before
      width 0
      height 0
      left -5px
      bottom 0px
      transform rotate(-35deg)
      position absolute
      content ""
      border-top 5px solid transparent
      border-right 10px solid #e64c65
      border-bottom 5px solid transparent

  .clues_right
    height 100%
    width calc(35% - 3px)
    vertical-align top
    position relative
    > .clues_rbox
      height 100px
      width 98%
      > .clues_title
        line-height 35px
        font-family 'MicrosoftYaHei'
        color #528ed6
        text-align left
      .clues_nums
        line-height 48px
        font-size 48px
        font-family 'Arial-BoldMT'
        text-align left

  .lb_bottom
    height 64%
    width 94%
    margin auto
    margin-top 0.5%
    .lbb_title
      line-height 45px
      font-size 18px
      color #6ee4ff
      text-align left
      font-weight bold
    .lbb_box
      height calc((100% - 45px) / 4)
      width 100%
      position relative
    .lbb_content
      height 99%
      width 100%
      > .td_title
        line-height 50px
        text-align left
        font-size 18px
        color #5592dc
        font-weight bold
        font-family MicrosoftYaHei-Bold
      .td_box
        height calc((100% - 50px) / 2)
        width 100%
        position relative
        > .td_detail
          height 20px
          width 100%
          font-size 13px
        .td_name
          height 100%
          width 60px
          color #5592dc
          line-height 20px
          position absolute
          z-index 1
          text-align left
          left 0
        .td_boxs
          height 10px
          width 70%
          background #0d2346
          z-index 1
          position absolute
          left 60px
          top 5px
          @media screen and (min-width 1600px)
            &
              width 75%
          .td_change
            height 100%
            background #3c84db
            z-index 1
            position absolute
            left 0
          .td_changes
            background #78fcfe !important
        .td_num
          height 100%
          line-height 20px
          width calc(30% - 60px)
          z-index 1
          position absolute
          right 0
          text-align left
          text-indent 5px
          font-size 16px
          color #43d3ff
          @media screen and (min-width 1400px)
            &
              text-indent 10px
          @media screen and (min-width 1600px)
            &
              width calc(25% - 60px)
              text-indent 20px

  .right_box
    position relative
    vertical-align top
    height 100%
    width 65%
    background url(right.png) center / 100% 100%
    background-origin border-box
    .rb_title
      height 37px
      width 80%
      li
        width calc(25% - 5px)
        height 100%
        line-height 37px
        font-size 22px
        color #081b3b
        margin-right 4px
        font-weight bold
        font-family 'MicrosoftYaHei-Bold'
        background url(before.png) center / 100% 100%
        background-origin border-box
      li:hover, li.active
        background url(after.png) center / 100% 100%
        background-origin border-box
        cursor pointer
    .rb_detail
      height 123px
      width 98%
      background #0f2747
      margin-left 2px
      .detail_prop
        height 100%
        width 30px
        position relative
        .prop_img
          width 13px
          height 22px
          cursor pointer
          background url(prop.png)
      .detail_box
        width calc(100% - 70px)
        height 100%
        vertical-align top
        overflow hidden
        .dimg_box
          width calc(25% - 4px)
          height 100%
          .dimg_content
            height 100%
            width 40%
            vertical-align top
            position relative
            .dimg_con
              width 80px
              height 80px
              border-radius 50%
              &:hover
                border 2px solid #4799a8
                border-right 2px solid transparent
              img
                height 70px
                width 70px
                border-radius 50%
                border 2px solid #214b66
                &:hover
                  border 5px solid #214b66
          .dimg_titles
            height 100%
            width calc(60% - 5px)
            text-align left
            .dimg_titlesa
              margin-top 38px
              font-size 16px
              font-family 'MicrosoftYaHei'
              color #fff
            .dimg_titlesb
              margin-top 10px
              font-size 16px
              font-family 'MicrosoftYaHei'
              color #fff

      .detail_next
        height 100%
        width 30px
        position relative
        .next_img
          width 13px
          height 22px
          cursor pointer
          background url(next.png)

    .rb_paper
      height 216px
      width 98%
      margin-left 2px
      .rb_papera
        vertical-align top
        height 100%
        width calc(40% - 3px)
        border 10px solid #0f2747
      .rb_paperb
        height 100%
        width calc(60% - 2px)
        border 10px solid #0f2747
      .hot_p
        color #6ee4ff
        text-indent 10px
        font-family 'MicrosoftYaHei'
        font-size 18px
        text-align left
        line-height 30px
      .hot_detail
        height calc(100% - 40px)
        width calc(100% - 20px)
        margin auto
      .hot_box
        height calc(100% / 5)
        width 100%
        padding 3px 0
        position relative
        li
        line-height 31.2px
        font-size 14px
      .hot_img
        height 28px
        width 28px
        background url(../../../static/fire.png) center / cover
      .hot_txt
        height 31.2px
        width 70%
        vertical-align top
        text-align left
        text-indent 1em
        color #5592dc
      .hot_sours
        height 31.2px
        width calc(30% - 60px)
        vertical-align top
        color #376297
    #rb_echart
      height calc(100% - 376px)
      width 98%

</style>
