import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import TIME from './time'

export default new Vuex.Store({
  state: {
    domain: 'http://192.168.1.79:18006/', // 域名
    modal_data_list: {}, //弹窗数据列表
    modal_flag: {},  //标记档案资料具体某个弹窗
    important_lists: [], // 提交表单数据重点人、重点网站，重点事件，重点账号
    important_lists_empty: [], //清空
    important_send_lists: [], //重点人、重点网站，重点事件，重点账号详细数据,渲染页面数据
    important_send_lists_empty: [], //清空重点人、重点网站，重点事件，重点账号
    token: '', // 用户token
    edit: false, // 弹窗编辑取消
    hasLogin: false, // 记录是否已经登录
    // 结束时间戳
    end_time: TIME.end_time,
    // 开始时间戳
    begin_time: TIME.begin_time,
    successView: false,
    loadingView: false,
    errorView: false
  },
  getters: {},
  mutations: {
    loading(state) { // 请求数据中
      state.loadingView = true
      state.successView = false
      state.errorView = false
    },
    success(state, value) {
      state.errorView = false
      state.loadingView = false
      console.log(value);
      if(value) {
        state.successView = false // 请求数据成功且有数据
      } else {
        state.successView = true // 请求数据成功，但数据为零
      }
    },
    error(state) { // 请求数据失败
      state.loadingView = false
      state.successView = false
      state.errorView = true
    },
    changeBegin_time(state, value) {
      state.begin_time = value;
    },
    changeEnd_time(state, value) {
      state.end_time = value;
    },
    changeHaslogin(state, value) { // 判断是否已经登录的全部权限
      state.hasLogin = value;
    },
    changeEdit(state) {
      state.edit = !state.edit
    },
    changeModal_data_list (state, data) { // 改变弹窗数据
      // if()
      // console.log(data)
      for(let key in data) {
        if(data[key] instanceof Array) {
          if(data[key].length == 0) {
            delete data[key]
          }
        }
      }
        state.modal_data_list = data
        console.log(state.modal_data_list)
    },
    clearModal_data_list (state) { //清空弹窗数据
      state.modal_data_list = {}
    },
    changeImportant_lists (state, data) {
      state.important_lists = data
      console.log('提交表单')
      console.log(state.important_lists)
    },
    clearImportant_lists (state) {
      state.important_lists = []
    },
    changeImportant_send_lists (state, data) {
      console.log('渲染页面')
      state.important_send_lists = data
    },
    clearImportant_send_lists (state) {
      state.important_send_lists = []
    },
    changeModal_flag (state, data) { //标记档案资料弹窗
      state.modal_flag = data
    }
  },
  actions: {
    changeEdit({commit}) {
      commit('changeEdit')
    },
    clearModal_data_list ({commit}) {
      commit('clearModal_data_list')
    },
    changeImportant_lists ({commit}) {
      commit('changeImportant_lists')
    },
    clearImportant_lists ({commit}) {
      commit('clearImportant_lists')
    },
    changeImportant_send_lists ({commit}) {
      commit('changeImportant_send_lists')
    },
    clearImportant_send_lists ({commit}) {
      commit('clearImportant_send_lists')
    },
    changeModal_flag ({commit}) {
      commit('changeModal_flag')
    }
  }
});
