import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/index',
      component: resolve => require(['@/components/common/home'], resolve),
    	children:[
        {
          path: '/index',
          name: 'Material',
          component:resolve => require(['@/components/Material'],resolve)
        },
        {
          path: '/unit',
          component: resolve => require(['@/components/Unit'], resolve),
          name: 'Unit',
        },
        {
          path: '/directed',
          component: resolve => require(['@/components/Directed'], resolve),
          name: 'Directed',
        },
        {
          path: '/help',
          component: resolve => require(['@/components/Help'], resolve),
          name: 'Help',
        },
      ]
    },
  ]
})
