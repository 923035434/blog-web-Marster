<template>
  <div class="blogSetting">
    <title-bar text="类型设置"></title-bar>
    <div class="blog-type-setting-wrapper">
      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">BlogTypes</h1>
          <md-button class="md-icon-button">
            <md-icon>add</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>
        </md-toolbar>
        <md-table v-once>
          <md-table-header>
            <md-table-row>
              <md-table-head >Id</md-table-head>
              <md-table-head >TypeName</md-table-head>
              <md-table-head >Rank</md-table-head>
              <md-table-head>
                <md-icon>mode_edit</md-icon>
                <span>操作</span>
              </md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(type, index) in blogTypes" :key="index">
              <md-table-cell>{{type.id}}</md-table-cell>
              <md-table-cell>{{type.name}}</md-table-cell>
              <md-table-cell>{{type.rank}}</md-table-cell>
              <md-table-cell>
                <md-button @click="edite(index)" v-show="!isEdite[index]" class="md-icon-button">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button v-show="isEdite[index]" class="md-icon-button md-raised md-primary">
                  <md-icon>save</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-table-card>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import titleBar from '../../base/titleBar/titleBar.vue'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        isEdite: [
          true,
          false
        ]
      }
    },
    created () {
//      let isEdite = []
//      for (let i = 0; i < this.blogTypes.length; i++) {
//        isEdite.push(false)
//      }
//      this.isEdite = isEdite
    },
    computed: {
      ...mapGetters([
        'blogTypes'
      ])
    },
    methods: {
      edite (index) {
        console.log(index)
        this.isEdite[index] = true
        console.log(this.isEdite)
      },
      ...mapMutations({
        setBlogTypes: 'SET_BLOGTYPES'
      })
    },
    components: {
      'title-bar': titleBar
    },
    watch: {
      blogTypes (newblogTypes) {
        let isEdite = []
        for (let i = 0; i < newblogTypes.length; i++) {
          isEdite.push(false)
        }
        this.isEdite = isEdite
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .blogSetting
    width:100%
    height:100%
</style>
