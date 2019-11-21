import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
import adminLogin from '@/components/adminLogin'
import index from '@/components/index'
import comment from '@/components/comment'
import user from '@/components/user'
import video from '@/components/video'

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
      component: admin,
      children:[
        {path: '/comment', name: '评论', component: comment},
        {path: '/user', name: '用户', component: user},
        {path: '/video', name: '视频', component: video}
        ]
    },{
      path: '/',
      name: 'adminLogin',
      component: adminLogin
    },
  ]
})
