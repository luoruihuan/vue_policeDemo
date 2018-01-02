<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">事件名称</td>
        <td class="two">
          <input class="keywords" name="eventName" v-model="condition_data.eventName" pointer="text" placeholder="请输入">
        </td>
        <td class="three">事件阶段</td>
        <td class="four">
          <span class="type pointer" style="position: relative;">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>-
            <upload-time :timeType="'结束时间'" v-on:timeStr="endTime"></upload-time>
          </span>
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">填报单位</td>
        <td class="two">
          <input class="keywords" name="fillUnit" v-model="condition_data.fillUnit" pointer="text" placeholder="请输入">
        </td>
        <td class="three">填报人</td>
        <td class="four">
          <input class="keywords" name="fillPerson" v-model="condition_data.fillPerson" pointer="text" placeholder="请输入关键词">
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">填报时间</td>
        <td class="two">
          <span class="type pointer" style="position: relative;">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime1"></upload-time>-
            <upload-time :timeType="'结束时间'" v-on:timeStr="endTime1"><></upload-time>
          </span>
        </td>
        <td class="three">搜索</td>
        <td class="four">
          <input class="keywords" name="search" v-model="condition_data.search" pointer="text" placeholder="请输入">            <span class="type pointer blue">搜索</span>
        </td>
      </tr>
    </condition>
    <div class="lists_wrapper">
      <my-tab>
        <div slot="left">
          <span class="tab pointer active float_left">重要网上事件账号</span>
        </div>
        <div slot="right">
          <span class="opt float_left pointer" @click="modal = true">新增事件</span>
          <span class="opt float_left pointer">导出</span>
          <select class="opt float_left pointer">
            <option value="desc">时间降序</option>
            <option value="asc">时间升序</option>
          </select>
        </div>
      </my-tab>
      <div>
        <ul class="item_title clearfix">
          <label>
            <li class="float_left check_all"><input type="checkbox" v-model="checkAll" @click="handleCheckAll"> 序号</li>
          </label>
          <li class="float_left new_info">事件信息</li>
          <li class="float_left unit_t">填报单位</li>
          <li class="float_left person_t">填报人</li>
          <li class="float_left time_t">填报时间</li>
        </ul>
        <!--新增信息列表-->
        <ul class="item_list pointer clearfix" v-for="(item, index) in list.dataInfo">
          <label>
            <li class="float_left check_lis"><input type="checkbox" v-model="checkArr" :value="item.id">&nbsp;&nbsp;&nbsp;{{index+1}}</li>
          </label>
          <li class="float_left newinfo">
            <p @click="modalOne = true" class="title clearfix"><span class="newinfo_t fontomit float_left">{{item.insidePeopleFeed}}
              <span class="time">{{item.beginTime | formatTime}}至{{item.endTime | formatTime}}</span>
              </span><span class="common_css fontomit float_left center">{{item.addDeptName}}</span>
              <span class="common_css fontomit float_left center">{{item.eventName}}</span>
              <span class="common_css fontomit float_left center">{{item.createDt | formatTime}}</span>
            </p>
            <p class="info fontomit"><span class="name float_left">境外主流媒体反应：</span>{{item.outsideMediaFeed}}</p>
            <p class="info fontomit"><span class="name float_left">境外敌媒炒作情况：</span>{{item.hostileMediaFeed}}</p>
            <p class="info fontomit"><span class="name float_left">境外网民反映：</span>{{item.outsidePeopleFeed}}</p>
            <p class="info fontomit"><span class="name float_left">境内网站报道：</span>{{item.insideMediaFeed}}</p>
            <p class="info fontomit"><span class="name float_left">境内网民反映：</span>{{item.insidePeopleFeed}}</p>
          </li>
        </ul>
      </div>
      <PageTurn :totalPage="totalPage" @changePage="changePage"></PageTurn>
    </div>
    <!--新增事件模态框-->
    <modal :modal="modal" v-on:hideModal="modal=false" :width="1000" :top="50">
      <span slot="title">重点事件台账录入</span>
      <div slot="content" class="modal_content clearfix">
        <add :form_lists="enter_lists" @changeData="getChangeData"></add>
      </div>
    </modal>
    <!--事件详情模态框-->
    <modal :modal="modalOne" v-on:hideModal="modalOne = false" :width="1000" :top="50">
      <span slot="title">重点事件台账详情</span>
      <div slot="content" class="modal_content clearfix">
        <add :form_lists="detail_lists"></add>
      </div>
    </modal>
    <to-top></to-top>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import Position from 'components/position/position'
  import PageTurn from 'components/page-turn/page-turn'
  import Condition from 'components/condition/condition'
  import MyTab from 'components/my-tab/my-tab'
  import ToTop from 'components/to-top/to-top'
  import UploadTime from 'components/upload-time/upload-time'
  import Modal from 'components/modal/modal'
  import Add from 'components/add/add'

  export default {
    props: {},
    data () {
      return {
        p_arr: ['档案类资料', '重要网上事件台账'],
        totalPage: 40,
        modal: false,
        modalOne: false,
        condition_data:{},
        enter_lists:[
          {
            type: 'MySpan',
            name: '填报单位',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '广东省厅'
          },
          {
            type: 'MySpan',
            name: '填报人',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '曹风云'
          },
          {
            type: 'MyInput',
            name: '事件名称',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyTime',
            name: '时段时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
        {
          type: 'MyWholeinput',
          name: '境外主流媒体反映',
          percentage: '100%',
          isRequired: true,
          value: ''
        },
          {
            type: 'MyWholeinput',
            name: '境外敌流炒作情况',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyWholeinput',
            name: '境外网名反映',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyWholeinput',
            name: '境外网站报道情况',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyWholeinput',
            name: '境外网名反映',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyTextarea',
            name: '备注',
            percentage: '100%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyEnclosure',
            percentage: '100%',
            name: '附件',
            isRequired: false,
            value: '上传附件',
            btn_type: 'file'
          },
          {
            type: 'Bottom',
            percentage: '100%',
            menus_arr: [
              {
                name: '提交',
                event: 'post'
              },
              {
                name: '关闭',
                event: 'close'
              }
            ]
          }
        ],
        detail_lists:[
          {
            type: 'MySpan',
            name: '填报单位：',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '广东省厅'
          },
          {
            type: 'MySpan',
            name: '填报人：',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '曹风云（2016-12-25 15：21）'
          },
          {
            type: 'MySpan',
            name: '事件名称：',
            percentage: '50%',
            isRequired: false,
            value: '昆明火车站枪杀案',
            danger:'true'
          },
          {
            type: 'MySpan',
            name: '时段时间：',
            percentage: '50%',
            isRequired: false,
            value: '2015-10-11至2015-10-15'
          },
          {
            type: 'MySpan',
            name: '境外主媒反映：',
            percentage: '100%',
            isRequired: false,
            value: '假设我们现在要巩固基础，通过细分，我们需要知道自己需要公共的对象'
          },
          {
            type: 'MySpan',
            name: '境外炒作情况：',
            percentage: '100%',
            isRequired: false,
            value: '我相信有很多朋友都跟我一样'
          },
          {
            type: 'MySpan',
            name: '境外网名反映：',
            percentage: '100%',
            isRequired: false,
            value: '但现实是残酷的，做出的东西总是不到位，为什么？'
          },
          {
            type: 'MySpan',
            name: '境内报导情况：',
            percentage: '100%',
            isRequired: false,
            value: '来问大家一个问题，随便拿一个图标，如下图。'
          },
          {
            type: 'MySpan',
            name: '境内网名反映：',
            percentage: '100%',
            isRequired: false,
            value: '也许你会觉得，这不简单的要死。'
          },
          {
            type: 'MySpan',
            name: '备注：',
            percentage: '100%',
            isMulti:'true',
            isRequired: false,
            value: '上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。上岛咖啡精神科大夫军事科技开发了就是看撒地方撒旦发射点发。'
          },
          {
            type: 'MySpan',
            name: '附件：',
            percentage: '100%',
            isRequired: false,
            value: '青春修炼手册.doc'
          },
        ],
        post_data: {},
        checkAll: false,
        checkArr: [],
        list: [
          {
            id: 1,
            info_title: '昆明火车站枪杀案',
            info_time: '（2015-2-12 至 2015-2-24 ）',
            unit: '公安部',
            do_person: '欧阳张三',
            time: '11-24 12:21',
            outside_response: 'Vue.js（读音 /vjuː/，类似于 view）是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和Vue生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。',
            outside_condition: '已经会了HTML,CSS,JavaScript？即刻阅读指南开始构建应用！',
            outside_person: '简单小巧的核心，渐进式技术栈，足以应付任何规模的应用。',
            inside_report: '你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。',
            inside_person: '17kb min+gzip 运行大小/超快虚拟DOM/最省心的优化'
          },
          {
            id: 2,
            info_title: '昆明火车站枪杀案',
            info_time: '（2015-2-12 至 2015-2-24 ）',
            unit: '公安部',
            do_person: '欧阳张三',
            time: '11-24 12:21',
            outside_response: 'Vue.js（读音 /vjuː/，类似于 view）是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和Vue生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。',
            outside_condition: '已经会了HTML,CSS,JavaScript？即刻阅读指南开始构建应用！',
            outside_person: '简单小巧的核心，渐进式技术栈，足以应付任何规模的应用。',
            inside_report: '你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。',
            inside_person: '17kb min+gzip 运行大小/超快虚拟DOM/最省心的优化'
          },
          {
            id: 3,
            info_title: '昆明火车站枪杀案',
            info_time: '（2015-2-12 至 2015-2-24 ）',
            unit: '公安部',
            do_person: '欧阳张三',
            time: '11-24 12:21',
            outside_response: 'Vue.js（读音 /vjuː/，类似于 view）是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和Vue生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。',
            outside_condition: '已经会了HTML,CSS,JavaScript？即刻阅读指南开始构建应用！',
            outside_person: '简单小巧的核心，渐进式技术栈，足以应付任何规模的应用。',
            inside_report: '你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。',
            inside_person: '17kb min+gzip 运行大小/超快虚拟DOM/最省心的优化'
          },
          {
            id: 4,
            info_title: '昆明火车站枪杀案',
            info_time: '（2015-2-12 至 2015-2-24 ）',
            unit: '公安部',
            do_person: '欧阳张三',
            time: '11-24 12:21',
            outside_response: 'Vue.js（读音 /vjuː/，类似于 view）是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和Vue生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。',
            outside_condition: '已经会了HTML,CSS,JavaScript？即刻阅读指南开始构建应用！',
            outside_person: '简单小巧的核心，渐进式技术栈，足以应付任何规模的应用。',
            inside_report: '你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。',
            inside_person: '17kb min+gzip 运行大小/超快虚拟DOM/最省心的优化'
          }
        ]
      }
    },
    created () {
      this.getLists()
    },
    methods: {
      //获取列表
      getLists (val=1) {
        let url = `${this.domain}ledger/event/list?query=null&fields=null&sortby=null&order=null&paging=1&limit=5&offset=${val}`
        this.axios.get(url).then(res => {
          console.log(123456)
          console.log(res.data.data)
          this.list = res.data.data
          this.totalPage = res.data.data.totals
        }).catch(err => {
          console.log(err)
        })
      },
      handleCheckAll () {
        if (this.checkAll) {
          this.checkArr = this.list.map(item => {
            return item.id
          })
        } else {
          this.checkArr = []
        }
      },
      getChangeData (val) {
        if(val) {
          this.post_data[val.name] = val.val
          console.log(this.post_data)
        }
      },
      startTime(data){
        this.condition_data.eventStartTime = data
      },
      endTime(data){
        this.condition_data.eventEndTime = data
      },
      startTime1(data){
        this.condition_data.fillStartTime = data
      },
      endTime1(data){
        this.condition_data.fillEndTime = data
      },
      // 跳转页面
      changePage(val) {
        this.getTabLists(val)
      },
    },
    computed: {
      ...mapState([
        'domain'
      ])
    },
    watch: {
      checkArr () {
        if (this.checkArr.length === this.list.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      }
    },
    components: {
      Position,
      PageTurn,
      Condition,
      MyTab,
      ToTop,
      UploadTime,
      Modal,
      Add
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .p
    padding-left 20px
  .lists_wrapper
    min-height calc(100vh - 295px)
    padding 20px 20px 70px 20px
    background #F9F9F9
    .item_title/*列表标题*/
      width 100%
      height 35px
      background $color-sub-theme
      li
        height 35px
        font-family SimSun
        font-size $font-size-medium-x
        font-weight bolder
        line-height 35px
        text-align center
      .new_info
        width 60%
      .unit_t, .person_t, .time_t, .check_all
        width 10%
    .item_list
      width 100%
      color $color-text-d
      padding 16px 0
      background $color-background-d
      margin-top 10px
      &:hover
        box-shadow 0 0 20px 0 #D7D7D7
      .check_lis
        line-height 42px
        padding-left 20px
        height 142px
        width 10%
      .newinfo
        width 90%
        .title
          line-height 42px
          .newinfo_t
            font-size $font-size-medium-x
            width calc(100% * 2 / 3)
            font-weight bold
            &:hover
              color $color-sub-theme
          .common_css
            width calc(100% * 1 / 9)
            padding 0 4px
        .info
          line-height 1.6
          font-size 13px
          padding-right 10px
          .name
            width 126px
            color $color-text-ll


  //详情页面弹出框
</style>
