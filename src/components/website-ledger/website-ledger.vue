<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <!--筛选条件-->
    <condition>
      <tr slot="row1" class="row">
        <td class="one">网站类别</td>
        <td class="two">
          <select @input="colData" name="dicId" v-model="condition_data.dicId"
                  class="company">
            <option value="null">请选择</option>
            <option v-for="option in dicId_arr" :value="option.dicId">
              {{option.enumName}}
            </option>
          </select>
        </td>
        <td class="three">网站名称</td>
        <td class="four">
          <input @blur="colData" class="keywords" name="netName" v-model="condition_data.netName" pointer="text"
                 placeholder="请输入">
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">网站原标题</td>
        <td class="two">
          <input @blur="colData" class="keywords" name="srcTitle" v-model="condition_data.srcTitle" pointer="text"
                 placeholder="请输入">
        </td>
        <td class="three">填报单位</td>
        <td class="four">
          <input @blur="colData" class="keywords" name="fillUnit" v-model="condition_data.fillUnit" pointer="text"
                 placeholder="请输入关键词">
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">填报人</td>
        <td class="two">
          <input @blur="colData" class="keywords" name="fillPerson" v-model="condition_data.fillPerson" pointer="text"
                 placeholder="请输入关键词">
        </td>
        <td class="three">填报时间</td>
        <td class="four">
          <span class="type pointer" style="position: relative;">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>-
            <upload-time :timeType="'结束时间'" v-on:timeStr="endTime"></upload-time>
          </span>
          <span class="type pointer blue">搜索</span>
        </td>
      </tr>
    </condition>
    <div class="lists_wrapper">
      <my-tab>
        <div slot="left">
          <span class="tab pointer active float_left">网站类台账号</span>
        </div>
        <div slot="right">
          <span class="opt float_left pointer" @click="modal2 = true">新增网站</span>
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
            <li class="float_left check_all"><input type="checkbox" v-model="checkAll" @click="handleCheckAll"></li>
          </label>
          <li class="float_left web_lis">网站</li>
          <li class="float_left new_info">最新发布信息</li>
          <li class="float_left time_t">最近填报时间</li>
          <li class="float_left unit_t">最近填报单位</li>
          <li class="float_left person_t">最近填报人</li>
          <li class="float_left status_t">操作</li>
        </ul>
        <loading></loading>
        <!--重点网站信息列表-->
        <ul class="item_list clearfix" v-for="i in website_list">
          <label>
            <li class="float_left check_lis center">
              <input type="checkbox" v-model="checkArr" :value="i.ledgerId">
            </li>
          </label>
          <li class="float_left web_lis center">
            <div class="multi_center">
              <p @click="modal = true" class="web_title fontomit pointer">{{i.siteName}}</p>
              <p class="web_pinkback">{{i.siteTypeDicid | formatType}}</p>
            </div>
          </li>
          <li class="float_left newinfo_lis">
            <div class="multi_center">
              <p class="fontomit">{{i.lastPageTitle}}</p>
              <p class="clearfix">
                <span class="newinfo_person fontomit float_left">涉及重点人：{{i.lastPagePeople}}</span>
                <span class="newinfo_event fontomit float_left">涉及事件：{{i.lastPageEvent}}</span>
              </p>
            </div>
          </li>
          <li class="float_left center fontomit common_css">{{i.createDt | formatTime}}</li>
          <li class="float_left center fontomit common_css">{{i.addDeptName}}</li>
          <li class="float_left center fontomit common_css">{{i.addUserName}}</li>
          <li class="float_left center common_css addinfo">
            <span @click='modal3 = true' class="pointer"><span class="iconfont icon-jia"></span> 新增信息</span>
          </li>
        </ul>
      </div>
      <PageTurn :totalPage="totalPage" v-on:changePage="changePage"></PageTurn>
    </div>
    <!--重点网站新增相关信息-->
    <modal :modal="modal3" :width="'1100'" :top="'5%'" v-on:hideModal="modal3 = false">
      <span slot="title">重点网站台账录入</span>
      <div slot="content">
        <add :form_lists="add_lists" @changeData="_changeAdd_data"></add>
      </div>
    </modal>
    <!--新增重点网站-->
    <modal :modal="modal2" :width="'1100'" :top="'5%'" v-on:hideModal="modal2 = false">
      <span slot="title">网站台账录入</span>
      <div slot="content">
        <add :form_lists="enter_lists" @changeData="_changeEnter_data"></add>
      </div>
    </modal>
    <!--重点网站详情-->
    <modal :modal="modal" :width="'1100'" :top="'5%'" v-on:hideModal="modal = false">
      <span slot="title">重点网站台账详情</span>
      <div slot="content">
        <add :form_lists="edit ? item_lists : item_lists_edit" @changeData="_changeSearch_data"></add>
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
  import Loading from 'components/loading/loading'

  export default {
    props: {},
    data() {
      return {
        p_arr: ['档案类资料', '网站类台账'],
        totalPage: '',
        modal: false,
        modal2: false,
        modal3: false,
        website_list: [],
        dicId_arr: [],
        condition_data: {},
        enter_lists: [
          {
            type: 'MyTitle',
            name: '重点网站台帐录入',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
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
            name: '网站名称',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: '域名',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: 'IP地址',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: '管理员',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MySelect',
            name: '网站类别',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MySelect',
            name: '语种',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MySelect',
            name: '信息频率',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MyInput',
            name: '原标题',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyTime',
            name: '发布时间',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'MyTextarea',
            name: '信息内容',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'Receive',
            percentage: '100%',
            name: '责任地州',
            isRequired: false,
            value: [],
            selects: ['深圳分局', '福田分局', '罗湖分局', '宝安分局', '龙华分局', '福田分局', '南山分局', '深圳分局', '深圳分局', '深圳分局', '深圳分局']
          },
          {
            type: 'ImportantSearch',
            name: '真实姓名',
            percentage: '100%',
            isRequired: false,
            btnValue: '重点人查询',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '真实姓名',
            percentage: '100%',
            isRequired: false,
            btnValue: '重点人查询',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '真实姓名',
            percentage: '100%',
            isRequired: false,
            btnValue: '重点人查询',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '真实姓名',
            percentage: '100%',
            isRequired: false,
            btnValue: '重点人查询',
            value: ''
          },
          {
            type: 'MyTextarea',
            name: '备注',
            percentage: '100%',
            isRequired: true,
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
        add_lists: [
          {
            type: 'MyTitle',
            name: '网站基本信息',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
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
            type: 'MySpan',
            name: '网站名称',
            percentage: '50%',
            isRequired: true,
            value: '大事大非'
          },
          {
            type: 'MySpan',
            name: '域名',
            percentage: '50%',
            isRequired: true,
            value: '192.168.1.94：8080'
          },
          {
            type: 'MySpan',
            name: 'IP地址',
            percentage: '50%',
            isRequired: true,
            value: '192.168.1.94'
          },
          {
            type: 'MySpan',
            name: '管理员',
            percentage: '50%',
            isRequired: true,
            value: '李四'
          },
          {
            type: 'MySpan',
            name: '网站类别',
            isRequired: true,
            percentage: '50%',
            value: '新闻网站',
          },
          {
            type: 'MySpan',
            name: '语种',
            isRequired: true,
            percentage: '50%',
            value: '藏语',
          },
          {
            type: 'MySpan',
            name: '发布信息频率',
            isRequired: true,
            percentage: '50%',
            value: '5天',
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MyInput',
            name: '信息原标题',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyTime',
            name: '信息发布时间',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            time: [
              {
                'name': '年/月/日'
              }
            ]
          },
          {
            type: 'MyTextarea',
            name: '信息内容',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'Receive',
            percentage: '100%',
            name: '责任地州',
            isRequired: false,
            value: [],
            selects: ['深圳分局', '福田分局', '罗湖分局', '宝安分局', '龙华分局', '福田分局', '南山分局', '深圳分局', '深圳分局', '深圳分局', '深圳分局']
          },
          {
            type: 'ImportantSearch',
            name: '重点人',
            percentage: '100%',
            isRequired: false,
            btnValue: '+添加',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '重点账号',
            percentage: '100%',
            isRequired: false,
            btnValue: '+添加',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '重点组织',
            percentage: '100%',
            isRequired: false,
            btnValue: '+添加',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '重点事件',
            percentage: '100%',
            isRequired: false,
            btnValue: '+添加',
            value: ''
          },
          {
            type: 'MyTextarea',
            name: '备注',
            percentage: '100%',
            isRequired: true,
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
        item_lists: [
          {
            type: 'MyTitle',
            name: '网站基本情况',
            percentage: '100%',
            isSlide: false,
            isEdit: true
          },
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
            name: '网站名称',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '域名',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: 'IP地址',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '管理员',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MySelect',
            name: '网站类别',
            isRequired: false,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MySelect',
            name: '语种',
            isRequired: false,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '发布频率',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MySelect',
            name: '原标题',
            isRequired: false,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '重点人',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '重点组织',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '填报单位',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '填报人',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyTime',
            name: '填报时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            search_btn: {
              'value': '搜索'
            },
            time: [
              {
                'name': '开始时间'
              },
              {
                'name': '结束时间'
              }
            ]
          },
          {
            type: 'MyTable',
            isShowRight: true,
          }
        ],
        item_lists_edit: [
          {
            type: 'MyTitle',
            name: '网站基本情况',
            percentage: '100%',
            isSlide: false,
            isEdit: true
          },
          {
            type: 'MySpan',
            name: '填报单位',
            isRequired: false,
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
            type: 'MySpan',
            name: '网站名称',
            percentage: '50%',
            isRequired: false,
            value: '大是大非'
          },
          {
            type: 'MySpan',
            name: '域名',
            percentage: '50%',
            isRequired: false,
            value: 'www.gjgj.com'
          },
          {
            type: 'MySpan',
            name: 'IP地址',
            percentage: '50%',
            isRequired: false,
            value: '545454.215.1854'
          },
          {
            type: 'MySpan',
            name: '管理员',
            percentage: '50%',
            isRequired: false,
            value: '设计局'
          },
          {
            type: 'MySpan',
            name: '网站类别',
            isRequired: false,
            percentage: '50%',
            value: '新闻网站',
          },
          {
            type: 'MySpan',
            name: '语种',
            isRequired: false,
            percentage: '50%',
            value: '藏语',
          },
          {
            type: 'MySpan',
            name: '发布频率',
            percentage: '50%',
            isRequired: false,
            value: '5天'
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MySelect',
            name: '原标题',
            isRequired: false,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '重点人',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '重点组织',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '填报单位',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '填报人',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyTime',
            name: '填报时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            search_btn: {
              'value': '搜索'
            },
            time: [
              {
                'name': '开始时间'
              },
              {
                'name': '结束时间'
              }
            ]
          },
          {
            type: 'MyTable',
            isShowRight: true,
            lists_header: ['填报时间', '网页原标题', '信息发布时间', '涉及重点人', '涉及事件', '填报单位', '填报人'],
          }
        ],
        search_data: {},
        enter_data: {},
        add_data: {},
        checkAll: false,
        checkArr: []
      }
    },
    created() {
      // 监听[切换弹窗]全局事件
      this._toggleModal()
      // 初始化重点网站列表数据
      let url = `${this.domain}/ledger/website/list?query=null&fields=null&sortby=null&order=null&paging=1&limit=5&offset=1`
      this._getWebsiteList(url)
      // 获取枚举类型
      this._getEnumList()
    },
    computed: {
      ...mapState([
        'edit',
        'domain'
      ])
    },
    methods: {
      colData() {
        console.log(this.condition_data);
      },
      // 切换弹窗
      _toggleModal() {
        this.bus.$on('toggleModal', () => {
          this.modal = false
          this.modal3 = true
        })
      },
      // 请求[网站类别]枚举类型
      _getEnumList() {
        this.condition_data.dicId = null
        let url = `${this.domain}enum/getEnumList?query=dicTypeId%3A2%2CdicStatus%3A0&fields=dicId%2CenumName&sortby=null&order=null&paging=0&limit=0&offset=0`
        this.axios.get(url)
          .then(response => {
            this.dicId_arr = response.data.data
            //console.log(response.data.data);
          })
          .catch(error => {
            console.log(error);
          })
      },
      // 请求当前页面重点网站列表数据
      _getWebsiteList(url) {
        this.website_list = []
        this.$store.commit('loading')
        window.setTimeout(() => {
          this.axios.get(url)
            .then(response => {
              let data = response.data.data
              this.website_list = data.dataInfo
              this.totalPage = data.pages
              this.$store.commit('success', data.dataInfo.length)
              //console.log(response.data.data.dataInfo);
            })
            .catch(error => {
              console.log(error)
              this.$store.commit('error')
            })
        }, 8000)
      },
      // 更改当前页 重新请求重点网站列表数据
      changePage(val) {
        let url = `${this.domain}ledger/website/list?query=null&fields=null&sortby=null&order=null&paging=1&limit=5&offset=${val}`
        this._getWebsiteList(url)
      },
      // 全选/全不选=>重点网站列表
      handleCheckAll() {
        if (this.checkAll) {
          this.checkArr = this.website_list.map(item => {
            return item.ledgerId
          })
        } else {
          this.checkArr = []
        }
      },
      // 获取重点网站新增信息的数据
      _changeAdd_data(val) {
        this.add_data[val.name] = val.val
        console.log(this.add_data)
      },
      // 获取新增重点网站的数据
      _changeEnter_data(val) {
        if (val) {
          this.enter_data[val.name] = val.val
          //console.log(this.enter_data)
        }
      },
      // 获取详情页面的数据
      _changeSearch_data(val) {
        if (val) {
          this.search_data[val.name] = val.val
//          console.log(this.search_data)
        }
      },
      // 获取用户选择的开始时间
      startTime(data) {
        this.condition_data.fillStartTime = new Date(data).getTime() // 将格式化的时间转换为时间戳
        this.colData()
      },
      // 获取用户选择的结束时间
      endTime(data) {
        this.condition_data.fillEndTime = new Date(data).getTime() // 将格式化的时间转换为时间戳
        this.colData()
      }
    },
    watch: {
      // 重点网站列表=>全选/全不选
      checkArr() {
        if (this.checkArr.length === this.website_list.length) {
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
      Add,
      Loading
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
    .item_title /*列表标题*/
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
      .check_all
        width 5%
        height 35px
      .new_info
        width 40%
      .unit_t, .person_t, .status_t, .time_t, .web_lis
        width 11%
    .item_list /*列表详细*/
      width 100%
      height 70px
      line-height 70px
      background $color-background-d
      margin-top 10px
      color #000
      font-family Microsoft YaHei
      &:hover
        box-shadow 0 0 20px 0 #D7D7D7
      .common_css
        width 11%
        padding 0 8px
      .check_lis
        width 5%
      .web_lis
        width 11%
        height 70px
        position relative
        line-height 20px
        .web_title
          font-size $font-size-medium-x
          font-weight 900
          &:hover
            color $color-sub-theme
        .web_pinkback
          font-size $font-size-small
          background #fce3df
          font-family SimSun
          color #f2725e
          padding 2px 10px
          border-radius 5px
          font-weight 900
          margin-top 5px
          display inline-block
      .newinfo_lis
        width 40%
        height 70px
        position relative
        padding 0 0 0 20px
        p:first-child
          font-size $font-size-medium-x
          color $color-text-d
          line-height 1.4
        p:last-child
          font-size $font-size-small
          color $color-text-ll
          font-family SimSun
          line-height 30px
          text-align left
          .newinfo_person, .newinfo_event
            width 50%
      .addinfo
        span
          font-size $font-size-medium
          color $color-sub-theme
          padding 3px 8px
          border-radius 5px
          border 1px solid $color-sub-theme
          margin-top 5px
          &:hover
            box-shadow 0 0 5px 0 $color-sub-theme
          &.iconfont
            border none
            padding 0
            font-weight bold
            font-size 10px

</style>
