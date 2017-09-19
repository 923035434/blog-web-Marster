<template>
  <div @click.self="parentClick" class="blogSetting">
    <title-bar text="类型设置"></title-bar>
    <div class="blog-type-setting-wrapper">
      <md-table-card>
        <md-toolbar>
          <h1 class="md-title">BlogTypes</h1>
          <md-button @click="add" class="md-icon-button">
            <md-icon>add</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>
        </md-toolbar>
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head >Id</md-table-head>
              <md-table-head >TypeName</md-table-head>
              <md-table-head >Rank</md-table-head>
              <md-table-head>
                <md-icon>mode_edit</md-icon>
                <span>修改</span>
              </md-table-head>
              <md-table-head>
                <md-icon>delete</md-icon>
                <span>删除</span>
              </md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(type, index) in blogTypes" v-if="editIndex!==index" :key="index">
                <md-table-cell>{{type.id}}</md-table-cell>
                <md-table-cell>{{type.name}}</md-table-cell>
                <md-table-cell>{{type.rank}}</md-table-cell>
                <md-table-cell >
                  <md-button  @click.stop="edite(index)"  class="md-icon-button">
                    <md-icon>edit</md-icon>
                  </md-button>
                </md-table-cell >
              <md-table-cell>
                <md-button @click.stop="deleteType(index)" class="md-icon-button">
                  <md-icon>delete</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
            <md-table-row v-else :key="index">
              <md-table-cell>{{type.id}}</md-table-cell>
              <md-table-cell>
                <input v-model="editName"/>
              </md-table-cell>
              <md-table-cell>
                <input v-model="editRank"/>
              </md-table-cell>
              <md-table-cell >
                <md-button  @click.stop="save()"  class="md-icon-button">
                  <md-icon>save</md-icon>
                </md-button>
              </md-table-cell >
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-table-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import titleBar from '../../base/titleBar/titleBar.vue'
  import {editType, addType, deleteType} from '../../api/api_blog'
  import BlogType from '../../common/js/blogType'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        editIndex: -1,
        editName: '',
        editRank: 0
      }
    },
    created () {
    },
    computed: {
      ...mapGetters([
        'blogTypes'
      ])
    },
    methods: {
      add () {
        let item = new BlogType(-1, '', 0, {})
        this.blogTypes.push(item)
        this.editName = ''
        this.editRank = 0
        this.editIndex = this.blogTypes.length - 1
      },
      edite (index) {
        this.editIndex = index
        this.editName = this.blogTypes[index].name
        this.editRank = this.blogTypes[index].rank
      },
      save () {
        let item = this.blogTypes[this.editIndex]
        let id = item.id
        let param = {
          Name: this.editName,
          Rank: this.editRank
        }
        //  增加
        if (id === -1) {
          addType(param).then((res) => {
            let result = JSON.parse(res)
            if (result.code !== 0) {
              this.showTip('添加失败')
              this.blogTypes.splice(this.editIndex, 1)
              return
            }
            this.blogTypes[this.editIndex].id = result.data.id
            this.blogTypes[this.editIndex].name = result.data.name
            this.blogTypes[this.editIndex].rank = result.data.rank
            this.editIndex = -1
            this.showTip('添加成功')
          })
          //  修改
        } else {
          editType(id, param).then((res) => {
            let result = JSON.parse(res)
            if (result.code !== 0) {
              this.showTip('修改失败')
              return
            }
            item.name = this.editName
            item.rank = this.editRank
            this.showTip('修改成功')
            this.editIndex = -1
          })
        }
      },
      deleteType (index) {
        let item = this.blogTypes[index]
        let id = item.id
        deleteType(id).then((res) => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            this.showTip('删除失败')
            return
          }
          this.blogTypes.splice(index, 1)
          this.showTip('删除成功')
        })
      },
      parentClick () {
        this.editIndex = -1
      },
      showTip (message) {
        this.$emit('message', message)
      },
      ...mapMutations({
        setBlogTypes: 'SET_BLOGTYPES'
      })
    },
    components: {
      'title-bar': titleBar
    },
    watch: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .blogSetting
    width:100%
    height:100%
</style>
