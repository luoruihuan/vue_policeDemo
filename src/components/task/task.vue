<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">任务类别</td>
        <td class="two">
          <select v-model="condition_data.taskType" class="company" name="taskType">
            <option v-for="option in taskType_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
        <td class="three">真实姓名</td>
        <td class="four">
          <input type="text" name="trueName" v-model="condition_data.trueName" class="keywords" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">时间</td>
        <td class="two">
          <span style="position: relative" v-for="(k , index) in time_arr" @click="changeColor($event, k)" class="type pointer"
                :class="{blue:k === c_time}">
            <upload-time v-if='index==2' upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>
            {{index!==2?k:'-'}}
            <upload-time v-if='index==2' upload-time :timeType="'结束时间'" v-on:timeStr="endTime"><></upload-time>
          </span>
          <span class="type pointer blue">确定</span>
        </td>
        <td class="three">核查网名</td>
        <td class="four">
          <input type="text" name="checkNetName" v-model="condition_data.checkNetName" class="keywords" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">关键字</td>
        <td class="two">
          <input class="keywords" name="keyWord" v-model="condition_data.keyWord" type="text" style="width: 90%" placeholder="请输入">
        </td>
        <td class="three">核查单位</td>
        <td class="four">
          <input type="text" name="checkUnit" v-model="condition_data.checkUnit" class="keywords" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row4" class="row">
        <td class="one">信息标题</td>
        <td class="two">
          <input class="keywords" name="infoTitle" v-model="condition_data.infoTitle" type="text" style="width: 90%" placeholder="请输入">
        </td>
        <td class="three">内容</td>
        <td class="four">
          <input class="keywords" name="content" v-model="condition_data.content" type="text" style="width: 60%" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row5" class="row">
        <td class="one">责任人</td>
        <td class="two">
          <input class="keywords" name="dutyPerson" v-model="condition_data.dutyPerson" type="text" placeholder="请输入">
        </td>
        <td class="three">下发时间</td>
        <td class="four">
          <span style="position: relative" v-for="(k , index) in droptime_arr" @click="changeColor1($event, k)" class="type pointer"
                :class="{blue:k === c_droptime}">
            <upload-time v-if='index==2' upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>
            {{index!==2?k:'-'}}
            <upload-time v-if='index==2' upload-time :timeType="'结束时间'" v-on:timeStr="endTime"><></upload-time>
          </span>
          <span class="type pointer blue">确定</span>
        </td>
      </tr>
      <tr slot="row6" class="row">
        <td class="one">任务状态</td>
        <td class="two">
          <input class="keywords" name="taskState" v-model="condition_data.taskState" placeholder="请输入" type="text">
        </td>
        <td class="three">处置给分</td>
        <td class="four">
          <input class="keywords" name="dealWay" v-model="condition_data.dealWay" type="text" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row7" class="row">
        <td class="one">接收单位</td>
        <td class="two">
          <input class="keywords" name="receivingUnit" v-model="condition_data.receivingUnit" type="text" placeholder="请输入">
        </td>
        <td class="three">责任单位</td>
        <td class="four">
          <input class="keywords" name="dutyUnit" v-model="condition_data.dutyUnit" type="text" placeholder="请输入">
        </td>
      </tr>
    </condition>
    <div class="list_content">
      <my-tab :tabList="tabList">
        <div slot="left">
          <span @click="isInfo = true" class="tab pointer float_left" :class="{active:isInfo}">信息列表</span>
          <span class="tab float_left">|</span>
          <span @click="isInfo = false" class="tab pointer float_left" :class="{active:!isInfo}">统计分析</span>
        </div>
        <div slot="right">
          <span v-show="isInfo" class="opt float_left pointer">转研判</span>
          <span v-show="isInfo" class="opt float_left pointer">签收</span>
          <span v-show="isInfo" class="opt float_left pointer" @click="modal = true">新增</span>
          <span v-show="isInfo" class="opt float_left pointer">导出</span>
          <select v-show="isInfo" class="opt float_left pointer">
            <option value="desc">时间降序</option>
            <option value="asc">时间升序</option>
          </select>
        </div>
      </my-tab>
      <div class="information_list" v-show="isInfo">
        <ul class="list_title clearfix">
          <li class="float_left input_t"></li>
          <li class="center float_left source_t title_common">任务来源</li>
          <li class="center float_left title_t title_common">标题/评语</li>
          <li class="center float_left unit_t title_common">责任单位</li>
          <li class="center float_left type_t title_common">任务类型</li>
          <li class="center float_left time_t title_common">下发时间</li>
          <li class="center float_left status_t title_common">状态</li>
        </ul>
        <ul v-for="i in 20" :class="{deep: isChecked}" class="list-item pointer clearfix">
          <label>
            <li class="float_left input center"><input type="checkbox" class="pointer"></li>
          </label>
          <li class="float_left source center fontomit">省厅</li>
          <li class="float_left title">
            <div class="multi_center">
              <a href="#/business">
                <p class="fontomit t">当你需要处理DOM内或JavaScript内的模板时，“从模板到渲染函数”的编译就会在线上发生。通常情况下这种处理是足够快的，但是如果你的应用对性能很敏感最好还是回避。</p>
              </a>
              <p class="fontomit c">
                <span class="center">评</span>
                <span>预编译模板最简单的方式就是使用单文件组件-相关的构建设置会自动把预编译处理好，所以构建好的代码已经包含了编译出来的渲染函数而不是原始的模板字符串。</span>
              </p>
            </div>
          </li>
          <li class="float_left unit center common_css fontomit">Vue.js</li>
          <li class="float_left type center common_css fontomit">MVVM</li>
          <li class="float_left time center fontomit">11-24 12:21</li>
          <li class="float_left status center">
            <span>等待信息初审</span>
          </li>
        </ul>
        <page-turn :totalPage="totalPage"></page-turn>
      </div>
      <div class="statistical_analysis" v-if="!isInfo">
        <chartsa :mainValue="mainValue"></chartsa>
      </div>
    </div>
    <modal :modal="modal" :width="1000" :top="50" v-on:hideModal="modal = false">
      <span slot="title">创建信息</span>
      <div slot="content" class="modal_content">
        <add :form_lists="form_lists" @changeData="_changeData"></add>
      </div>
    </modal>
    <to-top></to-top>
  </div>
</template>

<script type="text/ecmascript-6">
  import Position from 'components/position/position'
  import MyTab from 'components/my-tab/my-tab'
  import Chartsa from 'components/chartsa/chartsa'
  import Condition from 'components/condition/condition'
  import ToTop from 'components/to-top/to-top'
  import PageTurn from 'components/page-turn/page-turn'
  import UploadTime from '../upload-time/upload-time'
  import Modal from 'components/modal/modal'
  import Add from 'components/add/add'

  export default {
    props: [],
    data () {
      return {
        p_arr: ['舆情管理', '处置任务'],
        tabList: [{name: '信息列表'}, {name: '统计分析'}],
        currentTabIndex: 0,
        data: [1, 2, 3, 4, 5],
        mainValue: {},
        isChecked: false,
        totalPage: 40,
        isInfo: true,
        modal: false,
        condition_data:{},
        taskType_arr:[
          { text: '全部', value: '全部' },
          { text: '本省', value: '本省' },
          { text: '本地', value: '本地' },
          { text: '本单位', value: '本单位' }
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
            selects: ['事件A','事件B','事件C','事件D','事件E']
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
        time_arr:['全部','今天','自定义'],
        droptime_arr:['全部','今天','自定义'],
        c_time:'全部',
        c_droptime:'全部',
        post_data: {}
      }
    },
    created(){
      this.defaultChecked()
    },
    methods: {
      _changeData (val) {
        if(val) {
          this.post_data[val.name] = val.val
          console.log(this.post_data)
        }
      },
      showInfoTotal (index) {
        this.currentTabIndex = index
      },
      changeColor(e,i){
        this.c_time = i
        this.condition_data.time = i
      },
      changeColor1(e,i){
        this.c_droptime = i
        this.condition_data.dropTime = i
        console.log(this.condition_data)
      },
      startTime(data){
        this.condition_data.startTime = data
        delete this.condition_data.time
      },
      endTime(data){
        this.condition_data.endTime = data
        delete this.condition_data.time
      },
      startTime1(data){
        this.condition_data.dropStartTime = data
        delete this.condition_data.dropTime
      },
      endTime1(data){
        this.condition_data.dropEndTime = data
        delete this.condition_data.dropTime
      },
      defaultChecked(){
        this.condition_data.time = '全部'
        this.condition_data.dropTime = '全部'
        this.condition_data.taskType = this.taskType_arr[0].value
      }
    },
    components: {
      Position,
      MyTab,
      Chartsa,
      Condition,
      ToTop,
      PageTurn,
      UploadTime,
      Modal,
      Add
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'
  .p
    padding-left 20px

  .list_content
    width 100%
    padding 20px 20px 70px
    background #f5f5f5
    //信息列表
    .information_list
      width 100%
      height auto

      //信息列表title
      .list_title
        width 100%
        background $color-sub-theme
        font-family SimSun
        overflow hidden
        .title_common
          height 35px
          font-size $font-size-medium-x
          font-weight bolder
          line-height 35px

        .input_t
          width 3%
          height 35px
        .source_t
          width 12%
        .title_t
          width 35%
        .time_t
          width 12%
        .status_t
          width 14%
        .unit_t, .type_t
          width 12%

  //信息列表item
  .list-item
    width 100%
    height 70px
    line-height 70px
    background $color-background-d
    margin-top 8px
    overflow hidden
    color #000
    font-size $font-size-medium
    &:hover
      box-shadow 0 0 20px 0 #D7D7D7
    .common_css
      width 12%
    .input
      width 3%
    .source
      width 12%
    .title
      width 35%
      height 70px
      position relative
      line-height 25px
      .t
        font-size $font-size-medium-x
        color $color-text-d
        &:hover
          color $color-sub-theme
      .c
        font-size $font-size-small
        color $color-text-ll
        span:first-child
          display inline-block
          width 15px
          height 15px
          font-size 11px
          border(#ff7c12)
          color #ff7c12
          line-height 15px
          border-radius 3px
          margin-right 7px
    .time
      width 12%
    .status
      width 14%
      text-overflow: ellipsis;
      span
        display inline-block
        width 99px
        height 25px
        color #ff7e00
        border(#ff7e00)
        border-radius 5px
        line-height 23px

  //统计分析
  .statistical_analysis
    color red
</style>
