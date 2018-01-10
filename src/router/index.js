import Vue from 'vue'
import Router from 'vue-router'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: r => require.ensure([], () => r(require('../page/home')), 'home') 
    },
    {
      path: '/login',
      name: 'login',
      component: r => require.ensure([], () => r(require('../page/login')), 'home')  
    },
    {
      path: '/reg',
      name: 'register',
      component: r => require.ensure([], () => r(require('../page/register')), 'register')  
    },
    {
      path: '/topic/:topicid',
      name: 'topic',
      component: r => require.ensure([], () => r(require('../page/topic')), 'topic')  
    },
    {
      path: '/topicList',
      name: 'topicList',
      component: r => require.ensure([], () => r(require('../page/topicList')), 'topicList')  
    },
    {
      path: '/user/:userid',
      name: 'user',
      component: r => require.ensure([], () => r(require('../page/user')), 'user')  
    }
  ]
})
