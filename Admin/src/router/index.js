import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/admin/index'
    },
    {
      path:'/admin',
      component: resolve => require(['@/components/common/home'], resolve),
    	children:[
        {
          path: 'index',
          name: 'Material',
          component:resolve => require(['@/components/advDirected/material'],resolve)
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
          path: 'advertiseConfig',
          component: resolve => require(['@/components/yunmengConfig/advertiseConfig'], resolve),
          name: 'advertiseConfig',
        },
      ]
    },
  ]
})
