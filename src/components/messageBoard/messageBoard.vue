<template>
  <div class="messageBoard">
    <md-layout md-gutter>
      <md-layout>
        <div :style="{width:ItemWidth+'px'}" v-for="(message,index) in messages" class="messageItem">
          <div @click="selectDelItem(index)" class="btn-close"><md-icon>close</md-icon></div>
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">{{message.name}}</div>
              <div class="md-subhead">
                <md-icon>email</md-icon>
                <span class="text">{{message.email}}</span>
              </div>
              <div class="md-subhead">
                <md-icon>alarm</md-icon>
                <span class="text">{{message.time}}</span>
              </div>
            </md-card-header>
            <md-card-content>{{message.content}}</md-card-content>
          </md-card>
        </div>
      </md-layout>
    </md-layout>

    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="isdelDialog">
      <md-dialog-title>你确定要删除该消息吗？</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="deleteMessage">确定</md-button>
        <md-button class="md-primary" @click="closeDialog('isdelDialog')">取消</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getMessages, deleteMessage} from '../../api/api_Message'
  export default {
    data () {
      return {
        ItemWidth: 240,
        messages: []
      }
    },
    created () {
      getMessages().then((res) => {
        let result = JSON.parse(res)
        if (result.code !== 0) {
          this.showTip('getMessages错误')
          return
        }
        this.messages = result.data
        for (let i = 0; i < this.messages.length; i++) {
          let date = new Date(parseInt(this.messages[i].time))
          this.messages[i].time = date.getFullYear() + '年-' + (date.getMonth() + 1) + '月-' + date.getDate() + '日/' + date.getHours() + ':' + date.getMinutes()
        }
      })
    },
    methods: {
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.$refs[ref].close()
      },
      showTip (message) {
        this.$emit('message', message)
      },
      deleteMessage () {
        let index = this.deleteIndex
        if (index === null) {
          return
        }
        let id = this.messages[index].id
        this.messages.splice(index, 1)
        deleteMessage(id).then((res) => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            this.showTip(result.message)
            return
          }
          this.showTip('删除成功')
        })
        this.closeDialog('isdelDialog')
      },
      selectDelItem (index) {
        this.deleteIndex = index
        this.openDialog('isdelDialog')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .messageBoard
    width: 100%
    min-height:100%
    padding: 40px
    .messageItem
      position :relative
      margin:20px
      .btn-close
        position :absolute
        padding: 10px
        z-index :5
        top :0px
        right :0px
        cursor :pointer
        color : black
        &:hover
          color :#afafaf
      .text
        padding-left:8px
</style>
