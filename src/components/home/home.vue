<template>
  <div class="home">
    <div class="select-bar-wrapper">
      <div class="select-top"></div>
      <div class="select-wrapper">
        <md-list>
          <md-list-item >
            <span>隐私修改</span>
            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">个人信息</md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>

          <md-list-item >
            <span>音乐</span>
            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">歌手</md-list-item>
                <md-list-item class="md-inset">所有歌曲</md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>

          <md-list-item >
            <span>博客</span>
            <md-list-expand>
              <md-list>
                <md-list-item  @click="openChildPage('blogs')" class="md-inset">我的博客</md-list-item>
                <md-list-item @click="openChildPage('newBlog')" class="md-inset">写博客</md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>

          <md-list-item >
            <span>留言板</span>
            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">留言信息</md-list-item>
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
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import * as pageType from '../../common/js/pageMapConfig'
  export default {
    data () {
      return {
        title: 'Home',
        childrenPageName: 'newBlog'
      }
    },
    methods: {
      openChildPage (pageName) {
        this.$router.push('/' + pageName + '')
      }
    },
    components: {
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

    .content-wrapper
      height:100%
      .title-bar
        box-shadow: 0 1px 3px rgba(0,0,0,.2), 0 1px 1px rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)
      .content
        width: 100%
        height:100%
        padding:16px
</style>
