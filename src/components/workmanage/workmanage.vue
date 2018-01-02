<template>
  <div class="content_wrapper">
      <Position :p_arr="p_arr"></Position>
      <section class="mana_box">
          <div class="mana_auto">
              <div class="mana_year clearfix dislockline" >
                  <div class="manay_nian float_left"><span>{{year}}</span><span>年</span></div>
                  <div class="manay_open float_right pointer">
                    <span class="iconfont icon-shuangjiantouxia1" v-if="!isSelecty" @click="isSelecty = !isSelecty"></span>
                    <span class="iconfont icon-shanghua" v-if="isSelecty" @click="isSelecty = !isSelecty"></span>
                  </div>
                  <ul class="selecty_box" v-if="isSelecty">
                    <li class="pointer" v-for="sel in selectYear" @click="selecty(sel)" :class="{selb:sel==year}">{{sel}}年</li>
                  </ul>
              </div>
              <div class="mana_month clearfix dislockline clearfix" >
                  <div class="month_add float_left pointer" @click="monthCut()"><span class="iconfont icon-zuo"></span></div>
                  <div class="manam_yue float_left">
                    <div class="yue_detail float_left"><span>{{month}}</span><span>月</span></div>
                    <div class="yue_down float_left">
                      <span class="iconfont icon-shuangjiantouxia1  pointer" v-if="!isSelectm" @click="isSelectm = !isSelectm"></span>
                      <span class="iconfont icon-shanghua  pointer" v-if="isSelectm" @click="isSelectm = !isSelectm"></span>
                    </div>
                  </div>
                  <div class="month_cut float_left pointer" @click="monthAdd()"><span class="iconfont icon-you"></span></div>
                  <ul class="selectm_box pointer"  v-if="isSelectm">
                    <li v-for="sel in selectMonth" @click="selectm(sel)" :class="{selb:sel==month}">{{sel}}月</li>
                  </ul>
              </div>
              <div class="mana_set dislockline pointer">值班时间设置</div>
              <div class="mana_dmy dislockline clearfix pointer">
                  <span class="dmy_a dislockline float_left" @click="workSelect='天'" :class="{hasSelect:workSelect=='天'}">天</span>
                  <span class="dmy_a dislockline float_left" @click="workSelect='周'" :class="{hasSelect:workSelect=='周'}">周</span>
                  <span class="dmy_a dislockline float_left" @click="workSelect='月'" :class="{hasSelect:workSelect=='月'}">月</span>
              </div>
          </div>
      </section>
      <section class="main_box" >
          <ul class="weeks_box clearfix">
              <li v-for="(we,i) in weeks" class="dislockline float_left" :class="{weekend:i>4}">{{we}}</li>
          </ul>
          <ul class="week_box clearfix">
            <li class="wdetail_box float_left" v-for="(res,i) in resdata" :class="{date_select:res.isclick,backgroundred:res.iswork&&!res.isclick}" @click="dateClick(i)" @mouseenter="dateEnter(i)" @mouseleave="dateLeave(i)"> <!--日历每天-->
               <div class="wdc_ban" v-if="res.iswork">班</div>
               <div class="wdc_changeb" v-if="res.isenter&&res.dateTime>=realTime"></div>
               <div class="wdc_change " v-if="res.isenter&&res.dateTime>=realTime"><span @click="showWorkpeople()" class="pointer iconfont icon-jilu"></span></div><!--可修改的铅笔样式-->
               <div class="wdetail_content makecenter">
                    <p class="wdc_time" :class="{colorwhite:res.isclick,colorgray:i<mbegindex||i>mendindex,colorred:sureWeeks(i)}">{{res.date}}</p>
                    <div class="wdc_content" v-if="!res.isclick"><!--默认显示的样式-->
                        <div class="wdccp wdccp_a clearfix">
                            <span class="iconfont icon-taiyang dislockline float_left"></span>
                            <span class="dislockline float_left" :class="{colororange:res.dateTime>=realTime}">{{res.daytime}}</span>
                            <span class="dislockline float_left" :class="{colororange:res.dateTime>=realTime}">调度员</span>
                        </div>
                        <div class="wdccp wdccp_b clearfix">
                            <span class="iconfont icon-967yueliang dislockline float_left"></span>
                            <span class="dislockline float_left" :class="{colororange:res.dateTime>=realTime}">{{res.nighttime}}</span>
                            <span class="dislockline float_left" :class="{colororange:res.dateTime>=realTime}">调度员</span>
                        </div>
                        <div class="wdccp wdccp_c clearfix">
                            <span class="iconfont icon-iconflag dislockline float_left"></span>
                            <span class="dislockline float_left" :class="{colorblue:res.dateTime>=realTime}">{{res.dispath}}</span>
                            <span class="dislockline float_left" :class="{colorblue:res.dateTime>=realTime}">调度员</span>
                        </div>
                    </div>
                     <div class="wdcd_content" v-if="res.isclick"> <!--点击之后显示的样式-->
                       <div class="wdccd wdccd_select clearfix">
                         <span class="iconfont icon-taiyang dislockline float_left"></span>
                         <span class="dislockline float_left">调度员</span>
                         <span class="dislockline float_left"><marquee scrollamount="5">{{res.daytime}}</marquee></span>
                       </div>
                       <div class="wdccd wdccd_select clearfix">
                         <span class="iconfont icon-967yueliang dislockline float_left"></span>
                         <span class="dislockline float_left">调度员</span>
                         <span class="dislockline float_left"><marquee scrollamount="5">{{res.nighttime}}</marquee></span>
                       </div>
                       <div class="wdccd wdccd_select clearfix">
                         <span class="iconfont icon-iconflag dislockline float_left"></span>
                         <span class="dislockline float_left">调度员</span>
                         <span class="dislockline float_left"><marquee scrollamount="5">{{res.dispath}}</marquee></span>
                       </div>
                     </div>
               </div>
            </li>
          </ul>
      </section>
      <section class="main_detail">
          <ul class="main_deul clearfix">
              <li class="main_deul_icon dislockline float_left iconfont icon-taiyang" style="color:#f7c272;"></li>
              <li class="main_deulname dislockline float_left">白班:</li>
              <li class="main_deulwork dislockline float_left"><span class="float_left dislockline">刘佳</span><span class="float_left dislockline">【调度员】</span></li>
              <li class="main_deulmenu dislockline float_left">
                  <span v-if="true" class="main_menua dislockline makecenter">
                      <span>【值班日志】</span>
                      <span>引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区</span>
                  </span>
                  <span v-if="false" class="main_menub dislockline pointer">提交日志</span>
                  <span v-if="false" class="main_menuc dislockline">暂未提交</span>
              </li>
          </ul>
          <ul class="main_deul clearfix">
              <li class="main_deul_icon dislockline float_left iconfont icon-967yueliang" style="color:#94b7ef;"></li>
              <li class="main_deulname dislockline float_left">晚班:</li>
              <li class="main_deulwork dislockline float_left"><span class="float_left dislockline">阿力甫·吾加木尼牙孜</span><span class="float_left dislockline">【调度员】</span></li>
              <li class="main_deulmenu dislockline float_left">
                  <span v-if="false" class="main_menua dislockline makecenter">
                      <span>【值班日志】</span>
                      <span>引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区</span>
                  </span>
                  <span v-if="true" class="main_menub dislockline pointer">提交日志</span>
                  <span v-if="false" class="main_menuc dislockline">暂未提交</span>
              </li>
          </ul>
          <ul class="main_deul clearfix">
              <li class="main_deul_icon dislockline float_left iconfont icon-iconflag" style="color:#ec9898;"></li>
              <li class="main_deulname dislockline float_left">值班长:</li>
              <li class="main_deulwork dislockline float_left"><span class="float_left dislockline">阿力甫·吾加木尼牙孜</span><span class="float_left dislockline">【调度员】</span></li>
              <li class="main_deulmenu dislockline float_left">
                 <span v-if="false" class="main_menua dislockline makecenter">
                      <span>【值班日志】</span>
                      <span>引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区引言节流比开源意义深远。青岛经济技术开发区</span>
                  </span>
                  <span v-if="false" class="main_menub dislockline pointer">提交日志</span>
                  <span v-if="true" class="main_menuc dislockline">暂未提交</span>
              </li>
          </ul>
      </section>
      <transition name="mask">
          <section class="logmodal" v-show="isWorkpeople">
            <transition name="toggle" >
                <div class="commit_log makecenter" >
                  <header>
                      编辑值班人员
                      <span @click="closeWorkpeople()" class="iconfont dislockline icon-cuowu pointer"></span>
                  </header>
                  <div class="content_box">
                      <div class="conb_a dislockline">
                          <span class="dislockline">班次选择&nbsp:&nbsp</span>
                          <span class="conb_aspan dislockline conbhasslt pointer">白班</span>
                          <span class="conb_aspan dislockline pointer">夜班</span>
                          <span class="conb_aspan dislockline pointer">值班长班次</span>
                      </div>
                      <ul class="conb_b clearfix">
                          <li class="dislockline float_left">已选&nbsp:&nbsp</li>
                          <li class="dislockline float_left">人员列表&nbsp:&nbsp</li>
                      </ul>
                      <div class="conb_c clearfix">
                          <div class="conb_ca float_left">
                              <ul class="dislockline" v-for="hsl in hasSelectlist">
                                  <li class="dislockline">{{hsl.people}}</li>
                                  <li class="iconfont icon-cuowu dislockline pointer" @click="sliceList(hsl.indexs)"></li>
                              </ul>
                          </div>
                          <div class="conb_cb float_left">
                              <div class="conb_cba">
                                  <span>XX分中心</span>
                                  <span class="iconfont icon-xiangyoujiantou-copy"></span>
                                  <span>二中队</span>
                                  <span class="iconfont icon-xiangyoujiantou-copy"></span>
                                  <span>调度员</span>
                              </div>
                              <ul class="conb_cbb">
                                  <li><input type="checkbox" v-model="isSelectall" class="pointer"> <span>全选</span></li>
                                  <li v-for="(pl,i) in peopleList" class="conb_cbbli"><input v-model="pl.ischeeck" @click="inputClick(i)" type="checkbox" class="pointer"> <span class="dislockline">{{pl.people}}</span> <span class="dislockline">{{pl.position}}</span></li>
                              </ul>
                          </div>
                      </div>
                      <ul class="conb_d clearfix">
                        <li class="dislockline float_left">已选值班人员</li>
                        <li class="dislockline float_left">值班权限</li>
                      </ul>
                      <ul class="conb_e clearfix" v-for="h in hasSelectlist">
                        <li class="dislockline float_left">{{h.people}}</li>
                        <li class="dislockline float_left">
                            <select name="" id="">
                              <option value="">调度员</option>
                              <option value="">处置员</option>
                              <option value="">管理员</option>
                            </select>
                        </li>
                      </ul>
                  </div>
                  <footer><div  @click="closeWorkpeople()" class="logbona pointer">确定</div></footer>
                </div>
            </transition>
          </section>
      </transition>
  </div>
</template>
<script type="text/ecmascript-6">
    import Position from 'components/position/position'
    export default {
        components: {Position},
        props: {},
        data () {
            return {
              isWorkpeople:false,//提交编辑值班人员弹窗
              isSelectall:false,//绑定提交编辑的全选
              hasSelectlist:[],//保存已经选择的工作人员列表
              peopleList:[
                {people:'肖奈',position:'调度员',ischeeck:false},
                {people:'祖力皮喀尔·阿布都热扎克',position:'调度员',ischeeck:true},
                {people:'阿力甫·吾加木尼牙孜',position:'处置员',ischeeck:false},
                {people:'伊卜拉依木·阿合尼亚孜',position:'调度员',ischeeck:false},
                {people:'肖奈',position:'调度员',ischeeck:false},
                {people:'欧阳义军',position:'调度员',ischeeck:false},
                {people:'宇文淮',position:'调度员',ischeeck:false},
                {people:'风云令主',position:'调度员',ischeeck:false},
                {people:'杨洋',position:'调度员',ischeeck:false},
                {people:'金克斯',position:'调度员',ischeeck:true},
                {people:'德莱文',position:'调度员',ischeeck:false},
                {people:'鲁班',position:'调度员',ischeeck:false},
                {people:'关云长',position:'调度员',ischeeck:false},
              ],
              p_arr: ['值班管理', '值班管理'],
              weeks:['周一','周二','周三','周四','周五','周六','周日'],
              selectYear:[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],
              selectMonth:[1,2,3,4,5,6,7,8,9,10,11,12],
              year:'',//记录选择的年份
              month:'',//记录选择的月份
              mbegindex:'',//本月开始的日期索引
              mendindex:'',//本月结束的日期索引
              realYear:'',//记录实际的年份
              realMonth:'',//记录实际的月份
              todayindex:'',//记录当前实际日期在本月日历中的索引
              isSelecty:false,//记录选择年份的下拉按钮
              isSelectm:false,//记录选择月份的下拉按钮
              workSelect:'月',//记录模板显示的是月份还是周或者天
              monthlong:'',//记录本月的长度
              propMlong:'',//记录上月的长度
              realDay:'',//实际几号
              realTime:'',//实际时间的时间戳
              dateTime:[],//记录显示日历数组的时间戳
              datenum:[],//记录显示日期的数组
              dateString:[],//记录真实的日期
              resdata:[
                {date:'26',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'27',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'28',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'29',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'30',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'1',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'2',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'3',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'4',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:true},
                {date:'5',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'6',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'7',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'8',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'9',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'10',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'11',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'12',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'13',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'14',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'15',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'16',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'17',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'18',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'19',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'20',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:true},
                {date:'21',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'22',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'23',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'24',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'25',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'26',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'27',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'28',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'29',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'30',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'31',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'1',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'2',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'3',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'4',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:true},
                {date:'5',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
                {date:'6',daytime:'刘佳、伊卜拉依木·阿合尼亚孜',nighttime:'阿力甫·吾加木尼牙孜',dispath:'祖力皮喀尔·阿布都热扎克',isclick:false,isenter:false,iswork:false},
              ],
            }
        },
        created(){},
        mounted(){
            this.realYear = new Date().getFullYear();
            this.realMonth = new Date().getMonth() + 1;
            this.realDay = new Date().getDate();
            if(this.realMonth<10){
                if(this.realDay<10){
                    this.realTime = Date.parse(new Date(this.realYear+'-0'+this.realMonth+'-0'+this.realDay))
                }else{
                    this.realTime = Date.parse(new Date(this.realYear+'-0'+this.realMonth+'-'+this.realDay))
                }
            }else{
                if(this.realDay<10){
                  this.realTime = Date.parse(new Date(this.realYear+'-'+this.realMonth+'-0'+this.realDay))
                }else{
                  this.realTime = Date.parse(new Date(this.realYear+'-'+this.realMonth+'-'+this.realDay))
                }
            }
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth() + 1;
            this.mbegindex=new Date(this.year,this.month - 1,1).getDay() - 1;
            this.todayindex = this.mbegindex + new Date().getDate()-1;
            this.mendindex = new Date(this.year,this.month,0).getDate()-1 + this.mbegindex;
            this.getTime();
            this.changeWatch();
        },
        methods: {
            showWorkpeople(){
                this.isWorkpeople=true;
            },
            closeWorkpeople(){
                this.isWorkpeople=false;
            },
            dateClick(e){
                    for(var i = 0;i<this.resdata.length;i++){
                        if(i == e){continue}
                        this.resdata[i].isenter = false
                        this.resdata[i].isclick = false
                    }
                    if(this.resdata[e].isclick == true){
                        this.resdata[e].isenter = false
                        this.resdata[e].isclick = false
                    }else{
                        this.resdata[e].isclick = true
                        this.resdata[e].isenter = true
                    }
            },
            dateEnter(e){
                  if(this.resdata[e].isclick == true){
                  }else{
                      this.resdata[e].isenter = true
                  }
            },
            dateLeave(e){
              if(this.resdata[e].isclick == true){
              }else{
                this.resdata[e].isenter = false
              }
            },
            sureWeeks(e){//判断是否为当月周末周末
                if(e<this.mbegindex||e>this.mendindex){
                    return false
                }else{
                    if(e==5||e==6||e==12||e==13||e==19||e==20||e==26||e==27||e==33||e==34){
                       return true
                    }else{
                        return false
                    }
                }
            },
            selecty(e){//日期年份选择
                this.year = e;
                this.isSelecty = false;
                this.getTime();
            },
            selectm(e){//日期月份选择
              this.month = e;
              this.isSelectm = false;
              this.getTime();
            },
            monthCut(){//月份减
                if(this.month == 1){
                    this.month = 12
                    this.year --
                }else{
                  this.month--;
                }
                this.isSelecty = false;
                this.isSelectm = false;
                this.getTime();
            },
            monthAdd(){//月份加
                if(this.month == 12){
                  this.month = 1
                  this.year ++
                }else{
                  this.month++;
                }
                this.isSelecty = false;
                this.isSelectm = false;
                this.getTime();
            },
            getTime(){
              let d = new Date();
              d.setYear(this.year);
              d.setMonth(this.month - 1);
              d.setDate(1);
              this.mbegindex = d.getDay() - 1;
              if(this.mbegindex == -1){this.mbegindex = 6};
              this.monthlong = new Date(this.year,this.month, 0).getDate();
              this.propMlong = new Date(this.year,this.month-1, 0).getDate();
              this.todayindex = this.mbegindex + new Date(this.year,this.month - 1,1).getDay() - 1;
              if(this.todayindex == -1){this.todayindex = 6};
              this.mendindex = new Date(this.year,this.month,0).getDate()-1 + this.mbegindex;
              this.makeTime();
            },
            makeTime(){
              let j = 1;
              for(let i = this.mbegindex;i<this.mbegindex+this.monthlong;i++){
                    this.datenum[i] = j;
                    if(this.month<10){
                        if(j<10){
                            this.dateString[i] = this.year+'-0'+this.month+'-0'+j;
                        }else{
                            this.dateString[i] = this.year+'-0'+this.month+'-'+j;
                        }
                    }else{
                        if(j<10){
                          this.dateString[i] = this.year+'-'+this.month+'-0'+j;
                        }else{
                          this.dateString[i] = this.year+'-'+this.month+'-'+j;
                        }
                    }
                    j++;
              }
              j=1;
              for(var i = this.mbegindex+this.monthlong;i<42;i++){
                    this.datenum[i] = j;
                    if(this.month == 12){
                        if(j<10){
                            this.dateString[i] = (this.year+1)+'-0'+1+'-0'+j;
                        }else{
                            this.dateString[i] = (this.year+1)+'-0'+1+'-'+j;
                        }
                    }else{
                        if(this.month + 1 <10){
                            if(j<10){
                                this.dateString[i] = this.year+'-0'+(this.month+1)+'-0'+j;
                            }else{
                                this.dateString[i] = this.year+'-0'+(this.month+1)+'-'+j;
                            }
                        }else{
                            if(j<10){
                                this.dateString[i] = this.year+'-'+(this.month+1)+'-0'+j;
                            }else{
                                this.dateString[i] = this.year+'-'+(this.month+1)+'-'+j;
                            }
                        }
                    }
                    j++;
              }
              let plong = this.propMlong
              for(var i = this.mbegindex-1;i>=0;i--){
                  this.datenum[i] =  plong;
                  if(this.month == 1){
                        this.dateString[i] = this.year - 1+'-'+12+'-'+plong;
                  }else{
                      if(this.month-1<10){
                          this.dateString[i] = this.year+'-0'+(this.month-1)+'-'+plong;
                      }else{
                          this.dateString[i] = this.year+'-'+(this.month-1)+'-'+plong;
                      }
                  }
                  plong--
              }
              for(let i = 0;i<this.dateString.length;i++){
                    this.dateTime[i] =Date.parse(new Date(this.dateString[i]))
              }
              this.setTime();
            },
            setTime(){
                for(let i = 0;i<this.resdata.length;i++){
                    this.resdata[i].date = this.datenum[i];
                    this.resdata[i].dateTime = this.dateTime[i];
                }

           },
            changeWatch(){
                this.hasSelectlist = [];
                let index = 0;
                for(let i = 0;i<this.peopleList.length;i++){
                  let j = {};
                  if(this.peopleList[i].ischeeck == true){
                      j = this.peopleList[i];
                      this.hasSelectlist.push(j);
                      this.hasSelectlist[index].indexs = i;
                      index++;
                  }
                }
            },
            makeSelectall(){
                if(this.hasSelectlist.length == this.peopleList.length){
                    this.isSelectall = true;
                }else{
                    this.isSelectall = false;
                }
            },
            sliceList(e){
                  this.peopleList[e].ischeeck = false;
                  this.changeWatch();
                  this.makeSelectall();
            },
            inputClick(i){
                if (navigator.userAgent.indexOf('Firefox') >= 0){
                    this.peopleList[i].ischeeck = !this.peopleList[i].ischeeck
                }
                this.changeWatch();
                this.makeSelectall();
            },
        },
        watch:{
            isSelectall (val, old) {
                if(val == true){
                    for(let i = 0;i<this.peopleList.length;i++){
                      this.peopleList[i].ischeeck = true
                    }
                }else if(this.hasSelectlist.length == this.peopleList.length){
                    for(let i = 0;i<this.peopleList.length;i++){
                      this.peopleList[i].ischeeck = false
                    }
                }
                this.changeWatch();
            }
        },
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content_wrapper
    overflow hidden
    padding 0 20px 100px 20px
    background #f9f9f9
    color #3b3b3b
    .mana_box
      width 100%
      height 50px
    .mana_auto
      margin-top 20px
      height 40px
      width 100%
      position relative
    .mana_year
      height 35px
      width 116px
      border 1px solid #cccccc
      border-radius 5px
      position relative
    .manay_nian
      width 80px
      height 34px
      line-height 34px
      text-align center
      border-radius 5px 0 0 5px
      border-bottom 1px solid #cccccc
      background #ffffff
    .manay_open
      width 34px
      height 34px
      border-left 1px solid #cccccc
      line-height 34px
      text-align center
    .selecty_box
      width 80px
      height auto
      border 1px solid #cccccc
      border-radius 5px
      position absolute
      top 34px
      z-index 9
      background #f9f9f9
      li
        height 25px
        text-align center
        line-height 25px
    .mana_month
      height 35px
      width 126px
      position relative
      .month_add
        height 35px
        width 27px
        line-height 35px
        text-align center
        border 1px solid #cccccc
        border-right none
        border-radius 5px 0 0 5px
      .manam_yue
        width 72px
        heiht 35px
        line-height 33px
        text-align center
        border 1px solid #cccccc
        border-right none
      .month_cut
        height 35px
        width 27px
        line-height 30px
        text-align center
        border 1px solid #cccccc
        border-radius 0 5px 5px 0
      .yue_detail
        width 45px
        text-align center
      .yue_down
        width 26px
        text-align center
      .selectm_box
        width 72px
        height auto
        background #f9f9f9
        tetx-align center
        position absolute
        border 1px solid #cccccc
        border-radius 5px
        position absolute
        top 34px
        left 28px
        z-index 9
        li
          height 25px
          text-align center
          line-height 25px
    .selb
      background #4677c7
    .mana_set
      height 35px
      width 110px
      position absolute
      right 180px
      line-height 35px
      text-align center
      text-decoration underline
      color #5587d7
    .mana_dmy
      height 35px
      width 124px
      border 1px solid #d7d7d7
      border-radius 5px
      border-right none
      overflow hidden
      position absolute
      right 30px
      .dmy_a
        height 100%
        width calc(100% / 3)
        text-align center
        line-height 32px
        border-right 1px solid #d7d7d7
        border-radius 3px
  .hasSelect
    color: #fff
    background #5587d7
    border-radius 5px
  .main_box
    height 940px
    width 100%
  .weeks_box
    display block
    height 40px
    width 100%
    background #f0f0f0
    border-top 1px solid #d6d6d6
    li
      height 100%
      width calc((100% - 1px) / 7)
      border-bottom 1px solid #d6d6d6
      border-right 1px solid #d6d6d6
      text-align center
      line-height 37px
      &:first-child
        border-left 1px solid #d6d6d6
   .weekend
      color #e45c5c
  .week_box
    border-left 1px solid #d6d6d6
    width 100%
  .wdetail_box
    height 150px
    width calc((100% - 1px) / 7)
    border-bottom 1px solid #d6d6d6
    border-right 1px solid #d6d6d6
    position relative
    &:hover
      background #eff8fe
  .wdetail_content
    height 140px
    width 140px
  .wdc_ban
    position absolute
    top 0
    left 0
    z-index 3
    height 20px
    width 20px
    background #e45c5c
    font-size 14px
    color #fff
    font-family 'Microsoft YaHei'
    line-height 20px
    text-align center
  .wdc_changeb
    position absolute
    top 3px
    right 5px
    border 18px solid transparent
    border-top 18px solid #5587d7
    border-right 18px solid #5587d7
  .wdc_change
    position absolute
    top 3px
    right 7px
    height 35px
    width 35px
    color #fff
    font-family 'Microsoft YaHei'
    line-height 18px
    text-align right
  .wdc_time
    line-height 50px
    text-align center
    font-size 20px
    font-weight 600
    font-family 'Microsoft YaHei-Bold'
    color #444
  .wdc_content
    margin-top 10px
    height 60px
    width 100%
  .wdccp
    line-height 25px
    span:nth-child(1)
      color #dddddd
      width 25px
      text-align left
      /*background red*/
      height 25px
    span:nth-child(2)
      width 75px
      text-align left
      height 25px
      overflow hidden
      text-align center
      white-space nowrap
      text-overflow ellipsis
      font-size 14px
    span:nth-child(3)
      width 36px
      text-align center
      height 25px
      font-size 12px
  .wdcd_content
    height 60px
    width 100%
  .wdccd
    line-height 26px
    span:nth-child(1)
      color #dddddd
      width 25px
      text-align center
      height 24px
    span:nth-child(2)
      width 36px
      text-align center
      height 24px
      font-size 12px
    span:nth-child(3)
      width 70px
      text-align left
      height 24px
      overflow hidden
      text-align center
      white-space nowrap
      text-overflow ellipsis
      font-size 14px
  .wdccd_select
      background  #ffffff
      margin 4px 0
      border-radius 5px
  .date_select
      background #5587d7!important
  .colorwhite
      color #fff
  .colorgray
      color #ccc!important
  .colorred
      color #e45c5c!important
  .colororange
      color #ff8600
  .colorblue
      color #5587d7
  .backgroundred
      background #fceeee!important
  .main_detail
    height 300px
    width 100%
    background #effef8
  .main_deul
    height 100px
    border 1px solid #d6d6d6
    border-top none
  .main_deul_icon
    width 100px
    height 100%
    text-align center
    line-height 100px
    font-size 40px
  .main_deulname
    width 60px
    height 100%
    font-family 'Microsoft YaHei'
    font-size 16px
    line-height 100px
  .main_deulwork
    height 100%
    width 200px
    text-align center
    span:nth-child(1)
      line-height 100px
      width 100px
      text-align left
      font-weight 600
      font-family 'MicrosoftYaHei-Bold'
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    span:nth-child(2)
      line-height 100px
      font-family 'MicrosoftYaHei-Bold'
      width 100px
      font-weight 600
  .main_deulmenu
    height 100%
    width calc(100% - 360px)
    position relative
    .main_menua
      height 60px
      width 95%
      overflow hidden
      line-height 20px
    .main_menub
      border 1px solid #5687d6
      color #608ddb
      height 34px
      line-height 32px
      text-align center
      width 100px
      border-radius 3px
      position absolute
      top 33px
      left 2.5%
    .main_menuc
      height 35px
      line-height 32px
      width 100px
      position absolute
      top 32.5px
      left 2.5%

  .logmodal
    position fixed
    background rgba(0, 0, 0, .5)
    left 0
    right 0
    top 0
    bottom 0
    z-index 99
    &.mask-enter-active, &.mask-leave-active
      opacity 1
      transition all .3s
    &.mask-enter, &.mask-leave-active
      opacity 0
    .commit_log
      height 714px
      width 800px
      background #ffffff
      border-radius 6px
      overflow hidden
      &.toggle-enter-active, &.toggle-leave-active
        opacity 1
        transition all .3s
      &.toggle-enter, &.toggle-leave-active
        transform scale(0.9)
        opacity 0
      header
        height 42px
        width 100%
        line-height 42px
        text-align center
        color #fff
        background #4794f3
        position relative
        span:nth-child(1)
          height 30px
          width 30px
          line-height 30px
          position absolute
          right 10px
          top 6px
      footer
        position absolute
        height 70px
        width 100%
        background #eef3fb
        bottom 0
        font-family 'MicrosoftYaHei'
        .logbona
          height 38px
          width 80px
          position absolute
          background #4794f3
          right 40px
          bottom 15px
          border-radius 5px
          line-height 38px
          text-align center
          font-size 14px
          color #fff

    .content_box
      height calc(100% - 112px)
      width 100%
      padding 20px 0 0 52px
      font-family 'MicrosoftYaHei'
      overflow-y scroll
      padding-bottom 20px
      .conb_a
        height 45px
        width 707px
        background #eef2fb
        border-left 7px solid #4894f3
        padding 5px 0 0 20px
        line-height 35px
        span:nth-child(1)
          color #8e8f8e
        .conb_aspan
          background #fff
          padding 0 15px
          border 1px solid #aaaaaa
          font-size 14px
          color #3b3b3b
        .conbhasslt
          border none!important
          color #fff!important
          background #4794f3!important
      .conb_b
        height 35px
        color #888
        font-size 14px
        line-height 35px
        li
          padding 0 0 0 15px
        li:nth-child(1)
          width 422px
      .conb_c
        height 380px
        width 707px
        font-family 'MicrosoftYaHei'
        .conb_ca
          height 100%
          width 400px
          border 1px solid #cacccf
          padding 8px 8px
          box-shadow 0 3px 5px 0 #e0e0e0 inset
          ul
            line-height 30px
            border 1px solid #d3d3d3
            border-radius 5px
            padding 0 10px 0 0
            color #3b3b3b
            font-size 14px
            margin 5px
            li:nth-child(1)
              padding 0 5px 0 10px
            li:nth-child(2)
              font-size 12px
              font-weight 600
        .conb_cb
          height 100%
          width 295px
          border 1px solid #cacccf
          margin-left 12px
          box-shadow 0 3px 5px 0 #e0e0e0 inset
          font-family 'MicrosoftYaHei'
          font-size 14px
          line-height 40px
          .conb_cba
            height 40px
            background #f4f4f4
            padding 0 0 0 25px
            span:nth-child(1),span:nth-child(3)
              color #4794f3
            span:nth-child(2),span:nth-child(4),span:nth-child(5)
              color #888
          .conb_cbb
            height calc(100% - 40px)
            padding 0 10px
            overflow-y scroll
            li
              height 40px
              width 100%
              border-bottom 1px solid #eee
              padding 0 0 0 15px
              input
                margin-right 10px
            .conb_cbbli
                position relative
                span:nth-child(2)
                  width 160px
                  left 43px
                  position absolute
                  color #3b3b3b
                  font-size 14px
                  overflow hidden
                  text-overflow ellipsis
                  white-space nowrap
                span:nth-child(3)
                  width 50px
                  position absolute
                  left 205px
                  color #888
                  font-size 12px

    .conb_d
      height 35px
      color #888
      font-size 14px
      line-height 35px
      li:nth-child(1)
        width 200px
    .conb_e
      height 40px
      color #888
      font-size 14px
      line-height 35px
      margin 10px 0
      li:nth-child(1)
        width 200px
        color #3b3b3b
        font-size 15px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      li:nth-child(2)
        width 155px
        height 38px
        padding 0
        margin 0
        select
          height 38px
          width 155px
          padding 0
          margin 0
          color #3b3b3b
          font-size 14px
          text-indent 3px




</style>
