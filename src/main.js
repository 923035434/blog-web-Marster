// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import store from './store'

Vue.config.productionTip = false

var hljs = require('highlight.js')  // 应该用require而不是import
window.hljs = hljs
window.hljs.configure({   // optionally configure hljs
  languages: ['html', 'javascript', 'ruby', 'python', 'css']
})

/* eslint-disable no-new */
Vue.use(VueMaterial)

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red',
    warn: 'white'
  }})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

