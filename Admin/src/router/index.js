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
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/login/login'], resolve)
    },
    {
      path:'/admin',
      component: resolve => require(['@/components/common/home'], resolve),
      redirect: '/admin/index',
    	children:[
        {
          path: 'index',
          name: 'Material',
          component:resolve => require(['@/components/advDirected/material'],resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'advertiseConfig',
          name: 'advertiseConfig',
          component: resolve => require(['@/components/yunmengConfig/advertiseConfig'], resolve),
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    {
      path: '*',
      redirect: '/admin/index'
    }
  ]
})
