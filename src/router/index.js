import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
import adminLogin from '@/components/adminLogin'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },{
      path: '/admin',
      name: 'admin',
      component: admin
    },{
      path: '/',
      name: 'adminLogin',
      component: adminLogin
    }
  ]
})
