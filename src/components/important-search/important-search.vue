<template>
  <li class="item float_left clearfix" :style='{width: item.percentage}'>
    <span class="float_left i">

        <span class="left float_left">
              <span class="name float_left">涉及{{item.name}}</span>
              <span class="red float_left" v-if="item.isRequired">*</span>
              </span>
              <span v-show="false" class="item-tit-right float_left">{{item.value}}</span>
              <input :name="item.name" type="text" disabled placeholder="请输入" class="float_left text txt" v-model="msg">
              <div class="float_left text btn center" @click="get_data">{{item.btnValue}}</div>
        </span>

    <!--模态框-->
    <modal :modal="modal_btn" :width="'900'" :top="'18%'" v-on:hideModal="modal_btn = false">
      <span slot="title">涉及{{item.name}}</span>
      <div slot="content" class="modal_content clearfix">
        <ul class="items clearfix">
          <my-receive v-on:changeData="_updateData" :item="receive_item" :has_arr="has_arr"></my-receive>
          <my-btn v-on:hideModal="modal_btn = false" @sendData="sendData"></my-btn>
        </ul>
      </div>
    </modal>
  </li>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import Modal from 'components/modal/modal'
//  import Receive from 'components/receive/receive'
  import MyReceive from 'components/my-receive/my-receive'
  import MyBtn from 'components/my-btn/my-btn'

  export default {
    props: ['item'],
    data() {
      return {
        //msg: '',
        has_arr: [],
        flag_impotrant: [], //做标记，判断重点人、事件、帐号、网站
        modal_btn: false,
        receive_item: {}
      }
    },
    created() {
      this.receive_item = this.item
    },
    computed: {
      ...mapState([
        'domain'
      ]),
      msg () {
        let flag = this.flag_impotrant
        if(flag.length) {
          if(flag[0]['peopleName']) { //重点人查重
            let arr = []
            Array.from(this.receive_item.value).forEach(v => {
              arr.push(v['peopleName'])
            })
            return arr.join('&')
          }else if(flag[0]['siteName']) { //重点网站查重
            let arr = []
            Array.from(this.receive_item.value).forEach(v => {
              arr.push(v['siteName'])
            })
            return arr.join('&')
          }else if(flag[0]['accountName']) { //重点帐号查重
            let arr = []
            Array.from(this.receive_item.value).forEach(v => {
              arr.push(v['accountName'])
            })
            return arr.join('&')
          }else if(flag[0]['eventName']) { //重点事件查重
            let arr = []
            Array.from(this.receive_item.value).forEach(v => {
              arr.push(v['eventName'])
            })
            return arr.join('&')
          }
        }
      },
      back_item () {
        return this.item
      }
    },
    methods: {
      ...mapActions([
        'changeImportant_lists',
        'clearImportant_lists',
        'changeImportant_send_lists',
        'clearImportant_send_lists'
      ]),
      // 接收到数据更新
      _updateData(val) {
        if (val) {
          this.receive_item.value = val.val
        }
      },
      //获取列表
      get_data (e) {
        this.modal_btn=!this.modal_btn
        /*清空数据start*/
        this.clearImportant_lists()
        this.clearImportant_send_lists()
        this.flag_impotrant = []
        this.has_arr = []
        /*清空数据end*/
        e = e || window.event
        let str = e.target.innerHTML
        let reg1 = /人/g    //重点人
        let reg2 = /网站/g    //重点网站
        let reg3 = /账号/g    //重点账号
        let reg4 = /事件/g    //重点事件
        if(reg1.test(str)) { //重点人
          //let url = `${this.domain}ledger/people/list?query=null&fields=null&sortby=null&order=null&paging=0&limit=0&offset=0`
          let url = `${this.domain}ledger/people/list?query=null&fields=peopleId%2CpeopleName&sortby=null&order=null&paging=0&limit=0&offset=0`
          this.axios.get(url).then(res => {
            this.flag_impotrant = res.data.data
            this.sendData('peopleId')
            let obj = []
            for(let key in res.data.data) {
              //console.log(res.data.data[key]['peopleId'])
              obj.push(res.data.data[key]['peopleId'])
            }
            this.$store.commit('changeImportant_lists',obj)
            this.$store.commit('changeImportant_send_lists',res.data.data)
          }).catch(err => {
            console.log(err)
          })
        }else if (reg2.test(str)) { //重点网站
          //let url = `${this.domain}ledger/website/list?query=null&fields=null&sortby=null&order=null&paging=0&limit=0&offset=0`
          let url = `${this.domain}ledger/website/list?query=null&fields=siteLangDicid%2CsiteDomain%2CsiteName&sortby=null&order=null&paging=0&limit=0&offset=0`
          this.axios.get(url).then(res => {
            this.sendData('ledgerId')
            //this.$store.commit('changeImportant_lists',res.data.data)
            this.flag_impotrant = res.data.data
            let obj = []
            for(let key in res.data.data) {
              obj.push(res.data.data[key]['siteLangDicid'])
            }
            this.$store.commit('changeImportant_lists',obj)
            this.$store.commit('changeImportant_send_lists',res.data.data)
          }).catch(err => {
            console.log(err)
          })
        }else if (reg3.test(str)) { //重点账号
          //let url = `${this.domain}ledger/account/list?query=null&fields=null&sortby=null&order=null&paging=0&limit=0&offset=0`
          let url = `${this.domain}ledger/account/list?query=null&fields=activeDicid%2CaccountName&sortby=null&order=null&paging=0&limit=0&offset=0`
          this.axios.get(url).then(res => {
            this.sendData('ledgerId')
            //this.$store.commit('changeImportant_lists',res.data.data)
            this.flag_impotrant = res.data.data
            let obj = []
            for(let key in res.data.data) {
              obj.push(res.data.data[key]['activeDicid'])
            }
            this.$store.commit('changeImportant_lists',obj)
            this.$store.commit('changeImportant_send_lists',res.data.data)
          }).catch(err => {
            console.log(err)
          })
        }else if(reg4.test(str)) {//重点事件
          //let url = `${this.domain}ledger/event/list?query=null&fields=null&sortby=null&order=null&paging=0&limit=0&offset=0`
          let url = `${this.domain}ledger/event/list?query=null&fields=ledgerId%2CeventName&sortby=null&order=null&paging=0&limit=0&offset=0`
          this.axios.get(url).then(res => {
            this.sendData('ledgerId')
            //this.$store.commit('changeImportant_lists',res.data.data)
            this.flag_impotrant = res.data.data
            let obj = []
            for(let key in res.data.data) {
              obj.push(res.data.data[key]['ledgerId'])
            }
            this.$store.commit('changeImportant_lists',obj)
            this.$store.commit('changeImportant_send_lists',res.data.data)
          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 将更新后的数据发送出
      sendData(id) {
        this.back_item.new_value = this.has_arr
        let obj = {}
        let arr = [] //拷贝
        let new_arr = [] //存放ID
        if(this.back_item.new_value.length) {
          for(let key in this.back_item.new_value) {
            arr[key] = this.back_item.new_value[key]
          }
          for(let k in this.back_item) {
            obj[k] = this.back_item[k]
          }
        }
        arr.forEach(v => {
          if(v.peopleId) {
            new_arr.push(v.peopleId)
          }else if(v.siteLangDicid) {
            new_arr.push(v.siteLangDicid)
          }else if(v.activeDicid) {
            new_arr.push(v.activeDicid)
          }else if(v.ledgerId) {
            new_arr.push(v.ledgerId)
          }
        })
        obj['new_value'] = new_arr
        this.$emit('changeData', obj)
      },
      // 显示涉及信息弹框
      getSimilarData() {
        this.modal_btn = true
      }
    },
    components: {
      Modal,
//      Receive,
      MyReceive,
      MyBtn
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .item
    height 50px
    line-height 49px
    width 100%
    overflow hidden
    color $color-text-d
    font-size $font-size-medium
    border-bottom 1px solid #F4F4F4
    padding-bottom: 5px
    .content
      width 100%
    .text
      height 38px
      border(#ABADB3)
      padding-left 6px
      box-shadow 0 3px 5px 0 #e0e0e0 inset
      margin-top 6px
      margin-right 4px
    .left
      height: 38px
      /*margin-right 25px*/
      width 100px
      margin-right 15px
    .red
      color #FF3357
      line-height 60px
      font-size 24px
    .btn
      width 100px
      line-height 38px
      padding 0
      background-color #89baf0
      border-color #89baf0
      box-shadow 0 0
      color #fff
      cursor pointer
    .w600
      width 600px
    .w232
      width 232px
</style>
