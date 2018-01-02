<template>
  <div class="wrapper clearfix">
    <div class="calendar_wrapper float_left">
      <div class="toggle_wrapper clearfix">
        <div class="year_wrapper float_left">
          <span class="prev iconfont icon-zuo1 pointer" @click="reduceYear"></span>
          <span class="year">{{year}}</span>
          <span class="next iconfont icon-you1 pointer" @click="addYear"></span>
          年
        </div>
        <div class="month_wrapper float_left">
          <span class="prev iconfont icon-zuo1 pointer" @click="reduceMonth"></span>
          <span class="months">
            <span v-for="m in monthsArr" :class="{currentmonth: m == month}" class="month pointer"
                  @click="changeMonth($event, m)">{{m+1}}</span>
          </span>
          <span class="next iconfont icon-you1 pointer" @click="addMonth"></span>
          <span>月</span>
        </div>
        <div class="range_wrapper">
          <span class="pointer" @click="toggleDcolor(true)" :class="{deepcolor: isSingleDay}">单日</span>
          <span class="pointer" @click="toggleDcolor(false)" :class="{deepcolor: !isSingleDay}">区间</span>
          <span class="interval" v-show="end_time&&begin_time">(范围：{{begin_time | formatTime}}至{{end_time | formatTime}})</span>
        </div>
      </div>
      <div class="date_container clearfix">
        <div v-for="(week, index) in 6" class="weeks">
          <ul class="days clearfix">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
          </ul>
          <ul class="dates clearfix">
            <li class="pointer"
                :class="{gray:d.day === '', currentday:d.time==(new Date(realYear, realMonth, realDate)).getTime(), selectday: (d.time - begin_time)>=0&&(end_time - d.time)>=0, dialog: (d.time == begin_time)}"
                v-for="d in daysArr.slice(index*7, (index+1)*7)" @click="selectTime($event, d)">{{d.date_i}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="besure center float_right pointer" @click="hideCalendar">确定</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  import {getMonthDays, selectTime, addMonth, reduceMonth, changeMonth, addYear, reduceYear} from 'common/js/calendar'
  import {mapState} from 'vuex'
  export default {
    props: {},
    data () {
      return {
        realMonth: null,
        realDate: null,
        realYear: null,
        date: null,
        month: null,
        year: null,
        daysArr: [],
        monthsArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        isSingleDay: false
      }
    },
    created () {
      this._initTimes()
      getMonthDays(this.year, this.month, this)
    },
    methods: {
      // 初始化当前时间数据
      _initTimes () {
        let nowTime = new Date()
        // 今年
        this.year = nowTime.getFullYear()
        this.realYear = nowTime.getFullYear()
        // 今月 从0开始
        this.realMonth = nowTime.getMonth()
        this.month = nowTime.getMonth()
        // 今日
        this.date = nowTime.getDate()
        this.realDate = nowTime.getDate()
      },
      // 使当前月份加
      addMonth () {
        addMonth(this)
      },
      // 使当前月份减
      reduceMonth () {
        reduceMonth(this)
      },
      // 点击修改月份
      changeMonth (event, m) {
        changeMonth(this, event, m)
      },
      // 使年份加
      addYear () {
        addYear(this)
      },
      // 使年份减
      reduceYear () {
        reduceYear(this)
      },
      // 选择时间
      selectTime (event, i) {
        selectTime(this, event, i)
      },
      toggleDcolor (val) {
        this.isSingleDay = val
      },
      hideCalendar () {
        this.$emit('hideCalendar')
      }
    },
    components: {},
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

  .wrapper
    width 100%
    min-width 768px
    font-size 0
    color #5793DC
    background url(calendar.png) left top / 100% 100%
    overflow: hidden
    padding 0 10px 10px 35px
    .besure
      height 60px
      line-height 60px
      width 120px
      font-weight bold
      border 1px solid #3A5D97
      font-size $font-size-large-x
      background #244A8B
      color $color-text
      margin-top 52px
      position relative
      &:before
        content ''
        top 1px
        left 1px
        border-top 7px solid #0D2048
        border-left 8px solid #0D2048
        border-bottom 7px solid transparent
        border-right 8px solid transparent
        position absolute

    .calendar_wrapper
      width calc(100% - 120px)
      .toggle_wrapper
        overflow hidden
        height 50px
        line-height 50px
        font-size 16px
        .year_wrapper
          margin-right 50px
          .year
            font-size 20px
            margin 0 6px
            font-weight 600
        .month_wrapper
          .month
            padding 0 3px
          .currentmonth
            font-size 20px
            font-weight 600
      .range_wrapper
        float right
        margin-right 10px
        .deepcolor
          font-weight bold
          margin 0 5px
        .interval
          margin-left 20px
      .date_container
        .weeks
          float left
          width calc(16.9% - 12px)
          font-size 15px
          box-sizing border-box
          border 1px solid #244674
          margin-right 7px
          padding 1px
          li
            text-align center
            float left
            width calc(14% - 4px)
            box-sizing: border-box
            margin 0 2px
            line-height 30px
            height 30px
          .dates
            .gray
              color #62A6BD
              pointer-events none
            .selectday:not(.gray)
              background rgba(34, 167, 234, .5)
              border-radius 3px
              color $color-text
              position relative
            .currentday:not(.gray)
              background #23A8ED
              color $color-text
              border-radius 3px
              position relative
            .dialog:after
              content '请选择时间'
              display block
              position absolute
              background rgba(0, 0, 0, .7)
              font-size 14px
              border-radius 4px
              bottom 58px
              left -10px
              background #244A8B
              white-space nowrap
              width 90px
            .dialog:before
              content ''
              width 0
              display block
              position absolute
              top -28px
              left 5px
              border 5px solid transparent
              border-top 5px solid #244A8B

</style>
