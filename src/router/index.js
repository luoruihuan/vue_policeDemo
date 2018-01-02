import Vue from 'vue'
import Router from 'vue-router'

import Center from 'components/pages/dispatch-center/dispatch-center'
import Workbench from 'components/pages/workbench/workbench'
import Management from 'components/pages/management/management'
import Safe from 'components/pages/safe/safe'
import Archives from 'components/pages/archives/archives'
import Assessment from 'components/pages/assessment/assessment'
import Duty from 'components/pages/duty/duty'
import Set from 'components/pages/set/set'
import Business from 'components/pages/business/business'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/workbench'
    },
    {
      path: '/workbench',
      component: Workbench,
      name: 'Workbench',
      redirect: '/workbench/todo',
      children: [
        {
          path: 'todo',
          component: resolve => require(['components/todo-list/todo-list'], resolve)
        },
        {
          path: 'info',
          component: resolve => require(['components/info/info'], resolve)
        },
        {
          path: 'notice',
          component: resolve => require(['components/notice/notice'], resolve)
        }
      ]
    },
    {
      path: '/center',
      name: 'Center',
      component: Center,
      children: [
        {
          path: 'hot',
          component: resolve => require(['components/hot/hot'], resolve),
        },
        {
          path: 'track',
          component: resolve => require(['components/track/track'], resolve)
        },
        {
          path: 'storage',
          component: resolve => require(['components/storage/storage'], resolve)
        },
        {
          path: 'distribution',
          component: resolve => require(['components/distribution/distribution'], resolve)
        },
        {
          path: 'work',
          component: resolve => require(['components/work/work'], resolve)
        }
      ]
    },
    {
      path: '/management',
      name: 'Management',
      component: Management,
      redirect: '/management/submission',
      children: [
        {
          path: 'submission',
          redirect: 'submission/91info',
          component: resolve => require(['components/submission/submission'], resolve),
          children: [
            {
              path: '91info'
            },
            {
              path: 'cityreport'
            },
            {
              path: 'countyreport'
            },
            {
              path: 'reportprovince'
            },
            {
              path: 'reportcity'
            }
          ]
        },
        {
          path: 'task',
          component: resolve => require(['components/task/task'], resolve)
        },
        {
          path: 'entering',
          component: resolve => require(['components/entering/entering'], resolve)
        }
      ]
    },
    {
      path: '/safe',
      name: 'Safe',
      component: Safe
    },
    {
      path: '/archives',
      name: 'Archives',
      component: Archives,
      redirect: '/archives/website-ledger',
      children: [
        {
          path: 'website-ledger',
          component: resolve => require(['components/website-ledger/website-ledger'], resolve)
        },
        {
          path: 'texture-ledger',
          component: resolve => require(['components/texture-ledger/texture-ledger'], resolve)
        },
        {
          path: 'people-ledger',
          component: resolve => require(['components/people-ledger/people-ledger'], resolve)
        },
        {
          path: 'online-ledger',
          component: resolve => require(['components/online-ledger/online-ledger'], resolve)
        },
        {
          path: 'terror-ledger',
          component: resolve => require(['components/terror-ledger/terror-ledger'], resolve)
        },
      ]
    },
    {
      path: '/assessment',
      name: 'Assessment',
      redirect: '/assessment/duty-unit',
      component: Assessment,
      children: [
        {
          path: 'duty-unit',
          component: resolve => require(['components/duty-unit/duty-unit'], resolve)
        },
        {
          path: 'duty-personnel',
          component: resolve => require(['components/duty-personnel/duty-personnel'], resolve)
        }
      ]
    },
    {
      path: '/duty',
      name: 'Duty',
      component: Duty,
      redirect: '/duty/workmanage',
      children: [
        {
          path: 'workmanage',
          component: resolve => require(['components/workmanage/workmanage'], resolve)
        },
        {
          path: 'worknote',
          component: resolve => require(['components/worknote/worknote'], resolve)
        }
      ]
    },
    {
      path: '/set',
      name: 'Set',
      component: Set,
      redirect: '/set/shift',
      children: [
        {
          path: 'shift',
          component: resolve => require(['components/shift/shift'], resolve)
        }
      ]
    },
    {
      path: '/business',
      name: 'Business',
      component: Business
    }
  ]

})
