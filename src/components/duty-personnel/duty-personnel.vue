<template>
  <div class="big-layout">
    <div class="p">
      <position :p_arr="p_arr" @sendIsHide="getIsHide"></position>
    </div>
    <div v-show="isHide" class="layout">
      <!--tab切换-->
      <ul class="tab-router">
        <li v-for="(i ,index) in tab_arr" :class="{isChecked:c_index==index}" class="pointer"
            @click="isChoosed($event, index, i)">
          {{i}}
          <span :class="{orange: c_index==index}"></span>
        </li>
      </ul>
      <!--总分-->
      <div :index="0" v-if="c_index==0" class="lists_wrapper">
        <!--图表区域-->
        <div class="chart-show" :class="{back:isBack}">
          <transition name="slider-fade">
            <div v-show="!isBack" class="chart-content">
              <div class="w25 float_left">
                <ring :circleCss="duty_circleCss" :rate="duty_rate">
                  <span slot="text">
                    <span style="font-size:51px;color:#2fd073;position: relative;left: -5px;top: 8px">{{duty_rate * 100}}
                      <span style="font-size: 34px;position: absolute;right: -28px;bottom: 10px;">%</span>
                    </span>
                  </span>
                </ring>

                <p class="item_p1">档案资料</p>
                <p class="item_p2">完成率</p>
              </div>
              <div class="w25 float_left">
                <ring :circleCss="msg_circleCss" :rate="msg_rate">
                  <span slot="text">
                    <span style="font-size:51px;color:#fe5d4b;position: relative;left: -5px;top: 8px">{{msg_rate * 100}}
                      <span style="font-size: 34px;position: absolute;right: -28px;bottom: 10px;">%</span>
                    </span>
                  </span>
                </ring>
                <span class="bd"></span>
                <p class="item_p1">信息采报</p>
                <p class="item_p2">采分率</p>
              </div>
              <div class="w25 float_left">
                <ring :circleCss="task_circleCss" :rate="task_rate">
                  <span slot="text">
                    <span style="font-size:51px;color:#ff9900;position: relative;left: -5px;top: 8px">{{task_rate * 100}}
                      <span style="font-size: 34px;position: absolute;right: -28px;bottom: 10px;">%</span>
                    </span>
                  </span>
                </ring>
                <span class="bd"></span>
                <p class="item_p1">处置任务</p>
                <p class="item_p2">完成率</p>
              </div>
              <div class="w25 float_left">
                <ring :circleCss="file_circleCss" :rate="file_rate">
                  <span slot="text">
                    <span style="font-size:51px;color:#3680db;position: relative;left: -5px;top: 8px;">{{file_rate * 100}}
                      <span style="font-size: 34px;position: absolute;right: -28px;bottom: 10px;">%</span>
                    </span>
                  </span>
                </ring>
                <span class="bd"></span>
                <p class="item_p1">档案管理</p>
                <p class="item_p2">总体新增量</p>
              </div>
            </div>
          </transition>
          <div class="bd" v-show="c_index==0"></div>
          <div v-on:click="backMenu($event)" v-show="c_index!=5" class="toggle_menu pointer"><span class="iconfont"
                                                                               :class="{'icon-shuangjiantouxia4':isBack, 'icon-shuangjiantouxia3': !isBack}"></span>
          </div>
        </div>
        <div class="conditon">
          <condition>
            <tr slot="row3" class="row">
              <td class="one">考核时间：</td>
              <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>
          </span>&nbsp;至&nbsp;
                <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'" v-on:timeStr="endTime"></upload-time>
          </span>
              </td>
              <td class="three">责任人员：</td>
              <td class="four">
                <input class="keywords" name="dutyPerson_zf" v-model="condition_data.dutyPerson_zf" type="text">
                <span class="type pointer blue">搜索</span>
              </td>
            </tr>
          </condition>
        </div>
        <my-tab>
          <div slot="left">
            <span class="tab pointer active float_left">本单位考核总分</span>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left web_lis">责任人员</li>
            <li class="float_left new_info">信息报送25%</li>
            <li class="float_left time_t">专项任务50%</li>
            <li class="float_left unit_t">档案资料25%</li>
            <li class="float_left person_t">考核扣分</li>
            <li class="float_left status_t">总分</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}" class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer" v-model="isChecked"></li>
            <li class="float_left source team">张三</li>
            <li class="float_left title common_css">30</li>
            <li class="float_left unit center common_css">5</li>
            <li class="float_left type center common_css">12</li>
            <li class="float_left scrope center">-10</li>
            <li class="float_left totalScrope center">85</li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <!--责任巡查-->
      <div :index="1" v-else-if="c_index==1" class="lists_wrapper">
        <!--图表区域-->
        <div class="chart-show" :class="{back:isBack}">
          <transition name="slider-fade">
            <div v-show="!isBack" class="chart-content">
              <div id="pic_table" style="width: 100%;height: 265px;"></div>
            </div>
          </transition>
          <div class="bd" v-show="c_index==1"></div>
          <div v-on:click="backMenu($event)" v-show="c_index!=5" class="toggle_menu pointer"><span class="iconfont"
                                                                               :class="{'icon-shuangjiantouxia4':isBack, 'icon-shuangjiantouxia3': !isBack}"></span>
          </div>
        </div>
        <div class="conditon">
          <condition>
            <tr slot="row3" class="row">
              <td class="one">考核时间：</td>
              <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime1"></upload-time>
          </span>&nbsp;至&nbsp;
                <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'" v-on:timeStr="endTime1"></upload-time>
          </span>
              </td>
              <td class="three">责任人员：</td>
              <td class="four">
                <input class="keywords" name="dutyPerson_xc" v-model="condition_data.dutyPerson_xc" type="text">
                <span class="type pointer blue">搜索</span>
              </td>
            </tr>
          </condition>
        </div>
        <my-tab>
          <div slot="left">
            <span class="tab pointer active float_left" style="padding-left: 20px;">省厅</span>
            <span class="num-count">总人数88人 应到人数50人 实际在线49人</span>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left duty-unit">责任人员</li>
            <li class="float_left duty-area">责任区</li>
            <li class="float_left duty-num">责任巡查量</li>
            <li class="float_left total-duty-num">总体巡查量</li>
            <li class="float_left leave-times">缺岗次数</li>
            <li class="float_left miss-num">漏巡次数</li>
            <li class="float_left total-scrope">总分</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}"
              class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer"></li>
            <li @click="p_arr.splice(3, 1, '巡查工作统计');isHide = false" class="float_left source duty-unit">张三</li>
            <li @click="p_arr.splice(3, 1, '巡查工作统计');isHide = false" class="float_left title duty-area">网站：新浪、腾讯</li>
            <li @click="p_arr.splice(3, 1, '巡查工作统计');isHide = false" class="float_left duty-num center ">18</li>
            <li @click="p_arr.splice(3, 1, '巡查工作统计');isHide = false" class="float_left total-duty-num type center ">18</li>
            <li @click="p_arr.splice(3, 1, '巡查工作统计');isHide = false" class="float_left leave-times center">1</li>
            <li @click="p_arr.splice(3, 1, '巡查工作统计');isHide = false" class="float_left miss-num center">12</li>
            <li @click="p_arr.splice(3, 1, '巡查工作统计');isHide = false" class="float_left total-scrope center">85</li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <!--信息报送-->
      <div :index="2" v-else-if="c_index==2" class="lists_wrapper">
        <!--图表区域-->
        <div class="chart-show" :class="{back:isBack}">
          <transition name="slider-fade">
            <div v-show="!isBack" class="chart-content clearfix" style="height: 600px;">
              <div class="send_msg_left float_left" style="height: 50%;">
                <!--圆环start-->
                <div class="title">信息报送</div>
                <div class="clearfix" style="transform: translate(15%,20px)">
                  <ring :circleCss="send_msg_out_circleCss" :rate="send_msg_out_rate"
                        style="float: left;">
                  <span slot="text">
                    <ring :circleCss="send_msg_inner_circleCss" :rate="send_msg_inner_rate"
                          style="position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);transform: translate(-50%, -50%);"/>
                    <ring :circleCss="send_msg_small_circleCss" :rate="send_msg_small_rate"
                          style="position: absolute;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);transform: translate(-50%, -50%);"/>
                  </span>
                  </ring>
                  <ul class="lists float_left">
                    <li class="item"><span class="squer1"></span>上报信息 <span class="num">360条</span></li>
                    <li class="item"><span class="squer2"></span>上报信息 <span class="num">30条</span></li>
                    <li class="item"><span class="squer3"></span>上报信息 <span class="num">36条</span></li>
                    <li class="item">采分率 <span class="percent">46%</span></li>
                  </ul>
                </div>
                <!--圆end-->
              </div>
              <div class="bd"></div>
              <div id="send_msg_right" class="float_left"
                   style="margin: 20px 20px 4px 20px;width: 45%;height: 50%;">
              </div>
              <div id="send_msg_line" style="float: left;width: 90%;height: 40%;"></div>
            </div>
          </transition>
          <div class="bd" v-show="c_index==2"></div>
          <div v-on:click="backMenu($event)" v-show="c_index!=5" class="toggle_menu pointer"><span class="iconfont"
                                                                               :class="{'icon-shuangjiantouxia4':isBack, 'icon-shuangjiantouxia3': !isBack}"></span>
          </div>
        </div>
        <div class="conditon">
          <condition>
            <tr slot="row3" class="row">
              <td class="one">考核时间：</td>
              <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime2"></upload-time>
          </span>&nbsp;至&nbsp;
                <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'" v-on:timeStr="endTime2"></upload-time>
          </span>
              </td>
              <td class="three">责任人员：</td>
              <td class="four">
                <input class="keywords" name="dutyPerson_bs" v-model="condition_data.dutyPerson_bs" type="text">
                <span class="type pointer blue">搜索</span>
              </td>
            </tr>
          </condition>
        </div>
        <my-tab>
          <div slot="left">
            <span class="tab pointer active float_left">信息报送</span>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left duty-unit">责任人员</li>
            <li class="float_left send-num">总报送数</li>
            <li class="float_left accept-num">被采分数</li>
            <li class="float_left s-scrope">得分</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}"
              class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer"></li>
            <li @click="p_arr.splice(3, 1, '人员报送详情');isHide = false" class="float_left duty-unit">张三</li>
            <li @click="p_arr.splice(3, 1, '人员报送详情');isHide = false" class="float_left send-num">1</li>
            <li @click="p_arr.splice(3, 1, '人员报送详情');isHide = false" class="float_left accept-num">12</li>
            <li @click="p_arr.splice(3, 1, '人员报送详情');isHide = false" class="float_left s-scrope">85</li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <!--处置任务-->
      <div :index="3" v-else-if="c_index==3" class="lists_wrapper">
        <!--图表区域-->
        <div class="chart-show" :class="{back:isBack}">
          <transition name="slider-fade">
            <div v-show="!isBack" class="chart-content clearfix">
              <div id="task" style="float: left;width: 50%;height: 265px;"></div>
              <div id="task_percent" style="float: left;width: 50%;height: 100%;"></div>
            </div>
          </transition>
          <div class="bd" v-show="c_index==3"></div>
          <div v-on:click="backMenu($event)" v-show="c_index!=5" class="toggle_menu pointer"><span class="iconfont"
                                                                               :class="{'icon-shuangjiantouxia4':isBack, 'icon-shuangjiantouxia3': !isBack}"></span>
          </div>
        </div>
        <div class="conditon">
          <condition>
            <tr slot="row3" class="row">
              <td class="one">考核时间：</td>
              <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime3"></upload-time>
          </span>&nbsp;至&nbsp;
                <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'" v-on:timeStr="endTime3"></upload-time>
          </span>
              </td>
              <td class="three">责任人员：</td>
              <td class="four">
                <input class="keywords" name="dutyPerson_rw" v-model="condition_data.dutyPerson_rw" type="text">
                <span class="type pointer blue">搜索</span>
              </td>
            </tr>
          </condition>
        </div>
        <my-tab>
          <div slot="left">
            <span class="tab pointer active float_left">任务类型</span>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left duty-unit">责任人员</li>
            <li class="float_left land-research">落地调查</li>
            <li class="float_left harmful-info">有害信息</li>
            <li class="float_left info-research">信息查证</li>
            <li class="float_left situaton-control">舆情导控</li>
            <li class="float_left other-task">其他任务</li>
            <li class="float_left total-scrope">总分</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}"
              class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer"></li>
            <li @click="p_arr.splice(3, 1, '人员处置详情');isHide = false" class="float_left duty-unit">张三</li>
            <li @click="p_arr.splice(3, 1, '人员处置详情');isHide = false" class="float_left land-research">25</li>
            <li @click="p_arr.splice(3, 1, '人员处置详情');isHide = false" class="float_left harmful-info">6</li>
            <li @click="p_arr.splice(3, 1, '人员处置详情');isHide = false" class="float_left info-research">11</li>
            <li @click="p_arr.splice(3, 1, '人员处置详情');isHide = false" class="float_left situaton-control">22</li>
            <li @click="p_arr.splice(3, 1, '人员处置详情');isHide = false" class="float_left other-task">9</li>
            <li @click="p_arr.splice(3, 1, '人员处置详情');isHide = false" class="float_left total-scrope">79</li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <!--档案资料-->
      <div :index="4" v-else-if="c_index==4" class="lists_wrapper">
        <!--图表区域-->
        <div class="chart-show" :class="{back:isBack}">
          <transition name="slider-fade">
            <div v-show="!isBack" class="chart-content">
              <div id="msg" style="padding: 20px 20px 4px 20px;width: 100%;height: 265px;"></div>
            </div>
          </transition>
          <div class="bd" v-show="c_index==4"></div>
          <div v-on:click="backMenu($event)" v-show="c_index!=5" class="toggle_menu pointer"><span class="iconfont"
                                                                               :class="{'icon-shuangjiantouxia4':isBack, 'icon-shuangjiantouxia3': !isBack}"></span>
          </div>
        </div>
        <div class="conditon">
          <condition>
            <tr slot="row3" class="row">
              <td class="one">考核时间：</td>
              <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime4"></upload-time>
          </span>&nbsp;至&nbsp;
                <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'" v-on:timeStr="endTime4"></upload-time>
          </span>
              </td>
              <td class="three">责任人员：</td>
              <td class="four">
                <input class="keywords" name="dutyPerson_zl" v-model="condition_data.dutyPerson_zl" type="text">
                <span class="type pointer blue">搜索</span>
              </td>
            </tr>
          </condition>
        </div>
        <my-tab>
          <div slot="left">
            <span class="tab pointer active float_left">资料档案</span>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left duty-unit">责任人员</li>
            <li class="float_left web-bill">网站类台账</li>
            <li class="float_left key-bill">重点组织台账</li>
            <li class="float_left person-bill">重点人台账</li>
            <li class="float_left event-bill">重要网上事件台账</li>
            <li class="float_left terror-acount">涉恐账号</li>
            <li class="float_left total-scrope">总分</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}"
              class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer" v-model="isChecked"></li>
            <li @click="p_arr.splice(3, 1, '人员上传详情');isHide = false" class="float_left duty-unit">张三</li>
            <li @click="p_arr.splice(3, 1, '人员上传详情');isHide = false" class="float_left web-bill">25</li>
            <li @click="p_arr.splice(3, 1, '人员上传详情');isHide = false" class="float_left key-bill">6</li>
            <li @click="p_arr.splice(3, 1, '人员上传详情');isHide = false" class="float_left person-bill">11</li>
            <li @click="p_arr.splice(3, 1, '人员上传详情');isHide = false" class="float_left event-bill">22</li>
            <li @click="p_arr.splice(3, 1, '人员上传详情');isHide = false" class="float_left terror-acount">9</li>
            <li @click="p_arr.splice(3, 1, '人员上传详情');isHide = false" class="float_left total-scrope">79</li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <!--考核扣分-->
      <div :index="5" v-else-if="c_index==5" class="lists_wrapper">
        <!--图表区域-->
        <div class="chart-show" :class="{back:isBack}">
          <transition name="slider-fade">
            <div v-show="!isBack" class="chart-content" style="height: 0;"></div>
          </transition>
          <div v-on:click="backMenu($event)"  v-show="!c_index==5" class="toggle_menu pointer"><span class="iconfont"
                                                                               :class="{'icon-shuangjiantouxia4':isBack, 'icon-shuangjiantouxia3': !isBack}"></span>
          </div>
        </div>
        <div class="conditon">
          <condition>
            <tr slot="row3" class="row">
              <td class="one">考核时间：</td>
              <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime5"></upload-time>
          </span>&nbsp;至&nbsp;
                <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'" v-on:timeStr="endTime5"></upload-time>
          </span>
              </td>
              <td class="three">责任人员：</td>
              <td class="four">
                <input class="keywords" name="dutyPerson_kf" v-model="condition_data.dutyPerson_kf" type="text">
                <span class="type pointer blue">搜索</span>
              </td>
            </tr>
          </condition>
        </div>
        <my-tab>
          <div slot="left">
            <span class="tab pointer active float_left">考核扣分</span>
          </div>
          <div slot="right">
            <span v-on:click="edit($event)" class="opt float_left pointer">编辑</span>
            <span class="opt float_left pointer">取消</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left duty-unit">责任人员</li>
            <li class="float_left msg-late">信息迟报</li>
            <li class="float_left msg-miss">信息漏报</li>
            <li class="float_left accepet-low">采用率低</li>
            <li class="float_left other">其它</li>
            <li class="float_left total-scrope">总分</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}" class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer"></li>
            <li class="float_left duty-unit">赵六</li>
            <li class="float_left msg-late"><input class="input_nums" type="text" v-show="!isSeen" @change="getNum"><span v-show="isSeen">{{num1}}</span>
            </li>
            <li class="float_left msg-miss"><input class="input_nums" type="text" v-show="!isSeen" @change="getNum"><span v-show="isSeen">{{num2}}</span>
            </li>
            <li class="float_left accepet-low"><input class="input_nums" type="text" v-show="!isSeen" @change="getNum"><span v-show="isSeen">{{num3}}</span>
            </li>
            <li class="float_left other"><input class="input_nums" type="text" v-show="!isSeen" @change="getNum"><span v-show="isSeen">{{num4}}</span>
            </li>
            <li class="float_left total-scrope"><input class="input_nums" type="text" v-show="!isSeen" @change="getNum"><span
              v-show="isSeen">{{num5}}</span>
            </li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <to-top></to-top>
      <setting></setting>
    </div>
    <!--各个二级页面-->
    <div :index="1" class="file-detail detail" v-show="!isHide&&c_index==1">
      <condition>
        <tr slot="row3" class="row">
          <td class="one">考核时间：</td>
          <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'"></upload-time>
          </span>&nbsp;至&nbsp;
            <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'"></upload-time>
          </span>
          </td>
          <td class="three">责任人员：</td>
          <td class="four">
            <input class="keywords" type="text">
            <span class="type pointer blue">搜索</span>
          </td>
        </tr>
      </condition>
      <div class="lists_wrapper">
        <my-tab>
          <div slot="left">
            <ul class="tab-router">
              <li v-for="(i ,index) in sec_tab_arr" :class="{isChecked:s_index==index}" class="pointer">
                {{i}}
                <span :class="{orange: s_index==index}"></span>
              </li>
            </ul>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left c-name">姓名</li>
            <li class="float_left c-count">账号</li>
            <li class="float_left c-time">在线时长</li>
            <li class="float_left c-dnum">责任巡查量</li>
            <li class="float_left c-mnum">自主巡查量</li>
            <li class="float_left c-lnum">信息浏览量</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}"
              class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer"></li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left c-name">张三</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left c-count">aaaaaaa</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left c-time">18</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left c-dnum">18</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left c-mnum">12</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left c-lnum">85</li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <to-top></to-top>
      <setting></setting>
    </div>
    <div :index="2" class="task-detail detail" v-show="!isHide&&c_index==2">
      <condition>
        <tr slot="row3" class="row">
          <td class="one">考核时间：</td>
          <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'"></upload-time>
          </span>&nbsp;至&nbsp;
            <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'"></upload-time>
          </span>
          </td>
          <td class="three">责任人员：</td>
          <td class="four">
            <input class="keywords" type="text">
            <span class="type pointer blue">搜索</span>
          </td>
        </tr>
      </condition>
      <div class="lists_wrapper">
        <my-tab>
          <div slot="left">
            <span class="tab pointer active float_left">张三</span>
            <span class="num-count">总计报送25条 累计得分58分</span>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left m-send-time">报送时间</li>
            <li class="float_left m-msg-title">信息标题</li>
            <li class="float_left m-msg-rank">信息级别</li>
            <li class="float_left m-msg-count">信息得分</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}"
              class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer"></li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left m-send-time">2017.5.21 11:06</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left m-msg-title">可燃冰成中国王牌</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left m-msg-rank">一级</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left m-msg-count">3</li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <to-top></to-top>
      <setting></setting>
    </div>
    <div :index="3" class="task-detail detail" v-show="!isHide&&c_index==3">
      <condition>
        <tr slot="row3" class="row">
          <td class="one">考核时间：</td>
          <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'"></upload-time>
          </span>&nbsp;至&nbsp;
            <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'"></upload-time>
          </span>
          </td>
          <td class="three">责任人员：</td>
          <td class="four">
            <input class="keywords" type="text">
            <span class="type pointer blue">搜索</span>
          </td>
        </tr>
      </condition>
      <div class="lists_wrapper">
        <my-tab>
          <div slot="left">
            <span class="tab pointer active float_left">张三</span>
            <span class="num-count">总计处置25条 累计得分58分</span>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left send-time">下发时间</li>
            <li class="float_left task-kind">任务类型</li>
            <li class="float_left msg-title">信息标题</li>
            <li class="float_left feedback-unit">反馈单位</li>
            <li class="float_left feedback-person">反馈人员</li>
            <li class="float_left deal-time">处置时间</li>
            <li class="float_left msg-scrope">信息得分</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}"
              class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer"></li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left send-time">2017.5.21 10:06</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left task-kind">落地调查</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left msg-title">李克强一句鼓励 山西官地旷工变身双创秀才</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left feedback-unit">深圳</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left feedback-person">张三</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left deal-time">2017.5.21 11:06</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left msg-scrope">3</li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <to-top></to-top>
      <setting></setting>
    </div>
    <div :index="4" class="file-detail detail" v-show="!isHide&&c_index==4">
      <condition>
        <tr slot="row3" class="row">
          <td class="one">考核时间：</td>
          <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'"></upload-time>
          </span>&nbsp;至&nbsp;
            <span class="type pointer" style="position: relative">
             <upload-time :timeType="'结束时间'"></upload-time>
          </span>
          </td>
          <td class="three">责任人员：</td>
          <td class="four">
            <input class="keywords" type="text">
            <span class="type pointer blue">搜索</span>
          </td>
        </tr>
      </condition>
      <div class="lists_wrapper">
        <my-tab>
          <div slot="left">
            <span class="tab pointer active float_left">张三</span>
            <span class="num-count">共上传资料25条 累计得分48分</span>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <div>
          <ul class="item_title clearfix">
            <li class="float_left check_all"><input type="checkbox"></li>
            <li class="float_left pd-duty-unit">上传时间</li>
            <li class="float_left send-num">资料分类</li>
            <li class="float_left accept-num">资料名称</li>
            <li class="float_left pd-scrope">得分</li>
          </ul>
          <ul v-for="i in 20" :class="{deep: isChecked}"
              class="item_list pointer clearfix">
            <li class="float_left input"><input type="checkbox" class="pointer"></li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left pd-duty-unit">2017.5.21 10：06</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left send-num">网站类台账</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left accept-num">蓝鲸</li>
            <li @click="p_arr.splice(3, 1);isHide=!isHide" class="float_left pd-scrope">3</li>
          </ul>
        </div>
        <PageTurn :totalPage="totalPage"></PageTurn>
      </div>
      <to-top></to-top>
      <setting></setting>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import Position from 'components/position/position'
  import PageTurn from 'components/page-turn/page-turn'
  import MyTab from 'components/my-tab/my-tab'
  import ToTop from 'components/to-top/to-top'
  import Condition from 'components/condition/condition'
  import UploadTime from '../upload-time/upload-time'
  import Setting from 'components/bottom-setting/setting'
  import Ring from 'components/circle/circle'

  export default {
    props: {},
    data () {
      return {
        p_arr: ['首页', '工作考核', '总分'],
        totalPage: 100,
        modal: false,
        isChecked: false,
        isHide: true,
        isSeen: true,
        isBack: false,
        c_index: 0,
        s_index: 0,
        tab_index: 0,
        sec_tab_arr: ["巡查工作统计", "巡查在线统计", "巡查游览统计"],
        tab_arr: ['总分', '责任巡查', '信息报送', '处置任务', '档案资料', '考核扣分'],
        num1: 12,
        num2: 41,
        num3: 51,
        num4: 32,
        num5: 69,
        duty_rate: 0.65,
        duty_circleCss: {
          circle_scale: 160,
          font_family: "bebas",
          innerC_width: 10,
          borderColor_on: "#2cd071",
          borderColor_off: "#efefef",
          outC_color: "#2cd071",
          outC_width: 3,
          distance: 6
        },
        msg_rate: 0.85,
        msg_circleCss: {
          circle_scale: 160,
          font_family: "bebas",
          innerC_width: 10,
          borderColor_on: "#fe5d4b",
          borderColor_off: "#efefef",
          outC_color: "#fe5d4b",
          outC_width: 3,
          distance: 6
        },
        task_rate: 0.85,
        task_circleCss: {
          circle_scale: 160,
          font_family: "bebas",
          innerC_width: 10,
          borderColor_on: "#ff9900",
          borderColor_off: "#efefef",
          outC_color: "#ff9900",
          outC_width: 3,
          distance: 6
        },
        file_rate: 0.85,
        file_circleCss: {
          circle_scale: 160,
          font_family: "bebas",
          innerC_width: 10,
          borderColor_on: "#3680db",
          borderColor_off: "#efefef",
          outC_color: "#3680db",
          outC_width: 3,
          distance: 6
        },
        send_msg_out_rate: 0.85,
        send_msg_out_circleCss: {
          circle_scale: 220,
          innerC_width: 10,
          borderColor_on: "#3d78b2",
          borderColor_off: "transparent",
          outC_color: "#3d78b2",
          outC_width: 0,
          distance: 0
        },
        send_msg_inner_rate: 0.55,
        send_msg_inner_circleCss: {
          circle_scale: 180,
          innerC_width: 10,
          borderColor_on: "#67c9d6",
          borderColor_off: "transparent",
          outC_color: "#3680db",
          outC_width: 0,
          distance: 0
        },
        send_msg_small_rate: 0.23,
        send_msg_small_circleCss: {
          circle_scale: 140,
          innerC_width: 10,
          borderColor_on: "#9fcf85",
          borderColor_off: "transparent",
          outC_color: "#3680db",
          outC_width: 0,
          distance: 0
        },
        condition_data:{}
      }
    },
    mounted () {
      this.echartInit()
    },
    methods: {
      getIsHide (data) {
        this.isHide = data
      },
      getNum (e) {
        e = e || window.target
        e.target.nextElementSibling.innerHTML = e.target.value
      },
      backMenu (e) {
        let pointers = document.querySelectorAll('.tab-router .pointer')
        let _this = this
        let index = this.c_index
        if (this.isBack) {
          pointers[5].onclick = function () {
            _this.c_index = 5
            _this.echartInit()
          }()
          setTimeout(function () {
            pointers[index].onclick = function () {
              _this.c_index = index
              _this.echartInit()
              _this.isBack = false
            }()
          }, 10)
        }else {
          _this.isBack = !this.isBack
        }
      },
      isChoosed (e, index, i) {
        let pointers = document.querySelectorAll('.tab-router .pointer')
        let _this = this
        pointers[5].onclick = function(){
          _this.c_index = 5
          _this.echartInit()
        }()
        setTimeout(function(){
          pointers[index].onclick = function(){
            _this.c_index = index
            _this.p_arr.splice(2, 2, i)
            _this.tab_index = index
            _this.isHide = true
            _this.echartInit()
          }()
        },10)
      },
      edit: function (e) {
        if (e.target.innerText == '编辑') {
          this.isSeen = !this.isSeen
          e.target.innerHTML = '确认'
          e.target.className = 'confirm opt float_left pointer'
        } else {
          this.isSeen = !this.isSeen
          e.target.innerHTML = '编辑'
          e.target.className = 'opt float_left pointer'
        }
        //初始化input的value
        Array.prototype.slice.call(document.querySelectorAll(".input_nums")).forEach(v => {
          v.value = v.nextElementSibling.innerHTML
        })
      },
      echartInit () {
        if (this.c_index == 1) {
          setTimeout(function () {
            let myChart2 = echarts.init(document.getElementById('pic_table'))
            myChart2.setOption({
              grid: {x: 55, y: 50, x2: 25, y2: 25,},
              legend: {
                top: 20,
                right: 10,
                data: [{name: '境内', icon: 'bar'}, {name: '境外', icon: 'bar'}],
                textStyle: {fontSize: 12, color: '#50697a'}
              },
              tooltip: {
                trigger: 'axis', position: function (pt) {
                  return [pt[0], '10%']
                }
              },
              title: {
                text: '境内外媒体传播统计',
                left: 3, top: 3,
                textStyle: {
                  fontSize: 18, fontWeight: '600', color: '#333'
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: {show: false, lineStyle: {color: ['#335c9e']}},
                axisLine: {show: false, lineStyle: {color: '#4a6272'}},
                axisTick: {show: false},
                axisLabel: {splitNumber: 10},
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
              },
              yAxis: {
                type: 'value',
                boundaryGap: false,
                axisLine: {show: false, lineStyle: {color: '#4a6272'}},
                axisTick: {show: false},
                splitLine: {show: true, lineStyle: {color: ['#e4e4e4']}}
              },
              series: [{
                name: '境外', type: 'line', smooth: true, symbol: 'none', sampling: 'average',
                itemStyle: {normal: {color: '#dbbd4e'}},
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#fff'
                    }, {offset: 1, color: '#fff'}])
                  }
                },
                data: [110, 118, 92, 78, 94, 145, 90, 76, 88, 99, 100, 151, 88]
              },
                {
                  name: '境内', type: 'line', smooth: true, symbol: 'none', sampling: 'average',
                  itemStyle: {normal: {color: '#32bf7b'}},
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#d9fcfa'
                      }, {offset: 1, color: '#d9fcfa'}])
                    }
                  },
                  data: [12, 14, 78, 12, 68, 69, 44, 48, 9, 69, 44, 68, 15]
                }
              ]
            })
          }, 20)
        }
        else if (this.c_index == 2) {
          setTimeout(function () {
            let echart_right = echarts.init(document.getElementById('send_msg_right'))
            echart_right.setOption({
              title: {
                text: '来源类别',
                left: 50
              },
              tooltip: {},
              radar: {
                nameGap: 10,//名称和指示器轴的距离
                splitNumber: 4,//分割段数
                splitArea: {//背景分割区域
                  areaStyle: {
                    color: ['#fff', '#fff', '#ededed', '#fff', '#fff', '#fff']
                  }
                },
                indicator: [
                  {name: '销售', max: 6500,},
                  {name: '管理', max: 16000},
                  {name: '信息技', max: 30000},
                  {name: '客服', max: 38000},
                  {name: '研发', max: 52000},
                  {name: '市场', max: 25000}
                ]
              },
              series: [{
                name: '预算 vs 开销',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                  {
                    value: [4300, 10000, 28000, 35000, 50000, 19000],
                    name: '预算分配',
                    itemStyle: {
                      normal: {
                        color: '#fb5547',
                      }
                    }
                  },
                  {
                    value: [5000, 14000, 28000, 31000, 42000, 21000],
                    name: '实际开销',
                    itemStyle: {
                      normal: {
                        color: '#5ac7f7',
                      }
                    }
                  }
                ]
              }]
            })

            let send_msg_line = echarts.init(document.getElementById('send_msg_line'))
            send_msg_line.setOption({
                title: {
                  text: '报送信息类型',
                  left: 20,
                  top: 20
                },
                grid: {x: 100, y: 70, x2: 10, y2: 25},
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                legend: {
                  top: 30,
                  x: 'center',
                  data: ['视频广告', '搜索引擎']
                },
                calculable: true,
                xAxis: [
                  {
                    type: 'value',
                    splitLine: {show: false},
                    axisLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false}
                  },
                ],
                yAxis: [
                  {
                    type: 'category',
                    splitLine: {show: false},
                    axisLine: {show: false},
                    axisTick: {show: false},
                    data: ['周五', '射孔类', '周日']
                  }
                ],
                series: [
                  {
                    name: '视频广告',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 18,
                    itemStyle: {
                      normal: {
                        color: '#3d78b2',
                        label: {
                          show: false
                        }
                      }
                    },
                    data: [190, 330, 410]
                  },
                  {
                    name: '搜索引擎',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 18,
                    itemStyle: {
                      normal: {
                        color: '#9fcf85',
                        label: {
                          show: false
                        }
                      }
                    },
                    data: [120, 130, 120]
                  }
                ]
              }
            )
          }, 20)
        }
        else if (this.c_index == 3) {
          setTimeout(function () {
            let myChart_left = echarts.init(document.getElementById('task'))
            myChart_left.setOption({
              title: {
                text: '总体得分',
                left: 20,
                top: 20
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                right: 0,
                y: 'center',
                x: '10%',
                data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6']
              },
              calculable: true,
              series: [
                {
                  name: '半径模式',
                  type: 'pie',
                  radius: [50, 120],
                  avoidLabelOverlap: false,
                  center: ['50%', '50%'],
                  roseType: 'radius',
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  lableLine: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: true
                    }
                  },
                  data: [
                    {
                      value: 15,
                      name: 'rose1',
                      itemStyle: {
                        normal: {
                          color: '#FFB403',
                        }
                      }
                    },
                    {
                      value: 18,
                      name: 'rose2',
                      itemStyle: {
                        normal: {
                          color: '#02BDCC',
                        }
                      }
                    },
                    {
                      value: 21,
                      name: 'rose3',
                      itemStyle: {
                        normal: {
                          color: '#9A76BE',
                        }
                      }
                    },
                    {
                      value: 24,
                      name: 'rose4',
                      itemStyle: {
                        normal: {
                          color: '#F1573E',
                        }
                      }
                    },
                    {
                      value: 27,
                      name: 'rose5',
                      itemStyle: {
                        normal: {
                          color: '#5ac7f7',
                        }
                      }
                    },
                    {
                      value: 30,
                      name: 'rose6',
                      itemStyle: {
                        normal: {
                          color: '#FF7D2F',
                        }
                      }
                    }
                  ]
                }
              ]
            })
            let myChart_right = echarts.init(document.getElementById('task_percent'))
            let maxData = 2000
            // maxarr为某项最大值
            // arr为某项的值
            let maxarr = [1000, 2000, 3000, 4000, 800]
            let arr = [10, 1800, 300, 2000, 400]
            myChart_right.setOption({
              title: {
                text: '任务完成率',
                top: 20,
                left: 20
              },
              legend: {
                top: 20,
                left: 200,
                data: [{name: '已完成任务量', icon: 'bar'}, {name: '总任务', icon: 'bar'}],
                textStyle: {fontSize: 12, color: '#50697a'}
              },
              tooltip: {},
              xAxis: {
                max: maxData,
                splitLine: {show: false},
                offset: 10,
                axisLine: {
                  lineStyle: {
                    color: 'transparent'
                  }
                },
                axisLabel: {
                  margin: 10
                }
              },
              yAxis: {
                data: ['落地调查', '2014', '2015', '2016', '2017'],
//                inverse: true,
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                  margin: 5,
                  textStyle: {
                    color: '#333',
                    fontSize: 12
                  }
                }
              },
              grid: {
                height: 200,
                top: 70,
                left: 70,
                right: 100
              },
              series: [{
                // current data
                name: '已完成任务量',
                type: 'pictorialBar',
                itemStyle: {
                  normal: {
                    color: '#FFB200'
                  }
                },
                symbol: 'a',
                symbolRepeat: 'fixed',
                symbolMargin: '5%',
                symbolClip: true,
                symbolSize: 25,
                symbolBoundingData: maxData,
                data: [arr[0] / maxarr[0] * maxData, arr[1] / maxarr[1] * maxData, arr[2] / maxarr[2] * maxData, arr[3] / maxarr[3] * maxData, arr[4] / maxarr[4] * maxData],
                z: 10
              }, {
                // full data
                name: '总任务',
                type: 'pictorialBar',
                itemStyle: {
                  normal: {
                    color: '#F1573F'
                  }
                },
                label: {
                  normal: {
                    show: true,
                    formatter: function (params) {
                      return (params.value / maxData * 100).toFixed(1) + ' %';
                    },
                    position: 'outside',
                    offset: [10, 0],
                    textStyle: {
                      color: '#333',
                      fontSize: 12
                    }
                  }
                },
                animationDuration: 0,
                symbolRepeat: 'fixed',
                symbolMargin: '5%',
                symbol: 'dsa ',
                symbolSize: 25,
                symbolBoundingData: maxData,
                data: [arr[0] / maxarr[0] * maxData, arr[1] / maxarr[1] * maxData, arr[2] / maxarr[2] * maxData, arr[3] / maxarr[3] * maxData, arr[4] / maxarr[4] * maxData],
                z: 5
              }]
            })
          }, 20)
        }
        else if (this.c_index == 4) {
          setTimeout(function () {
            let echart5 = echarts.init(document.getElementById('msg'))
            echart5.setOption({
              title: {
                text: '新增录入'
              },
              color: ["#ee8bc3", "#9e80da", "#1cd4d2", "#e6cbae", "#e35b6b"],
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: [
                  {
                    name: '邮件营销',
                    textStyle: {
                      color: '#ee8bc3'
                    }
                  },
                  {
                    name: '联盟广告',
                    textStyle: {
                      color: '#9e80da'
                    }
                  },
                  {
                    name: '视频广告',
                    textStyle: {
                      color: '#1cd4d2'
                    }
                  },
                  {
                    name: '直接访问',
                    textStyle: {
                      color: '#e6cbae'
                    }
                  },
                  {
                    name: '搜索引擎',
                    textStyle: {
                      color: '#e35b6b'
                    }
                  }
                ],
                textStyle: {color: '#666'}
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                splitLine: {show: true, lineStyle: {color: ['#eaeaea']}}
              },
              yAxis: {
                type: 'value',
                splitLine: {show: true, lineStyle: {color: ['#eaeaea']}}
              },
              series: [
                {
                  name: '邮件营销',
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: [120, 132, 101, 134, 90, 230, 210],
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#ee8bc3'
                      }
                    }
                  }
                },
                {
                  name: '联盟广告',
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: [220, 182, 191, 234, 290, 330, 310],
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#9e80da'
                      }
                    }
                  }
                },
                {
                  name: '视频广告',
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: [150, 232, 201, 154, 190, 330, 410],
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#1cd4d2'
                      }
                    }
                  }
                },
                {
                  name: '直接访问',
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: [320, 332, 301, 334, 390, 330, 320],
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#e6cbae'
                      }
                    }
                  }
                },
                {
                  name: '搜索引擎',
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: '#e35b6b'
                      }
                    }
                  }
                }
              ]
            })
          }, 10)
        }
      },
      startTime(data){
        this.condition_data.testStartTime_zf = data
      },
      endTime(data){
        this.condition_data.testEndTime_zf = data
      },
      startTime1(data){
        this.condition_data.testStartTime_xc = data
      },
      endTime1(data){
        this.condition_data.testEndTime_xc = data
      },
      startTime2(data){
        this.condition_data.testStartTime_bs = data
      },
      endTime2(data){
        this.condition_data.testEndTime_bs = data
      },
      startTime3(data){
        this.condition_data.testStartTime_rw = data
      },
      endTime3(data){
        this.condition_data.testEndTime_rw = data
      },
      startTime4(data){
        this.condition_data.testStartTime_zl = data
      },
      endTime4(data){
        this.condition_data.testEndTime_zl = data
      },
      startTime5(data){
        this.condition_data.testStartTime_kf = data
      },
      endTime5(data){
        this.condition_data.testStartTime_kf = data
      }
    },
    components: {
      Position,
      PageTurn,
      MyTab,
      ToTop,
      Condition,
      UploadTime,
      Setting,
      Ring
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"

  .confirm
    background-color #FF9900 !important
    color #fff !important
    border-color #ffffff !important

  .p
    padding-left 20px
    padding-top 4px
.big-layout
  background #f0f0f0
  .layout
    margin 0 22px
    border 1px solid #CECECE
    .chart-show
      position relative
      transition width .8s
      margin-bottom 30px
      .chart-content
        width 100%
        position relative
        height 300px
        transition width .8s
        padding-bottom 30px
        &.slider-fade-enter-active, &.slider-fade-leave-active
          transition all .8s
        &.slider-fade-enter, &.slider-fade-leave-active
          opacity 0
        .bd
          position absolute
          left 50%
          float: left
          top 25%
          transform translate(-50%,-50%)
          width 1px
          height 200px
          background-color #FFFFFF
        .send_msg_left
          margin 20px 20px 4px 20px
          width 45%
          height 100%
          position relative
          .title
            position absolute
            left 0
            top 0
            color #333
            font-weight 800
            font-size 18px
          .lists
            margin-left 30px
            margin-top 100px
            color #888
            font-size 14px
            .item
              min-width 200px
              span
                display inline-block
              span.squer1
                border: 5px solid #3d7852
                border-radius: 2px
                margin-right 10px
              span.squer2
                border: 5px solid #67c9d6
                border-radius: 2px
                margin-right 10px
              span.squer3
                border: 5px solid #9fcf85
                border-radius: 2px
                margin-right 10px
              span.num
                text-align right
                font-size 18px
                width 60px
                color #333
                margin-left 15px
            .item:last-child
              margin-top 15px
              font-size 18px
              color #333
              font-family 'yahei'
            .item:last-child .percent
              font-size 40px
              font-family 'yahei-bold'
              font-weight 700
              margin-left 5px
        .w25
          width 25%
          position: relative
          .circle_wrapper
            margin-top 20px
            margin-bottom 20px
          .item_p1
            color #333
            text-align center
            font-size 18px
            margin-bottom 5px
          .item_p2
            font-size 14px
            color #808080
            text-align center
          .bd
            position: absolute
            left 0
            top 50%
            transform translateY(-50%)
            width 1px
            height 100px
            background-color #e4e4e4
      .bd
        position absolute
        width: 100%
        bottom 28px
        border-top 1px dotted #ccc
      .toggle_menu
        transform: rotate(90deg);
        position absolute
        bottom -49px
        left 50%
        z-index 1
        margin-top -100px
        height 130px
        border 14px solid transparent
        border-left 14px solid #CCCCCC
        span
          position absolute
          left -16px
          top -12px
          color $color-text
          font-size $font-size-medium-x
          line-height 130px
    .condition
      padding-left 30px
    .tab-router
      border 1px solid #FAFAFA
      list-style none
      background linear-gradient(#FEFEFE, #E6E6E6)
      height 50px
      li
        width 120px
        height 48px
        color #4C4C4C
        font-size 16px
        text-align center
        float left
        line-height 48px
        position relative
        border-bottom 1px solid #CECECE
        border-right 1px solid #CECECE
      .orange
        display inline-block
        width 120px
        height 3px
        position absolute
        top -1px
        left 0px
        background-color orange
      .isChecked
        background-color #fff

    .lists_wrapper
      padding 0px 0px 70px 0px
      background #F9F9F9
      .item_title /*列表标题*/
        width 100%
        height 35px
        background #5587d7
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
          width 12%
        .person_t
          width 13%
        .status_t
          width 25%
        .unit_t, .time_t, .new_info
          width 15%
        .total-scrope
          width 12%
        .duty-area
          width 17%
        .duty-unit, .leave-times, .miss-num
          width 12%
        .duty-num, .total-duty-num
          width 14%
        .t-scrope
          width 20%
        .t-duty-unit, .send-num, .accept-num
          width 25%
        .d-total-scrope
          width 11%
        .d-duty-unit, .land-research, .harmful-info, .info-research, .situaton-control, .other-task
          width 14%
        .f-total-scrope
          width 11%
        .f-duty-unit, .web-bill, .person-bill, .key-bill, .event-bill, .terror-acount
          width 14%
        .k-total-scrope
          width 15%
        .k-duty-unit, .msg-late, .msg-miss, .accepet-low, .other
          width 16%
        .s-scrope
          width: 32%
      .item_list /*列表详细*/
        width 100%
        height 40px
        line-height 40px
        background $color-background-d
        overflow hidden
        color #000
        font-family Microsoft YaHei
        text-align center
        white-space nowrap
        &:nth-child(even)
          background-color #ECF0F9
        &:hover
          box-shadow 0 0 20px 0 #D7D7D7
        .common_css
          width 15%
          height 40px
        .input
          width 5%
        .team
          width 12%
        .check_lis
          width 5%
          padding-top 30px
        .scrope
          width 13%
        .totalScrope
          width 25%
        .total-scrope
          width 12%
        .duty-area
          width 17%
        .duty-unit, .leave-times, .miss-num
          width 12%
        .duty-num, .total-duty-num
          width 14%
        .t-scrope
          width 20%
        .t-duty-unit, .send-num, .accept-num
          width 25%
        .d-total-scrope
          width 11%
        .d-duty-unit, .land-research, .harmful-info, .info-research, .situaton-control, .other-task
          width 14%
        .f-total-scrope
          width 11%
        .f-duty-unit, .web-bill, .person-bill, .key-bill, .event-bill, .terror-acount
          width 14%
        .k-total-scrope
          width 15%
        .k-duty-unit, .msg-late, .msg-miss, .accepet-low, .other
          width 16%
        .s-scrope
          width: 32%
        li
          input[type='text']
            text-align center
            margin 5px 0px
            display inline-block
            width 60px
            height 30px
            line-height 30px
            border 1px solid #4677C7
            font-family MicrosoftYaHei
            font-size 16px
            color #333
    .four > .search
      width 60px
      height 40px
      border 1px solid #ABABAB

  .detail
    margin 0px 22px
    padding-top 20px
    border 1px solid #CECECE
    .tab-router
      border 1px solid #FAFAFA
      list-style none
      background linear-gradient(#FEFEFE, #E6E6E6)
      height 60px
      li
        width 150px
        height 58px
        color #4C4C4C
        font-size 16px
        text-align center
        float left
        line-height 60px
        position relative
        border-bottom 1px solid #CECECE
        border-right 1px solid #CECECE
      .orange
        display inline-block
        width 150px
        height 4px
        position absolute
        top -1px
        left 0px
        background-color orange
      .isChecked
        background-color #fff

    .lists_wrapper
      padding 20px 20px 70px 20px
      background #F9F9F9
      .item_title /*列表标题*/
        width 100%
        height 35px
        background #5587d7
        li
          height 35px
          font-family SimSun
          font-size $font-size-medium-x
          font-weight bolder
          line-height 35px
          text-align center
        .check_all
          width 5%
        .msg-title
          width 25%
        .send-time, .deal-time
          width 15%
        .task-kind, .feedback-unit, .feedback-person, .msg-scrope
          width 10%
        .pd-scrope
          width 20%
        .pd-duty-unit, .send-num, .accept-num
          width 25%
        .m-send-time, .m-msg-rank, .m-msg-count
          width 20%
        .m-msg-title
          width 35%
        .c-name, .c-time, .c-dnum, .c-mnum, .c-lnum
          width 15%
        .c-count
          width 20%
      .item_list /*列表详细*/
        width 100%
        height 40px
        line-height 40px
        background $color-background-d
        overflow hidden
        color #000
        font-family Microsoft YaHei
        text-align center
        white-space nowrap
        &:nth-child(even)
          background-color #ECF0F9
        &:hover
          box-shadow 0 0 20px 0 #D7D7D7
        .input
          width 5%
          height 35px
        .msg-title
          color #5274CB
          width 25%
        .send-time, .deal-time
          width 15%
        .task-kind, .feedback-unit, .feedback-person, .msg-scrope
          width 10%
        .pd-scrope
          width 20%
        .pd-duty-unit, .send-num, .accept-num
          width 25%
        .m-send-time, .m-msg-rank, .m-msg-count
          width 20%
        .m-msg-title
          width 35%
        .c-name, .c-time, .c-dnum, .c-mnum, .c-lnum
          width 15%

  .c-count
    width 20%
    width 35%
    .feedback-person
      color #5274CB
    .four > .search
      width 60px
      height 40px
      border 1px solid #ABABAB
</style>
