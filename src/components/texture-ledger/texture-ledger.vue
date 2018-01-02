<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">组织名称</td>
        <td class="two">
          <input class="keywords" name="organName" v-model="condition_data.organName" pointer="text" placeholder="请输入">
        </td>
        <td class="three">成立时间</td>
        <td class="four">
         <span class="type pointer" style="position: relative; z-index: 1">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>-
            <upload-time :timeType="'结束时间'" v-on:timeStr="endTime"></upload-time>
          </span>
          <span class="type pointer blue">搜索</span>
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">头目骨干</td>
        <td class="two">
          <input class="keywords" name="keyPerson" v-model="condition_data.keyPerson" pointer="text" placeholder="请输入">
        </td>
        <td class="three">网页原标题</td>
        <td class="four">
          <input class="keywords" name="srcTitle" v-model="condition_data.srcTitle" pointer="text" placeholder="请输入关键词">
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">组织所在地</td>
        <td class="two">
          <input class="keywords" name="organLocation" v-model="condition_data.organLocation" pointer="text"
                 placeholder="请输入关键词">
        </td>
        <td class="three">填报时间</td>
        <td class="four">
          <span class="type pointer" style="position: relative;">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime1"></upload-time>-
            <upload-time :timeType="'结束时间'" v-on:timeStr="endTime1"></upload-time>
          </span>
        </td>
      </tr>
    </condition>
    <div class="lists_wrapper">
      <my-tab>
        <div slot="left">
          <span class="tab pointer active float_left">重点组织台账</span>
        </div>
        <div slot="right">
          <span class="opt float_left pointer" @click="add_origan">新增重点组织</span>
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
            <li class="float_left check_all pointer"><input type="checkbox" v-model="checkAll" @click="handleCheckAll">
            </li>
          </label>
          <li class="float_left web_lis">组织名称</li>
          <li class="float_left unit_t">组织骨干</li>
          <li class="float_left websit_t">组织网站</li>
          <li class="float_left new_info">最近发布网页原标题</li>
          <li class="float_left time_t">最近填报时间</li>
          <li class="float_left person_t">最近填报人</li>
          <li class="float_left status_t">操作</li>
        </ul>
        <!--新增信息列表-->
        <ul class="item_list pointer clearfix" v-for="item in list.dataInfo">
          <label>
            <li class="float_left check_lis center"><input type="checkbox" :value="item.id" v-model="checkArr"></li>
          </label>
          <li class="float_left web_lis">
            <div class="multi_center">
              <p class="web_title fontomit" @click="modal_detail" :id="item.organId" >{{item.organName}}</p>
              <p class="web_pinkback common_css fontomit">所在地：{{item.organAddr}}&nbsp;&nbsp;成立时间：{{item.updateDt | formatTime}}</p>
            </div>
          </li>
          <li class="float_left common_css fontomit person" :class="{blue:item%2==0}">
            {{item.leaders ? item.leaders.peopleName : '&nbsp; '}}
          </li>
          <li class="float_left common_css fontomit websit_name">{{item.websites ? item.websites.siteDomain : '&nbsp;'}}</li>
          <li class="float_left common_css fontomit newinfo_lis">{{item.lastPageTitle}}</li>
          <li class="float_left common_css fontomit">{{item.updateDt | formatTime}}</li>
          <li class="float_left common_css fontomit">{{item.lastUserName}}</li>
          <li class="float_left common_css addinfo"><span :id="item.organId" @click="getAddItem"><span
            class="iconfont icon-jia"></span> 新增信息</span></li>
        </ul>
      </div>
      <PageTurn :totalPage="totalPage" @changePage="changePage"></PageTurn>
    </div>
    <!--新增重点组织模态框-->
    <modal :modal="modal1" v-on:hideModal="modal1 = false" :width="1100" :top="50">
      <span slot="title">重点组织台账录入</span>
      <div slot="content" class="modal_content clearfix">
        <add :form_lists="modal_lists" @changeData="getChangeData_modal"></add>
      </div>
    </modal>
    <!--新增信息模态框-->
    <modal :modal="modal2" v-on:hideModal="modal2 = false" :width="1100" :top="50">
      <span slot="title">重点组织台账录入</span>
      <div slot="content" class="modal_content clearfix">

          <add :form_lists="basic_top_list" @changeData="getChangeData_modal1"></add>

        <add :form_lists="modal1_lists" @changeData="getChangeData_modal1"></add>
      </div>
    </modal>
    <!--详情模态框-->
    <modal :modal="modal3" v-on:hideModal="modal3 = false" :width="1100" :top="50">
      <span slot="title">重点组织台账详情页</span>
      <div slot="content" class="modal_content clearfix">
        <div :id="edit_organId">
        <add :form_lists="edit ? modal2_lists_edit :basic_top_list_detail" @changeData="getChangeData_modal1"></add>
        </div>
        <add :form_lists="modal2_lists" @changeData="getChangeData_modal2"></add>
      </div>
    </modal>
    <to-top></to-top>
  </div>
</template>
<script type="text/ecmascript-6">
  import Position from 'components/position/position'
  import PageTurn from 'components/page-turn/page-turn'
  import Condition from 'components/condition/condition'
  import MyTab from 'components/my-tab/my-tab'
  import ToTop from 'components/to-top/to-top'
  import UploadTime from '../upload-time/upload-time'
  import Modal from 'components/modal/modal'
  import Add from 'components/add/add'
  import {mapState, mapActions} from 'vuex'

  export default {
    props: {},
    data () {
      return {
        edit_organId: 0,  //编辑获取id
        p_arr: ['档案类资料', '重点组织台账'],
        totalPage: 40,
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        i:'',  //不明bug
        //头部列表信息
        basic_top_list: [
          {
          type: 'MyTitle',
          name: '重点组织基本情况',
          percentage: '100%',
          isEdit: false
        }
        ],
        //详情头部、需要编辑地方
        basic_top_list_detail: [
          {
            type: 'MyTitle',
            name: '重点组织基本情况',
            percentage: '100%',
            isEdit: true
          }
        ],
        //头部列表name部分
        //basic_top_list_name:['填报单位','填报人','组织名称','成立时间','头目骨干','组织所在地','所在平台'],
        //重点组织基本详情
        modal_lists:  [
          {
            type: 'MyTitle',
            name: '重点组织基本情况',
            percentage: '100%',
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
            name: '组织名称',
            percentage: '50%',
            isRequired: true,
            value: '',
            _name: 'organName'
          },
          {
            type: 'MyTime',
            name: '成立时间',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            _name: 'organCreate',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'ImportantSearch',
            name: '头目骨干',
            percentage: '50%',
            isRequired: true,
            isSingle: false, //多选
            btnValue: '重点人查重',
            _name: 'peopleList',
            value: ''
          },
          {
            type: 'MyInput',
            name: '组织所在地',
            percentage: '50%',
            isRequired: true,
            value: '',
            _name:'organAddr'
          },
          {
            type: 'MyLong',
            name: '发帖平台',
            percentage: '100%',
            _name: 'websiteList',
            isSingle: true, //单选
            list_arr: []
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
            value: '',
            _name: 'pageTitle'
          },
          {
            type: 'MyTime',
            name: '发布时间',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            _name: 'pagePubDt',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'ImportantSearch',
            name: '发布网站',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点网站查询',
            isSingle: true, //单选
            value: '',
            _name: 'websiteId'
          },
          {
            type: 'MyInput',
            name: '关键字',
            percentage: '50%',
            isRequired: true,
            value: '',
            _name: 'pageKeywords'
          },
          {
            type: 'ImportantSearch',
            name: '重点人',
            percentage: '50%',
            isRequired: false,
            btnValue: '重点人查询',
            isSingle: true, //单选
            value: '',
            _name: 'peopleList'
          },
          {
            type: 'ImportantSearch',
            name: '重点事件',
            percentage: '50%',
            isRequired: false,
            btnValue: '重点事件查重',
            isSingle: true, //单选
            value: '',
            _name: 'eventList'
          },
          {
            type: 'ImportantSearch',
            name: '发帖账号',
            percentage: '50%',
            isRequired: false,
            btnValue: '重点账号查询',
            isSingle: true, //单选
            value: '',
            _name: 'accountList'
          },
          {
            type: 'MyTextarea',
            name: '信息内容',
            percentage: '100%',
            isRequired: true,
            value: '',
            _name: 'pageCont'
          },
          {
            type: 'MyTextarea',
            name: '备注',
            percentage: '100%',
            isRequired: true,
            value: '',
            _name: 'remark'
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
//        新增
        modal1_lists: [
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isEdit: false
          },
          {
            type: 'MyInput',
            name: '原标题',
            percentage: '100%',
            _name: 'pageTitle',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyTime',
            name: '发布时间',
            isRequired: true,
            isMulti: false,
            _name: 'pagePubDt',
            percentage: '50%',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'ImportantSearch',
            name: '发布网站',
            percentage: '50%',
            isRequired: true,
            isSingle: true, //单选
            _name: 'websiteId',
            btnValue: '重点网站查询',
            value: ''
          },
          {
            type: 'MyInput',
            name: '关键字',
            percentage: '50%',
            _name: 'pageKeywords',
            isRequired: true,
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '重点人',
            percentage: '50%',
            isRequired: false,
            isSingle: true, //单选
            _name: 'peopleList',
            btnValue: '重点人查询',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '重点事件',
            percentage: '50%',
            isRequired: false,
            _name: 'eventList',
            isSingle: true, //单选
            btnValue: '重点事件查重',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '发帖账号',
            percentage: '50%',
            isSingle: true, //单选
            isRequired: false,
            _name: 'accountList',
            btnValue: '重点账号查询',
            value: ''
          },
          {
            type: 'MyTextarea',
            name: '信息内容',
            percentage: '100%',
            isRequired: true,
            _name: 'pageCont',
            value: ''
          },
          {
            type: 'MyTextarea',
            name: '备注',
            percentage: '100%',
            _name: 'remark',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyEnclosure',
            percentage: '100%',
            name: '附件',
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
        modal1_lists_edit: [
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
            name: '组织名称',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyTime',
            name: '成立时间',
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
            type: 'MyInput',
            name: '头目骨干',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: '组织所在地',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyLong',
            name: '发帖平台',
            percentage: '100%',
            list_arr: [
              {name: '新浪', platformName: 'www.sina.com'},
              {name: '腾讯', platformName: 'www.qq.com'}
            ]
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
            type: 'ImportantSearch',
            name: '发布网站',
            percentage: '50%',
            isRequired: true,
            isSingle: true, //单选
            btnValue: '重点网站查询',
            value: ''
          },
          {
            type: 'MyInput',
            name: '关键字',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '重点人',
            percentage: '50%',
            isRequired: false,
            btnValue: '重点人查询',
            isSingle: true, //单选
            value: ''
          },
          {
            type: 'MyEnclosure',
            percentage: '50%',
            name: '重点事件',
            isRequired: false,
            value: '重点事件查重',
            btn_type: 'btn'
          },
          {
            type: 'ImportantSearch',
            name: '重点事件',
            percentage: '50%',
            isRequired: false,
            isSingle: true, //单选
            btnValue: '重点事件查重',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '发帖账号',
            percentage: '50%',
            isRequired: false,
            isSingle: true, //单选
            btnValue: '重点账号查询',
            value: ''
          },
          {
            type: 'MyTextarea',
            name: '信息内容',
            percentage: '100%',
            isRequired: true,
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
            value: '添加附件',
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
//        详情
        modal2_lists: [

          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isEdit: false
          },
          {
            type: 'MyInput',
            name: '原标题',
            percentage: '50%',
            isRequired: false,
            _name: 'pageTitle',
            value: ''
          },
          {
            type: 'MyInput',
            name: '发帖平台',
            _name: 'websiteList',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '填报单位',
            percentage: '50%',
            _name: 'organAddr',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '填报人',
            _name: 'organName',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyTime',
            name: '填报时间',
            isRequired: false,
            isMulti: false,
            _name: 'organCreate',
            percentage: '50%',
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
            name: '发布网站',
            percentage: '50%',
            isRequired: true,
            isShowRight: true,
            btnValue: '重点网站查询',
            value: '',
            lists_header:['填报时间','网页原标题','信息发布时间','发布网站','关键词','填报单位','填报人'],
          }
        ],
        modal2_lists_edit: [
          {
            type: 'MyTitle',
            name: '重点组织基本情况',
            percentage: '100%',
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
            name: '组织名称',
            percentage: '50%',
            isRequired: true,
            value: '',
            _name: 'organName'
          },
          {
            type: 'MyTime',
            name: '成立时间',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            _name: 'organCreate',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'ImportantSearch',
            name: '头目骨干',
            percentage: '50%',
            isRequired: true,
            isSingle: false, //多选
            btnValue: '重点人查重',
            _name: 'peopleList',
            value: ''
          },
          {
            type: 'MyInput',
            name: '组织所在地',
            percentage: '50%',
            isRequired: true,
            value: '',
            _name:'organAddr'
          },
          {
            type: 'MyLong',
            name: '发帖平台',
            percentage: '100%',
            _name: 'websiteList',
            isSingle: true, //单选
            list_arr: [
              {name: '新浪', platformName: 'www.sina.com',id:1},
              {name: '腾讯', platformName: 'www.qq.com',id:2}
            ]
          }
        ],
//        modal2_lists_edit: [
//          {
//            type: 'MyTitle',
//            name: '重点组织基本情况',
//            percentage: '100%',
//            isSlide: false,
//            isEdit: true
//          },
//          {
//            type: 'MyInput',
//            name: '填报单位',
//            isRequired: false,
//            isMulti: false,
//            percentage: '50%',
//            value: '广东省厅'
//          },
//          {
//            type: 'MyInput',
//            name: '填报人',
//            isRequired: false,
//            isMulti: false,
//            percentage: '50%',
//            value: '曹风云'
//          },
//          {
//            type: 'MyInput',
//            name: '组织名称',
//            percentage: '50%',
//            isRequired: true,
//            value: 'MySpan'
//          },
//          {
//            type: 'MyInput',
//            name: '所在地',
//            percentage: '50%',
//            isRequired: true,
//            value: 'MySpan'
//          },
//          {
//            type: 'MyInput',
//            name: '成立时间',
//            isRequired: true,
//            isMulti: false,
//            value: 'MySpan',
//            percentage: '50%',
//            time: [
//              {
//                'name': '选择时间'
//              }
//            ]
//          },
//          {
//            type: 'MyInput',
//            name: '真实姓名',
//            percentage: '50%',
//            isRequired: true,
//            btnValue: '重点人查询',
//            value: 'MySpan'
//          },
//          {
//            type: 'MyInput',
//            name: '发帖平台',
//            percentage: '100%',
//            isRequired: true,
//            btnValue: '重点人查询',
//            value: 'MySpan'
//          },
//          {
//            type: 'MyTitle',
//            name: '信息发布情况',
//            percentage: '100%',
//            isSlide: false,
//            isEdit: false
//          },
//          {
//            type: 'MyInput',
//            name: '原标题',
//            percentage: '50%',
//            isRequired: true,
//            value: ''
//          },
//          {
//            type: 'MyInput',
//            name: '发帖平台',
//            percentage: '50%',
//            isRequired: true,
//            value: ''
//          },
//          {
//            type: 'MyInput',
//            name: '填报单位',
//            percentage: '50%',
//            isRequired: true,
//            value: ''
//          },
//          {
//            type: 'MyInput',
//            name: '填报人',
//            percentage: '50%',
//            isRequired: true,
//            value: ''
//          },
//          {
//            type: 'MyTime',
//            name: '填报时间',
//            isRequired: true,
//            isMulti: false,
//            percentage: '50%',
//            time: [
//              {
//                'name': '开始时间'
//              },
//              {
//                'name': '结束时间'
//              }
//            ]
//          },
//          {
//            type: 'MyTable',
//            name: '发布网站',
//            percentage: '50%',
//            isRequired: true,
//            isShowRight:true,
//            btnValue: '重点网站查询',
//            value: ''
//          }
//        ],
        condition_data: {},
        post_data_modal: {},
        post_data_modal1: {},
        post_data_modal2: {},
        condition_data: {},
        checkAll: false,
        checkArr: [],
        list: []
      }
    },
    created(){
      this._toggleModal()
      this.getTabLists()
    },
    computed: {
      ...mapState([
        'edit',
        'domain',
        'modal_data_list', //弹窗数据列表
      ])
    },
    methods: {
      ...mapActions([
        'clearModal_data_list'
      ]),
      //初始化表格列表
      getTabLists (val=1) {
        let url = `${this.domain}ledger/organ/list`
        this.axios.post(url, {
            "cBegin": null,
            "cEnd": null,
            "eBegin": null,
            "eEnd": null,
            "leader": null,
            "limit": 5,
            "offset": val,
            "organAddr": null,
            "organName": null,
            "title": null
          }
        )
          .then(res => {
            this.totalPage = res.data.data.pages
           console.log(res.data.data)
            this.list = res.data.data
          })
          .catch(error => {
            console.log(error)
          })

      },
      // 跳转页面
      changePage(val) {
        this.getTabLists(val)
      },

      //获取id、新增信息弹窗2
      getAddItem (e) {
        let _this = this
        e = e || window.event
        this.modal2 = true
        let flag_obj = {
          type: 2,
          id: e.target.id
        }
        this.$store.commit('changeModal_flag', flag_obj)   //新增信息为2
        //清空start
        this.basic_top_list = [
          {
            type: 'MyTitle',
            name: '重点组织基本情况',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          }]
        //清空end
        this.clearModal_data_list()
        let url = `${this.domain}ledger/organ/${e.target.id}`
        this.axios.get(url).then(res => {
          let data = res.data.data
          //basic_top_list
          console.log(data)
          this.basic_top_list.push({
            type: 'MySpan',
            name: '填报单位',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.addDeptName
          })
          this.basic_top_list.push({
            type: 'MySpan',
            name: '填报人',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.addUserName
          })
          this.basic_top_list.push({
            type: 'MySpan',
            name: '组织名称',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.addUserName
          })
          this.basic_top_list.push({
            type: 'MySpan',
            name: '成立时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.organCreate
          })
          this.basic_top_list.push({
            type: 'MySpan',
            name: '涉及头目骨干',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.leaders
          })
          this.basic_top_list.push({
            type: 'MySpan',
            name: '组织所在地',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.organAddr
          })
          this.basic_top_list.push({
            type: 'MySpan',
            name: '发帖平台',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.websites
          })

          console.log(this.basic_top_list)
        }).catch(err => {
          console.log(err)
        })
      },

      //新增组织弹窗1
      add_origan () {
        this.modal1 = true
        this.clearModal_data_list()
        let flag_obj = {
          type: 1
        }
        this.$store.commit('changeModal_flag', flag_obj)   //新增重点组织为1
      },
      //详情3
      modal_detail (e) {
        e = e || window.target
        this.modal3 = true
        let flag_obj = {
          type: 3,
          id: e.target.id
        }
        this.$store.commit('changeModal_flag', flag_obj)
        //清空start
        this.basic_top_list_detail = [
          {
            type: 'MyTitle',
            name: '重点组织基本情况',
            percentage: '100%',
            isEdit: true
          }]
        //清空end
        this.clearModal_data_list()

        let url = `${this.domain}ledger/organ/${e.target.id}`
        this.axios.get(url).then(res => {
          let data = res.data.data
          this.edit_organId = data.organId
          this.basic_top_list_detail.push({
            type: 'MySpan',
            name: '填报单位',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.addDeptName
          })
          this.basic_top_list_detail.push({
            type: 'MySpan',
            name: '填报人',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.addUserName
          })
          this.basic_top_list_detail.push({
            type: 'MySpan',
            name: '组织名称',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.addUserName
          })
          this.basic_top_list_detail.push({
            type: 'MySpan',
            name: '成立时间',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.organCreate
          })
          this.basic_top_list_detail.push({
            type: 'MySpan',
            name: '涉及头目骨干',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.leaders
          })
          this.basic_top_list_detail.push({
            type: 'MySpan',
            name: '组织所在地',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.organAddr
          })
          this.basic_top_list_detail.push({
            type: 'MySpan',
            name: '发帖平台',
            isRequired: false,
            isMulti: false,
            percentage: '50%',
            value: data.websites
          })
        })

      },

      //切换编辑保存
      edit_save () {
        if(!this.edit) {
          let url = `${this.domain}ledger/organ/update`
          let params = this.modal_data_list
          this.axios.post(url,params).then(res => {
            alert('成功')
          }).catch(err => {
            console.log(err)
          })
        }
      },

      // 切换弹窗
      _toggleModal() {
        this.bus.$on('toggleModal', () => {
          this.clearModal_data_list()
          window.localStorage.setItem('modal_item_add',1) //详情-新增
          window.localStorage.removeItem('modal_item') // 详情
          window.localStorage.removeItem('modal_add') //新增重点组织
          window.localStorage.removeItem('modal_add_id') //新增信息
          this.modal3 = false
          this.modal2 = true
        })
      },
      getChangeData_modal (val) {
        if (val) {
          this.post_data_modal[val._name] = val.new_value
          this.$store.commit('changeModal_data_list',this.post_data_modal)
          //console.log(this.post_data_modal)
        }
      },
      getChangeData_modal1 (val) {
        if (val) {
          this.post_data_modal1[val._name] = val.new_value
          this.$store.commit('changeModal_data_list',this.post_data_modal1)
          //console.log(this.post_data_modal1)
        }
      },
      getChangeData_modal2 (val) {
        if (val) {
          this.post_data_modal2[val._name] = val.new_value
          this.$store.commit('changeModal_data_list',this.post_data_modal2)
          //console.log(this.post_data_modal2)
        }
      },
      startTime(data){
        this.condition_data.foundStartTime = data
      },
      endTime(data){
        this.condition_data.foundEndTime = data
      },
      startTime1(data){
        this.condition_data.fillStartTime = data
      },
      endTime1(data){
        this.condition_data.fillEndTime = data
      },
      handleCheckAll () {
        if (this.checkAll) {
          this.checkArr = this.list.map(item => {
            return item.id
          })
        } else {
          this.checkArr = []
        }
      }
    },
    watch: {
      checkArr () {
        if (this.checkArr.length === this.list.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      },
      edit: function(newVal, oldVal) {
        this.edit_save()
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
  @import "~common/stylus/mixin"
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
        width 21%
      .web_lis
        width 15%
      .websit_t
        width 15%
      .unit_t, .person_t, .status_t, .time_t
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
        text-align center
        padding 0 8px
        &.person
          font-weight bold
        &.blue
          color $color-sub-theme
      .check_lis
        width 5%
      .websit_name
        width 15%
      .web_lis
        width 15%
        position relative
        height 70px
        line-height 20px
        text-align left
        .web_title
          font-size $font-size-medium-xx
          color #000000
          font-weight 900
          &:hover
            color $color-sub-theme
        .web_pinkback
          font-size $font-size-small
          color $color-text-l
          margin-top 5px
          width 100%
          padding 0
          font-family SimSun
          display inline-block
      .newinfo_lis
        width 21%
      .addinfo
        span
          font-size $font-size-medium
          color $color-sub-theme
          padding 3px 8px
          border-radius 5px
          border($color-sub-theme)
          margin-top 5px
          &:hover
            box-shadow 0 0 5px 0 $color-sub-theme
          &.iconfont
            padding 0
            border(transparent)
            font-weight bold
            font-size 10px


</style>
