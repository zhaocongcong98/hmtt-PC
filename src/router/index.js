import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/view/home'
import Welcome from '@/view/welcome'
import NotFound from '@/view/404'
import local from '@/utils/local'
Vue.use(VueRouter)

const router = new VueRouter({

  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: Welcome
    }]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
// 添加路由的导航守卫 （前置导航守卫）
router.beforeEach((to, from, next) => {
  // 当每次跳转路由前触发
  // to 跳转到目标 路由对象
  // from 从哪里跳转过来  路由对象
  // next 下一步方法  next()放行  next(‘/login’) 拦截
  const user = local.getUser()
  // 如果user  ocal.token  不为空登录
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
