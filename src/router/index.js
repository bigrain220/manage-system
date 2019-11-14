import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/user/index'
    },
    {
      path:'/user',
      component: resolve => require(['@/components/common/home'], resolve),
    	children:[
        {
          path: 'index',
          name: 'Material',
          component:resolve => require(['@/components/advDirected/material'],resolve)
        },
        {
          path: 'unit',
          component: resolve => require(['@/components/advDirected/unit'], resolve),
          name: 'Unit',
        },
        {
          path: 'keywords',
          component: resolve => require(['@/components/advDirected/keywords'], resolve),
          name: 'Keywords',
        },
        {
          path: 'help',
          component: resolve => require(['@/components/advDirected/help'], resolve),
          name: 'Help',
        },
        {
          path: 'directed',
          component: resolve => require(['@/components/dataManage/directed'], resolve),
          name: 'Directed',
        },
        {
          path: 'history',
          component: resolve => require(['@/components/Trend/history'], resolve),
          name: 'History',
        },
        {
          path: 'update',
          component: resolve => require(['@/components/Trend/update'], resolve),
          name: 'Update',
        },
        {
          path: 'historyDetail',
          component: resolve => require(['@/components/Analysis/historyDetail'], resolve),
          name: 'historyDetail',
        },
      ]
    },
  ]
})
