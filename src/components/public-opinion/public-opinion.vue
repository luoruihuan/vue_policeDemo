<template>
  <div>
    <div class="wrapper" :style="box_style">
      <div class="wrap_title">舆情处置</div>
      <div class="wrap_content">
        <div class="edit common_div">
          <div class="common_title"><input type="checkbox" @click="show()"><span>编报</span></div>
          <ul class="list" v-show="isChecked">
            <li class="list_title clearfix">
              <input type="checkbox" class="input1">
              <span class="span_t">单条</span>
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">责任单位/人</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
          <ul class="list" v-show="isChecked">
            <li class="list_title clearfix">
              <input type="checkbox" class="input1">
              <span class="span_t">综报</span>
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">落实责任</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
        </div>
        <div class="survey common_div">
          <div class="common_title"><input type="checkbox" @click="show1()"><span>落地调查</span></div>
          <ul class="list" v-show="isChecked1">
            <li class="list_title clearfix">
              <input type="checkbox" class="input1">
              <span class="span_t">查身份</span>
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">落地重点人</span>
              <input type="text" class="input2 dislockline">
              <button class="pointer center dislockline blue">重点人库查重</button>
            </li>
            <li>
              <span class="span1 dislockline">落实责任</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
          <ul class="list" v-show="isChecked1">
            <li class="list_title clearfix">
              <input type="checkbox" class="input1">
              <span class="span_t">稳空</span>
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">落地重点人</span>
              <input type="text" class="input2 dislockline">
              <button class="pointer center dislockline blue">重点人库查重</button>
            </li>
            <li>
              <span class="span1 dislockline">落实责任</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
        </div>
        <div class="dispose common_div">
          <div class="common_title"><input type="checkbox" @click="show2()"><span>信息处置</span></div>
          <ul class="list" v-show="isChecked2">
            <li class="list_title clearfix">
              <input type="checkbox" class="input1">
              <span class="span_t">删除</span>
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">落实责任</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
          <ul class="list" v-show="isChecked2">
            <li class="list_title clearfix">
              <input type="checkbox" class="input1">
              <span class="span_t">过滤</span>
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">落实责任</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
          <ul class="list" v-show="isChecked2">
            <li class="list_title clearfix">
              <input type="checkbox" class="input1">
              <span class="span_t">屏蔽</span>
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">落实责任</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
        </div>
        <div class="inspect common_div">
          <div class="common_title"><input type="checkbox" @click="show3()"><span>线索核查</span></div>
          <ul class="list" v-show="isChecked3">
            <li class="list_title clearfix">
              <input type="checkbox" class="input1">
              <span class="span_t">关注</span>
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">落实责任</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
          <ul class="list" v-show="isChecked3">
            <li class="list_title clearfix">
              <input type="checkbox" class="input1">
              <span class="span_t">核查</span>
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">落实责任</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
        </div>
        <div class="else common_div">
          <div class="common_title"><input type="checkbox" @click="show4()"><span>其它</span></div>
          <ul class="list" v-show="isChecked4">
            <li class="list_title clearfix">
              <span class="add float_right dislockline center pointer">+ 新增</span>
            </li>
            <li>
              <span class="span1 dislockline">反馈期限</span>
              <input type="text" readonly="true" value="2016-11-25 11:23:23" class="input2 dislockline">
            </li>
            <li>
              <span class="span1 dislockline">落实责任</span>
              <select class="dislockline">
                <option value="">请选择</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </li>
            <li>
              <span class="span1 dislockline">备注</span>
              <input type="text" placeholder="请输入" class="input3 dislockline">
            </li>
          </ul>
        </div>
        <div class="footerBtn clearfix">
          <button class="center pointer float_right">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {scroll} from 'common/js/scroll'

  export default {
    props: ['width'],
    data () {
      return {
        isChecked: false,
        isChecked1: false,
        isChecked2: false,
        isChecked3: false,
        isChecked4: false
      }
    },
    created() {
    },
    methods: {
      show () {
        this.isChecked = !this.isChecked
      },
      show1 () {
        this.isChecked1 = !this.isChecked1
      },
      show2 () {
        this.isChecked2 = !this.isChecked2
      },
      show3 () {
        this.isChecked3 = !this.isChecked3
      },
      show4 () {
        this.isChecked4 = !this.isChecked4
      }
    },
    computed: {
      box_style () {
        let width = this.width + 'px'
        return{
          width: width
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'

  .wrapper
    margin 0 auto
    margin-top 50px
    border 1px solid #eee
    .wrap_title
      height 50px
      padding 0 43px
      line-height 50px
      background $color-sub-theme
      color $color-text
      font-weight bolder
      font-size $font-size-medium-x
    .wrap_content
      font-size $font-size-medium
      color #000
      .common_div
        border-top 1px solid #eee
        padding 10px 19px 24px
        .common_title
          height 43px
          background #ecf0f9
          line-height 43px
          padding-left 28px
          span
            margin-left 10px
            color $color-sub-theme
            font-weight bolder
            font-size $font-size-medium-x
        .list
          width 100%
          height auto
          padding-left 50px
          li
            width 100%
            height 50px
            line-height 50px
            border-bottom 1px solid #f5f5f5
            .span1
              width 90px
            input, select, button
              outline none
            .input2, .input3, select
              border 1px solid #ccc
              box-shadow 2px 2px 8px 0 #e0e0e0 inset
              padding-left 10px
              color $color-text-ll
              height 38px
            select
              padding-left 7px
            .input2, select
              width 231px
            .input3
              width 600px
            .blue
              width 116px
              height 38px
              border 1px solid $color-sub-theme
              color $color-sub-theme
              background #e1edff
              line-height 38px
              margin-left 5px
              padding 0
          li:first-child
            border-bottom none
          .list_title
            font-size $font-size-medium-x
            .span_t
              color #3d3d3d
              margin-left 8px
            .add
              width 60px
              height 25px
              border 1px solid $color-sub-theme
              color $color-sub-theme
              font-size $font-size-medium
              line-height 25px
              border-radius 5px
              margin-top 13px
      .footerBtn
        width 100%
        height 70px
        background #e2edff
        button
          width 70px
          height 30px
          line-height 30px
          color $color-text
          background #4894F4
          outline none
          border none
          border-radius 3px
          margin-top 20px
          margin-right 40px
</style>
