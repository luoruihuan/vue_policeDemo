<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <div v-show='showOnce' class="once">
      <div class="sign">
        <div class="title">
          待签收
        </div>
        <ul class="card_wrapper clearfix">
          <li class="card float_left notice"><span class="title">通知通告</span><span class="num">43,052</span></li>
          <li class="card float_left task"><span class="title">我的任务</span><span class="num">2,199</span></li>
          <li class="card float_left do"><span class="title">任务督办</span><span class="num">1,052</span></li>
          <li class="card float_left remind"><span class="title">值班提醒</span><span class="num">50,062</span></li>
        </ul>
        <div class="title">
          待处置
        </div>
        <ul class="card_wrapper clearfix">
          <li class="card float_left info"><span class="title">信息初审</span><span class="num">198</span></li>
          <li class="card float_left judge"><span class="title">线索研判</span><span class="num">40</span></li>
          <li class="card float_left m_task"><span class="title">处置任务</span><span class="num">310</span></li>
          <li class="card float_left review"><span class="title">审核审批</span><span class="num">308</span></li>
        </ul>
      </div>
      <div class="bottom clearfix">
        <div class="data float_left">
          <div class="report clearfix">
            <div class="num_wrapper float_left">
              <div class="ring">
                <ring :circleCss="report_circleCss">
                  <span slot="text">本地上报</span>
                </ring>
              </div>
              <div class="count center">21,069</div>
            </div>
            <div class="rate_wrapper">
              <div class="left float_left center">
                <div class="ring">
                  <ring :circleCss="has_circleCss" :rate="0.42">
                    <span slot="text" class="iconfont icon-duigou" style="font-size: 44px"></span>
                  </ring>
                </div>
                <div class="num"><span class="bold">95</span>条</div>
                <div class="rate">被采分率<span class="bold">42<span class="m">%</span></span></div>
              </div>
              <div class="right float_left center">
                <div class="ring">
                  <ring :circleCss="not_has_circleCss" :rate="0.58">
                    <span slot="text" class="iconfont icon-jian" style="font-size: 44px"></span>
                  </ring>
                </div>
                <div class="num"><span class="bold">33</span>条</div>
                <div class="rate">未采率<span class="bold">58<span class="m">%</span></span></div>
              </div>
            </div>
          </div>
          <div class="report clearfix">
            <div class="num_wrapper float_left">
              <div class="ring">
                <ring :circleCss="report_circleCss">
                  <span slot="text">单位任务</span>
                </ring>
              </div>
              <div class="count center">21,069</div>
            </div>
            <div class="rate_wrapper">
              <div class="left float_left center">
                <div class="ring">
                  <ring :circleCss="has_circleCss" :rate="0.88">
                    <span slot="text" class="iconfont icon-duigou" style="font-size: 44px"></span>
                  </ring>
                </div>
                <div class="num"><span class="bold">71</span>项</div>
                <div class="rate">已完成<span class="bold">88<span class="m">%</span></span></div>
              </div>
              <div class="right float_left center">
                <div class="ring">
                  <Ring :circleCss="not_has_circleCss" :rate="0.12">
                    <span slot="text" class="iconfont icon-jian" style="font-size: 44px"></span>
                  </Ring>
                </div>
                <div class="num"><span class="bold">12</span>项</div>
                <div class="rate">未完成<span class="bold">12<span class="m">%</span></span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="calendar_wrapper">
          <div class="border">
            <div class="c_header clearfix">
              <div class="t float_left">{{Math.floor(hourTime) | dbMinute}}</div>
              <div class="t float_left">{{Math.floor(minuteTime) | dbMinute}}</div>
              <div class="p float_left">值班人员</div>
              <div class="n float_right center"><span class="c center pointer">刘佳</span><br/><span>刘佳</span></div>
              <div class="n float_right center"><span class="c center pointer">陈林</span><br/><span>陈林</span></div>
            </div>
            <div class="set">
              {{realYear}}-{{realMonth+1 | dbMinute}}-{{realDate}} 星期{{day | numToC}}&nbsp;&nbsp;&nbsp;{{realMonth |
              mNumToC}}月{{realDate | dNumToC}}
              <span class="per float_right center pointer">设置调度员</span>
            </div>
            <div class="calendar">
              <ul class="change_nav clearfix">
                <li class="float_left nav the_year">
                  <span class="prev iconfont icon-xiangzuojiantou pointer" @click="reduceYear" style="font-size: 12px"></span>
                  <span class="year">{{year}}年</span>
                  <span class="next iconfont icon-xiangyoujiantou pointer" @click="addYear" style="font-size: 12px"></span>
                </li>
                <li class="float_left nav the_month">
                  <span class="prev iconfont icon-xiangzuojiantou pointer" @click="reduceMonth" style="font-size: 12px"></span>
                  <span class="months">{{month+1 | dbMinute}}月</span>
                  <span class="next iconfont icon-xiangyoujiantou pointer" @click="addMonth" style="font-size: 12px"></span>
                </li>
                <!--<li class="float_left nav plan">假期安排</li>-->
                <li class="float_right nav back_today">返回今天</li>
              </ul>
              <div class="date_container clearfix">
                <ul class="days clearfix">
                  <li class="float_left d center">一</li>
                  <li class="float_left d center">二</li>
                  <li class="float_left d center">三</li>
                  <li class="float_left d center">四</li>
                  <li class="float_left d center">五</li>
                  <li class="float_left d center red">六</li>
                  <li class="float_left d center red">日</li>
                </ul>
                <div v-for="(week, index) in 6">
                  <ul class="dates clearfix">
                    <li class="pointer float_left date center"
                        :class="{gray:d.day === '', current_day:d.time==(new Date(realYear, realMonth, realDate)).getTime()}"
                        v-for="d in daysArr.slice(index*7, (index+1)*7)">{{d.date_i}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--三种权限对应不同的内容-->
    <condition v-show='!showOnce'>
      <!--处置员-->
      <tr v-if="false" slot="row1" class="row">
        <td class="one">待办类型</td>
        <td class="two" style="width: 91%">
          <span class="type pointer">全部</span>
          <span class="type pointer blue">处置任务</span>
          <span class="type pointer">值班提醒</span>
          <span class="type pointer">日志</span>
        </td>
      </tr>
      <!--调度员-->
      <tr v-if="false" slot="row1" class="row">
        <td class="one">待办类型</td>
        <td class="two" style="width: 91%">
          <span class="blue type pointer">全部</span>
          <span class="type pointer">舆情研判</span>
          <span class="type pointer">值班提醒</span>
          <span class="type pointer">日志</span>
        </td>
      </tr>
      <!--领导-->
      <tr slot="row1" class="row">
        <td class="one">待办类型</td>
        <td class="two" style="width: 91%">
          <span v-for="(k , index) in todo_arr" @click="changeColor($event,k)" class="type pointer" :class="{blue:k===c_todo}">{{k}}</span>
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">搜索</td>
        <td class="two" style="width: 91%">
          <select v-model="condition_data.searchArea" style="width: 60px" class="company" name="searchArea">
            <option v-for="option in searchArea_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
          <input class="keywords" name="searchContent" v-model="condition_data.searchContent" type="text">
          <span class="type blue pointer">搜索</span>
        </td>
      </tr>
    </condition>
    <div v-show='!showOnce' class="lists_wrapper">
      <my-card v-for="(todo, index) in todos" :todo="todo" :key="index"></my-card>
      <!--<page-turn :totalPage="totalPage"></page-turn>-->
    </div>
    <to-top></to-top>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getMonthDays, addMonth, reduceMonth, addYear, reduceYear} from 'common/js/calendar'

  import Position from 'components/position/position'
  import Ring from 'components/circle/circle'
  import PageTurn from 'components/page-turn/page-turn'
  import Condition from 'components/condition/condition'
  import ToTop from 'components/to-top/to-top'
  import MyCard from 'components/my-card/my-card'
  export default {
    props: {},
    data () {
      return {
        realMonth: null,
        realDate: null,
        realYear: null,
        date: null,
        day: null,
        month: null,
        year: null,
        day:null,
        secondTime: null,
        minuteTime: null,
        hourTime: null,
        daysArr: [],
        totalPage: 40,
        showOnce: true,
        keep: true,
        p_arr: ['工作台', '我的待办'],
        report_circleCss: {
          // 环形的大小
          circle_scale: 130,
          // 内环的宽度
          innerC_width: 1,
          // 内环已完成部分的颜色
          borderColor_on: '#EDEDEF',
          // 内环未完成部分的颜色
          borderColor_off: '#EDEDEF',
          // 外环的颜色
          outC_color: '#FFCCCC',
          // 外环的宽度
          outC_width: 0,
          color: '#fff',
          font_size: '30px',
          font_family: '方正兰亭超细黑简体'
        },
        has_circleCss: {
          // 环形的大小
          circle_scale: 98,
          // 内环的宽度
          innerC_width: 6,
          // 内环已完成部分的颜色
          borderColor_on: '#2cd071',
          // 内环未完成部分的颜色
          borderColor_off: '#ededef',
          // 外环的颜色
          outC_color: '#2cd071',
          // 外环的宽度
          outC_width: 2,
          // 完成率
          color: '#2cd071',
          font_size: '30px',
          font_family: '方正兰亭超细黑简体'
        },
        not_has_circleCss: {
          // 环形的大小
          circle_scale: 98,
          // 内环的宽度
          innerC_width: 6,
          // 内环已完成部分的颜色
          borderColor_on: '#fe5d41',
          // 内环未完成部分的颜色
          borderColor_off: '#ededef',
          // 外环的颜色
          outC_color: '#fe5d41',
          // 外环的宽度
          outC_width: 2,
          // 完成率
          color: '#fe5d41',
          font_size: '30px',
          font_family: '方正兰亭超细黑简体'
        },
        todos: [
          {
            name: '处置任务',
            icon: 'iconfont icon-juxing60',
            icon_bg: '#5587d7',
            title_bg: '#6598ea',
            info_type: '【政治安全】涉及领导人信息',
            report_title: '克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法',
            report_org: '深圳市局（张三）',
            connect_local: '深圳 惠州',
            task: '【落地调查】查身份',
            from: '省厅',
            obligation: '深圳市局（王五）',
            deadline: '05-19 14:51:01',
            comment: '请转研判，信息核查'
          },
          {
            name: '任务督办',
            icon: 'iconfont icon-shandian',
            icon_bg: '#5587d7',
            title_bg: '#6598ea',
            info_type: '【政治安全】涉及领导人信息',
            report_title: '克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法',
            report_org: '深圳市局（张三）',
            connect_local: '深圳 惠州',
            task: '【落地调查】查身份',
            from: '省厅',
            obligation: '深圳市局（王五）',
            deadline: '05-19 14:51:01',
            comment: '请转研判，信息核查',
            supervise: '快点,快点反馈'
          },
          {
            name: '舆情处置',
            icon: 'iconfont icon-jiaochabiao-',
            icon_bg: '#5587d7',
            title_bg: '#6598ea',
            info_type: '【政治安全】涉及领导人信息',
            report_title: '克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法',
            report_org: '深圳市局（张三）',
            connect_local: '深圳 惠州',
            score: '5',
            comment: '请转研判，信息核查'
          },
          {
            name: '处置审核',
            icon: 'iconfont icon-jiaochabiao-',
            icon_bg: '#5587d7',
            title_bg: '#6598ea',
            info_type: '【政治安全】涉及领导人信息',
            report_title: '克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法',
            report_org: '深圳市局（张三）',
            connect_local: '深圳 惠州',
            comment: '请转研判，信息核查',
            feedback_time: '05-21 14:51:01',
            feedback_content: '这个人已查办'
          },
          {
            name: '研判审批',
            icon: 'iconfont icon-shenhe',
            icon_bg: '#5587d7',
            title_bg: '#6598ea',
            info_type: '【政治安全】涉及领导人信息',
            report_title: '克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法',
            report_org: '深圳市局（张三）',
            connect_local: '深圳 惠州',
            task: '【落地调查】查身份',
            from: '省厅',
            obligation: '深圳市局（王五）',
            deadline: '05-19 14:51:01',
            comment: '请转研判，信息核查'
          },
          {
            name: '处置审批',
            icon: 'iconfont icon-shenhe',
            icon_bg: '#5587d7',
            title_bg: '#6598ea',
            info_type: '【政治安全】涉及领导人信息',
            report_title: '克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法克州召开严厉打击非法占用林地等涉林违法',
            report_org: '深圳市局（张三）',
            connect_local: '深圳 惠州',
            task: '【落地调查】查身份',
            from: '省厅',
            obligation: '深圳市局（王五）',
            deadline: '05-19 14:51:01',
            comment: '请转研判，信息核查',
            feedback_time: '05-21 14:51:01',
            feedback_content: '这个人已查办'
          },
          {
            name: '日志',
            icon: 'iconfont icon-gongzuorizhi',
            icon_bg: '#2cc59d',
            title_bg: '#5ac8ab',
            note_name: '王小二的日志',
            finished_today: '对于网页而言,视觉信息的传达至关重要.用户通过页面获取信息,文字、图片、图标、钮、表单等UI元素都承载着不同类型的信息。',
            not_finished_today: '在这其中，文字的作用尤其巨大。排版设计的时候，对于文本内容的处理。',
            coordinate: '占据了相当大的比例。'
          },
          {
            name: '值班提醒',
            icon: 'iconfont icon-naozhong1',
            icon_bg: '#fe943e',
            title_bg: '#f6a563',
            duty_hour: '05-19 14:51:01——05-20 14:51:01',
            duty_role: '审批领导'
          }
        ],
        condition_data:{},
        searchArea_arr:[
          { text: '全部', value: '全部' },
          { text: '本省', value: '本省' },
          { text: '本地', value: '本地' },
          { text: '本单位', value: '本单位' }
        ],
        todo_arr:['全部','审批','值班提醒','日志'],
        c_todo:'全部'
      }
    },
    created () {
      this._count()
      this._initTime()
      this.keep = false
      this.showOnce = true
      this.defaultChecked()
    },
    mounted () {
    },
    activated () {
      // 如果触发过created
      if (!this.keep) {
        this.showOnce = true
        this.keep = true
      } else { // 如果没有触发过created
        this.keep = true
        this.showOnce = false
      }
    },
    methods: {
      _initTime () {
        let nowTime = new Date()
        // 今年
        this.year = nowTime.getFullYear()
        this.realYear = nowTime.getFullYear()
        this.day = nowTime.getDay()
        // 今月 从0开始
        this.realMonth = nowTime.getMonth()
        this.month = nowTime.getMonth()
        // 今日
        this.date = nowTime.getDate()
        this.realDate = nowTime.getDate()
        // 这个月最后一天
        getMonthDays(this.year, this.month, this)
      },
      _count () {
        setInterval(() => {
          var timer = new Date() // 获取当前时间。
          this.secondTime = timer.getSeconds() // 获取当前秒数。
          this.minuteTime = timer.getMinutes() + this.secondTime / 60 // 获取当前分数。
          this.hourTime = timer.getHours() + this.minuteTime / 60 // 获取当前小时数。
        }, 1000)
      },
      // 使当前月份加
      addMonth () {
        addMonth(this)
      },
      // 使当前月份减
      reduceMonth () {
        reduceMonth(this)
      },
      // 使年份加
      addYear () {
        addYear(this)
      },
      // 使年份减
      reduceYear () {
        reduceYear(this)
      },
      changeColor(e,i){
        this.c_todo = i
        this.condition_data.todoType = i
        console.log(this.condition_data)
      },
      defaultChecked(){
        this.condition_data.todoType = '全部'
        this.condition_data.searchArea = this.searchArea_arr[0].value
      }
    },
    components: {
      Position,
      Ring,
      PageTurn,
      Condition,
      ToTop,
      MyCard
    },
    filters: {
      dbMinute (val) {
        if (val < 10) {
          return '0' + val
        } else {
          return val
        }
      },
      numToC (val) {
        if (val === 0) return '日'
        if (val === 1) return '一'
        if (val === 2) return '二'
        if (val === 3) return '三'
        if (val === 4) return '四'
        if (val === 5) return '五'
        if (val === 6) return '六'
      },
      mNumToC (val) {
        if (val === 0) return '一'
        if (val === 1) return '二'
        if (val === 2) return '三'
        if (val === 3) return '四'
        if (val === 4) return '五'
        if (val === 5) return '六'
        if (val === 6) return '七'
        if (val === 7) return '八'
        if (val === 8) return '九'
        if (val === 9) return '十'
        if (val === 10) return '十一'
        if (val === 11) return '正'
      },
      dNumToC (val) {
        if (val === 1) return '一'
        if (val === 2) return '二'
        if (val === 3) return '三'
        if (val === 4) return '四'
        if (val === 5) return '五'
        if (val === 6) return '六'
        if (val === 7) return '七'
        if (val === 8) return '八'
        if (val === 9) return '九'
        if (val === 10) return '十'
        if (val === 11) return '十一'
        if (val === 12) return '十二'
        if (val === 13) return '十三'
        if (val === 14) return '十四'
        if (val === 15) return '十五'
        if (val === 16) return '十六'
        if (val === 17) return '十七'
        if (val === 18) return '十八'
        if (val === 19) return '十九'
        if (val === 20) return '二十'
        if (val === 21) return '二十一'
        if (val === 22) return '二十二'
        if (val === 23) return '二十三'
        if (val === 24) return '二十四'
        if (val === 25) return '二十五'
        if (val === 26) return '二十六'
        if (val === 27) return '二十七'
        if (val === 28) return '二十八'
        if (val === 29) return '二十九'
        if (val === 30) return '三十'
        if (val === 31) return '三十一'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .p
    padding-left 20px

  .lists_wrapper
    padding 20px 20px 70px 20px
    background #F9F9F9
    color #444444

  .once
    padding 0 20px 50px 20px
    .sign
      .title
        font-family 'MicrosoftYaHei'
        font-size $font-size-medium-xx
        color #1e2a39
        padding 20px 0
        &:first-child
          padding-top 10px
      .card_wrapper
        .card
          width 25%
          border 1px solid #cccccc
          border-left 1px solid #ededef
          border-right 1px solid #ededef
          text-align center
          background $color-background-d
          &:first-child
            border-left 1px solid #cccccc
            border-radius 3px 3px 0 0 / 3px 3px 0 0
          &:last-child
            border-right 1px solid #cccccc
            border-radius 0 3px 3px 0 / 0 3px 3px 0
          &:before
            content ''
            display block
            height 10px
          &.notice:before
            background #4EA8EC
          &.task:before
            background #05C1B3
          &.do:before
            background #4CA8ED
          &.remind:before
            background #05C1B3
          &.info:before
            background #87888A
          &.judge:before
            background #80A9EA
          &.m_task:before
            background #4677C7
          &.review:before
            background #325CA2
          .title, .num
            display block
          .title
            font-family 'SimSun'
            font-size $font-size-medium-x
            color $color-text-l
            padding 20px 0 12px 0
          .num
            font-size 36px
            font-family 'Bebas'
            color $color-text-d
            padding-bottom 20px

    .data
      width 60%
      margin 50px 10px 0 0
      .report
        border 1px solid #cccccc
        border-radius 4px
        margin-bottom 10px
        .num_wrapper
          width 33%
          position relative
          padding-top 51px
          padding-bottom 20px
          background $color-theme-d
          &:after
            content ''
            display block
            position absolute
            border 14px solid $color-background-d
            border-bottom 11px solid transparent
            border-top 11px solid transparent
            border-left 14px solid transparent
            right 0
            top 50%
            margin-top -12px
          .count
            font-size 36px
            font-family 'Bebas'
            color #EDEDEF
            padding 10px 0 50px 0
        .rate_wrapper
          overflow hidden
          background $color-background-d
          .left, .right
            width 50%
            padding 52px 0
            .num
              font-size $font-size-medium-x
              color $color-text-l
              font-family 'SimSun'
              padding-top 20px
              .bold
                font-size 36px
                font-weight bold
                font-family 'Bebas'
                color #353130
            .rate
              font-size $font-size-medium-x
              color $color-text-l
              font-family 'SimSun'
              padding 5px 0
              .bold
                font-family "Microsoft YaHei"
                font-size 24px
                font-weight bold
                color #fe5d4b
                .m
                  font-size $font-size-medium-x
                  font-weight bold
          .left
            .rate
              .bold
                color #2CD071
    .calendar_wrapper
      overflow hidden
      padding-top 50px
      .border
        border 1px solid #cccccc
        border-radius 4px
        .c_header
          background #58acff
          padding 20px 20px 20px 10px
          .t
            width 70px
            height 70px
            background linear-gradient(to bottom, #82C1FF, #58ACFF)
            box-shadow 2px 3px 8px 0 #478BCE
            text-align center
            line-height 70px
            font-size 40px
            padding 5px 0 0 6px
            font-family 'DISPLAY FREE TFB'
            margin-right 5px
            border-radius 4px
          .p
            line-height 70px
            font-family 'Simsun'
            margin-left 40px
            font-size $font-size-medium
            @media screen and (max-width 1280px)
              &
                margin-left 15px
          .n
            width 55px
            height 70px
            font-size $font-size-small
            line-height 2
            .c
              height 40px
              width 40px
              line-height 40px
              display inline-block
              border-radius 50%
              font-size $font-size-medium
              background $color-background-d
              color #58acff
        .set
          line-height 60px
          background #CDE6FF
          padding 0 10px
          color $color-text-d
          font-size $font-size-medium
          .per
            right 10px
            height 28px
            width 90px
            line-height 28px
            background $color-theme-d
            color $color-text
            margin-top 17px
        .calendar
          height 460px
          color $color-text-d
          padding 0 10px 0 10px
          .change_nav
            height 50px
            padding-top 12px
            .nav
              height 26px
              display inline-block
              line-height 26px
              font-size $font-size-medium
              border 1px solid #c8cacc
              padding 0 10px
              &.the_year, &.the_month
                margin-right 10px
              &.back_today
                background #f0f0f0

          .date_container
            border-top 1px solid #55aaff
            .days
              line-height 40px
              .d
                width 14.2%
                &.red
                  color #e02d2d
            .dates
              border-top 1px solid #c8cacc
              line-height 60px
              color #000000
              .date
                width 14.2%
                font-size $font-size-medium-xx
                &.current_day
                  background #ffbb00
                  color $color-text

</style>
