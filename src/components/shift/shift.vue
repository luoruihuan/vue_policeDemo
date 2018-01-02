<template>
  <div class="shift_wrap">
    <div class="add clearfix">
      <span class="float_right pointer" @click="modal=true">新增班次</span>
      <span class="iconfont icon-jia float_right pointer" @click="modal=true"></span>
    </div>
    <div class="content">
      <ul class="clearfix fontomit content_title">
        <li class="float_left center common_li title_shift com_shift">班次名称</li>
        <li class="float_left center common_li title_time com_time">上班时间</li>
        <li class="float_left center common_li title_operation com_operation">操作</li>
        <li class="float_left common_li"></li>
      </ul>
      <ul class="clearfix fontomit content_list" v-for="item in 5">
        <li class="float_left center common_li list_shift com_shift">白班</li>
        <li class="float_left center common_li list_time com_time">09:00-17:30</li>
        <li class="float_left center common_li list_operation com_operation iconfont icon-jilu"></li>
        <li class="float_left common_li list_delete">
          <span class="dislockline center pointer list iconfont icon-lajixiang"></span>
          <span class="dislockline center pointer list delete">删除</span>
        </li>
      </ul>
    </div>
    <modal :modal="modal" :width="600" v-on:hideModal="modal=false">
      <span slot="title">编辑</span>
      <div slot="content" class="modal_content">
        <div class="modal_shift clearfix">
          <span class="float_left">班次名称：</span>
          <input type="text" class="float_left text">
        </div>
        <div class="modal_time1 clearfix">
          <div class="float_left">
            <span class="float_left">上班时间：</span>
            <input type="text" class="float_left text" readonly="true" placeholder="09:00">
            <span class="iconfont icon-time span"></span>
          </div>
          <div class="float_left">
            <span class="float_left">下班时间：</span>
            <input type="text" class="float_left text" readonly="true" placeholder="17:30">
            <span class="iconfont icon-time span"></span>
          </div>
        </div>
        <div class="modal_rest clearfix">
          <span class="dislockline float_left">休息时间：</span>
          <input type="checkbox" class="rest_input float_left" @click="isChecked = !isChecked">
        </div>
        <div class="modal_time2 clearfix" v-show="isChecked">
          <div class="float_left">
            <span class="float_left">休息开始：</span>
            <input type="text" class="float_left text" readonly="true" placeholder="12:00">
            <span class="iconfont icon-time span"></span>
          </div>
          <div class="float_left">
            <span class="float_left">休息结束：</span>
            <input type="text" class="float_left text" readonly="true" placeholder="13:30">
            <span class="iconfont icon-time span"></span>
          </div>
        </div>
        <button class="save center pointer" @click="modal=false">保存</button>
      </div>
    </modal>




    <modal :modal="modalTest" :width="1000" v-on:hideModal="modalTest = false" :top="50">
      <span slot="title">测试组件</span>
      <div slot="content" class="test_content">
        <!-- <add-test></add-test> -->
        <handler></handler>
      </div>
    </modal>

    
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from 'components/modal/modal'
  import AddTest from 'components/add-test/add-test'
  import Handler from 'components/handler/handler'

  export default {
    props: [],
    data () {
      return {
        modal: false,
        isChecked: false,
        modalTest: true
      }
    },
    methods: {},
    components: {
      Modal,
      AddTest,
      Handler
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  .shift_wrap
    width 100%
    min-height 500px
    .add
      width auto
      height 40px
      line-height 40px
      color #3580db
      span:first-child
        padding-right 40px
      span:last-child
        padding-right 5px
    .content
      color #666
      font-size $font-size-medium-x
      .content_title
        background #ececec
      .content_list
        background #f9f9f9
      .common_li
        height 50px
        line-height 50px
      .com_shift
        width 15%
      .com_time
        width 55%
      .com_operation
        width 10%
      .list_time
        color #3680db
        font-weight bolder
      .list_delete
        width 20%
        &:hover
          .list
            display none
            &.delete
              display inline-block
        .list
          width 50px
          display inline-block
          &.delete
            width 50px
            display none
            height 25px
            line-height 25px
            color $color-text
            background #e64c65
    //弹出框样式
    .modal_content
      color #322626
      margin 0 auto
      .modal_shift, .modal_time1, .modal_time2
        width 94%
        height 40px
        line-height 40px
        padding-left 3%
      .modal_time1 div, .modal_time2 div
        width 50%
        position relative
      .modal_time1 .span, .modal_time2 .span
        position absolute
        right 55px
        top 3px
      .text
        width 110px
        height 30px
        border 1px solid #AAAAAA
        box-shadow 3px 3px 5px 0 #e0e0e0 inset
        outline none
        padding-left 6px
        line-height 30px
        margin-top 5px
      .save
        width 60px
        height 30px
        background #4894F4
        color $color-text
        line-height 30px
        margin 20px 0 0 85px
        outline none
        border none
      .modal_rest
        width 100%
        height 30px
        background #eee
        margin 5px 0
        padding-left 3%
        .rest_input
          outline none
          margin-top 9px
</style>
