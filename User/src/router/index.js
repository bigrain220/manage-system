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
      path:'/login',
      name:'Login',
      component:resolve => require(['@/components/login/login'],resolve)
    },
    {
      path:'/user',
      component: resolve => require(['@/components/common/home'], resolve),
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
          path: 'directed',
          component: resolve => require(['@/components/dataManage/directed'], resolve),
          name: 'Directed',
          meta: {
    	      requireAuth: true
    	    }
        },
        {
          path: 'history',
          component: resolve => require(['@/components/Trend/history'], resolve),
          name: 'History',
          meta: {
    	      requireAuth: true
    	    }
        },
        {
          path: 'update',
          component: resolve => require(['@/components/Trend/update'], resolve),
          name: 'Update',
          meta: {
    	      requireAuth: true
    	    }
        },
        {
          path: 'historyDetail',
          component: resolve => require(['@/components/Analysis/historyDetail'], resolve),
          name: 'historyDetail',
          meta: {
    	      requireAuth: true
    	    }
        },
      ]
    },
  ]
})
