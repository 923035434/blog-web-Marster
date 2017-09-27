<template>
  <div class="ilickTheMusic">
    <div class="float-block search-wrapper">
      <div class="search">
        <input @keyup.enter="search" v-model="searchValue" type="text">
      </div>
      <div @click="search" class="icon">
        <md-icon>search</md-icon>
      </div>
    </div>
    <transition name="fade">
      <div v-show="searchSingerList.length>0||searchSongList.length>0" class="float-block search-result-wrapper">
        <md-tabs class="md-warn" md-right>
          <md-tab md-icon="my_library_music">
            <div class="song-list list-wrapper">
              <div class="phone-viewport">
                <md-list>
                  <md-list-item  v-for="song in searchSongList">
                    <div class="md-list-text-container">
                      <span>{{song.name}}</span>
                      <span>{{song.singer.name+'  -  '+song.albumName}}</span>
                    </div>

                    <md-button @click.stop="likeSong(song)" class="md-icon-button md-list-action">
                      <md-icon v-if="isLikeSong(song)" class="md-accent">favorite</md-icon>
                      <md-icon v-if="!isLikeSong(song)" >favorite_outline</md-icon>
                    </md-button>
                  </md-list-item>
                </md-list>
              </div>
            </div>
          </md-tab>

          <md-tab md-icon="face">
            <div class="singer-list list-wrapper">
              <div class="phone-viewport">
                <md-list class="custom-list md-triple-line">
                  <md-list-item @click.stop="showSearchSingerSelect(singer)" v-for="singer in searchSingerList">
                    <md-avatar>
                      <img :src="singer.img" >
                    </md-avatar>
                    <div class="md-list-text-container">
                      <span>{{singer.name}}</span>
                    </div>
                    <md-button @click.stop="likeSinger(singer)" class="md-icon-button md-list-action">
                      <md-icon >add</md-icon>
                    </md-button>
                    <md-divider class="md-inset"></md-divider>
                  </md-list-item>
                </md-list>
              </div>
            </div>
          </md-tab>
        </md-tabs>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="selectSearchSinger.name" class="float-block search-singer-select-wrapper">
        <div class="phone-viewport">
          <md-list>
            <md-subheader>{{selectSearchSinger.name+' - Top100'}}</md-subheader>

            <md-list-item v-for="song in searchSingerSongList">
              <div class="md-list-text-container">
                <span>{{song.name}}</span>
                <span>{{song.singer.name+'  -  '+song.albumName}}</span>
              </div>

              <md-button @click="likeSong(song)" class="md-icon-button md-list-action">
                <md-icon v-if="isLikeSong(song)" class="md-accent">favorite</md-icon>
                <md-icon v-if="!isLikeSong(song)" >favorite_outline</md-icon>
              </md-button>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="singerList.length>0" class="float-block ilike-singer-wrapper">
        <div class="phone-viewport">
          <md-list class="custom-list md-triple-line">
            <md-subheader class="md-inset">我的歌手列表</md-subheader>
            <md-list-item @click="showLikeSingerSong(singer)" v-for="singer in singerList">
              <md-avatar>
                <img :src="singer.img" >
              </md-avatar>
              <div class="md-list-text-container">
                <span>{{singer.name}}</span>
              </div>
              <md-button @click.stop="noLikeSinger(singer)" class="md-icon-button md-list-action">
                <md-icon >remove</md-icon>
              </md-button>

              <md-divider class="md-inset"></md-divider>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="selectSinger.name" class="float-block ilike-singer-select-wrapper">
        <div class="phone-viewport">
          <md-list>
            <md-subheader>{{selectSinger.name}}</md-subheader>

            <md-list-item v-for="song in SongList">
              <div class="md-list-text-container">
                <span>{{song.name}}</span>
                <span>{{song.singer.name+'  -  '+song.albumName}}</span>
              </div>

              <md-button @click="noLikeSong(song)" class="md-icon-button md-list-action">
                <md-icon class="md-accent">favorite</md-icon>
              </md-button>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
    import {getSearchSinger, getSearchSong, getSearchSongForSinger, getSinger, getSong, addSinger, deleteSinger, getSongForSinger, deleteSong, addSong} from '../../api/api_music'
    import {createSingerListForSearchData, createSingerListForData} from '../../common/js/singer'
    import {createSongListForSearchData, createSongListForSearchSinger, createSongListForData} from '../../common/js/song'
    import {parseJson} from '../../common/js/Util'
    export default {
      data () {
        return {
          searchValue: '',
          searchSingerList: [],
          searchSongList: [],
          searchSingerSongList: [],
          singerList: [],
          selectSearchSinger: {},
          selectSinger: {},
          SongList: [],
          likeSongList: []
        }
      },
      created () {
        this._getSingerList()
        this._getSongList()
        this.allSong = {
          name: '全部歌曲'
        }
      },
      methods: {
        _getSingerList () {
          getSinger().then((res) => {
            let result = parseJson(res)
            if (result.code !== 0) {
              this.showTip('_getSingerList错误')
              return
            }
            this.singerList = createSingerListForData(result.data)
          })
        },
        _getSongList () {
          getSong().then((res) => {
            let result = parseJson(res)
            if (result.code !== 0) {
              this.showTip('_getSongList错误')
            }
            this.likeSongList = createSongListForData(result.data)
            console.log(this.likeSongList)
          })
        },
        search () {
          if (this.searchValue === '') {
            this.showTip('请输入搜索内容')
            return
          }
          getSearchSinger(this.searchValue).then((res) => {
            let result = res
            if (typeof result === 'string') {
              result = JSON.parse(res)
            }
            if (result.code !== 0) {
              this.showTip('搜索结果错误')
              return
            }
            let param = result.data.singer.itemlist
            this.searchSingerList = createSingerListForSearchData(param)
          })
          getSearchSong(this.searchValue).then((res) => {
            let result = res
            if (typeof result === 'string') {
              result = JSON.parse(res)
            }
            if (result.code !== 0) {
              this.showTip('搜索结果错误')
              return
            }
            let param = result.data.song.list
            this.searchSongList = createSongListForSearchData(param)
          })
        },
        likeSinger (singer) {
          let param = {
            SingerId: singer.singerId,
            Name: singer.name,
            ImgUrl: singer.img
          }
          addSinger(param).then((res) => {
            let result = parseJson(res)
            if (result.code !== 0) {
              this.showTip(result.message)
              return
            }
            singer.id = result.data.id
            this.singerList.push(singer)
            this.showTip('添加成功')
          })
        },
        noLikeSinger (singer) {
          if (singer.id === -1) {
            return
          }
          deleteSinger(singer.id).then((res) => {
            let result = parseJson(res)
            if (result.code !== 0) {
              this.showTip(result.message)
              return
            }
            let index = this.singerList.indexOf(singer)
            this.singerList.splice(index, 1)
            this.showTip('移除成功')
          })
        },
        showLikeSingerSong (singer) {
          this.searchValue = singer.name
          this.search()
          this.selectSinger = singer
          getSongForSinger(singer.id).then((res) => {
            let result = parseJson(res)
            if (result.code !== 0) {
              this.showTip(result.message)
              return
            }
            this.SongList = createSongListForData(result.data, singer)
          })
        },
        showSearchSingerSelect (singer) {
          this.selectSearchSinger = singer
          getSearchSongForSinger(singer.singerId).then((res) => {
            let result = parseJson(res)
            if (result.code !== 0) {
              this.showTip(result.message)
              return
            }
            this.searchSingerSongList = createSongListForSearchSinger(res.data.list, this.selectSearchSinger)
          })
        },
        likeSong (song) {
          let singerId = song.singer.singerId
          let singer = this.singerList.filter(singer => {
            return parseInt(singer.singerId) === parseInt(singerId)
          })[0]
          if (!singer) {
            this.likeSinger(song.singer)
            let timer = setTimeout(() => {
              if (!this.likeNumber) {
                this.likeNumber = 1
              } else {
                this.likeNumber++
              }
              if (this.likeNumber > 5) {
                this.likeNumber = 1
                this.showTip('添加超时')
                clearTimeout(timer)
                return
              }
              clearTimeout(timer)
              this.likeSong(song)
            }, 40)
          } else {
            let param = {
              SingerId: singer.id,
              MusicId: song.musicId,
              Name: song.name,
              ImgUrl: song.imgUrl,
              AlbumName: song.albumName,
              Url: song.url
            }
            addSong(param).then((res) => {
              let result = parseJson(res)
              if (result.code !== 0) {
                this.showTip(result.message)
                return
              }
              song.id = result.data.id
              this.likeSongList.push(song)
              this.SongList = this.likeSongList.slice()
              this.selectSinger = this.allSong
              this.showTip('添加成功')
            })
          }
        },
        noLikeSong (song) {
          if (song.id === -1) {
            return
          }
          deleteSong(song.id).then((res) => {
            let result = parseJson(res)
            if (result.code !== 0) {
              this.showTip(result.message)
              return
            }
            let index = this.SongList.indexOf(song)
            this.SongList.splice(index, 1)
            let item = this.likeSongList.filter(s => {
              return s.musicId.toString() === song.musicId.toString()
            })[0]
            this.likeSongList.splice(this.likeSongList.indexOf(item), 1)
            this.showTip('删除成功')
          })
        },
        isLikeSong (song) {
          let item = this.likeSongList.filter(s => {
            return s.musicId.toString() === song.musicId.toString()
          })
          return item.length > 0
        },
        showTip (message) {
          this.$emit('message', message)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .ilickTheMusic
    position :relative
    width :100%
    height:100%
    .float-block
      position :absolute
      border-radius: 3px
      border: 1px solid rgba(83, 88, 88, 0.15)
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)
    .search-wrapper
      top :0px
      right :10%
      width: 300px
      height: 40px
      display :flex
      .search
        flex :1
        input
          height: 100%
          width: 100%
          border: 0 none
          padding:11px
          color : #333
          font-size :14px
          outline:none
      .icon
        flex :0 0 40px
        height:40px
        text-align :center
        line-height :40px
        font-size:16px
        cursor :pointer
        color :#b3b2b2
        &:hover
          color :#2196f3
    .search-result-wrapper
      top: 60px
      left: 5%
      width:50%
      height: 340px
      &.fade-enter-active,&.fade-leave-active
        transition: all 0.4s
      &.fade-enter,&.fade-leave-to
        opacity: 0
      .list-wrapper
        width: 100%
        height:250px
        overflow-y :auto
        overflow-x :hidden
    .ilike-singer-wrapper
      top: 60px
      right :10%
      overflow-y :auto
      overflow-x :hidden
      width:30%
      height: 340px
      &.fade-enter-active,&.fade-leave-active
        transition: all 0.4s
      &.fade-enter,&.fade-leave-to
        opacity: 0
    .search-singer-select-wrapper
      top: 430px
      left: 5%
      width:40%
      height: 427px
      overflow-x :hidden
      overflow-y :scroll
      &.fade-enter-active,&.fade-leave-active
        transition: all 0.4s
      &.fade-enter,&.fade-leave-to
        opacity: 0
    .ilike-singer-select-wrapper
      top: 430px
      right :10%
      width:40%
      height: 427px
      overflow-x :hidden
      overflow-y :scroll
      &.fade-enter-active,&.fade-leave-active
        transition: all 0.4s
      &.fade-enter,&.fade-leave-to
        opacity: 0
</style>
