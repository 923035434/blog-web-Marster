<template>
  <div class="home">
    <div class="select-bar-wrapper">
      <div class="select-top"></div>
      <div class="select-wrapper">
        <md-list>
          <md-list-item >
            <span>博客</span>
            <md-list-expand>
              <md-list>
                <md-list-item  @click="openChildPage('blogs','我的博客')" class="md-inset">我的博客<md-icon>event_node</md-icon></md-list-item>

                <md-list-item @click="openChildPage('newBlog','新增博客')" class="md-inset">写博客<md-icon>create</md-icon></md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
          <md-list-item >
            <span>音乐</span>
            <md-list-expand>
              <md-list>
                <md-list-item @click="openChildPage('lickTheMusic','我喜欢的音乐')" class="md-inset">我喜欢的音乐<md-icon>headset</md-icon></md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
          <md-list-item >
            <span>留言板</span>
            <md-list-expand>
              <md-list>
                <md-list-item @click="openChildPage('messageBoard','留言板')" class="md-inset">留言信息<md-icon>message</md-icon></md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
          <md-list-item >
            <span>个人设置</span>
            <md-list-expand>
              <md-list>
                <md-list-item @click="openChildPage('baseInfo','基本信息')" class="md-inset">基本信息<md-icon>settings</md-icon></md-list-item>
                <md-list-item @click="openChildPage('personality','个性设置')" class="md-inset">个性设置<md-icon>settings_system_daydream</md-icon></md-list-item>
                <md-list-item @click="openChildPage('blogSetting','博客设置')" class="md-inset">博客设置<md-icon>perm_data_setting</md-icon></md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
        </md-list>
      </div>
    </div>
    <div class="content-wrapper">
      <md-toolbar class="title-bar">
        <h2 class="md-title">{{title}}</h2>
      </md-toolbar>
      <div :style="{'height':contentHeight}" class="content">
        <keep-alive>
          <router-view @message="openSnackbar"></router-view>
        </keep-alive>
      </div>
    </div>
    <blog-show @message="openSnackbar" v-show="blogShowState"></blog-show>
    <md-snackbar :md-position="'bottom right'" ref="snackbar" :md-duration="3000">
      <span>{{snackbarMessage}}</span>
      <md-button class="md-accent" md-theme="light-blue" @click="$refs.snackbar.close()">我知道了</md-button>
    </md-snackbar>
  </div>
</template>

<script type="text/ecmascript-6">
//  import * as pageType from '../../common/js/pageMapConfig'
  import blogShow from '../../components/blogShow/blogShow.vue'
  import {createblogTypes} from '../../common/js/blogType.js'
  import {getBlogs} from '../../api/api_blog'
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    data () {
      return {
        title: 'Home',
        childrenPageName: 'newBlog',
        snackbarMessage: ''
      }
    },
    created () {
      this._getBlogs()
    },
    methods: {
      openChildPage (pageName, title) {
        this.$router.push('/' + pageName + '')
        this.title = title
      },
      openSnackbar (message) {
        if (message) {
          this.snackbarMessage = message
        }
        this.$refs.snackbar.open()
      },
      _getBlogs () {
        getBlogs().then((res) => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            this.openSnackbar('getBlogs错误')
          }
          let blogTypes = createblogTypes(result.data)
          this.setBlogTypes(blogTypes)
          console.log(this.blogTypes)
        })
      },
      ...mapMutations({
        'setBlogTypes': 'SET_BLOGTYPES'
      })
    },
    components: {
      'blog-show': blogShow
    },
    computed: {
      contentHeight () {
        return document.body.clientHeight - 64 + 'px'
      },
      ...mapGetters([
        'blogTypes',
        'blogShowState'
      ])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .home
    position :fixed
    top :0px
    left :0px
    bottom :0px
    right :0px
    padding-left :280px
    .select-bar-wrapper
      position :absolute
      left :0px
      top :0px
      color :rgba(0,0,0,.87)
      height: 100%
      width:280px
      box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12)
      .list-item
        padding:0 40px
      .select-top
        width: 100%
        height:172px
        border-bottom: 1px solid rgba(0,0,0,.12)
      .select-wrapper
        font-family : Roboto
        .md-inset
          color : #969696
    .content-wrapper
      position :relative
      max-height:100%
      .title-bar
        box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)
      .content
        padding:16px
        overflow :scroll
        overflow-x: hidden
</style>
