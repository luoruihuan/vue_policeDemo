<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">类型</td>
        <td class="two">
          <span data_name="type" v-for="(i , index) in type_arr" @click="changeColor($event,i)" class="type pointer"
                :class="{blue: i === condition_data.type}">{{i}}
          </span>
        </td>
        <td class="three">发送单位</td>
        <td class="four">
          <select v-model="condition_data.sendUnit" class="company" name="sendUnit">
            <option v-for="option in sendUnit_arr" v-bind:value="option.value">
              {{option.text }}
            </option>
          </select>
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">紧急度</td>
        <td class="two">
          <span data_name="urgentRank" v-for="(k , index) in urgent_arr" @click="changeColor($event,k)" class="type pointer" v-show="index!=2"
                :class="{blue : k === condition_data.urgentRank }">{{k}}
          </span>
        </td>
        <td class="three">关键词</td>
        <td class="four">
          <input class="keywords" name="keyWord" v-model="condition_data.keyWord" type="text" placeholder="请输入关键词">
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">下发时间</td>
        <td class="two">
          <span data_name="dropTime" style="position: relative" v-for="(k , index) in droptime_arr" @click="changeColor($event, k)"
                class="type pointer"
                :class="{blue:k === condition_data.dropTime}">
            <upload-time v-if='index==2' :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>
            {{index !== 2 ? k : '-'}}
            <upload-time v-if='index==2' :timeType="'结束时间'" v-on:timeStr="endTime"><></upload-time>
          </span>
          <span class="type pointer blue">确定</span>
        </td>
        <td class="three">通知状态</td>
        <td class="four">
          <span data_name="noticeState" v-for="(i , index) in noticestate_arr" @click="changeColor($event,i)" class="type pointer"
                :class="{blue:i === condition_data.noticeState}">{{i}}
          </span>
        </td>
      </tr>
    </condition>
    <div class="lists_wrapper">
      <my-tab>
        <div slot="left">
          <span @click="isInfo = true" class="tab pointer float_left" :class="{active:isInfo}">接收通知/通告</span>
          <span class="tab float_left">|</span>
          <span @click="isInfo = false" class="tab pointer float_left" :class="{active:!isInfo}">下发通知/通告</span>
        </div>
        <div slot="right">
          <span v-show="isInfo" class="opt float_left pointer">签收</span>
          <span v-show="!isInfo" class="opt float_left pointer" @click="modal2 = true;clear()">督办</span>
          <span class="opt float_left pointer" @click="modal = true">新增</span>
          <span class="opt float_left pointer">导出</span>
          <select class="opt float_left pointer">
            <option value="desc">时间降序</option>
            <option value="asc">时间升序</option>
          </select>
        </div>
      </my-tab>
      <!--接收通知/通告-->
      <table v-show="isInfo" class="prompt">
        <tr>
          <label>
            <td class="p1 center"><input type="checkbox"></td>
          </label>
          <td class="p2">紧急度</td>
          <td class="p3">标题/回复</td>
          <td class="p4 center">类型</td>
          <td class="p5 center">发送单位</td>
          <td class="p6 center">下发时间</td>
          <td class="p7 center">状态</td>
        </tr>
      </table>
      <ul v-show="isInfo" v-for="(i,index) in 20" class="list_item clearfix pointer">
        <label>
          <li class="p1 center float_left"><input type="checkbox"></li>
        </label>
        <li class="p2 float_left"><span class="iconfont icon-laba" :class="{has: i>=8}"></span></li>
        <li class="p3 float_left title">
          <div>
            <span class="url" @click="modal1 = true">克州召开严厉打击非法占用林地等涉林违法</span><br/>
            <span class="t"><span class="iconfont icon-xiaoxi2"></span>克州召开严厉打击非法占用林地等涉林违法</span>
          </div>
        </li>
        <li class="p4 float_left center">通知</li>
        <li class="p5 float_left center">公安部</li>
        <li class="p6 float_left center">11-24 12:21</li>
        <li class="p7 float_left center">
          <span v-show="i === 6" class="has">待签收</span>
          <span v-show="i !== 6" class="not">已签收</span>
        </li>
      </ul>
      <!--下发通知通告-->
      <table v-show="!isInfo" class="prompt receive">
        <tr>
          <label>
            <td class="p1 center"><input type="checkbox"></td>
          </label>
          <td class="p2">紧急度</td>
          <td class="p3">标题/回复</td>
          <td class="p4 center">类型</td>
          <td class="p5 center">接收单位</td>
          <td class="p6 center">下发时间</td>
        </tr>
      </table>
      <ul v-show="!isInfo" v-for="(i,index) in 20" class="list_item clearfix pointer receive">
        <label>
          <li class="p1 center float_left"><input type="checkbox"></li>
        </label>
        <li class="p2 float_left"><span class="iconfont icon-laba" :class="{has: i%2 === 0}"></span></li>
        <li class="p3 float_left title">
          <div>
            <span class="url" @click="modal1 = true">克州召开严厉打击非法占用林地等涉林违法</span><br/>
            <span class="t"><span class="iconfont icon-xiaoxi2"></span>克州召开严厉打击非法占用林地等涉林违法</span>
          </div>
        </li>
        <li class="p4 float_left center">通知</li>
        <li class="p5 float_left center" @click="modal3 = true">
          <div class="multi_center"><p v-if="i%3==0" class="has">[已签收 {{i}}个]</p>
            <p class="not">[未签收 {{i + 4}}个]</p></div>
        </li>
        <li class="p6 float_left center">11-24 12:21</li>
      </ul>
      <page-turn :totalPage="totalPage"></page-turn>
    </div>
    <modal :modal="modal" :width="'1000'" :top="'5%'" v-on:hideModal="modal = false">
      <span slot="title">创建通知</span>
      <div slot="content" class="modal_content clearfix">
        <form @submit.prevent="submit_modal">
          <add :form_lists="form_lists" @changeData="_changeData"></add>
        </form>
      </div>

    </modal>
    <!--详情-->
    <modal :modal="modal1" :width="1000" :top="50" v-on:hideModal="modal1 = false">
      <span slot="title">通知详细信息</span>
      <div slot="content" class="modal_content modal_lists">
        <workflow :workflow_lists="workflow_lists" @changeData="_changeData_modal1"></workflow>
      </div>
    </modal>
    <modal :modal="modal2" :width="700" v-on:hideModal="modal2 = false">
      <span slot="title">督办</span>
      <div slot="content" class="modal2_content">
        <div class="top clearfix">
          <div class="left float_left">
            <p class="p_f clearfix">
              <span class="p1 float_left">已选择</span>
              <span class="p2 float_right">已选<span>{{checkArr.length}}</span>个</span>
            </p>
            <div class="left_box clearfix">
              <span class="selected_list float_left" v-for="(item, index) in checkArr">
                <span class="float_left addr">{{item}}</span>
                <span class="iconfont icon-cuowu icon float_left pointer" @click="add($event, item, index)"></span>
              </span>
            </div>
            <textarea class="left_content" placeholder="请输入督办内容..."></textarea>
          </div>

          <div class="right float_left">
            <p class="p_f clearfix"><span class="p1 float_left">请选择</span></p>
            <div class="select_box">
              <div class="select_title list">
                <input type="checkbox" class="float_left input" v-model="checkAll" @click="handleCheckAll">
                <span class="float_left addr">全选</span>
              </div>
              <ul class="select_content">
                <li v-for="(item, index) in list" class="list li_list pointer">
                  <input type="checkbox" class="float_left input" :value="item.name" v-model="checkArr">
                  <span class="float_left addr">{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bottom">
          <button class="button center float_left pointer confirm" @click="modal2 = false">确定</button>
          <button class="button center float_right pointer cancel" @click="modal2 = false">取消</button>
        </div>
      </div>
    </modal>
    <modal :modal="modal3" :width="700" v-on:hideModal="modal3 = false">
      <span slot="title">签收列表</span>
      <div slot="content" class="modal3_content">
        <div class="top common_div clearfix">
          <div class="left float_left">未签收</div>
          <div class="right clearfix float_left">
            <span class="float_left list_item center" v-for="(i, index) in not_list">{{i}}</span>
          </div>
        </div>

        <div class="line"></div>

        <div class="bottom common_div clearfix">
          <div class="left float_left">已签收</div>
          <div class="right clearfix float_left">
            <span class="float_left list_item center" v-for="(i, index) in already_list">
              <p class="span1">{{i.name}}</p>
              <p class="span2">{{i.time}}</p>
            </span>
          </div>
        </div>

        <div class="footerBtn">
          <button class="button center pointer" @click="modal3 = false">督办</button>
        </div>
      </div>
    </modal>
    <to-top></to-top>
  </div>
</template>
<script type="text/ecmascript-6">
  import Position from 'components/position/position'
  import PageTurn from 'components/page-turn/page-turn'
  import Condition from 'components/condition/condition'
  import ToTop from 'components/to-top/to-top'
  import MyTab from 'components/my-tab/my-tab'
  import Modal from 'components/modal/modal'
  import UploadTime from 'components/upload-time/upload-time'
  import Add from 'components/add/add'
  import Workflow from 'components/workflow/workflow'

  export default {
    props: {},
    data() {
      return {
        p_arr: ['工作台', '通知通告'],
        totalPage: 40,
        isInfo: true,
        modal: false,
        modal1: false,
        modal2: false,
        modal3: false,
        list: [
          {id: 1, name: '深圳市局'},
          {id: 2, name: '蛇口公安分局'},
          {id: 3, name: '宝安分局'},
          {id: 4, name: '福田分局'},
          {id: 5, name: '罗湖公安分局'},
          {id: 7, name: '坪山分局'},
          {id: 8, name: '龙华分局'},
          {id: 9, name: '龙岗分局'},
          {id: 10, name: '南山分局'}
        ],
        not_list: ['深圳市局', '蛇口公安分局', '宝安分局', '福田分局'],
        already_list: [
          {
            name: '深圳市局',
            time: '11.11 11:11'
          },
          {
            name: '蛇口公安分局',
            time: '12.12 12:12'
          },
          {
            name: '宝安分局',
            time: '08.08 11:11'
          },
          {
            name: '福田分局',
            time: '07.07 55:55'
          }
        ],
        checkAll: false,
        checkArr: [],
        form_lists: [
          {
            type: '1',
            name: '通知主题',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: '0',
            name: '通知标题',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: '0',
            name: '通告主题',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MySpan',
            name: '报送时间',
            isRequired: true,
            isMulti: false,
            value: '2015-12-12',
            percentage: '50%',
          },
          {
            type: 'MySpan',
            name: '提交时间',
            isMulti: false,
            isRequired: true,
            value: '2015-12-12',
            isI: true
          },
          {
            type: 'MySpan',
            name: '发送单位',
            isRequired: true,
            isMulti: false,
            percentage: '100%',
            value: '公安部'
          },
          {
            type: '4',
            percentage: '100%',
            name: '接收单位',
            isRequired: false,
            value: '',
            selects: ['深圳分局', '福田分局', '罗湖分局', '宝安分局', '龙华分局', '南山分局']
          },
          {
            type: 'MySelect',
            name: '通知类型',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MySelect',
            name: '通知类别',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MySelect',
            name: '通告类型',
            percentage: '100%',
            isRequired: true,
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyTextarea',
            name: '通知内容',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MySpan',
            name: '编辑人',
            isRequired: true,
            isMulti: false,
            percentage: '100%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '使用方法',
            isRequired: true,
            isMulti: true,
            percentage: '100%',
            value: '如果你是来自 React 的开发者，你可能会对 vuex 和 redux 间的差异表示关注，redux 是 React 生态环境中最流行的 Flux 实现。Redux 事实上无法感知视图层，所以它能够轻松的通过一些简单绑定和Vue一起使用。vuex区别在于它是一个专门为 vue 应用所设计。这使得它能够更好地和vue进行整合，同时提供简洁的API和改善过的开发体验。'
          },
          {
            type: 'MyInput',
            name: '核稿人',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: '审批人',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyEnclosure',
            percentage: '100%',
            name: '附件',
            isRequired: false,
            value: '附件',
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
        workflow_lists: [],
        condition_data: {
          type: '全部',
          urgentRank: '常规通知',
          dropTime: '全部',
          noticeState: '全部',
          sendUnit: '全部'
        },
        sendUnit_arr: [
          {text: '全部', value: '全部'},
          {text: '本省', value: '本省'},
          {text: '本地', value: '本地'},
          {text: '本单位', value: '本单位'}
        ],
        post_data: {},
        post_data_modal1: {},
//        c_type_arr: '全部',
//        c_droptime: '全部',
//        c_urgent: '常规通知',
//        c_state: '全部',
        type_arr: ['全部', '通知', '通告'],
        urgent_arr: ['常规通知', '紧急通知', '自定义'],
        droptime_arr: ['全部', '今天', '自定义'],
        noticestate_arr: ['全部', '未签收', '已签收', '已反馈']
      }
    },
    created() {
//      this.axios.get('http://mgrservice.szkedun.cn/workflow/template/2')
//        .then(response => {
//          this.form_lists = response.data.data.carrierInfo.fieldList
//        })
//        .catch(error => {
//          console.log(error);
//        })
      this._getWorkflowData()
//      this._defaultChecked()
      this._changeData()
      this._changeData_modal1()
    },
    mounted() {
    },
    methods: {
      // 请求mock数据
      _getWorkflowData() {
        this.axios.get('/api/workflow')
          .then(response => {
//            console.log(response.data.data)
            this.workflow_lists = response.data.data
//            console.log(this.workflow_lists);
          })
          .catch(error => {
            console.log(error);
          })
      },
      _changeData(val) {
        if (val) {
          this.post_data[val.name] = val.val
        }
      },
      _changeData_modal1(val) {
        if (val) {
          this.post_data_modal1[val.name] = val.val
        }
      },
      add(e, i, index) {
        this.checkArr.splice(index, 1)
      },
      clear() {
        this.has_arr = []
        this.checkArr = []
      },
      handleCheckAll() {
        if (this.checkAll) {
          this.checkArr = this.list.map(item => {
            return item.name
          })
        } else {
          this.checkArr = []
        }
      },
      changeColor(e, i) {
        let name = e.target.getAttribute('data_name')
        this.$set(this.condition_data, name, i)
      },
      startTime(data) {
        this.condition_data.dropStartTime = data
      },
      endTime(data) {
        this.condition_data.dropEndTime = data
      },
    },
    watch: {
      checkArr() {
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
      ToTop,
      MyTab,
      Modal,
      UploadTime,
      Add,
      Workflow
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .p
    padding-left 20px

  .lists_wrapper
    padding 20px 20px 70px 20px
    background #F9F9F9
    color #444444
    .prompt
      background $color-sub-theme
      line-height 34px
      color $color-text
      font-size $font-size-medium
      font-family SimSun
      width 100%
      .p1, .p2, .p3, .p4, .p5, .p6, .p7
        font-weight bold
        width 9%
      .p1
        width 6%
      .p3
        width 49%
      &.receive
        .p3
          width 53%
      &.receive
        .p5
          width 14%

    .list_item
      margin-top 10px
      color $color-text-d
      background $color-background-d
      &:hover
        box-shadow 0 0 20px 0 #D7D7D7
      .p1, .p2, .p3, .p4, .p5, .p6, .p7
        line-height 70px
        height 70px
        width 9%
      .p1
        width 6%
      .p2
        width 3%
        .iconfont
          color $color-sub-theme
          font-size $font-size-large-x
          &.has
            color #F2725E
      .p3
        width 55%
      &.receive
        .p3
          width 59%
      &.receive
        .p5
          width 14%
          position relative
          line-height 1.4
          .has
            color #ff7e00
          .not
            color $color-sub-theme
      .p7
        font-size $font-size-medium
        .has
          color #ff7e00
          border-radius 5px
          padding 1px 8px
          border(#ff7e00)
        .not
          color $color-sub-theme
          border-radius 5px
          padding 2px 8px
          border($color-sub-theme)
      .title
        font-size $font-size-medium-x
        height 70px
        line-height 24px
        padding 10px
        color $color-text-d
        .url
          &:hover
            color $color-sub-theme
        .t
          font-size $font-size-small
          color #888888
        .iconfont
          font-size $font-size-small
          padding-right 5px

  .modal2_content
    padding 0 20px
    .top
      .p_f
        width 100%
        height 50px
        line-height 50px
        padding 0 10px
        .p1
          font-size $font-size-medium-x
          color $color-background
          font-weight bold
        .p2
          font-size $font-size-small-s
          color #c7c8cc
      .left
        width 350px
        .left_box
          min-height 200px
          background #fbfbfb
          border(#ccc)
          .selected_list
            padding 0 8px
            background #f4f4f4
            margin 8px 0 0 8px
            border(#aaa)
            .addr
              font-size $font-size-medium
              color $color-background
            .icon
              padding-left 8px
        .left_content
          width 100%
          height 90px
          background #fbfbfb
          resize none
          border(#ccc)
          margin-top 10px
          font-family Microsoft YaHei
          padding 6px
          line-height 20px
      .right
        width 185px
        height 350px
        margin-left 25px
        overflow hidden
        .select_box
          width 100%
          height 300px
          border(#ccc)
          .list
            padding 0 20px
            width 100%
            height 40px
            line-height 40px
            .input
              margin-top 13px
            .addr
              font-size $font-size-medium
              color $color-text-d
              margin-left 15px
          .select_title
            background #f4f4f4
          .select_content
            width 100%
            height 260px
            overflow-y scroll
            .li_list
              border-bottom 1px solid #fbfbfb
    .bottom
      width 400px
      height 70px
      margin 0 auto
      padding 0 30px
      .button
        border none
        outline none
        width 150px
        height 34px
        line-height 34px
        font-size $font-size-medium-x
        margin-top 18px
        border-radius 4px
      .confirm
        background #4894f2
        color $color-text
      .cancel
        background #F4F4F4
        color $color-background
        border(#ccc)

  .modal3_content
    padding 15px 20px
    .common_div
      width 560px
      min-height 100px
      .left
        font-size $font-size-large-x
        width 100px
        height 100px
        line-height 100px
      .right
        width 440px
        margin-left 20px
        .list_item
          width 116px
          background #f2f2f2
          font-size $font-size-medium
          color $color-background
          margin 0 10px 10px 0
    .top
      .left
        color #ff7e00
        border-right 1px dashed #ff7e00
      .right
        .list_item
          height 34px
          line-height 34px

    .line
      width 560px
      height 1px
      border-bottom 1px dashed #ccc
      margin 15px 0

    .bottom
      .left
        color #4894f2
        border-right 1px dashed #4894f2
      .right
        .list_item
          height 41px
          .span2
            color #808080
            font-size $font-size-small-s
          .span1, .span2
            height 17px
    .footerBtn
      width 100%
      height 60px
      line-height 60px
      margin-top 10px
      .button
        border none
        outline none
        width 150px
        height 34px
        line-height 34px
        color $color-text
        background #4894f2
        border-radius 4px
        margin-left 205px
</style>
