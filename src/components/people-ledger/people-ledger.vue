<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">姓名</td>
        <td class="two">
          <input class="keywords" name="name" pointer="text" v-model="condition_data.name" placeholder="请输入">
        </td>
        <td class="three">网页原标题</td>
        <td class="four">
          <input class="keywords" name="srcTitle" type pointer="text" v-model="condition_data.srcTitle" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">组织网站</td>
        <td class="two">
          <input class="keywords" name="organNet" pointer="text" v-model="condition_data.organNet" placeholder="请输入">
        </td>
        <td class="three">组织所在地</td>
        <td class="four">
          <input class="keywords" name="organLocation" pointer="text" v-model="condition_data.organLocation" placeholder="请输入关键词">
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">填报单位</td>
        <td class="two">
          <input class="keywords" name="fillUnit" type pointer="text" v-model="condition_data.fillUnit" placeholder="单位/个人">
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
          <span class="tab pointer active float_left">重点人员台账</span>
        </div>
        <div slot="right">
          <span class="opt float_left pointer" @click="modal1 = true">新增重点人</span>
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
            <li class="float_left check_all">
              <input type="checkbox">
            </li>
          </label>
          <li class="float_left web_lis">真实姓名/曾用名/身份证号</li>
          <li class="float_left new_info">最近网名</li>
          <li class="float_left time_t">最近涉及信息网页原标题</li>
          <li class="float_left unit_t">最近填报人</li>
          <li class="float_left person_t">填报时间</li>
          <li class="float_left status_t">操作</li>
        </ul>
        <!--新增信息列表-->
        <ul class="item_list pointer clearfix" v-for="item in list">
          <label>
            <li class="float_left check_lis">
              <input type="checkbox" v-model="checkArr" :value="item.id">
            </li>
          </label>
          <li @click="modal4 = true" class="float_left web_lis">
            <div class="head_img multi_center"></div>
            <div class="head_info multi_center">
              <p class="info fontomit">
                <span class="blue">{{item.name1}}</span>{{item.name2}}</p>
              <p class="num fontomit">{{item.card_num}}</p>
            </div>
          </li>
          <li class="float_left common_css fontomit">
            {{item.online_name}}
          </li>
          <li class="float_left fontomit newinfo_lis">
            {{item.info_title}}
          </li>
          <li class="float_left common_css fontomit">{{item.do_person}}</li>
          <li class="float_left common_css fontomit">{{item.time}}</li>
          <li class="float_left common_css addinfo">
           <span @click="modal2 = true" @click.stop><span
             class="iconfont icon-jia"></span> 新增信息</span>
          </li>
        </ul>
      </div>
      <PageTurn :totalPage="totalPage"></PageTurn>
    </div>
    <!--新增重点人台账模态框  -->
    <modal :modal="modal1" v-on:hideModal="modal1 = false" :width="1100" :top="50">
      <span slot="title">重点人台账录入</span>
      <div slot="content" class="modal_content clearfix">
        <add :form_lists="enter_lists" @changeData="getChangeData_modal1"></add>
      </div>
    </modal>
    <!--新增信息模态框  -->
    <modal :modal="modal2" v-on:hideModal="modal2 = false" :width="1100" :top="50">
      <span slot="title">重点人详情</span>
      <div slot="content" class="modal_content clearfix">
        <add :form_lists="add_lists" @changeData="getChangeData_modal2"></add>
      </div>
    </modal>
    <!--虚拟身份类别管理模态框-->
    <modal :modal="modal3" v-on:hideModal="modal3 = false" :width="650" :top="200">
      <span slot="title">虚拟身份类别管理</span>
      <div slot="content" class="modal_content">
        <div class="main_content">
          <div class="title clearfix">
            <span class="title_font float_left shibie">虚拟身份识别</span>
            <span class="title_font float_right operation">操作</span>
          </div>
          <div class="detail_list">
            <ul class="ul_list">
              <li v-for="(i,index) in platform_arr" class="list_item clearfix">
                <span class="list_left edit_text1 float_left">
                  <span v-show="isEdit||c_index!=index" :c_index="index">{{i}}</span>
                  <input v-show="!isEdit&&c_index==index" :c_index="index" type="text" class="netplatform"
                         v-model="platform_arr[index]">
                </span>
                <span class="list_right float_left clearfix">
                  <span v-show="isEdit||c_index!=index" :c_index="index" class="c_color pointer"
                        @click="edit_category($event,index)">编辑</span>&nbsp;
                  <span v-show="isEdit||c_index!=index" :c_index="index" class="c_color">|</span>&nbsp;
                  <span v-show="isEdit||c_index!=index" :c_index="index" class="c_color pointer"
                        @click="delete_category($event,index)">删除</span>
                  <span v-show="!isEdit&&c_index==index" :c_index="index" @click="edit_category($event)"
                        class="save_change pointer float_left iconfont icon-duigou">保存</span>
                </span>
              </li>
              <li v-show="isAdd" class="list_item clearfix">
                <span class="list_left edit_text1 float_left">
                  <input type="text" class="netplatform add_name" >
                </span>
                <span class="list_right float_left clearfix">
                  <span class="save_change pointer float_left iconfont icon-duigou" @click="add_one($event)">保存</span>
                </span>
              </li>
            </ul>
            <div class="add_category clearfix">
              <span class="add_span pointer float_left" @click="add_category($event)">+&nbsp;添加类别</span>
            </div>
          </div>
        </div>
      </div>
    </modal>
    <!--重点人详情模态框-->
    <modal :modal="modal4" v-on:hideModal="modal4 = false" :width="1100" :top="50">
      <span slot="title">重点人详情</span>
      <div slot="content" class="modal_content clearfix">
        <add :form_lists="edit ? details_lists_edit : details_lists" @changeData="getChangeData_modal4"></add>
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
  import UploadTime from '../upload-time/upload-time'
  import Modal from 'components/modal/modal'
  import Add from 'components/add/add'

  export default {
    props: {},
    data() {
      return {
        p_arr: ['档案类资料', '重点人台账'],
        totalPage: 40,
        edit1: false,
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        isChecked: false,
        c_index: -1,
        isAdd:false,
        platform_arr: ['新浪微博', '天涯论坛', 'QQ', 'facebook', '新浪博客'],
        isEdit: true,
        condition_data:{},
//        新增重点人
        enter_lists: [
          {
            type: 'MyTitle',
            name: '重点人基本情况',
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
            name: '姓名',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: '曾用名',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '身份证号',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MySex',
            name: '性别',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: '联系电话',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '职业',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '户籍地址',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MySelect',
            name: '文化程度',
            isRequired: false,
            percentage: '50%',
            value: '',
            selects: ['小学', '初中', '高中', '大专', '本科', '硕士']
          },
          {
            type: 'MyWholeinput',
            name: '何时何原因被列为重点人',
            percentage: '100%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: '涉重点组织',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MySelect',
            name: '危害级别',
            isRequired: false,
            percentage: '50%',
            value: '',
            selects: ['黄', '橙', '红']
          },
          {
            type: 'MyInput',
            name: '现居地址',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '责任单位',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '所涉领域',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '查处情况',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MySelect',
            name: '属地',
            isRequired: false,
            percentage: '50%',
            value: '',
            selects: ['深圳', '广州', '惠州', '佛山', '顺德', '茂名']
          },
          {
            type: 'MyTitle',
            name: '虚拟身份管理',
            right: '虚拟身份管理',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MyManage',
            name: '虚拟省份管理',
            percentage: '100%',
            lists_arr:[
              {hostlocation:'',isSave:false,operation:'+',},
              {hostlocation:'www.sina.com ',isSave:false,operation:'-',selected:'新浪微博'},
              {hostlocation:'www.tengxun.com ',isSave:false,operation:'-',selected:'腾讯微博'},
              {hostlocation:'www.tianya.com ',isSave:false,operation:'-',selected:'天涯社区'}
              ]
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            right: '',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'ImportantSearch',
            name: '使用网名',
            percentage: '50%',
            isRequired: true,
            btnValue: '选择',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '发帖平台',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点网站查重',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '上网账号',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点账号查重',
            value: ''
          },
          {
            type: 'MyTime',
            name: '注册时间',
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
            type: 'MySelect',
            name: '使用语言',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['深圳', '广州', '惠州', '佛山', '顺德', '茂名']
          },
          {
            type: 'MySelect',
            name: '发布类型',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['深圳', '广州', '惠州', '佛山', '顺德', '茂名']
          },
          {
            type: 'MyInput',
            name: '上网地点',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyTime',
            name: '发布时间',
            isRequired: false,
            isMulti: true,
            percentage: '50%',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'MyWholeinput',
            name: '涉及信息网页原标题',
            percentage: '100%',
            isRequired: true,
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
            type: 'MyInput',
            name: '关键词',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '期发刊号',
            percentage: '50%',
            isRequired: false,
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
//        新增信息
        add_lists:[
          {
            type: 'MyTitle',
            name: '重点人基本情况',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
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
            name: '姓名：',
            percentage: '50%',
            isRequired: false,
            value: '王明明'
          },
          {
            type: 'MySpan',
            name: '曾用名：',
            percentage: '50%',
            isRequired: false,
            value: '刘壮实'
          },
          {
            type: 'MySpan',
            name: '身份证号：',
            percentage: '50%',
            isRequired: false,
            value: '441498877451489635'
          },
          {
            type: 'MySpan',
            name: '性别：',
            percentage: '50%',
            isRequired: false,
            value: '男'
          },
          {
            type: 'MySpan',
            name: '联系电话：',
            percentage: '50%',
            isRequired: false,
            value: '15789544852'
          },
          {
            type: 'MySpan',
            name: '职业：',
            percentage: '50%',
            isRequired: false,
            value: '无业'
          },
          {
            type: 'MySpan',
            name: '户籍地址：',
            percentage: '50%',
            isRequired: false,
            value: '益田花园20栋13楼1303'
          },
          {
            type: 'MySpan',
            name: '文化程度：',
            percentage: '50%',
            isRequired: false,
            value: '大专'
          },
          {
            type: 'MySpan',
            name: '何时何原因被列为重点人：',
            percentage: '100%',
            isRequired: false,
            value: '长得太丑长得太丑长得太丑长得太丑长得太丑长得太丑长得太丑'
          },
          {
            type: 'MySpan',
            name: '重点组织：',
            percentage: '50%',
            isRequired: false,
            value: '茉莉花组织'
          },
          {
            type: 'MySpan',
            name: '危害级别',
            isRequired: false,
            percentage: '50%',
            value: '黄',
          },
          {
            type: 'MySpan',
            name: '现居地址：',
            percentage: '50%',
            isRequired: false,
            value: '福田集训大队'
          },
          {
            type: 'MySpan',
            name: '责任单位：',
            percentage: '50%',
            isRequired: false,
            value: '福田分局'
          },
          {
            type: 'MySpan',
            name: '所涉领域：',
            percentage: '50%',
            isRequired: false,
            value: '涉枪'
          },
          {
            type: 'MySpan',
            name: '查处情况：',
            percentage: '50%',
            isRequired: false,
            value: '巴拉巴拉我也不知道'
          },
          {
            type: 'MySpan',
            name: '属地：',
            percentage: '50%',
            isRequired: false,
            value: '深圳'
          },
          {
            type: 'MyTitle',
            name: '虚拟身份管理',
            right: '虚拟身份类别管理',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MyManage',
            name: '虚拟省份管理',
            percentage: '100%',
            lists_arr:[
              {hostlocation:'www.sina.com ',isSave:true,operation:'保存',selected:'新浪微博'},
              {hostlocation:'www.tengxun.com ',isSave:true,operation:'保存',selected:'腾讯微博'},
              {hostlocation:'www.tianya.com ',isSave:true,operation:'保存',selected:'天涯社区'}
            ]
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            right: '',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'ImportantSearch',
            name: '使用网名',
            percentage: '50%',
            isRequired: true,
            btnValue: '选择',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '发帖平台',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点网站查重',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '上网账号',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点账号查重',
            value: ''
          },
          {
            type: 'MyTime',
            name: '注册时间',
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
            type: 'MySelect',
            name: '使用语言',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['深圳', '广州', '惠州', '佛山', '顺德', '茂名']
          },
          {
            type: 'MySelect',
            name: '发布类型',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['深圳', '广州', '惠州', '佛山', '顺德', '茂名']
          },
          {
            type: 'MyInput',
            name: '上网地点',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyTime',
            name: '发布时间',
            isRequired: false,
            isMulti: true,
            percentage: '50%',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'MyWholeinput',
            name: '涉及信息网页原标题',
            percentage: '100%',
            isRequired: true,
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
            type: 'MyInput',
            name: '关键词',
            percentage: '50%',
            isRequired: false,
            value: ''
          },
          {
            type: 'MyInput',
            name: '期发刊号',
            percentage: '50%',
            isRequired: false,
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
//        详情页
        details_lists_edit:[
          {
            type: 'MyTitle',
            name: '重点人基本情况',
            percentage: '100%',
            isSlide: false,
            isEdit: true
          },
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
            type: 'MyInput',
            name: '姓名',
            percentage: '50%',
            isRequired: true,
            value: '王明明'
          },
          {
            type: 'MyInput',
            name: '曾用名',
            percentage: '50%',
            isRequired: false,
            value: '刘壮实'
          },
          {
            type: 'MyInput',
            name: '身份证号',
            percentage: '50%',
            isRequired: true,
            value: '441498877451489635'
          },
          {
            type: 'MySex',
            name: '性别',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'MyInput',
            name: '联系电话',
            percentage: '50%',
            isRequired: false,
            value: '15789544852'
          },
          {
            type: 'MyInput',
            name: '职业',
            percentage: '50%',
            isRequired: false,
            value: '无业'
          },
          {
            type: 'MyInput',
            name: '户籍地址',
            percentage: '50%',
            isRequired: true,
            value: '益田花园20栋13楼1303'
          },
          {
            type: 'MySelect',
            name: '文化程度',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['小学', '初中', '高中', '大专', '本科', '硕士']
          },
          {
            type: 'MyWholeinput',
            name: '何时何原因被列为重点人',
            percentage: '100%',
            isRequired: true,
            value: '长得太丑长得太丑长得太丑长得太丑长得太丑长得太丑长得太丑'
          },
          {
            type: 'MyInput',
            name: '涉及重点组织',
            percentage: '50%',
            isRequired: false,
            value: '茉莉花组织'
          },
          {
            type: 'MySelect',
            name: '危害级别',
            isRequired: false,
            percentage: '50%',
            value: '',
            selects: ['黄', '橙', '红']
          },
          {
            type: 'MyInput',
            name: '现居地址',
            percentage: '50%',
            isRequired: false,
            value: '福田集训大队'
          },
          {
            type: 'MyInput',
            name: '责任单位',
            percentage: '50%',
            isRequired: false,
            value: '福田分局'
          },
          {
            type: 'MyInput',
            name: '所涉领域',
            percentage: '50%',
            isRequired: false,
            value: '涉枪'
          },
          {
            type: 'MyInput',
            name: '查处情况',
            percentage: '50%',
            isRequired: false,
            value: '巴拉巴拉我也不知道'
          },
          {
            type: 'MyInput',
            name: '属地',
            percentage: '50%',
            isRequired: false,
            value: '深圳'
          },
          {
            type: 'MyTitle',
            name: '虚拟身份管理',
            right: '虚拟身份类别管理',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MyManage',
            name: '虚拟省份管理',
            percentage: '100%',
            lists_arr:[
              {hostlocation:'www.sina.com ',isSave:true,operation:'保存',selected:'新浪微博'},
              {hostlocation:'www.tengxun.com ',isSave:true,operation:'保存',selected:'腾讯微博'},
              {hostlocation:'www.tianya.com ',isSave:true,operation:'保存',selected:'天涯社区'}
            ]
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            right: '',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MyTable',
            isShowRight:true,
            lists_header:['录入时间','网页原标题','使用网名','发布类型','发帖平台','填报单位','录入人'],
          }
        ],
        details_lists:[
          {
            type: 'MyTitle',
            name: '重点人基本情况',
            percentage: '100%',
            isSlide: false,
            isEdit: true
          },
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
            name: '姓名：',
            percentage: '50%',
            isRequired: false,
            value: '王明明'
          },
          {
            type: 'MySpan',
            name: '曾用名：',
            percentage: '50%',
            isRequired: false,
            value: '刘壮实'
          },
          {
            type: 'MySpan',
            name: '身份证号：',
            percentage: '50%',
            isRequired: false,
            value: '441498877451489635'
          },
          {
            type: 'MySpan',
            name: '性别：',
            percentage: '50%',
            isRequired: false,
            value: '男'
          },
          {
            type: 'MySpan',
            name: '联系电话：',
            percentage: '50%',
            isRequired: false,
            value: '15789544852'
          },
          {
            type: 'MySpan',
            name: '职业：',
            percentage: '50%',
            isRequired: false,
            value: '无业'
          },
          {
            type: 'MySpan',
            name: '户籍地址：',
            percentage: '50%',
            isRequired: false,
            value: '益田花园20栋13楼1303'
          },
          {
            type: 'MySpan',
            name: '文化程度：',
            percentage: '50%',
            isRequired: false,
            value: '大专'
          },
          {
            type: 'MySpan',
            name: '何时何原因被列为重点人：',
            percentage: '100%',
            isRequired: false,
            value: '长得太丑长得太丑长得太丑长得太丑长得太丑长得太丑长得太丑'
          },
          {
            type: 'MySpan',
            name: '涉及重点组织：',
            percentage: '50%',
            isRequired: false,
            value: '茉莉花组织'
          },
          {
            type: 'MySpan',
            name: '危害级别',
            isRequired: false,
            percentage: '50%',
            value: '黄',
          },
          {
            type: 'MySpan',
            name: '现居地址：',
            percentage: '50%',
            isRequired: false,
            value: '福田集训大队'
          },
          {
            type: 'MySpan',
            name: '责任单位：',
            percentage: '50%',
            isRequired: false,
            value: '福田分局'
          },
          {
            type: 'MySpan',
            name: '所涉领域：',
            percentage: '50%',
            isRequired: false,
            value: '涉枪'
          },
          {
            type: 'MySpan',
            name: '查处情况：',
            percentage: '50%',
            isRequired: false,
            value: '巴拉巴拉我也不知道'
          },
          {
            type: 'MySpan',
            name: '属地：',
            percentage: '50%',
            isRequired: false,
            value: '深圳'
          },
          {
            type: 'MyTitle',
            name: '虚拟身份管理',
            right: '虚拟身份类别管理',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MyManage',
            name: '虚拟省份管理',
            percentage: '100%',
            lists_arr:[
              {hostlocation:'www.sina.com ',isSave:true,operation:'保存',selected:'新浪微博'},
              {hostlocation:'www.tengxun.com ',isSave:true,operation:'保存',selected:'腾讯微博'},
              {hostlocation:'www.tianya.com ',isSave:true,operation:'保存',selected:'天涯社区'}
            ]
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            right: '',
            percentage: '100%',
            isSlide: false,
            isEdit: false
          },
          {
            type: 'MyTable',
            isShowRight:true,
            lists_header:['录入时间','网页原标题','使用网名','发布类型','发帖平台','填报单位','录入人'],
          }
        ],
        post_data_modal1: {},
        post_data_modal2: {},
        post_data_modal4: {},
        checkAll: false,
        checkArr: [],
        list:[
          {
            id: 1,
            name1: '李自成',
            name2: '曾用名：李自成曾用名：李自成',
            card_num: 121126198603601205,
            online_name: '冬天里的小裤衩冬天里的小裤衩冬天里的小裤衩',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部: 欧阳恩',
            time: 2017
          },
          {
            id: 2,
            name1: '李自成',
            name2: '曾用名：李自成曾用名：李自成',
            card_num: 121126198603601205,
            online_name: '冬天里的小裤衩冬天里的小裤衩冬天里的小裤衩',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部: 欧阳恩',
            time: 2017
          },
          {
            id: 3,
            name1: '李自成',
            name2: '曾用名：李自成曾用名：李自成',
            card_num: 121126198603601205,
            online_name: '冬天里的小裤衩冬天里的小裤衩冬天里的小裤衩',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部: 欧阳恩',
            time: 2017
          },
          {
            id: 4,
            name1: '李自成',
            name2: '曾用名：李自成曾用名：李自成',
            card_num: 121126198603601205,
            online_name: '冬天里的小裤衩冬天里的小裤衩冬天里的小裤衩',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部: 欧阳恩',
            time: 2017
          },
          {
            id: 5,
            name1: '李自成',
            name2: '曾用名：李自成曾用名：李自成',
            card_num: 121126198603601205,
            online_name: '冬天里的小裤衩冬天里的小裤衩冬天里的小裤衩',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部: 欧阳恩',
            time: 2017
          }
        ]
      }
    },
    created(){
      this._toggleModal()
      this._toggleModal1()
    },
    computed: {
      ...mapState([
        'edit'
      ])
    },
    methods: {
      // 切换弹窗
      _toggleModal() {
        this.bus.$on('toggleModal', () => {
          this.modal4 = false
          this.modal2 = true
        })
      },
      _toggleModal1() {
        this.bus.$on('toggleModal1', () => {
//          this.modal1 = false
//          this.modal2 = false
          this.modal4 = false
          this.modal3 = true
        })
      },
      getChangeData_modal1 (val) {
        if(val) {
          this.post_data_modal1[val.name] = val.val
          console.log(this.post_data_modal1)
        }
      },
      getChangeData_modal2 (val) {
        if(val) {
          this.post_data_modal2[val.name] = val.val
          console.log(this.post_data_modal2)
        }
      },
      getChangeData_modal4 (val) {
        if(val) {
          this.post_data_modal4[val.name] = val.val
          console.log(this.post_data_modal4)
        }
      },
      edit_category(e, index) {
        this.c_index = index
        this.isEdit = !this.isEdit
      },
      delete_category(e, index) {
        this.platform_arr.splice(index, 1)
      },
      add_category(e) {
        this.isAdd = !this.isAdd
      },
      add_one(e){
        let str = document.querySelector(".add_name").value
        if(str==''){
          alert("名称不能为空！")
          return
        }
        this.isAdd = !this.isAdd
        this.platform_arr.push(str)
        document.querySelector(".add_name").value = ""
      },
      startTime(data){
        this.condition_data.fillStartTime = data
      },
      endTime(data){
        this.condition_data.fillEndTime = data
      },
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
  @import "~common/stylus/mixin"

  .p
    padding-left 20px
  .lists_wrapper
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
      .web_lis
        width 20%
      .time_t
        width 31%
      .unit_t, .person_t, .status_t, .new_info
        width 11%
    .item_list /*列表详细*/
      width 100%
      height 70px
      line-height 70px
      background $color-background-d
      margin-top 10px
      overflow hidden
      color #000
      font-family "Microsoft YaHei"
      text-align center
      &:hover
        box-shadow 0 0 20px 0 #D7D7D7
      .common_css
        width 11%
        padding 0 8px
      .check_lis
        width 5%
        input
          outline none
      .web_lis
        width 20%
        position relative
        height 70px
        .head_img
          width 55px
          height 55px
          background #00d1b2
          float left
        .head_info
          text-align left
          line-height 30px
          padding-left 65px
          color $color-text-l
          font-size $font-size-medium
          .blue
            font-size $font-size-medium-x
            padding-right 10px
            font-weight bold
            color $color-sub-theme
          .num
            font-size $font-size-medium-x
            line-height 1
            color $color-text-d
      .newinfo_lis
        width 31%
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

  //录入重点组织
  .modal_header
    > span
      font-weight bold
      font-size 16px
      font-family "Microsoft YaHei"
      padding-left 12px

  .modal_content
  .common_title
    color #5587d7
    .span_right
      font-size 14px
      font-family "Microsoft YaHei"
      margin-right 32px
    .t_edit
      margin-right 40px
    .span_left
    // margin-right 464px
      font-size 16px
      font-family "Microsoft YaHei"
    .e_span
      margin 0px 20px

  .basic_info
    border-bottom: 1px solid #CCCCCC
    padding-bottom: 30px

  .id_manage
    border-bottom: 1px solid #CCCCCC
    padding-bottom: 30px
    .save
      text-align center
      line-height: 38px
      background-color: #89BAF0
      width: 60px
      height: 38px
      margin-top 3px
      color #ffffff
      border(#70A1D8)

  .msg_send
    margin 0px 20px 50px 20px
    .title_left
      margin-left -20px
      .export
        width: 60px
        height: 25px
        text-align center
        line-height: 25px
        border-radius 2px
        border(#5587d7)
      .adds
        width: 60px
        height: 25px
        text-align center
        line-height: 25px
        border-radius 2px
        margin-left 10px
        border(#5587d7)
    .item_title
      height: 45px
      background-color: #f2f2f2;
      height: 45px
      line-height: 45px
      .check_all
        width: 5%
        text-align center
      .report_time, .online_name, .publish_type, .note_platform, .send_unit, .input_person
        width: 11%
        color: #3b3b3b
        text-align center
      .src_title
        width: 29%
        color: #3b3b3b
        text-align center
    .item_list
      height: 45px
      font-size 14px
      font-family "Microsoft YaHei"
      color #3b3b3b
      &:hover
        box-shadow 0 0 20px 0 #D7D7D7
      .input
        width: 5%
        margin-top 7px
        text-align center
      .report_time, .online_name, .publish_type, .note_platform, .send_unit, .input_person
        width: 11%
        margin-top 7px
        text-align center
      .src_title
        width: 29%
        color #5587d7
        margin-top 7px
        text-align center
    .item_list:nth-child(even)
      background-color: #fbfbfb;

  .com_div
    height 48px
    margin 0px 20px
    border-bottom 1px solid #F4F4F4
    .file
      margin: 4px 0px;
      position: relative;
      display: inline-block;
      background: #87baf0
      /*border-radius: 4px;*/
      padding: 0px 12px;
      overflow: hidden;
      color: #f9f9f9;
      text-decoration: none;
      text-indent: 0;
      line-height: 38px;
      width: 80px
      height: 38px
      font-size 14px
      font-family "Microsoft YaHei"
    .file input
      position: absolute;
      font-size: 100px;
      right: 0px;
      top: 0px;
      opacity: 0;
    .tbr
      margin 0px 0px 0px 0px
    .time_key
      width: 193px !important
    .input
      height 38px
      border(#aaa)
      box-shadow 3px 3px 5px 0 #e0e0e0 inset
      color #000
      padding-left 10px
      margin-top 3px
      background-color: #fbfbfb;
    .tbdw
      margin 0px 42px 0px 0px
    .span1
      margin 0px 0px 0px 66px
    .r_style
      margin 0px 9px 0px 68px
    .zc_time
      margin-left 68px
      margin-right 18px
    .r_style1
      margin 0px 36px 0px 68px
    .tbun
      margin 0px 34px 0px 0px
    .qq
      margin-left 64px
    .span_font
      font-size 14px
      font-family "Microsoft YaHei"
      line-height 48px
      color #000
    .span_font1
      font-size 14px
      font-family "Microsoft YaHei"
      line-height 48px
      color #3b3b3b
    .red
      color red !important
    .one
      width 50%
      padding-left 23px
    .manage_m
      padding-left 23px
    .text_left
      width 25%
    .input_name
      width 180px
    .input_other1
      width 300px
    .input_other2
      margin-left 25px
      width 252px
    .input_key
      width 631px
    .net_info
      width: 648px
      margin: 3px 6px 0px 6px
    .choose_name
      width 80px
    .two
      line-height 48px
      width 50%
    .span_cao
      margin-left 46px
    .span_feng
      margin-left 13px
    .right_d
      margin-left 26px
    .key_person
      padding-left 23px
      width 100%
    .checked_box
      margin-left 30px
      line-height 48px
      font-size 14px
      font-family "Microsoft YaHei"
      color #000
    .radiobutton:active
      color #5587d7
    .c_span
      line-height 24px
      display inline-block
      text-align center
      width 80px
      height 24px
      font-size 14px
      font-family "Microsoft YaHei"
      color #3b3b3b
      margin 12px 0px
    .c_1
      background-color #e5e5e5
    .c_2
      background-color #b2b2b2
    .c_3
      background-color #999999
    .c_1_color
      background-color #f7f910
    .c_2_color
      background-color #f7b942
    .c_3_color
      color: #ffffff
      background-color #ff0000
    .add_reduce
      text-align center
      font-weight bold
      width: 38px
      height: 38px
      color #5587d7
      line-height: 38px
      border(#5587d7)
      margin-top 3px
    .up_time
      width: 240px
      padding: 10px 163px 10px 8px
      border 1px solid
      margin 5px 0px
    .up_time1
      z-index 2!important
    .send_msg
      width: 246px
      margin 4px 0px
    .net_name
      width: 162px
    .btn_m
      height: 38px
      line-height: 38px
      margin 3px 0px 0px 4px
      background-color: #87baf0;
      font-size 14px
      font-family "Microsoft YaHei"
      color #ffffff
    .upload_btn
      width: 80px
      margin-left 0px
    .key_word1
      width: 245px
    .net_check
      margin-top 6px
      margin-left 8px
      width: 112px
    .send_form
      width: 124px
    .bug_change
      margin-top 6px !important
    .net_count
      width: 130px
    .key_count
      width: 112px
    .net_locat
      width: 246px
    .src_title
      width: 666px
    .text_inf
      margin 0px 22px
    .left_style
      margin-right 55px
    .key_word
      width: 225px
    .qihao
      margin 0px 16px 0px 46px
    .tw
      margin 0px 28px 0px 68px
    .sw
      margin 0px 44px 0px 68px
    .fw
      margin 0px 17px 0px 68px
    .qsr
      margin-top 6px
    .change_when
      width: 574px
    .mr
      margin-left 0px
  .textarea_content
    height: 280px
    margin: 8px 0px 0px 20px
    border-bottom 1px solid #F4F4F4
    .span_font
      font-size 14px
      font-family "Microsoft YaHei"
      line-height 48px
      color #000
    .qq
      margin-right 60px !important
    .ms_cont
      margin-left 20px
    .red
      margin-right 94px
      color red !important
    .text_eidt
      padding: 5px
      resize: none
      width: 666px
      height: 266px
    .input
      border(#aaa)
      box-shadow 3px 3px 5px 0 #e0e0e0 inset
      color #000
      padding 10px
      margin-top 6px
    .text_remarks
      padding: 5px
      resize: none
      width: 666px
      height: 157px
      margin-left 128px
  .com_div_info
    border-bottom 1px solid #F4F4F4
  .end_div
    border-bottom none !important
  .option_text
    height 38px
    line-height 36px
    border 1px solid #ABADB3
    outline none padding-left 6px
    box-shadow 0 3px 5px 0 #e0e0e0 inset
    margin-top 6px
    margin-left 10px
  .education
    width: 252px
    margin-left 24px
  .location
    width: 300px
    margin-left 0px
  .net_location
    width: 118px
    font-size 14px
    font-family "Microsoft YaHei"
    color #888888
  .net_loc
    margin-right 30px
  .textarea2
    height: 172px
  .footerBtn
    margin-top 30px
    width: 100%
    height: 70px
    background-color: #EEF3FB
    .btn
      width: 80px
      height: 30px
      margin 20px 0px
      font-size 14px
      font-family "Microsoft YaHei"
      border-radius 2px
    .close
      color #ffffff
      background-color #5587D7
    .post
      color #3b3b3b
      margin-left 5px
      margin-right 36px
      background-color: #CFD9E9;
  .main_content
    padding: 30px 16px
    .title
      width: 100%
      height: 36px
      line-height: 36px
      background-color: #f2f2f2;
      .title_font
        font-size 14px
        font-family "Microsoft YaHei"
        color #888888
      .shibie
        width: 50%
        text-align center
      .operation
        width: 50%
        text-align center
    .detail_list
      overflow auto
      .list_item
        height: 36px
        padding-top: 3px
        .list_left
          color: #000
          text-align center
          width: 50%
          .netplatform
            width: 180px
            height: 30px
            border(#4794F3)
            text-align center
        .list_right
          color: #000
          text-align center
          width: 50%
          .c_color
            font-size 14px
            color #4794f3
            font-family "Microsoft YaHei"
          .save_change
            font-size 14px
            font-family "Microsoft YaHei"
            width: 77px
            height: 30px
            line-height: 30px
            color #ffffff
            border-radius 2px
            margin 3px 0px 0px 100px
            background-color: #4794f3;
      .add_category
        text-align center
        .add_span
          display: block
          width: 97px
          height: 30px
          color #4794F3
          border(#4794F3)
          border-radius 2px
          margin 30px 235px 15px 200px
      .list_item:nth-child(odd)
        background-color: #fbfbfb;

</style>
