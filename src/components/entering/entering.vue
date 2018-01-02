<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">信息来源</td>
        <td class="two">
          <select v-model="condition_data.srcInfo" class="company" name="srcInfo">
            <option v-for="option in srcInfo_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
        <td class="three">责任人</td>
        <td class="four">
          <input type="text" name="dutyPerson" v-model="condition_data.dutyPerson" class="keywords" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">内容</td>
        <td class="two">
          <input type="text" name="content" v-model="condition_data.content" class="keywords" placeholder="请输入">
        </td>
        <td class="three">任务状态</td>
        <td class="four">
          <select v-model="condition_data.taskState" class="company" name="taskState">
            <option v-for="option in taskState_arr" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">信息标题</td>
        <td class="two">
          <input type="text" name="infoTitle" v-model="condition_data.infoTitle" class="keywords" placeholder="请输入">
        </td>
        <td class="three">处置给分</td>
        <td class="four">
          <input type="text" name="dealWay" v-model="condition_data.dealWay" class="keywords" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row4" class="row">
        <td class="one">下发时间</td>
        <td class="two">
          <span style="position: relative" v-for="(k , index) in droptime_arr" @click="changeColor($event, k)" class="type pointer"
                :class="{blue:k === c_droptime}">
            <upload-time v-if='index==2' upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>
            {{index!==2?k:'-'}}
            <upload-time v-if='index==2' upload-time :timeType="'结束时间'" v-on:timeStr="endTime"><></upload-time>
          </span>
          <span class="type pointer blue">确定</span>
        </td>
        <td class="three">接收单位</td>
        <td class="four">
          <input type="text" name="accpetUnit" v-model="condition_data.accpetUnit" class="keywords" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row5" class="row">
        <td class="one">责任单位</td>
        <td class="two" colspan="3">
          <input type="text" name="dutyUnit" v-model="condition_data.dutyUnit" class="keywords">
          <span class="type pointer blue">搜索</span>
        </td>
      </tr>
    </condition>
    <div class="list_content">
      <my-tab>
        <div slot="left"><span class="left_title">任务下发</span></div>
        <div slot="right">
          <span class="opt float_left pointer" @click="modal = true">新增</span>
          <span class="opt float_left pointer">导出</span>
          <select class="opt float_left pointer">
            <option value="desc">时间降序</option>
            <option value="asc">时间升序</option>
          </select>
        </div>
      </my-tab>
      <ul class="list-title clearfix">
        <li class="float_left" style="width:50px;height:35px"></li>
        <li class="center float_left title_com down">下发单位</li>
        <li class="center float_left title_com title">标题</li>
        <li class="center float_left title_com">下发时间</li>
        <li class="center float_left title_com">任务类别</li>
        <li class="center float_left title_com">接收单位</li>
        <li class="center float_left title_com">责任单位</li>
        <li class="center float_left title_com">处置给分</li>
        <li class="center float_left title_com">状态</li>
        <li class="center float_left title_com">操作</li>
      </ul>
      <ul class="list-item clearfix pointer" v-for="item in 20">
        <label>
          <li class="float_left center" style="width:50px;"><input type="checkbox" class="pointer"></li>
        </label>
        <li class="center float_left fontomit item_common down">省厅</li>
        <li class="center float_left fontomit item_common title"><a class="title" href="#/business">开发时，Vue
          会提供很多警告来帮你解决常见的错误与陷阱。生产时，这些警告语句却没有用，反而会增加你的载荷量。再次，有些警告检查有小的运行时开销，生产环境模式下是可以避免的。</a>
        </li>
        <li class="center float_left fontomit item_common">11-24 12:21</li>
        <li class="center float_left fontomit item_common">落地查证</li>
        <li class="center float_left fontomit item_common else">
          <div class="multi_center">
            <p>深圳市局</p>
            <p>【已签收】</p>
          </div>
        </li>
        <li class="center float_left fontomit item_common else">
          <div class="multi_center">
            <p>福田分局</p>
            <p class="blued">【未签收】</p>
          </div>
        </li>
        <li class="center float_left fontomit item_common">未给</li>
        <li class="center float_left fontomit item_common else blued">
          <div class="multi_center">
            <p>未反馈</p>
            <p>督办(1次)</p>
          </div>
        </li>
        <li class="center float_left item_common do">
          <span>督办</span>
        </li>
      </ul>
      <page-turn :totalPage="totalPage"></page-turn>
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
  import Condition from 'components/condition/condition'
  import UploadTime from 'components/upload-time/upload-time'
  import MyTab from 'components/my-tab/my-tab'
  import PageTurn from 'components/page-turn/page-turn'
  import ToTop from 'components/to-top/to-top'
  import Modal from 'components/modal/modal'
  import Add from 'components/add/add'

  export default {
    props: [],
    data() {
      return {
        p_arr: ['舆情管理', '舆情录入'],
        totalPage: 40,
        modal: false,
        condition_data: {},
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
        srcInfo_arr: [
          {text: '全部', value: '全部'},
          {text: '本省', value: '本省'},
          {text: '本地', value: '本地'},
          {text: '本单位', value: '本单位'}
        ],
        taskState_arr: [
          {text: '全部', value: '全部'},
          {text: '本省', value: '本省'},
          {text: '本地', value: '本地'},
          {text: '本单位', value: '本单位'}
        ],
        droptime_arr: ['全部', '今天','自定义'],
        c_droptime:'全部',
        post_data: {}
      }
    },
    created() {
      this.defaultChecked()
      this._changeData()
    },
    methods: {
      _changeData (val) {
        if(val) {
          this.post_data[val.name] = val.val
          console.log(this.post_data)
        }
      },
      changeColor(e,i) {
        this.c_droptime = i
        this.condition_data.dropTime = i
      },
      startTime(data) {
        this.condition_data.dropStartTime = data
        delete this.condition_data.dropTime
      },
      endTime(data) {
        this.condition_data.dropEndTime = data
        delete this.condition_data.dropTime
      },
      defaultChecked() {
        this.condition_data.dropTime = '全部'
        this.condition_data.srcInfo = this.srcInfo_arr[0].value
        this.condition_data.taskState = this.taskState_arr[0].value
      }
    },
    components: {
      Position,
      Condition,
      UploadTime,
      MyTab,
      PageTurn,
      ToTop,
      Modal,
      Add
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  .p
    padding-left 20px

  .list_content
    width 100%
    background #f5f5f5
    padding 20px 20px 70px
    .left_title
      font-weight bolder
      font-size $font-size-medium-xx
    .list-title
      width 100%
      height 35px
      background $color-sub-theme
      font-family SimSun
      overflow hidden
      .title_com
        height 35px
        width 9%
        line-height 35px
        font-size $font-size-medium-x
        font-weight bolder
        &.down
          width 10%
        &.title
          width calc(27% - 50px)
    .list-item
      width 100%
      height 70px
      line-height 70px
      background $color-background-d
      margin-top 8px
      overflow hidden
      color #000
      font-size $font-size-medium
      .item_common
        width 9%
        &.down
          width 10%
        &.title
          width calc(27% - 50px)
      &:hover
        box-shadow 0 0 20px 0 #d7d7d7
      li
        height 70px
      .title
        font-size $font-size-medium-x
        color $color-text-d
        &:hover
          color $color-sub-theme
      .do span
        padding 4px 15px
        color #ff7e00
        border 1px solid #ff7e00
        border-radius 5px
        &:hover
          box-shadow 0 0 5px #ff7e00
      .else
        position relative
        line-height 20px
      .blued
        color $color-sub-theme

</style>
