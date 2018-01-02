<template>
  <div class="wrap">
    <!--@mouseenter="isShow = true" @mouseleave="isShow = false"-->
    <span class="iconfont icon-rili"><input @focus="isShow = true" @blur="hide" type="text"
                                            :value='timeMsg?timeMsg:timeType'
                                            class="time"/></span>
    <transition name="slide">
      <div class="time_checka" v-show="isShow">
        <ul class="timea_title">
          <li class="timea_detail dislockline">
            <span>{{years}}</span><span>年</span><span>{{month}}</span><span>月</span>
          </li>
          <li class="timea_change dislockline clearfix">
            <span @click="mounthdown()" class="iconup dislockline iconfont icon-less pointer float_left"
                  style="font-size:20px;"></span>
            <span @click="mounthup()" class="icondown dislockline iconfont icon-more_unfold pointer float_left"
                  style="font-size:20px;"></span>
          </li>
        </ul>
        <ul class="time_xq clearfix">
          <li class="dislockline float_left">一</li>
          <li class="dislockline float_left">二</li>
          <li class="dislockline float_left">三</li>
          <li class="dislockline float_left">四</li>
          <li class="dislockline float_left">五</li>
          <li class="dislockline float_left">六</li>
          <li class="dislockline float_left">日</li>
        </ul>
        <ul class="time_magic clearfix">
          <li class="dislockline float_left" v-for="(a,i) in datenum"
              :class="{ischeack:i==today&&todayYear==years&&todayMonth==month,notmonth:i<todayindex||i>enddindex}"
              @click="sendTime(a,i)">{{a}}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['timeType', 'color'],
    data () {
      return {
        date: '',
        today: '',
        todayYear: '',
        todayMonth: '',
        todayindex: '',//记录当前实际月份第一天数组中的索引
        enddindex: '',//记录当前实际月份最后一天数组中的索引
        start: '',//记录本月第一天的索引
        end: '',//记录本月最后一天的索引
        monthlong: '',//本月天数长度
        propMlong: '',
        years: '',
        month: '',
        datenum: [],
        timeMsg: '',
        isShow: false
      }
    },
    mounted(){
      this.date = new Date();
      this.todayYear = this.date.getFullYear();
      this.todayMonth = this.date.getMonth() + 1;
      this.years = this.date.getFullYear();
      this.month = this.date.getMonth() + 1;
      this.today = new Date(this.years, this.month - 1, 1).getDay() - 1;
      if (this.today == -1) {
        this.today = 6
      }
      ;
      this.today = this.today + this.date.getDate() - 1;
      this.getTime();
    },
    methods: {
      sendTime(e, i){
        if (e < 10) {
          e = '0' + e;
        }
        if (i < this.start) {
          if (this.month > 1 && this.month < 10) {
            this.timeMsg = this.years + '-0' + (this.month - 1) + '-' + e;
          } else if (this.month == 10) {
            this.timeMsg = this.years + '-09' + '-' + e;
          } else if (this.month > 10) {
            this.timeMsg = this.years + '-' + (this.month - 1) + '-' + e;
          } else {
            this.timeMsg = this.years - 1 + '-' + 12 + '-' + e;
          }
        } else if (i > this.enddindex) {
          if (this.month == 12) {
            this.timeMsg = this.years + 1 + '-01' + '-' + e;
          } else if (this.month < 9) {
            this.timeMsg = this.years + '-0' + (this.month + 1) + '-' + e;
          } else {
            this.timeMsg = this.years + '-' + (this.month + 1) + '-' + e;
          }
        } else {
          if (this.month < 10) {
            this.timeMsg = this.years + '-0' + this.month + '-' + e
          } else {
            this.timeMsg = this.years + '-' + this.month + '-' + e
          }
        }
        this.$emit('timeStr', this.timeMsg)
        this.isShow = false
      },
      getTime(){
        let d = new Date();
        d.setYear(this.years);
        d.setMonth(this.month - 1);
        d.setDate(1);
        this.start = d.getDay() - 1;
        if (this.start == -1) {
          this.start = 6
        }
        ;
        this.monthlong = new Date(this.years, this.month, 0).getDate();
        this.propMlong = new Date(this.years, this.month - 1, 0).getDate();
        this.todayindex = new Date(this.years, this.month - 1, 1).getDay() - 1;
        if (this.todayindex == -1) {
          this.todayindex = 6
        }
        ;
        this.enddindex = new Date(this.years, this.month, 0).getDate() - 1 + this.todayindex;
        this.makeTime();
      },
      makeTime(){
        let j = 1;
        for (let i = this.start; i < this.start + this.monthlong; i++) {
          this.datenum[i] = j;
          j++;
        }
        j = 1;
        for (var i = this.start + this.monthlong; i < 42; i++) {
          this.datenum[i] = j;
          j++;
        }
        let plong = this.propMlong
        for (var i = this.start - 1; i >= 0; i--) {
          this.datenum[i] = plong;
          plong--
        }
      },
      mounthdown(){
        if (this.month > 1) {
          this.month--
        } else if (this.month == 1) {
          this.month = 12
          this.years--
        }
        this.getTime()
      },
      mounthup(){
        if (this.month == 12) {
          this.month = 1
          this.years++
        } else if (this.month >= 1) {
          this.month++
        }
        this.getTime()
      },
      /*      changeTime () {
       this.isShow = !this.isShow
       }*/
      hide() {
        window.setTimeout(() => {
          this.isShow = false
        }, 200)
      }
    },
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .wrap
    display inline-block
    margin 0 -5px
    .time
      font-size 14px
      width 74px
      color $color-text-ll
    .iconfont
      font-size 14px

  .time_checka
    height 330px
    width 310px
    left -1px
    top 38px
    z-index 999
    border-radius 5px
    box-shadow 0 0 10px 0 #cccccc
    background #ffffff
    transform-origin top
    transform-style preserve-3d
    position absolute
    padding 5px 15px
    &.slide-enter-active, &.slide-leave-active
      transition all .5s cubic-bezier(.26, .76, .26, 1.02)
    &.slide-enter, &.slide-leave-active
      transform rotateX(90deg)
      opacity 0

  .timea_title
    position relative
    height 40px
    line-height 40px

  .timea_detail
    font-size 17px
    line-height 20px

  .timea_change
    position absolute
    right 0
    width 80px
    line-height 40px

  .iconup
    width 40px
    text-align center

  .icondown
    width 40px
    text-align center

  .time_xq
    width 100%
    height 40px
    line-height 40px
    li
      width 40px
      text-align center

  .time_magic
    li
      width calc(100% / 7)
      text-align center
      cursor pointer
      height 40px
      border 2px solid transparent
      line-height 40px
      position relative
    li:hover
      border 2px solid #828282

  .ischeack
    background #0078d7
    font-size 16px
    color #ffffff

  .ischeack:hover
    border 2px solid #66aee7 !important

  .ischeack:before
    content ''
    height 32px
    width 32px
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    border 1px solid #fff

  .notmonth
    color #bbb
</style>
