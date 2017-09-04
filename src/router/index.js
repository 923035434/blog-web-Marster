import Vue from 'vue'
import Router from 'vue-router'
import blogs from '../components/blogs/blogs.vue'
import newBlog from '../components/newBlog/newBlog.vue'
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
    }
  ]
})
