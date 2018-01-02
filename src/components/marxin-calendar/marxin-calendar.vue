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
            <span class="month pointer"
                  @click="changeMonth($event, m)">{{month +1}}</span>
          </span>
          <span class="next iconfont icon-you1 pointer" @click="addMonth"></span>
          <span>月</span>
        </div>
        <div class="range_wrapper">
          <span class="pointer" @click="toggleDcolor(true)" :class="{deepcolor: isSingleDay}">单日</span>
          <span class="pointer" @click="toggleDcolor(false)" :class="{deepcolor: !isSingleDay}">区间</span>
        </div>
      </div>
      <div class="date_container clearfix">
        <div class="weeks">
          <ul class="days clearfix">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
          </ul>
          <ul v-for="(week, index) in 6" class="dates clearfix">
            <li class="pointer"
                :class="{gray:d.day === '', currentday:d.time==(new Date(realYear, realMonth, realDate)).getTime(), selectday: (d.time - begin_time)>=0&&(end_time - d.time)>=0, dialog: (d.time == begin_time)}"
                v-for="d in daysArr.slice(index*7, (index+1)*7)" @click="selectTime($event, d)">{{d.date_i}}
            </li>
          </ul>
        </div>
      </div>
    </div>
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
    font-size 0
    color #5793DC
    overflow: hidden
    padding 10px

    .calendar_wrapper
      width 100%
      .toggle_wrapper
        overflow hidden
        height 30px
        padding-left 28px
        line-height 30px
        font-size 14px
        .year_wrapper
          margin-right 20px
          .year
            font-size 16px
            font-weight 600
        .month_wrapper
          .month
            padding 0
      .range_wrapper
        float right
        margin-right 10px
        .deepcolor
          font-weight bold
          margin 0 5px
        .interval
          margin-left 20px
      .date_container
        width 100%
        .weeks
          float left
          width 100%
          font-size 15px
          box-sizing border-box
          margin-right 7px
          padding 1px
          li
            text-align center
            float left
            width calc(14% - 4px)
            box-sizing: border-box
            margin 1px 2px
            line-height 35px
            height 35px
            @media screen and (max-width 1366px)
              &
                line-height 24px
                height 24px
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
              bottom 41px
              left -10px
              background rgba(36, 74, 139, .5)
              white-space nowrap
              width 90px
              @media screen and (max-width 1366px)
                &
                  bottom 29px
            .dialog:before
              content ''
              width 0
              display block
              position absolute
              top -6px
              left 5px
              border 5px solid transparent
              border-top 5px solid rgba(36, 74, 139, .5)
              @media screen and (max-width 1366px)
                &
                  top -8px
</style>
