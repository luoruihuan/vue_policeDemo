<template>
  <div>
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">账号名称</td>
        <td class="two">
          <input class="keywords" name="countName" v-model="condition_data.countName" pointer="text" placeholder="请输入">
        </td>
        <td class="three">真实名称</td>
        <td class="four">
          <input class="keywords" name="trueName" v-model="condition_data.trueName" pointer="text" placeholder="请输入">
        </td>
      </tr>
      <tr slot="row2" class="row">
        <td class="one">注册时间</td>
        <td class="two">
          <span class="type pointer" style="position: relative;">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>-
            <upload-time :timeType="'结束时间'" v-on:timeStr="endTime"></upload-time>
          </span>
        </td>
        <td class="three">填报单位</td>
        <td class="four">
          <input class="keywords" name="fillUnit" v-model="condition_data.fillUnit" pointer="text" placeholder="请输入关键词">
        </td>
      </tr>
      <tr slot="row3" class="row">
        <td class="one">填报人</td>
        <td class="two">
          <input class="keywords" name="fillPerson" v-model="condition_data.fillPerson" pointer="text" placeholder="请输入关键词">
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
          <span class="tab pointer active float_left">涉恐重点账号</span>
        </div>
        <div slot="right">
          <span class="opt float_left pointer" @click="modal = true">新增重点账号</span>
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
          <li class="float_left head_t">头像</li>
          <li class="float_left login_t">账号名/注册时间</li>
          <li class="float_left name_t">真实姓名</li>
          <li class="float_left place_t">所在地</li>
          <li class="float_left title_t">最近发布网页原标题</li>
          <li class="float_left person_t">最近填报人</li>
          <li class="float_left time_t">最近填报时间</li>
          <li class="float_left handle_t">操作</li>
        </ul>
        <!--新增信息列表-->
        <ul class="item_list pointer clearfix" v-for="item in list">
          <label>
            <li class="float_left check_lis"><input type="checkbox" v-model="checkArr" :value="item.id"></li>
          </label>
          <li class="float_left head common_css">
            <div class="head_img"></div>
          </li>
          <li class="float_left login common_css">
            <div class="head_info multi_center">
              <p class="name color_blue fontomit" @click="modal2 = true">{{item.name}}</p>
              <p class="time">{{item.register_time}}</p>
            </div>
          </li>
          <li class="float_left common_css name fontomit">
            {{item.real_name}}
          </li>
          <li class="float_left common_css place fontomit">
            {{item.addr}}
          </li>
          <li class="float_left title fontomit">{{item.info_title}}</li>
          <li class="float_left fontomit common_css">{{item.do_person}}</li>
          <li class="float_left fontomit common_css">{{item.time}}</li>
          <li class="float_left fontomit center common_css addinfo">
            <span @click="modal1 = true"><span class="iconfont icon-jia"></span> 新增信息</span>
          </li>
        </ul>
      </div>
      <PageTurn :totalPage="totalPage"></PageTurn>
    </div>
    <!--新增重点账号-->
    <modal :modal="modal" :width="'1000'" :top="'5%'" v-on:hideModal="modal = false">
      <span slot="title">涉台账号基本情况</span>
      <div slot="content" class="modal_content modal_lists">
        <add :form_lists="modal_lists" @changeData="_changeData_modal"></add>
      </div>
    </modal>
    <!--新增信息-->
    <modal :modal="modal1" :width="'1000'" :top="'5%'" v-on:hideModal="modal1 = false">
      <span slot="title">涉台账号基本情况</span>
      <div slot="content" class="modal_content modal_lists">
        <add :form_lists="modal1_lists" @changeData="_changeData_modal1"></add>
      </div>
    </modal>
    <!--详情页-->
    <modal :modal="modal2" :width="'1100'" :top="'5%'" v-on:hideModal="modal2 = false">
      <span slot="title">涉恐账号台账详情</span>
      <div slot="content" class="modal_content modal_lists">
        <add :form_lists="edit ? modal2_lists_edit : modal2_lists" @changeData="_changeData_modal2"></add>
      </div>
    </modal>
    <!--详情 => 新增 -->
    <modal :modal="modal3" :width="'1000'" :top="'5%'" v-on:hideModal="modal3 = false">
      <span slot="title">涉台账号基本情况</span>
      <div slot="content" class="modal_content clearfix">
        <ul class="items">

          <li class="item-title info" style="margin-top: -21px;">
            信息发布情况
            <span class="right float_right pointer" @click="publish = !publish">
              <span class="icon iconfont" :class="{'icon-shuangjiantouxia1':!publish, 'icon-shanghua':publish}"></span>
              {{publish ? '收齐' : '展开'}}
            </span>
          </li>
          <li v-show="publish">
            <ul>
              <li class="item clearfix">
                <div class="float_left" style="width: 50%;">
                  <span class="left float_left">
                    <span class="name float_left">涉及信息发布时间</span>
                    <span class="red float_left">*</span>
                  </span>
                  <!--<input class="float_left text" type="text" placeholder="请输入">-->
                  <span class="type pointer float_left text" style="position: relative;line-height: 38px;color:#757575">
                    <upload-time :timeType="'选择时间'"></upload-time>
                 </span>
                </div>
                <div class="float_left" style="width: 50%;">
                  <span class="left float_left">
                    <span class="name float_left">信息类型</span>
                    <span class="red float_left">*</span>
                  </span>
                  <select name="" class="text" style="color: #757575;">
                    <option value="">信息1</option>
                    <option value="">信息1</option>
                    <option value="">信息3</option>
                    <option value="">信息4</option>
                  </select>
                </div>
              </li>
              <li class="item clearfix">
                <div class="float_left" style="width: 50%;">
                  <span class="left float_left">
                    <span class="name float_left">涉及信息链接地址</span>
                    <span class="red float_left">*</span>
                  </span>
                  <input class="float_left text" type="text" placeholder="请输入">
                </div>
                <div class="float_left" style="width: 50%;">
                  <span class="left float_left">
                    <span class="name float_left">发布类型</span>
                    <span class="red float_left">*</span>
                  </span>
                  <select name="" class="text" style="color: #757575;">
                    <option value="">发布</option>
                    <option value="">发布</option>
                    <option value="">发布</option>
                    <option value="">发布</option>
                  </select>
                </div>
              </li>
              <li class="item clearfix">
            <span class="left float_left">
              <span class="name float_left">涉及信息网页原标题</span>
              <span class="red float_left">*</span>
            </span>
                <input class="float_left text w600" type="text" placeholder="请输入">
              </li>
              <li class="item clearfix report">
           <span class="left float_left">
              <span class="name float_left">信息内容</span>
              <span class="red float_left">*</span>
           </span>
                <textarea class="float_left w600 multi_text" cols="30" rows="10" placeholder="请输入"></textarea>
              </li>
              <li class="item clearfix">
                <span class="name float_left left">涉及重点事件</span>
                <button class="float_left add pointer">+添加</button>
              </li>
              <li class="item clearfix">
                <div class="float_left" style="width: 50%;">
                  <span class="left float_left">
                    <span class="name float_left">使用语言</span>
                    <span class="red float_left">*</span>
                  </span>
                  <select name="" class="text" style="color: #757575;">
                    <option value="">信息1</option>
                    <option value="">信息1</option>
                    <option value="">信息3</option>
                    <option value="">信息4</option>
                  </select>
                </div>
              </li>

              <li class="item clearfix">
            <span class="left float_left">
              <span class="name float_left">涉及关键词</span>
              <span class="red float_left">*</span>
            </span>
                <input class="float_left text w600" type="text" placeholder="请输入">
              </li>
              <li class="item clearfix report">
           <span class="left float_left">
              <span class="name float_left">备注</span>
           </span>
                <textarea class="float_left w600 multi_text" cols="30" rows="5" placeholder="请输入"></textarea>
              </li>
              <li class="item clearfix">
                <span class="name float_left left">附件</span>
                <span class="right float_left else">
                    <span class="center pointer dislockline button">添加附件
                    <input type="file" class="file pointer">
                    </span>
                </span>
              </li>
              <li>
              </li>
            </ul>
          </li>
          <li class="item clearfix">
            <button @click="modal1 = false" class="float_right close pointer">关闭</button>
            <button @click="modal1 = false" class="float_right post pointer">提交</button>
          </li>
        </ul>
      </div>
    </modal>
    <!--详情 => 新增 => 账号查询-->
    <modal :modal="modal4" :width="'1000'" :top="'5%'" v-on:hideModal="modal4 = false">
      <span slot="title">新增网址</span>
      <div slot="content" class="modal_content clearfix">
        <ul class="items">
          <li class="item-title info" style="margin-top: -21px">
            新增网址
            <span class="right float_right pointer" @click="publish = !publish">
              <span class="icon iconfont" :class="{'icon-shuangjiantouxia1':!publish, 'icon-shanghua':publish}"></span>
              {{publish ? '收齐' : '展开'}}
            </span>
          </li>
          <li v-show="publish">
            <ul>
              <li class="item receive clearfix">
            <span class="left float_left">
              <span class="name float_left">账号所在平台</span>
              <span class="red float_left">*</span>
            </span>
                <span class="r_left float_left">
              <div class="org float_left pointer" v-for="(i,index) in hasId_arr">
                {{i}}<span class="iconfont icon-cuowu" @click="add($event, i, index)"></span>
              </div>
            </span>
                <span class="r_right float_left">
              <div class="i">账号列表</div>
              <div class="i org pointer" v-for="(i,index) in notId_arr" @click="reduce($event, i, index)">{{i}}</div>
            </span>
              </li>
              <li></li>
            </ul>
          </li>
          <li class="item clearfix">
            <button @click="modal4 = false;modal = true" class="float_right close pointer">关闭</button>
            <button @click="modal4 = false;modal = true" class="float_right post pointer">提交</button>
          </li>
        </ul>
      </div>
    </modal>
    <!--详情 => 新增 => 姓名-->
    <modal :modal="modal5" :width="'1000'" :top="'5%'" v-on:hideModal="modal5 = false">
      <span slot="title">新增人员</span>
      <div slot="content" class="modal_content clearfix">
        <ul class="items">
          <li class="item-title info" style="margin-top: -21px">
            新增人员
            <span class="right float_right pointer" @click="publish = !publish">
              <span class="icon iconfont" :class="{'icon-shuangjiantouxia1':!publish, 'icon-shanghua':publish}"></span>
              {{publish ? '收齐' : '展开'}}
            </span>
          </li>
          <li v-show="publish">
            <ul>
              <li class="item receive clearfix">
            <span class="left float_left">
              <span class="name float_left">姓名已有平台</span>
              <span class="red float_left">*</span>
            </span>
                <span class="r_left float_left">
              <div class="org float_left pointer" v-for="(i,index) in hasName_arr">
                身份证号：{{i.IDcard}}<br>姓名：{{i.name}}
                <span class="iconfont icon-cuowu" @click="addName($event, i, index)"></span>
              </div>
            </span>
                <span class="r_right float_left">
              <div class="i">姓名列表</div>
              <div class="i org pointer" v-for="(i, index) in notName_arr" @click="reduceName($event, i, index)">
                {{i.name}}&nbsp;&nbsp;&nbsp;{{i.IDcard}}
              </div>
            </span>
              </li>
              <li></li>
            </ul>
          </li>
          <li class="item clearfix">
            <button @click="modal5 = false;modal = true" class="float_right close pointer">关闭</button>
            <button @click="modal5 = false;modal = true" class="float_right post pointer">提交</button>
          </li>
        </ul>
      </div>
    </modal>

    <modal :modal="modal6" v-on:hideModal="modal6 = false" :width="1100" :top="50">
      <span slot="title">待完善333</span>
      <div slot="content" class="modal_content clearfix">
        新弹窗333
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
    data () {
      return {
        isChecked: false,
        p_arr: ['档案类资料', '涉恐账号台账'],
        totalPage: 40,
        modal: false,
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        modal6:false,
//        edit: false,
        publish: true,
        hasId_arr: ['www.baidu.com', 'www.sina.com'],
        notId_arr: ['www.dsa.com', 'www.dsad.com', 'www.dsa.com', 'www.dsad.com', 'www.dsadsa.com', 'www.dssadsa.com', 'www.adsa.com', 'dsadsa.com', 'hao123.com'],
        hasName_arr: [
          {
            name: '张飞',
            IDcard: 1234567891011111111
          },
          {
            name: '关羽',
            IDcard: 1234567891011111111
          }
        ],
        notName_arr: [
          {
            name: '张飞',
            IDcard: 1234567891011111111
          },
          {
            name: '关羽',
            IDcard: 1234567891011111111
          },
          {
            name: '张三',
            IDcard: 1234567891011111111
          },
          {
            name: '关羽',
            IDcard: 1234567891011111111
          }
        ],
        condition_data:{},
//        新增重点账号
        modal_lists: [
          {
            type: 'MyTitle',
            name: '涉恐帐号基本情况',
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
            name: '帐号名称',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '所在平台',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点网站查询',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '真实姓名',
            percentage: '50%',
            isRequired: false,
            btnValue: '重点人查询',
            value: ''
          },
          {
            type: 'MyTime',
            name: '注册时间',
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
            type: 'MySelect',
            name: '活跃程度',
            isMulti: false,
            percentage: '50%',
            isRequired: true,
            value: '',
            selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
          },
          {
            type: 'MyInput',
            name: '所在地',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            value: '公安部'
          },
          {
            type: 'MyInput',
            name: '关联帐号',
            isRequired: false,
            percentage: '50%',
            value: ''
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isSlide: true,
            isEdit: false
          },
          {
            type: 'MyTime',
            name: '发布时间',
            isRequired: true,
            percentage: '50%',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'MySelect',
            name: '信息类型',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '链接地址',
            isRequired: true,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MySelect',
            name: '发布类型',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '原标题',
            isRequired: true,
            percentage: '100%',
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
            type: 'ImportantSearch',
            name: '重点事件',
            percentage: '100%',
            isRequired: true,
            btnValue: '+添加',
            value: ''
          },
          {
            type: 'MySelect',
            name: '使用语言',
            percentage: '100%',
            isRequired: true,
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '关键词',
            percentage: '100%',
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
//        新增信息页
        modal1_lists: [
          {
            type: 'MyTitle',
            name: '涉恐帐号基本情况',
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
            value: '曹风云'
          },
          {
            type: 'MySpan',
            name: '帐号名称',
            percentage: '50%',
            isRequired: true,
            value: '54344'
          },
          {
            type: 'MySpan',
            name: '所在平台',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点网站查询',
            value: '52.2.2.2.2.'
          },
          {
            type: 'MySpan',
            name: '真实姓名',
            percentage: '50%',
            isRequired: false,
            btnValue: '重点人查询',
            value: '李四'
          },
          {
            type: 'MySpan',
            name: '注册时间',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            value: '2016.6.6',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'MySpan',
            name: '活跃程度',
            isMulti: false,
            percentage: '50%',
            isRequired: true,
            value: '活跃',
            selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
          },
          {
            type: 'MySpan',
            name: '所在地',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            value: '公安部'
          },
          {
            type: 'MySpan',
            name: '关联帐号',
            isRequired: false,
            percentage: '50%',
            value: '公安部'
          },
          {
            type: 'MySpan',
            name: '重点组织',
            isRequired: false,
            percentage: '50%',
            value: '茉莉花'
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isSlide: true,
            isEdit: false
          },
          {
            type: 'MyTime',
            name: '发布时间',
            isRequired: true,
            percentage: '50%',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'MySelect',
            name: '信息类型',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '链接地址',
            isRequired: true,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MySelect',
            name: '发布类型',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '原标题',
            isRequired: true,
            percentage: '100%',
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
            type: 'ImportantSearch',
            name: '添加事件',
            percentage: '100%',
            isRequired: true,
            btnValue: '+添加',
            value: ''
          },
          {
            type: 'MySelect',
            name: '使用语言',
            percentage: '100%',
            isRequired: true,
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '关键词',
            percentage: '100%',
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
        modal1_lists_edit: [
          {
            type: 'MyTitle',
            name: '涉恐帐号基本情况',
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
            name: '帐号名称',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '所在平台',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点网站查询',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '真实姓名',
            percentage: '50%',
            isRequired: false,
            btnValue: '重点人查询',
            value: ''
          },
          {
            type: 'MyTime',
            name: '注册时间',
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
            type: 'MySelect',
            name: '活跃程度',
            isMulti: false,
            percentage: '50%',
            isRequired: true,
            value: '',
            selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
          },
          {
            type: 'MyInput',
            name: '所在地',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            value: ''
          },
          {
            type: 'MyInput',
            name: '关联帐号',
            isRequired: false,
            percentage: '50%',
            value: ''
          },
          {
            type: 'MyInput',
            name: '重点组织',
            isRequired: false,
            percentage: '50%',
            value: ''
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isSlide: true,
            isEdit: false
          },
          {
            type: 'MyTime',
            name: '发布时间',
            isRequired: true,
            percentage: '50%',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'MySelect',
            name: '信息类型',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '链接地址',
            isRequired: true,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MySelect',
            name: '发布类型',
            isRequired: true,
            percentage: '50%',
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '原标题',
            isRequired: true,
            percentage: '100%',
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
            type: 'ImportantSearch',
            name: '添加事件',
            percentage: '100%',
            isRequired: true,
            btnValue: '+添加',
            value: ''
          },
          {
            type: 'MySelect',
            name: '使用语言',
            percentage: '100%',
            isRequired: true,
            value: '',
            selects: ['通知A', '通知B', '通知C', '通知D', '通知E', '通知F']
          },
          {
            type: 'MyInput',
            name: '关键词',
            percentage: '100%',
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
        modal2_lists: [
          {
            type: 'MyTitle',
            name: '涉恐帐号基本情况',
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
            value: '曹风云'
          },
          {
            type: 'MySpan',
            name: '帐号名称',
            percentage: '50%',
            isRequired: true,
            value: '54344'
          },
          {
            type: 'MySpan',
            name: '所在平台',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点网站查询',
            value: '52.2.2.2.2.'
          },
          {
            type: 'MySpan',
            name: '真实姓名',
            percentage: '50%',
            isRequired: false,
            btnValue: '重点人查询',
            value: '李四'
          },
          {
            type: 'MySpan',
            name: '注册时间',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            value: '2016.6.6',
            time: [
              {
                'name': '选择时间'
              }
            ]
          },
          {
            type: 'MySpan',
            name: '活跃程度',
            isMulti: false,
            percentage: '50%',
            isRequired: true,
            value: '活跃',
            selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
          },
          {
            type: 'MySpan',
            name: '所在地',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            value: '公安部'
          },
          {
            type: 'MySpan',
            name: '关联帐号',
            isRequired: false,
            percentage: '50%',
            value: '无'
          },
          {
            type: 'MySpan',
            name: '重点组织',
            isRequired: false,
            percentage: '50%',
            value: '茉莉花'
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isSlide: true,
            isEdit: false
          },
          {
            type: 'MyInput',
            name: '帐号名称',
            isRequired: false,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MyInput',
            name: '真实名称',
            isRequired: false,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MyTime',
            name: '注册时间',
            isRequired: false,
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
            type: 'MyInput',
            name: '填报单位',
            isRequired: false,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MyInput',
            name: '填报人',
            isRequired: false,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MyTime',
            name: '填报时间',
            isRequired: false,
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
            name: '真实名称',
            isRequired: true,
            percentage: '50%',
            isShowRight:true,
            value: '1.1.1..1',
            lists_header:['录入时间','网页原标题','信息发布时间','涉及重点事件','发布类型','报送单位','填报人'],
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
        modal2_lists_edit: [
          {
            type: 'MyTitle',
            name: '涉恐帐号基本情况',
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
            name: '帐号名称',
            percentage: '50%',
            isRequired: true,
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '所在平台',
            percentage: '50%',
            isRequired: true,
            btnValue: '重点网站查询',
            value: ''
          },
          {
            type: 'ImportantSearch',
            name: '真实姓名',
            percentage: '50%',
            isRequired: false,
            btnValue: '重点人查询',
            value: ''
          },
          {
            type: 'MyTime',
            name: '注册时间',
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
            type: 'MySelect',
            name: '活跃程度',
            isMulti: false,
            percentage: '50%',
            isRequired: true,
            value: '',
            selects: ['活跃', '活跃', '活跃', '活跃', '活跃']
          },
          {
            type: 'MyInput',
            name: '所在地',
            isRequired: true,
            isMulti: false,
            percentage: '50%',
            value: ''
          },
          {
            type: 'MyInput',
            name: '关联帐号',
            isRequired: false,
            percentage: '50%',
            value: ''
          },
          {
            type: 'MyInput',
            name: '重点组织',
            isRequired: false,
            percentage: '50%',
            value: ''
          },
          {
            type: 'MyTitle',
            name: '信息发布情况',
            percentage: '100%',
            isSlide: true,
            isEdit: false
          },
          {
            type: 'MyInput',
            name: '帐号名称',
            isRequired: false,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MyInput',
            name: '真实名称',
            isRequired: false,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MyTime',
            name: '注册时间',
            isRequired: false,
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
            type: 'MyInput',
            name: '填报单位',
            isRequired: false,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MyInput',
            name: '填报人',
            isRequired: false,
            percentage: '50%',
            value: '1.1.1..1'
          },
          {
            type: 'MyTime',
            name: '填报时间',
            isRequired: false,
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
            name: '真实名称',
            isRequired: true,
            percentage: '50%',
            value: '1.1.1..1',
            isShowRight:true,
            value: '1.1.1..1',
            lists_header:['录入时间','网页原标题','信息发布时间','涉及重点事件','发布类型','报送单位','填报人'],
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
        post_data_modal: {},
        post_data_modal1: {},
        post_data_modal2: {},
        checkAll: false,
        checkArr: [],
        list: [
          {
            id: 1,
            name: '李自成李自成李自成李自成李自成',
            register_time: '2017-02-23',
            real_name: '王秃顶',
            addr: '上海',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部：欧阳锋',
            time: 2017
          },
          {
            id: 2,
            name: '李自成李自成李自成李自成李自成',
            register_time: '2017-02-23',
            real_name: '王秃顶',
            addr: '上海',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部：欧阳锋',
            time: 2017
          },
          {
            id: 3,
            name: '李自成李自成李自成李自成李自成',
            register_time: '2017-02-23',
            real_name: '王秃顶',
            addr: '上海',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部：欧阳锋',
            time: 2017
          },
          {
            id: 4,
            name: '李自成李自成李自成李自成李自成',
            register_time: '2017-02-23',
            real_name: '王秃顶',
            addr: '上海',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部：欧阳锋',
            time: 2017
          },
          {
            id: 5,
            name: '李自成李自成李自成李自成李自成',
            register_time: '2017-02-23',
            real_name: '王秃顶',
            addr: '上海',
            info_title: '新浪网新闻中心是新浪网最重要的频道之一',
            do_person: '公安部：欧阳锋',
            time: 2017
          }
        ]
      }
    },
    created(){
      this._toggleModal()
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
          this.modal2 = false
          this.modal1 = true
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
      _changeData_modal (val) {
        if(val) {
          this.post_data_modal[val.name] = val.val
          console.log(this.post_data_modal)
        }
      },
      _changeData_modal1 (val) {
        if(val) {
          this.post_data_modal1[val.name] = val.val
          console.log(this.post_data_modal1)
        }
      },
      _changeData_modal2 (val) {
        if(val) {
          this.post_data_modal2[val.name] = val.val
          console.log(this.post_data_modal2)
        }
      },
      add (e, i, index) {
        this.hasId_arr.splice(index, 1)
        this.notId_arr.push(i)
      },
      reduce (e, i, index) {
        this.notId_arr.splice(index, 1)
        this.hasId_arr.push(i)
      },
      addName (e, i, index) {
        this.hasName_arr.splice(index, 1)
        this.notName_arr.push(i)
      },
      reduceName (e, i, index) {
        this.notName_arr.splice(index, 1)
        this.hasName_arr.push(i)
      },
      startTime(data){
        this.condition_data.registerStartTime = data
      },
      endTime(data){
        this.condition_data.registerEndTime = data
      },
      startTime1(data){
        this.condition_data.fillStartTime = data
      },
      endTime1(data){
        this.condition_data.fillEndTime = data
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
      .title_t
        width 18%
      .head_t, .login_t, .name_t, .place_t, .person_t, .time_t, .handle_t
        width 11%
    .item_list /*列表详细*/
      width 100%
      height 70px
      line-height 70px
      background $color-background-d
      margin-top 10px
      overflow hidden
      color #000
      font-family Microsoft YaHei
      text-align center
      &:hover
        box-shadow 0 0 20px 0 #D7D7D7
      .common_css
        width 11%
        padding 0 4px
      .check_lis
        width 5%
        input
          outline none
      .head
        padding-top 7.5px
        .head_img
          width 55px
          height 55px
          margin 0 auto
          background #00d1b2
      .login
        line-height 20px
        position relative
        height 70px
        .head_info
          color #3b3b3b
          line-height 25px
          font-size $font-size-small
          .name
            font-size $font-size-medium-x
            font-weight bold
            &:hover
              color $color-theme-d
      .title
        width 18%
      .addinfo
        span
          font-size $font-size-medium
          color $color-sub-theme
          padding 3px 8px
          border-radius 5px
          border 1px solid $color-sub-theme
          margin-top 5px
          &.iconfont
            border none
            padding 0
            font-weight bold
            font-size 10px


</style>
