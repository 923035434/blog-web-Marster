<template>
  <div class="blogs">
    <div v-for="(type,typeIndex) in blogTypes" :key="type.id" class="blogType-wrapper">
      <title-bar :text="type.name"></title-bar>
      <md-layout md-gutter>
        <md-layout>
          <div @click="openBlog(blog)" v-for="(blog,blogIndex) in type.blogs" :key="blog.id" :style="{width:ItemWidth+'px'}" class="blogItem">
            <md-card md-with-hover>
              <md-card-header>
                <div class="md-title">{{blog.title}}</div>
                <div class="md-subhead">{{blog.time}}</div>
              </md-card-header>

              <md-card-media>
                <img :src="blog.img" alt="People">
              </md-card-media>

              <md-card-content>
                {{blog.desc}}
              </md-card-content>

              <md-card-actions>
                <md-button @click.stop="selectDelItem(typeIndex,blogIndex)">Delete</md-button>
              </md-card-actions>
            </md-card>
          </div>
        </md-layout>
      </md-layout>
    </div>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="isdelDialog">
      <md-dialog-title>你确定要删除该文章吗？</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="deleteBlog">确定</md-button>
        <md-button class="md-primary" @click="closeDialog('isdelDialog')">取消</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import titleBar from '../../base/titleBar/titleBar.vue'
  import {deleteBlog} from '../../api/api_blog'
  export default {
    data () {
      return {
        ItemWidth: 300
      }
    },
    methods: {
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.$refs[ref].close()
      },
      selectDelItem (typeIndex, blogIndex) {
        this.delTypeIndex = typeIndex
        this.delBlogIndex = blogIndex
        this.openDialog('isdelDialog')
      },
      deleteBlog () {
        let type = this.blogTypes[this.delTypeIndex]
        let blog = type.blogs[this.delBlogIndex]
        let blogId = blog.id
        deleteBlog(blogId).then((res) => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            this.showTip('删除失败')
            return
          }
          type.blogs.splice(this.delBlogIndex, 1)
          this.showTip('删除成功')
        })
        this.closeDialog('isdelDialog')
      },
      openBlog (blog) {
//        console.log(blog)
        this.showBlog({
          blog: blog
        })
      },
      showTip (message) {
        this.$emit('message', message)
      },
      ...mapActions([
        'showBlog'
      ])
    },
    computed: {
      ...mapGetters([
        'blogTypes'
      ])
    },
    components: {
      'title-bar': titleBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .blogs
    width: 100%
    min-height:100%
    padding: 40px
    .blogItem
      margin:20px
</style>
