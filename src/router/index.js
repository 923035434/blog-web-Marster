import Vue from 'vue'
import Router from 'vue-router'
import blogs from '../components/blogs/blogs.vue'
import newBlog from '../components/newBlog/newBlog.vue'
import messageBoard from '../components/messageBoard/messageBoard.vue'
import baseInfo from '../components/baseInfo/baseInfo.vue'
import personalitySetting from '../components/personalitySetting/personalitySetting.vue'
import iLikeTheMusic from '../components/iLikeTheMusic/iLikeTheMusic.vue'
import blogSetting from '../components/blogSetting/blogSetting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/blogs'
    },
    {
      path: '/blogs',
      component: blogs
    },
    {
      path: '/newBlog',
      component: newBlog
    },
    {
      path: '/messageBoard',
      component: messageBoard
    },
    {
      path: '/baseInfo',
      component: baseInfo
    },
    {
      path: '/personality',
      component: personalitySetting
    },
    {
      path: '/lickTheMusic',
      component: iLikeTheMusic
    },
    {
      path: '/blogSetting',
      component: blogSetting
    }
  ]
})
