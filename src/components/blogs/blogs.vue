<template>
  <div class="blogs">
    <div v-for="type in blogTypes" class="blogType-wrapper">
      <title-bar :text="type.name"></title-bar>
      <md-layout md-gutter>
        <md-layout>
          <div v-for="blog in type.blogs" :style="{width:ItemWidth+'px'}" class="blogItem">
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
                <md-button>Action</md-button>
                <md-button>Action</md-button>
              </md-card-actions>
            </md-card>
          </div>
        </md-layout>
      </md-layout>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import titleBar from '../../base/titleBar/titleBar.vue'
  export default {
    data () {
      return {
        ItemWidth: 300
      }
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
