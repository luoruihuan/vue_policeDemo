import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex/store'
import moment from 'moment'

import {Tree} from 'element-ui'
import {scroll} from 'common/js/scroll'

// 引入样式文件
import 'common/stylus/index.styl'

Vue.use(Tree)

Vue.config.productionTip = false

Vue.prototype.axios = axios
Vue.prototype.bus = new Vue()
Vue.mixin({
  created () {
    scroll(0, 10)
  },
  filters: {
    formatTime (val) {
      return moment(val).format('YYYY-MM-DD')
    },
    formatType (val) {
      if (val === 3) return '分裂'
      if (val === 4) return '宗教极端'
      if (val === 5) return '暴恐'
      if (val === 6) return '西方敌对'
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
