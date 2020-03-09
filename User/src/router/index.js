// import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  // mode:"history",
  routes: [
    {
      path: '/',
      redirect: '/user/all/index'
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/login/login'], resolve)
    },
    {
      path: '/logout',
      name: 'logOut',
      component: resolve => require(['@/components/logOut/logOut'], resolve),
    },
    {
      path: '/user/:id',
      component: resolve => require(['@/components/common/home'], resolve),
      children: [{
          path: 'index',
          name: 'Material',
          component: resolve => require(['@/components/advDirected/material'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'media',
          component: resolve => require(['@/components/advDirected/media'], resolve),
          name: 'Media',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'keywords',
          component: resolve => require(['@/components/advDirected/keywords'], resolve),
          name: 'Keywords',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'order',
          component: resolve => require(['@/components/order/order'], resolve),
          name: 'Order',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'generalization',
          component: resolve => require(['@/components/Analysis/generalization'], resolve),
          name: 'generalization',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'flow',
          component: resolve => require(['@/components/Analysis/flow'], resolve),
          name: 'flow',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'sources',
          component: resolve => require(['@/components/Analysis/sources'], resolve),
          name: 'sources',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'visit',
          component: resolve => require(['@/components/Analysis/visit'], resolve),
          name: 'visit',
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    // {
    //   path: '*',
    //   redirect: '/user/index'
    // }
  ]
})
