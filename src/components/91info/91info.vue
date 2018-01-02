<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">信息标题</td>
        <td class="two">
          <input class="keywords" name="infoTitle" v-model="condition_data.infoTitle" type="text" style="width: 90%"
                 placeholder="请输入">
        </td>
        <td class="three">内容</td>
        <td class="four">
          <input class="keywords" name="content" v-model="condition_data.content" type="text" style="width: 90%"
                 placeholder="请输入">
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">转网情处理</td>
        <td class="two">
          <span v-for="(k , index) in netdeal_arr" @click="changeColor($event,k)" class="type pointer"
                :class="{blue:k==c_deal}">{{k}}</span>
        </td>
        <td class="three">信息性质</td>
        <td class="four">
          <select v-model="condition_data.infoNature" class="company" name="infoNature">
            <option v-for="option in infoNature_arr" v-bind:value="option.value">
              {{ option.text }}

            </option>
          </select>
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">报送时间</td>
        <td class="two" colspan="3">
          <span class="type pointer" style="position: relative">
             <upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>-
             <upload-time :timeType="'结束时间'" v-on:timeStr="endTime"></upload-time>
          </span>
          <span class="type pointer blue">搜索</span>
        </td>
      </tr>
    </condition>
    <div class="list_content">
      <my-tab>
        <div slot="left">
          <span class="tab pointer float_left active">91信息</span>
        </div>
        <div slot="right">
          <select class="opt float_left pointer">
            <option value="desc">时间降序</option>
            <option value="asc">时间升序</option>
          </select>
          <span class="opt float_left ">导出</span>
        </div>
      </my-tab>
      <ul class="item_title clearfix">
        <label>
          <li class="center float_left check pointer"><input type="checkbox"></li>
        </label>
        <li class="center float_left info">信息性质</li>
        <li class="center float_left key">信息标题/主关键词</li>
        <li class="center float_left org">报送单位</li>
        <li class="center float_left person">送报人</li>
        <li class="center float_left time">送报时间</li>
        <li class="center float_left op">操作</li>
      </ul>
      <ul v-for="i in 20" class="item clearfix">
        <label>
          <li class="center float_left check pointer"><input type="checkbox"></li>
        </label>
        <li class="center float_left info clearfix">
          <div class="multi_center">
            <p v-show="i%4==0" class="fontomit">情报信息</p>
            <p class="fontomit">落地调查</p>
          </div>
        </li>
        <li class="float_left key">
          <div class="multi_center">
            <p @click="showDetail($event, i)" class="title pointer fontomit">【MWJK】【周报】5月19日至5月26日境向涉蒙敏感言论</p>
            <p class="des fontomit">名族分裂及相关专题信息</p>
          </div>
        </li>
        <li class="center float_left org">
          <div class="multi_center">
            <p v-show="i%3==0" class="fontomit">内蒙古区</p>
            <p class="fontomit">呼和浩特市呼和浩特市呼和浩特市呼和浩特市呼和浩特市呼和浩特市呼和浩特市</p>
          </div>
        </li>
        <li class="center float_left person fontomit">
          张三

        </li>
        <li class="center float_left time">
          <div class="multi_center">
            <p class="fontomit">2017-05-27</p>
            <p class="fontomit">11:23:54</p>
          </div>
        </li>
        <li class="center float_left op fontomit">
          已转网情处置

        </li>
      </ul>
      <page-turn :totalPage="totalPage"></page-turn>
    </div>
    <modal :modal="modal" :width="'1100'" :top="'5%'" v-on:hideModal="modal = false">
      <span slot="title">情报信息详情</span>
      <div slot="content" class="modal_content clearfix">
        <add :form_lists="data_lists" @changeData="_changeData"></add>
      </div>

    </modal>
    <to-top></to-top>
  </div>
</template>

<script type="text/ecmascript-6">
  import Position from 'components/position/position'
  import MyTab from 'components/my-tab/my-tab'
  import ToTop from 'components/to-top/to-top'
  import Condition from 'components/condition/condition'
  import PageTurn from 'components/page-turn/page-turn'
  import UploadTime from 'components/upload-time/upload-time'
  import Modal from 'components/modal/modal'
  import PublicOpinion from 'components/public-opinion/public-opinion'
  import Add from 'components/add/add'

  export default {
    props: [],
    data () {
      return {
        p_arr: ['舆情管理', '信息报送', '91信息'],
        modal: false,
        totalPage: 40,
        c_item: '',
        condition_data: {},
        infoNature_arr: [
          {text: '全部', value: '全部'},
          {text: '本省', value: '本省'},
          {text: '本地', value: '本地'},
          {text: '本单位', value: '本单位'}
        ],
        isShow: false,
        netdeal_arr: ['全部', '已转', '未转'],
        c_deal: '全部',
        data_lists: [
          {
            type: 'MyTitle',
            name: '通知详细信息',
            percentage: '100%',
            isEdit: false
          },
          {
            type: 'MySpan',
            name: '标题信息',
            isMulti: true,
            isRequired: false,
            value: '立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕',
            percentage: '100%',
          },
          {
            type: 'MySpan',
            name: '上报内容',
            isMulti: true,
            isRequired: false,
            value: '立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕立即全程抓捕',
            percentage: '100%',
          },
          {
            type: 'MySecondtitle',
            name: '调查任务',
            percentage: '100%',
          },
          {
            type: 'MySpan',
            name: '发帖类别',
            isMulti: false,
            isRequired: false,
            value: '公安部',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '发帖类型',
            isMulti: false,
            isRequired: false,
            value: '公安部',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '发帖地址',
            isMulti: false,
            isRequired: false,
            value: '公安部',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '发帖人昵称',
            isMulti: false,
            isRequired: false,
            value: '公安部',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '主类型',
            isMulti: false,
            isRequired: false,
            value: '公安部',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '次类型',
            isMulti: false,
            isRequired: false,
            value: '公安部',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '发帖时间',
            isMulti: false,
            isRequired: false,
            value: '2017.6.6',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: 'IP',
            isMulti: false,
            isRequired: false,
            value: '12.213.',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '补充要求',
            isMulti: false,
            isRequired: false,
            value: '2017.6.6',
            percentage: '100%'
          },
          {
            type: 'MySpan',
            name: '上报附件',
            isMulti: false,
            isRequired: false,
            value: '6.doc',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '任务使劲',
            isMulti: false,
            isRequired: false,
            value: '2017.6.6',
            percentage: '50%'
          },
          {
            type: 'MyTitle',
            name: '舆情处置详情',
            percentage: '100%',
            isEdit: false
          },
          {
            type: 'MySecondtitle',
            name: '舆情导控',
            percentage: '100%',
          },
          {
            type: 'MySpan',
            name: '任务标题',
            isMulti: false,
            isRequired: false,
            value: '公安部',
            percentage: '50%'
          },
          {
            type: 'MySpan',
            name: '导控对象',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '2017.6.6'
          },
          {
            type: 'MySpan',
            name: '导控目标',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '导控流程',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '广州'
          },
          {
            type: 'MySpan',
            name: '责任单位',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '广州'
          },
          {
            type: 'MySpan',
            name: '责任人',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '下发时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '2017.6.6'
          },
          {
            type: 'MySpan',
            name: '签收时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '2017.6.6'
          },
          {
            type: 'MySpan',
            name: '签收时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '2017.6.6'
          },
          {
            type: 'MySpan',
            name: '核查人',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '审核人',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'MySpan',
            name: '上报备注',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: '刘佳佳'
          },
          {
            type: 'Bottom',
            percentage: '100%',
            menus_arr: [
              {
                name: '编报',
                event: 'showModal'
              },
              {
                name: '落地调查',
                event: 'showModal'
              },
              {
                name: '信息处理',
                event: 'showModal'
              },
              {
                name: '线索核查',
                event: 'showModal'
              },
              {
                name: '其他',
                event: 'showModal'
              }
            ]
          }
        ],
        post_data: {}
      }
    },
    created(){
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
      showDetail (e, i) {
        this.c_item = i
        this.modal = true
      },
      changeColor(e, i){
        this.c_deal = i
        this.condition_data.deal = i
        console.log(this.condition_data)
      },
      startTime(data){
        this.condition_data.sendStartTime = data
      },
      endTime(data){
        this.condition_data.sendEndTime = data
      },
      defaultChecked(){
        this.condition_data.deal = '全部'
        this.condition_data.infoNature = this.infoNature_arr[0].value
      }
    },
    components: {
      Position,
      MyTab,
      ToTop,
      Condition,
      PageTurn,
      UploadTime,
      Modal,
      PublicOpinion,
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
    .check
      width 8%
    .info, .org, .person, .time
      width 10%
    .op
      width 12%
    .key
      width 40%
    .item_title
      height 36px
      background $color-sub-theme
      line-height 36px
    .item
      overflow hidden
      height 70px
      line-height 70px
      background #ECF0F9
      color #000000
      font-size $font-size-medium
      &:nth-child(even)
        background #F6F7F9
      .info, .key, .org, .time
        line-height 20px
        position relative
        height 70px
        .title
          color $color-sub-theme
          &:hover
            color $color-theme-d
        .des
          color $color-text-ll
      .person
        color $color-sub-theme

  /*.modal_content
    .items
      padding 20px 20px 0
      border 1px solid #ccc
      .item-title
        margin-top -12px
        margin-bottom 10px
        font-size 16px
        padding 0 20px
        font-weight 800
        color $color-sub-theme
        &.middle
          margin-top 0
          margin-bottom 0
          width calc(100% + 40px)
          padding 10px 40px
          border-top 1px solid #CCCCCC
          margin-left -20px
        .right
          font-size $font-size-medium
          border 1px solid $color-sub-theme
          border-radius 5px
          padding 0 10px
          margin-left 10px
          line-height 25px
      .item
        line-height 49px
        font-size $font-size-medium
        padding 0 10px
        border-bottom 1px solid #F4F4F4
        &.multi_row
          line-height 1.8
          padding 10px 10px
        &.sub
          color $color-sub-theme
          font-size $font-size-medium-x
          padding 0 20px
          line-height 38px
          background #edf1fa
        .left
          width 100px
        .item_right
          width calc(100% - 100px)
        .i
          width 50%*/
</style>
