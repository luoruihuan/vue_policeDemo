<template>
  <div class="content_wrapper">
    <div class="p">
      <position :p_arr="p_arr"></position>
    </div>
    <condition>
      <tr slot="row1" class="row">
        <td class="one">时间</td>
        <td class="two">
          <span class="type pointer" style="position: relative">
            <upload-time :timeType="'开始时间'" v-on:timeStr="startTime"></upload-time>-
            <upload-time :timeType="'结束时间'" v-on:timeStr="endTime"></upload-time>
          </span>
        </td>
        <td class="three">值班人</td>
        <td class="four">
          <input class="keywords" name="zbPerson" v-model="condition_data.zbPerson" type="text" placeholder="请输入">
          <span class="type blue pointer">搜索</span>
        </td>
      </tr>
    </condition>
    <div class="content">
      <section class="logbook_box">
        <my-tab>
          <div slot="left">
            <span class="tab pointer float_left">值班日志</span>
          </div>
          <div slot="right">
            <span class="opt float_left pointer">导出</span>
          </div>
        </my-tab>
        <ul class="logbook_header clearfix">
          <li class="logh_a dislockline float_left"><input type="checkbox"></li>
          <li class="logh_b dislockline float_left">值班时间</li>
          <li class="logh_c dislockline float_left">排班</li>
          <li class="logh_d dislockline float_left">值班人员</li>
          <li class="logh_e dislockline float_left">值班完成工作</li>
          <li class="logh_f dislockline float_left">需交接工作</li>
          <li class="logh_g dislockline float_left">需协调和帮助</li>
          <li class="logh_h dislockline float_left">最新回复</li>
          <li class="logh_i dislockline float_left">操作</li>
        </ul>
        <table class="logbook_content" v-for="ms in msg">
          <tr class="log_tr" v-for="(m,i) in ms">
            <td class="logc_a logh_a"><input class="pointer" type="checkbox"></td>
            <td class="logc_b logh_b" :rowspan="ms.length" v-if="i==0">
              <span>{{m.time}}</span><br>
              <span>{{m.times}}</span>
            </td>
            <td class="logc_c logh_c">{{m.type}}</td>
            <td class="logc_d logh_d">{{m.people}}</td>
            <td class="logc_e logh_e">
              <div class="relativea">
                <div class="relativeb makecenter ">
                  <span class="log_txt">{{m.hasDone}}</span>
                </div>
              </div>
            </td>
            <td class="logc_f logh_f">
              <div class="relativea">
                <div class="relativeb makecenter ">
                  <span class="log_txt">{{m.needDone}}</span>
                </div>
              </div>
            </td>
            <td class="logc_g logh_g" :title="m.needTalk">

              <div class="relativea">
                <div class="relativeb makecenter ">
                  <span class="log_txt">{{m.needTalk}}</span>
                </div>
              </div>

            </td>
            <td class="logc_h logh_h" :title="m.newTells">
              <div class="relativea">
                <div class="relativeb makecenter ">
                  <span class="log_txt">{{m.newTells}}</span>
                </div>
              </div>
            </td>
            <td class="logc_i logh_i e">
              <div class="relativea">
                <div class="relativeb makecenter ">
                  <span @click="showLooknote(i,m.hasDone,m.needDone,m.needTalk)"  v-if='m.isLook' class="logci_box pointer logc_czuo dislockline">查看</span>
                  <span @click="showUpnote(i,m.hasDone,m.needDone,m.needTalk)" v-if="m.isPull" class="logci_box pointer logc_tijiao dislockline">提交日志</span>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </section>
    </div>
    <transition name="mask">
        <section class="logmodal" v-show="isUpnote" @click="closeUpnote()"><!--提交日志弹窗-->
          <transition name="toggle">
              <div class="commit_log makecenter" v-show="isUpnote" @click.stop>
                  <header>
                      提交日志
                      <span @click="closeUpnote()" class="iconfont dislockline icon-cuowu pointer"></span>
                  </header>
                  <ul>
                      <li class="lm_li">值班完成工作</li>
                      <li>
                          <textarea placeholder="请输入值班完成工作..." v-model="upNote.hasDone"></textarea>
                      </li>
                      <li class="lm_li">需交接工作</li>
                      <li>
                        <textarea placeholder="请输入需交接工作..." v-model="upNote.needDone"></textarea>
                      </li>
                      <li class="lm_li">需协调与帮助</li>
                      <li>
                        <textarea placeholder="请输入需协调与帮助..." v-model="upNote.needTalk" ></textarea>
                      </li>
                  </ul>
                  <footer><div class="pointer logbona" @click="closeUpnote()">提交</div></footer>
              </div>
          </transition>
        </section>
    </transition>
    <transition name="mask">
      <section class="logmodal"v-show="isLooknote" @click="closeLooknote()"><!--查看日志弹窗-->
        <transition name="toggle" >
          <div class="commit_log makecenter" v-show="isLooknote" @click.stop>
            <header>
              值班日志
              <span @click="closeLooknote()" class="iconfont dislockline icon-cuowu pointer"></span>
              <span class="dislockline pointer">上一条</span>
              <span class="dislockline pointer">下一条</span>
            </header>
            <div class="notefrom">
                <p>刘佳</p>
                <p>2016-10-14 14:34:00</p>
            </div>
            <div class="noteworka clearfix">
                <div class="noteworka_a float_left">值班完成工作</div>
                <div class="noteworka_b float_left">
                  深圳市科盾科技有限公司成立于2011年，是一家专注于互联网公开信息监测、大数据情报分析及网络空间社会治理领域的科研及应用开发的国家高新技术企业。
                  公司基于大数据和云计算技术，研发了拥有自主知识产权的一系列与互联网信息安全态势相关的产品线和解决方案，致力于为网安、网信、国安等国家各级网络信息安全管理机构提供技术支撑和整体解决方案。
                  目前，我们自主研发的清朗大数据分析平台通过国家安全防范报警系统产品质量监督检验中心测试，通过公安部安全与警用电子产品质量检测中心测试
                </div>
            </div>
            <div class="noteworka clearfix">
                <div class="noteworka_a float_left">需交接工作</div>
                <div class="noteworka_b float_left">-</div>
            </div>
            <div class="noteworka clearfix">
                <div class="noteworka_a float_left">需协调与帮助</div>
                <div class="noteworka_b float_left">
                  深圳市科盾科技有限公司成立于2011年，是一家专注于互联网公开信息监测、大数据情报分析及网络空间社会治理领域的科研及应用开发的国家高新技术企业。公司基于大数据和云计算技术，研发了拥有自主知识产权的一系列与互联网信息安全态势相关的产品线和解决方案，致力于为网安、网信、国安等国家各级网络信息安全管理机构提供技术支撑和整体解决方案。
                  目前，我们自主研发的清朗大数据分析平台通过国家安全防范报警系统产品质量监督检验中心测试，通过公安部安全与警用电子产品质量检测中心测试
                </div>
            </div>
            <div class="hasread clearfix">
                <div class="hasread_a float_left">
                    <span>已读:</span>
                    <span>6</span>
                    <span>人</span>
                </div>
                <div class="hasread_b">
                    <span class="dislockline">何静</span>
                    <span class="dislockline">周拉拉</span>
                    <span class="dislockline">祖力皮喀尔·阿布都热扎克</span>
                    <span class="dislockline">何静</span>
                    <span class="dislockline">周拉拉</span>
                    <span class="dislockline">祖力皮喀尔·阿布都热扎克</span>
                </div>
            </div>
            <div class="boardtitle">
                  <span>共有</span>
                  <span>3</span>
                  <span>回复</span>
            </div>
            <div class="boardmsg_box"><!--预留来做显示多个的-->

                <div class="boardmsg" v-for="s in 2">
                  <p><span>小张</span> <span>2016-10-14 16:34:09</span></p>
                  <div>互联网舆情监测预警系用于对互统是用于对互联网信息网信息的收集、加工、整理等，为您在第一时间获取舆情动向，洞察有害信息</div>
                </div>
            </div>

            <div class="moremsg">
                <span class="pointer">展开更多评论</span>
                <span class="iconfont icon-more_unfold pointer"></span>
            </div>
            <footer>
              <input type="text" class="logbonb dislockline" placeholder="请填写评论内容">
              <div class="logbonc pointer" @click="closeLooknote()">发送</div>
            </footer>
          </div>
        </transition>
      </section>
    </transition>
    <pageTurn :totalPage="totalPage"></pageTurn>
    <ToTop></ToTop>
  </div>
</template>
<script type="text/ecmascript-6">
  import UploadTime from '../upload-time/upload-time'
  import Position from 'components/position/position'
  import Condition from 'components/condition/condition'
  import MyTab from 'components/my-tab/my-tab'
  import pageTurn from 'components/page-turn/page-turn'
  import ToTop from 'components/to-top/to-top'
  export default {
    components: {UploadTime, Position, Condition, MyTab,pageTurn,ToTop},
    props: {},
    data () {
      return {
        isUpnote:false,//提交日志弹窗控制
        isLooknote:false,//操作弹窗控制
        upNote:{//记录提交日志弹窗
          hasDone:'',
          needDone:'',
          needTalk:'',
        },
        lookNote:{//记录操作日志弹窗
          hasDone:'',
          needDone:'',
          needTalk:'',
        },
        p_arr: ['值班管理', '值班日志'],
        totalPage:40,
        msg: {
          a: [
            {
              time: '2017-06-29',
              times: '星期四',
              type: '白班',
              people: '祖力皮喀尔·阿布都热扎克、祖力皮喀尔·阿布都热扎克、刘家',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过.将管道材等因本文通过.将管道材等因本文通过.将管道材等因本文通过将管道材等因本文通过.将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '.将管道材等因本文通过.将管道材等因本文通过.将管道材等因本文通过将管道材等因本文通过.将管道材等因本文通过...',
              isLook: true,
              isPull: false
            },
            {
              time: '2017-06-29',
              times: '星期四',
              type: '中班',
              people: '阿力甫·吾加木尼牙孜',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: true,
              isPull: false
            },
            {
              time: '2017-06-29',
              times: '星期四',
              type: '夜班',
              people: '伊卜拉依木·阿合尼亚孜',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '',
              needTalk: '',
              newTells: '继续加油！',
              isLook: false,
              isPull: true
            },
            {
              time: '2017-06-29',
              times: '星期四',
              type: '中班',
              people: '李四',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: false,
              isPull: true
            },
            {
              time: '2017-06-29',
              times: '星期四',
              type: '夜班',
              people: '王五',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: true,
              isPull: false
            }
          ],
          b: [
            {
              time: '2017-06-30',
              times: '星期五',
              type: '中班',
              people: '李四',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: false,
              isPull: true
            },
            {
              time: '2017-06-30',
              times: '星期五',
              type: '夜班',
              people: '王五',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: false,
              isPull: true
            }
          ],
          c: [
            {
              time: '2017-06-30',
              times: '星期五',
              type: '白班',
              people: '张三',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: true,
              isPull: false
            },
            {
              time: '2017-06-31',
              times: '星期六',
              type: '白班',
              people: '张三',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: false,
              isPull: true
            },
            {
              time: '2017-06-31',
              times: '星期六',
              type: '中班',
              people: '李四',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: true,
              isPull: false
            },
            {
              time: '2017-06-31',
              times: '星期六',
              type: '夜班',
              people: '王五',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: false,
              isPull: true
            }
          ],
          d: [
            {
              time: '2017-07-01',
              times: '星期日',
              type: '白班',
              people: '张三',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: true,
              isPull: false
            },
            {
              time: '2017-07-01',
              times: '星期日',
              type: '中班',
              people: '李四',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: false,
              isPull: true
            },
            {
              time: '2017-07-01',
              times: '星期日',
              type: '夜班',
              people: '王五',
              hasDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needDone: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              needTalk: '本文通过对管网捡漏情况的统计整理，将管道材等因本文通过...',
              newTells: '继续加油！',
              isLook: true,
              isPull: false
            }
          ],
        },
        nameInput: '请输入',
        condition_data:{}
      }
    },
    methods: {
      showUpnote(i,hasDone,needDone,needTalk){
            this.upNote.hasDone = hasDone;
            this.upNote.needDone = needDone;
            this.upNote.needTalk = needTalk;
            this.isUpnote =  true;
      },
      closeUpnote(){
            this.isUpnote =  false;
      },
      showLooknote(i,hasDone,needDone,needTalk){
            this.lookNote.hasDone = hasDone;
            this.lookNote.needDone = needDone;
            this.lookNote.needTalk = needTalk;
            this.isLooknote =  true;
      },
      closeLooknote(){
            this.isLooknote =  false;
      },
      startTime(data){
        this.condition_data.startTime = data
      },
      endTime(data){
        this.condition_data.endTime = data
      }
    },

  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .p
    padding-left 20px
  .content_wrapper
    overflow hidden
    padding 0
    background #fff
    padding-bottom 70px
    .content
      width 100%
      margin 0 auto
      background #f9f9f9
      padding-top 20px
      position relative
      .logbook_box
        height 100%
        width 100%
        padding 0 20px 0px
        background #f9f9f9
        color #3b3b3b
        .logbook_title
          position relative
          margin-top 30px
          height 40px
          width 100%
          .logt_name
            width 100px
            height 26px
            line-height 26px
            text-align center
            color #444
            font-size 18px
            font-weight 600
            font-family "Microsoft YaHei"
          .logt_out
            position absolute
            margin 5px 10px 0 0
            height 26px
            width 65px
            text-align center
            line-height 26px
            border 1px solid #8caee2
            border-radius 5px
            right 0
            color #799ddd

        .logbook_header
          background #5587d7
          height 36px
          text-align center
          line-height 36px
          color #fff
          font-size 18px
          font-family "SimSun"
          border-left 1px solid #5587d7
          li
            height 100%
            overflow hidden
            border-right 1px solid #5587d7
            font-weight 600

  .logh_a
    width 40px

  .logh_b
    width 120px

  .logh_c
    width 80px

  .logh_d
    width 80px

  .logh_e
    width 18%

  .logh_f
    width 18%

  .logh_g
    width 18%

  .logh_h
    width 18%

  .logh_i
    width calc(28% - 320px)

  @media screen and (max-width 1720px)
    .logh_e
      width 17%

    .logh_f
      width 17%

    .logh_g
      width 17%

    .logh_h
      width 17%

    .logh_i
      width calc(32% - 320px)

  @media screen and (max-width 1550px)
    .logh_e
      width 16.5%

    .logh_f
      width 16.5%

    .logh_g
      width 16.5%

    .logh_h
      width 16.5%

    .logh_i
      width calc(34% - 320px)

  @media screen and (max-width 1500px)
    .logh_e
      width 16%

    .logh_f
      width 16%

    .logh_g
      width 16%

    .logh_h
      width 16%

    .logh_i
      width calc(36% - 320px)

    .logci_box
      height 25px
      width 60px !important
      font-size 14px
      line-height 23px
      border-radius 5px

    @media screen and (max-width 1390px)
      .logh_e
        width 15.5%

      .logh_f
        width 15.5%

      .logh_g
        width 15.5%

      .logh_h
        width 15.5%

      .logh_i
        width calc(38% - 320px)

      .logci_box
        height 25px
        width 60px !important
        line-height 23px
        font-size 14px
        border-radius 5px
    @media screen and (max-width 1330px)
      .logh_e
        width 14.5%

      .logh_f
        width 14.5%

      .logh_g
        width 14.5%

      .logh_h
        width 14.5%

      .logh_i
        width calc(42% - 320px)

      .logci_box
        height 25px
        width 60px !important
        line-height 23px
        font-size 14px
        border-radius 5px

  .logbook_content
    height 70px
    width: 100%;
    border-left 1px solid #7fa5e1
    border-right 1px solid #7fa5e1

  .log_tr
    height 70px
    td
      height 100%
      overflow hidden
      padding 0 10px
      text-align center
      vertical-align middle
      border-right 1px solid #d9d9d9
      border-bottom 1px solid #d9d9d9

  .logc_a
    line-height 70px

  .logc_b
    line-height 20px

  .logc_c
    line-height 70px

  .logc_e
    line-height 20px
    word-break: break-all;
    overflow: hidden;
    text-align left !important

  .logc_f
    line-height 20px
    text-align left !important

  .logc_g
    line-height 20px
    text-align left !important

  .logc_h
    line-height 20px
    text-align left !important

  .logc_i
    font-size 15px
    font-family 'Microsoft YaHei'
    border-right none !important

  .logci_box
    height 25px
    width 74px
    line-height 23px
    border-radius 5px

  .logc_czuo
    border 1px solid #5587d7

  .logc_tijiao
    border 1px solid #ff7e00

  table:nth-child(odd)
    background #fff
    table-layout fixed

  table:nth-child(even)
    table-layout fixed
    background #eff8fe

  .log_time
    height 100px
    width 100%
    border 1px solid red

  .relativea
    height 70px
    width 100%
    position relative !important

  .relativeb
    height 40px
    overflow hidden

  .log_txt
    line-height 20px

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
        span:nth-child(2)
          height 100%
          width 50px
          position absolute
          left 20px
        span:nth-child(3)
          height 100%
          width 50px
          position absolute
          right 50px
      ul
        color #000
        height 602px
        padding 25px 38px
        li
          color #888
          textarea
            width 722px
            height 134px
            border 1px solid #bbbcc1
            outline none
            resize none
            margin-bottom 25px
            margin-top 10px
            font-family 'MicrosoftYaHei'
            font-size 14px
            color #000
            padding 10px
            box-shadow 0 3px 5px 0 #e0e0e0 inset
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
        .logbonb
          height 38px
          width 637px
          position absolute
          background #fbfbfb
          left 38px
          bottom 15px
          border 1px solid #bbbcc1
          font-size 14px
          line-height 38px
          text-indent 10px
          box-shadow 0 3px 5px 0 #e0e0e0 inset
        .logbonc
          width 80px
          height 38px
          position absolute
          background #4794f3
          border-radius 5px
          line-height 38px
          text-align center
          right 40px
          bottom 15px
      .lm_li
         text-indent 10px
      .notefrom
         background #eef3fb
         height 62px
         padding 0 38px
         p:nth-child(1)
           color #000
           line-height 40px
           font-size 18px
           font-family "MicrosoftYaHei-Bold"
           font-weight 600
         p:nth-child(2)
           color #888
           font-size 14px
      .noteworka
          height 100%
          height 82px
          margin 5px 38px
          .noteworka_a
            height 100%
            width 100px
            font-size 14px
            color #888
          .noteworka_b
            height 100%
            width calc(100% - 100px)
            color #3b3b3b
            font-size 14px
            padding 10px
            padding-top 0
            line-height 16px
            overflow hidden
      .hasread
        height 100%
        height 50px
        margin-top 15px
        padding 0 38px
        background #eef3fb
        .hasread_a
          width 100px
          line-height 50px
          font-size 14px
          color #3b3b3b
        .hasread_b
          height 100%
          color #4794f3
          span
            position relative
            top 10px
            height 30px
            width auto
            padding 0 5px
            border 1px solid #4794f3
            line-height 30px
            border-radius 3px
    .boardtitle
      height 50px
      margin 0 38px
      line-height 50px
      width calc(100% - 76px)
      border-bottom 1px dotted #b2b2b2
      font-size 14px
      color #888
    .boardmsg
      color #888
      height 60px
      margin 0 38px
      border-bottom 1px dotted #b2b2b2
      p
        line-height 30px
        span:nth-child(1)
          color #3b3b3b
          font-size 14px
          font-family "MicrosoftYaHei-Bold"
          font-weight 600
        span:nth-child(2)
          color #888
          font-size 12px
      div
        height 30px
        width 100%
        font-size 14px
        color #3b3b3b
        line-height 25px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .moremsg
      height 44px
      width 100%
      text-align center
      line-height 30px
      font-size 14px
      color #4794f3



</style>
