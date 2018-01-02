<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">报送类别</td>
        <td class="two">
          <select v-model="condition_data.sendType" class="company" name="sendType">
            <option v-for="option in sendType_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
        <td class="three">状态</td>
        <td class="four">
          <select v-model="condition_data.state" class="company" name="state">
            <option v-for="option in state_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">信息类别</td>
        <td class="two">
          <select v-model="condition_data.infoType1" class="company" name="infoType1">
            <option v-for="option in infoType1_arr1" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
          <select v-model="condition_data.infoType2" class="company" name="infoType2">
            <option v-for="option in infoType1_arr2" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
        <td class="three">采分</td>
        <td class="four">
          <select v-model="condition_data.count" class="company" name="count" >
            <option v-for="(option,index) in count_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
      </tr>
      <tr slot="row4" class="row">
        <td class="one">报送单位</td>
        <td class="two">
          <input class="keywords" name="sendUnit" v-model="condition_data.sendUnit" type="text" style="width: 90%">
        </td>
        <td class="three">报送时间</td>
        <td class="four">
          <select v-model="condition_data.sendTime" class="company" name="sendTime">
            <option v-for="option in sendTime_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">事关地</td>
        <td class="two">
          <span v-for="(i,index) in relationAreas_arr" class="type pointer" style="font-weight: bold; color: #3b3b3b">{{i}}</span>
          <span @click="modal = true" class="type pointer iconfont icon-jia" style="line-height: 1.6; padding: 0 5px"></span>
        </td>
        <td class="three">精确搜索</td>
        <td class="four">
          <select v-model="condition_data.searchOption" class="company" name="searchOption">
            <option v-for="option in searchOption_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
          <input class="keywords" name="searchName" v-model="condition_data.searchName"  type="text">
          <span class="type blue pointer">搜索</span>
        </td>
      </tr>
    </condition>
    <div class="list_content">
      <my-tab>
        <div slot="left">
          <span @click="isInfo = true" class="tab pointer float_left" :class="{active:isInfo}">信息列表</span>
          <span class="tab float_left">|</span>
          <span @click="isInfo = false" class="tab pointer float_left" :class="{active:!isInfo}">统计分析</span>
        </div>
        <div slot="right">
          <span v-show="isInfo" class="opt float_left pointer" @click="modalOne = true">新增</span>
          <span v-show="isInfo" class="opt float_left pointer">导出</span>
          <select v-show="isInfo" class="opt float_left pointer">
            <option value="desc">时间降序</option>
            <option value="asc">时间升序</option>
          </select>
        </div>
      </my-tab>
      <div class="infomation_list" v-show="isInfo">
        <ul class="list_title clearfix">
          <li class="float_left input_t"></li>
          <li class="center float_left category_t title_common">信息类别</li>
          <li class="center float_left title_t title_common">标题/评语</li>
          <li class="center float_left unit_t title_common">报送单位</li>
          <li class="center float_left person_t title_common">报送人</li>
          <li class="center float_left time_t title_common">报送时间</li>
          <li class="center float_left address_t title_common">事关地</li>
          <li class="center float_left point_t title_common">采分</li>
          <li class="center float_left status_t title_common">状态</li>
        </ul>
        <list-item v-for="(i,index) in 20" :list="list" :key="index"></list-item>
        <page-turn :totalPage="totalPage"></page-turn>
      </div>
      <div class="statistical_analysis" v-if="!isInfo">
        <charts :mainValue="mainValue"></charts>
      </div>
    </div>
    <modal :modal="modal" :width="600" v-on:hideModal="modal = false">
      <span slot="title">添加事关地</span>
      <div slot="content" class="modal_content clearfix">
        <span class="float_left">城市名称：</span>
        <input class="text float_left" v-model="relaArea" type="text">
        <button @click="saveArea();modal = false" class="save float_left pointer">保存</button>
      </div>
    </modal>
    <modal :modal="modalOne" :width="1000" v-on:hideModal="modalOne = false" :top="50">
      <span slot="title">创建信息</span>
      <div slot="content" class="modalOne_content">
        <add :form_lists="form_lists" @changeData="_changeData"></add>
      </div>
    </modal>
    <to-top></to-top>
  </div>
</template>

<script type="text/ecmascript-6">
  import Position from 'components/position/position'
  import MyTab from 'components/my-tab/my-tab'
  import ListItem from 'components/list-item/list-item'
  import ToTop from 'components/to-top/to-top'
  import Condition from 'components/condition/condition'
  import Charts from 'components/charts/charts'
  import Modal from 'components/modal/modal'
  import PageTurn from 'components/page-turn/page-turn'
  import Add from 'components/add/add'

  export default {
    props: ['org'],
    data () {
      return {
        currentTabIndex: 1,
        modal: false,
        list: [{}],
        mainValue: {},
        totalPage: 40,
        isInfo: true,
        modalOne: false,
        condition_data:{},
        sendType_arr:[
          { text: '全部', value: '全部' },
          { text: '本省', value: '本省' },
          { text: '本地', value: '本地' },
          { text: '本单位', value: '本单位' }
        ],
        state_arr:[
          { text: '全部', value: '全部' },
          { text: '本省', value: '本省' },
          { text: '本地', value: '本地' },
          { text: '本单位', value: '本单位' }
        ],
        infoType1_arr1:[
          { text: '全部', value: '全部' },
          { text: '本省', value: '本省' },
          { text: '本地', value: '本地' },
          { text: '本单位', value: '本单位' }
        ],
        infoType1_arr2:[
          { text: '全部', value: '全部' },
          { text: '本省', value: '本省' },
          { text: '本地', value: '本地' },
          { text: '本单位', value: '本单位' }
        ],
        count_arr:[
          { text: '全部', value: '全部' },
          { text: '本省', value: '本省' },
          { text: '本地', value: '本地' },
          { text: '本单位', value: '本单位' }
        ],
        searchOption_arr:[
          { text: '全部', value: '全部' },
          { text: '本省', value: '本省' },
          { text: '本地', value: '本地' },
          { text: '本单位', value: '本单位' }
        ],
        sendTime_arr:[
          { text: '全部', value: '全部' },
          { text: '本省', value: '本省' },
          { text: '本地', value: '本地' },
          { text: '本单位', value: '本单位' }
        ],
        relaArea:'',
        relationAreas_arr:['广州','深圳'],
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
        post_data: {}
      }
    },
    created() {
      this.defaultChecked()
      this._changeData()
    },
    methods: {
      _changeData (val) {
        if (val) {
          this.post_data[val.name] = val.val
          console.log(this.post_data)
        }
      },
      showInfoTotal (index) {
        this.currentTabIndex = index
      },
      saveArea(){
        if(this.relaArea != ''){
          this.relationAreas_arr.push(this.relaArea)
          this.relaArea = ''
        }
        var n = [];
        for(var i = 0; i < this.relationAreas_arr.length; i++){
          if (n.indexOf(this.relationAreas_arr[i]) == -1) n.push(this.relationAreas_arr[i]);
        }
        this.relationAreas_arr = n
        console.log(this.relationAreas_arr)
        console.log(this.condition_data)
      },
      defaultChecked(){
        this.condition_data.sendType = this.sendType_arr[0].value
        this.condition_data.state = this.state_arr[0].value
        this.condition_data.infoType1 = this.infoType1_arr1[0].value
        this.condition_data.infoType2 = this.infoType1_arr2[0].value
        this.condition_data.count = this.count_arr[0].value
        this.condition_data.sendTime = this.sendTime_arr[0].value
        this.condition_data.searchOption = this.searchOption_arr[0].value
        this.condition_data.relationAreas_arr = this.relationAreas_arr
      }
    },
    computed: {
      p_arr () {
        let p = ['舆情管理', '信息报送']
        p.splice(2, 0, this.org)
        return p
      }
    },
    components: {
      Position,
      MyTab,
      ListItem,
      ToTop,
      Condition,
      Charts,
      Modal,
      PageTurn,
      Add
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  .p
    padding-left 20px

  .list_content
    width 100%
    padding 20px 20px 70px
    background #f5f5f5
    .list_title
      width 100%
      height 35px
      background $color-sub-theme
      overflow hidden
      .title_common
        height 35px
        font-family SimSun
        font-size $font-size-medium-x
        font-weight bolder
        line-height 35px
      .input_t
        width 50px
        height 35px
      .category_t
        width 12%
      .title_t
        width calc(34% - 50px)
      .time_t
        width 12%
      .status_t
        width 10%
      .unit_t, .person_t, .address_t, .point_t
        width 8%
    .statistical_analysis
      color red


  //弹出框样式
  .modal_content
    font-size $font-size-medium
    line-height 36px
    color #322626
    .text
      line-height 34px
      width 300px
      padding-left 10px
      box-shadow 3px 3px 5px 0 #e0e0e0 inset
      border 1px solid #AAAAAA
    .save
      background #4894F4
      line-height 36px
      color #ffffff
      padding 0 25px
      margin-left 5px
</style>
