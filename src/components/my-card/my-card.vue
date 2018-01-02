<template>
  <div class="card_wrapper clearfix">
    <div class="left float_left">
      <div :style="icon_color" class="icon center" :class="todo.icon"></div>
    </div>
    <div class="right float_left">
      <div class="time">05-19 14:51:01 <span class="has_r">已读</span></div>
      <div class="card">
        <div class="title" :style="title_color">{{todo.name}}</div>
        <div class="content">
          <p v-if="todo.info_type" class="clearfix"><span class="name float_left">信息类别:</span><span class="val">{{todo.info_type}}</span></p>
          <p v-if="todo.report_title" class="clearfix"><span class="name float_left">报送标题:</span><span class="val">{{todo.report_title}}</span></p>
          <p v-if="todo.report_org" class="clearfix"><span class="name float_left">报送单位:</span><span class="val">{{todo.report_org}}</span></p>
          <p v-if="todo.connect_local" class="clearfix"><span class="name float_left">事关地:</span><span class="val">{{todo.connect_local}}</span></p>
          <p v-if="todo.task" class="clearfix"><span class="name float_left">处置任务:</span><span class="val">{{todo.task}}</span></p>
          <p v-if="todo.from" class="clearfix"><span class="name float_left">任务来源:</span><span class="val">{{todo.from}}</span></p>
          <p v-if="todo.obligation" class="clearfix"><span class="name float_left">落实责任:</span><span class="val">{{todo.obligation}}</span></p>
          <p v-if="todo.deadline" class="clearfix"><span class="name float_left">反馈期限:</span><span class="val">{{todo.deadline}}</span></p>
          <!--任务督办-->
          <p v-if="todo.supervise" class="clearfix"><span class="name float_left">督办内容:</span><span class="val">{{todo.supervise}}</span></p>
          <!--舆情处置-->
          <p v-if="todo.score" class="clearfix"><span class="name float_left">信息采分:</span><span class="val red">{{todo.score}}分</span></p>
          <p v-if="todo.comment" class="clearfix"><span class="name float_left">最近评语:</span><span class="val">{{todo.comment}}</span></p>
          <p v-if="todo.feedback_time" class="clearfix"><span class="name float_left">反馈时间:</span><span class="val">{{todo.feedback_time}}</span></p>
          <p v-if="todo.feedback_content" class="clearfix"><span class="name float_left">反馈内容:</span><span class="val">{{todo.feedback_time}}</span></p>
          <!--日志-->
          <p v-if="todo.note_name" class="clearfix"><span class="name float_left">{{todo.note_name}}</span></p>
          <p v-if="todo.finished_today" class="clearfix"><span class="name float_left">今日完成的工作:</span><span class="val">{{todo.finished_today}}</span></p>
          <p v-if="todo.not_finished_today" class="clearfix"><span class="name float_left">未完成的工作:</span><span class="val">{{todo.not_finished_today}}</span></p>
          <p v-if="todo.coordinate" class="clearfix"><span class="name float_left">需协调的工作:</span><span class="val">{{todo.coordinate}}</span></p>
          <!--值班提醒-->
          <p v-if="todo.duty_hour"class="clearfix"><span class="name float_left">值班时间:</span><span class="val">{{todo.duty_hour}}</span></p>
          <p v-if="todo.duty_role"class="clearfix"><span class="name float_left">值班权限:</span><span class="val">{{todo.duty_role}}</span></p>
        </div>
        <div class="bottom">
          <!--四种状态 待定 处置任务、任务督办、处置审批、研判审批、舆情处置、处置审核（有） 日志、值班提醒（无）-->
          <span class="item blur">已签收</span>
          <span class="item blur">已反馈</span>
          <span class="item blur">已同意</span>
          <span class="item blur">已转舆情处置</span>
          <span class="item orange">待签收</span>
          <span class="item orange">待转舆情处置</span>
          <span class="item orange">待反馈</span>
          <span class="item orange">待审批</span>
          <a href="#/business" class="detail float_right pointer">查看详情<span class="iconfont icon-xiangyoujiantou" style="font-size: 12px"></span></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['todo'],
    data () {
      return {}
    },
    methods: {},
    computed: {
      icon_color () {
        return {
          background: this.todo.icon_bg
        }
      },
      title_color () {
        return {
          background: this.todo.title_bg
        }
      }
    },
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .card_wrapper
    width 70%
    margin-bottom 20px
    font-size $font-size-medium
    &:hover
      .card, .icon
        box-shadow 0 0 10px 0 #b8b8b8
    .left
      width 8%
      .icon
        width 40px
        height 40px
        line-height 40px
        background $color-sub-theme
        margin 0 auto
        color $color-text
        font-size $font-size-large
        border-radius 50%
        margin-top 36px
    .right
      width 92%
      .time
        height 36px
        line-height 36px
        padding-left 20px
        color #888888
      .card
        border-radius 8px
        overflow hidden
        background $color-background-d
        border 1px solid #CCCCCC
        .title
          height 36px
          line-height 36px
          color #fffefe
          font-size $font-size-medium
          padding-left 20px
          background #6598ea
        .content
          padding 5px 20px
          line-height 1.6
          .name
            padding-right 10px
            color #888888
          .val
            display block
            overflow hidden
            margin-right 40px
            &.red
              color red
        .bottom
          height 36px
          line-height 36px
          margin 0 20px
          border-top 1px solid #cccccc
          .item
            margin-right 10px
          .blur
            color #4677c7
          .orange
            color #ff8600
          .detail
            color $color-text-ll
            &:hover
              text-shadow 0 0 1px $color-text-ll

</style>
