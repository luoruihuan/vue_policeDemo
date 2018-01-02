<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <element></element>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">信息类别</td>
        <td class="two">
          <span v-for="(i,index) in infotype_arr" @click="changeColor($event,i)" class="type pointer"
                :class="{blue:i==c_infotype}">{{i}}
          </span>
        </td>
        <td class="three">关键字</td>
        <td class="four">
          <select v-model="condition_data.keyWord" class="company" name="keyWord">
            <option v-for="option in keyWord_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">信息等级</td>
        <td class="two">
          <select v-model="condition_data.infoRank" class="company" name="infoRank">
            <option v-for="option in infoRank_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
        <td class="three">报送单位</td>
        <td class="four">
          <select v-model="condition_data.sendUnit" class="company" name="sendUnit">
            <option v-for="option in sendUnit_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">统计时间</td>
        <td class="two sec">
          <span style="position: relative" v-for="(k , index) in tjtime_arr" @click="changeColor2($event, k)"
                class="type pointer"
                :class="{blue:k === c_tjtime}">
            <upload-time v-if='index==2' upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>
            {{index!==2?k:'-'}}
            <upload-time v-if='index==2' upload-time :timeType="'结束时间'" v-on:timeStr="endTime"><></upload-time>
          </span>
          <span class="type pointer blue">确定</span>
        </td>
        <td class="three">精确搜索</td>
        <td class="four">
          <select v-model="condition_data.exactSearchArea" class="company" name="exactSearchArea">
            <option v-for="option in exactSearchArea_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
          <input class="keywords" name="exactSearch" v-model="condition_data.exactSearch" type="text">
          <span class="type blue">搜索</span>
        </td>
      </tr>
    </condition>
    <div class="lists_wrapper">
      <my-tab>
        <div slot="left">
          <span class="tab active pointer float_left">信息初审</span>
        </div>
        <div slot="right">
          <span class="opt float_left pointer" @click="modal=true">新增</span>
          <span class="opt float_left pointer">转研判</span>
          <span class="opt float_left pointer">导出</span>
          <select class="opt float_left pointer">
            <option value="desc">时间降序</option>
            <option value="asc">时间升序</option>
          </select>
        </div>
      </my-tab>
      <div class="prompt clearfix">
        <label>
          <div class="p1 center float_left"><input type="checkbox" v-model="checkAll" @click="handleCheckAll"></div>
        </label>
        <div class="p2 float_left">报送信息相关</div>
      </div>
      <div class="list_item pointer clearfix" v-for="item in list">
        <label>
          <div class="float_left check center">
            <input type="checkbox" :value="item.id" v-model="checkArr"/>
          </div>
        </label>
        <div class="float_left content">
          <h2 class="title">
            <a href="#/business">
              <span class="t">{{item.title}}</span>
            </a>
            <span class="time">{{item.time}}</span>
            <span class="turn float_right">{{item.isTurn}}</span>
          </h2>
          <ul class="infos clearfix">
            <li class="float_left info"><span class="name">报送单位：</span><span class="ques">{{item.unit}}</span></li>
            <li class="float_left info"><span class="name">信息采分：</span><span class="ques score">{{item.point}}</span>
            </li>
            <li class="float_left info"><span class="name">事关地：</span><span class="ques">{{item.addr}}</span></li>
            <li class="float_left info"><span class="name">事关地：</span><span class="ques">{{item.addr}}</span></li>
            <li class="float_left info"><span class="name">事关地：</span><span class="ques">{{item.addr}}</span></li>
            <li class="float_left info"><span class="name">事关地：</span><span class="ques">{{item.addr}}</span></li>
          </ul>
          <div class="comment">
            <span class="iconfont icon-wodefankui"></span><span>{{item.comment}}</span>
          </div>
        </div>
      </div>
      <page-turn :totalPage="totalPage"></page-turn>
    </div>
    <modal :modal="modal" :width="1000" :top="50" v-on:hideModal="modal = false">
      <span slot="title">创建信息</span>
      <div slot="content" class="modal_content">
        <add :form_lists="form_lists" @changeData="getChangeData"></add>
      </div>
    </modal>
    <to-top></to-top>
  </div>
</template>
<script type="text/jsx">
  import Position from 'components/position/position'
  import PageTurn from 'components/page-turn/page-turn'
  import Condition from 'components/condition/condition'
  import ToTop from 'components/to-top/to-top'
  import MyTab from 'components/my-tab/my-tab'
  import UploadTime from 'components/upload-time/upload-time'
  import Modal from 'components/modal/modal'
  import Add from 'components/add/add'

  export default {
    props: {},
    data () {
      return {
        p_arr: ['工作台', '信息初审'],
        totalPage: 40,
        modal: false,
        checkArr: [],
        checkAll: false,
        list: [
          {
            id: 1,
            title: '克州召开严厉打击非法占用林地等涉林违法',
            time: '11-23 12:21',
            isTurn: '已转研判',
            unit: '深圳市局（张三）',
            point: '5分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          },
          {
            id: 2,
            title: '注意 注意 全球新一轮勒索病毒卷土重来',
            time: '01-23 12:21',
            isTurn: '未转研判',
            unit: '深圳市局（李四）',
            point: '1分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          },
          {
            id: 3,
            title: '蓝鲸发明者终入狱',
            time: '11-23 12:21',
            isTurn: '已转研判',
            unit: '深圳市局（张三）',
            point: '5分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          },
          {
            id: 4,
            title: '克州召开严厉打击非法占用林地等涉林违法',
            time: '11-23 12:21',
            isTurn: '已转研判',
            unit: '深圳市局（王五）',
            point: '5分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          },
          {
            id: 5,
            title: '韩国总统保镖爆红',
            time: '11-23 12:21',
            isTurn: '已转研判',
            unit: '深圳市局（张三）',
            point: '5分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          },
          {
            id: 6,
            title: '克州召开严厉打击非法占用林地等涉林违法',
            time: '11-23 12:21',
            isTurn: '已转研判',
            unit: '深圳市局（赵六）',
            point: '3分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          },
          {
            id: 7,
            title: '注意 注意 全球新一轮勒索病毒卷土重来',
            time: '11-23 12:21',
            isTurn: '已转研判',
            unit: '深圳市局（田七）',
            point: '2分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          },
          {
            id: 8,
            title: '克州召开严厉打击非法占用林地等涉林违法',
            time: '11-23 12:21',
            isTurn: '已转研判',
            unit: '深圳市局（王八）',
            point: '5分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          },
          {
            id: 9,
            title: '注意 注意 全球新一轮勒索病毒卷土重来',
            time: '11-23 12:21',
            isTurn: '已转研判',
            unit: '深圳市局（张三）',
            point: '4分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          },
          {
            id: 10,
            title: '克州召开严厉打击非法占用林地等涉林违法',
            time: '11-23 12:21',
            isTurn: '已转研判',
            unit: '深圳市局（张三）',
            point: '5分',
            addr: '深圳 惠州',
            comment: '最近评语：请转研判，信息核查'
          }
        ],
        condition_data: {},
        keyWord_arr: [
          {text: '全部', value: '全部'},
          {text: '本省', value: '本省'},
          {text: '本地', value: '本地'},
          {text: '本单位', value: '本单位'}
        ],
        infoRank_arr: [
          {text: '全部', value: '全部'},
          {text: '本省', value: '本省'},
          {text: '本地', value: '本地'},
          {text: '本单位', value: '本单位'}
        ],
        sendUnit_arr: [
          {text: '全部', value: '全部'},
          {text: '本省', value: '本省'},
          {text: '本地', value: '本地'},
          {text: '本单位', value: '本单位'}
        ],
        exactSearchArea_arr: [
          {text: '全部', value: '全部'},
          {text: '本省', value: '本省'},
          {text: '本地', value: '本地'},
          {text: '本单位', value: '本单位'}
        ],
        form_lists: [
          {
            type: 'MySelect',
            name: '接收单位',
            percentage: '100%',
            isRequired: true,
            value: '',
            selects: ['单位一', '单位二', '单位三', '单位四', '单位五']
          },
          {
            type: 'MyInput',
            name: '报送标题',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: 'URL地址',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: '报送内容',
            isRequired: true,
            isMulti: false,
            value: '2015-12-12',
            percentage: '100%'
          },
          {
            type: 'MySelect',
            name: '线索来源',
            isMulti: false,
            isRequired: true,
            percentage: '100%',
            value: '线索一',
            selects: ['线索一', '线索二', '线索三', '线索四', '线索五']
          },
          {
            type: 'Receive',
            percentage: '100%',
            name: '事关地',
            isRequired: true,
            value: '',
            selects: ['深圳分局', '福田分局', '罗湖分局', '宝安分局', '龙华分局', '福田分局', '南山分局', '深圳分局', '深圳分局', '深圳分局', '深圳分局']
          },
          {
            type: 'MySelect',
            name: '信息类别',
            isRequired: true,
            percentage: '100%',
            value: '',
            selects: ['类别A', '类别B', '类别C', '类别D', '类别E', '类别F']
          },
          {
            type: 'MyInput',
            name: '网站名称',
            isRequired: true,
            isMulti: false,
            value: '2015-12-12',
            percentage: '50%'
          },
          {
            type: 'MyInput',
            name: '信息原标题',
            isRequired: true,
            isMulti: false,
            value: '2015-12-12',
            percentage: '100%'
          },
          {
            type: 'MySelect',
            name: '网站类型',
            isRequired: true,
            percentage: '100%',
            value: '',
            selects: ['类型A', '类型B', '类型C', '类型D', '类型E', '类型F']
          },
          {
            type: 'AddPerson',
            name: '涉事网名',
            isRequired: true,
            percentage: '100%',
            value: []
          },
          {
            type: 'Receive',
            percentage: '100%',
            name: '涉及专题事件',
            isRequired: true,
            value: '',
            selects: ['事件A', '事件B', '事件C', '事件D', '事件E']
          },
          {
            type: 'MyTextarea',
            name: '信息内容',
            percentage: '100%',
            isRequired: true,
            value: '现在当 sourceOfTruth 发生变化，vmA 和 vmB 都将自动的更新引用它们的视图。子组件们的每个实例也会通过 this.$root.$data 去访问。现在我们有了唯一的实际来源，但是，调试将会变为噩梦。任何时间，我们应用中的任何部分，在任何数据改变后，都不会留下变更过的记录。'
          },
          {
            type: 'MyInput',
            name: '编辑人',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            value: ''
          },
          {
            type: 'MyInput',
            name: '编辑电话',
            isRequired: true,
            isMulti: true,
            percentage: '50%',
            value: '如果你是来自 React 的开发者，你可能会对 vuex 和 redux 间的差异表示关注，redux 是 React 生态环境中最流行的 Flux 实现。Redux 事实上无法感知视图层，所以它能够轻松的通过一些简单绑定和Vue一起使用。vuex区别在于它是一个专门为 vue 应用所设计。这使得它能够更好地和vue进行整合，同时提供简洁的API和改善过的开发体验。'
          },
          {
            type: 'MyEnclosure',
            percentage: '100%',
            name: '通知附件',
            isRequired: false,
            value: '添加附件',
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
        post_data: {},
        c_infotype: '全部',
        c_tjtime: '全部',
        infotype_arr: ['全部', '单条', '综报'],
        tjtime_arr: ['全部', '今天', '自定义'],

      }
    },
    created() {
      this.defaultChecked()
      this.getChangeData()
    },
    mounted () {
    },
    methods: {
      getChangeData (val) {
        if(val) {
          this.post_data[val.name] = val.val
          console.log(this.post_data)
        }
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
      changeColor(e, i){
        this.c_infotype = i
        this.condition_data.infoType = i
        console.log(this.condition_data)
      },
      changeColor2(e, i){
        this.c_tjtime = i
        this.condition_data.tjTime = i
      },
      startTime(data){
        this.condition_data.tjStartTime = data
        delete this.condition_data.tjTime
      },
      endTime(data){
        this.condition_data.tjEndTime = data
        delete this.condition_data.tjTime
      },
      defaultChecked(){
        this.condition_data.infoType = '全部'
        this.condition_data.tjTime = '全部'
        this.condition_data.keyWord = this.keyWord_arr[0].value
        this.condition_data.infoRank = this.infoRank_arr[0].value
        this.condition_data.sendUnit = this.sendUnit_arr[0].value
        this.condition_data.exactSearchArea = this.exactSearchArea_arr[0].value
      }
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
      ToTop,
      MyTab,
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
    padding 20px 20px 70px 20px
    background #F9F9F9
    color #444444
    .tabs
      color #444444
      line-height 40px
      font-size $font-size-medium-x
      .tab
        &:last-child
          padding-left 20px
        &:first-child
          padding-right 20px
        &.active
          font-size $font-size-medium-xx
          font-weight bold
    .prompt
      background $color-sub-theme
      line-height 34px
      padding-left 5px
      color $color-text
      font-size $font-size-medium
      font-family SimSun
      width 100%
      .p1, .p2
        font-weight bold
      .p1
        width 5%
      .p2
        width 95%
    .list_item
      margin-top 10px
      line-height 22px
      padding 10px 10px 10px 0
      border-left 5px solid transparent
      background $color-background-d
      .check
        width 5%
        line-height 70px
      .content
        width 95%
      &:hover
        box-shadow 0 0 20px 0 #D7D7D7
        border-left 5px solid $color-sub-theme
      .title
        font-size $font-size-medium-x
        color $color-text-d
        .t
          max-width 70%
          color $color-text-d
          &:hover
            color $color-sub-theme
        .time
          font-size $font-size-medium
          margin-left 30px
          color #888888
        .turn
          color #ff7e00
          padding 1px 8px
          border-radius 5px
          font-size $font-size-medium
          border 1px solid #ff7e00
      .infos, .comment
        color #888
        font-family SimSun
        font-size $font-size-small
        .info
          width 15%
          &:first-child
            width 20%
          .ques
            color $color-text-d
            &.score
              color #EE0000
        .iconfont
          font-size $font-size-small
          padding-right 5px

</style>
