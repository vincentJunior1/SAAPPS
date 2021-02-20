<template>
  <div class="room-chat">
    <div class="room-empty" v-if="chat === 0">
      Please Select a chat to start messaging
    </div>
    <div class="chat-room" v-if="chat === 1">
      <div class="head-room">
        <span
          ><img
            class="image-profile"
            :src="
              profileTo.image == '' || profileTo.image == null
                ? require('../../assets/image/profile.jpg')
                : path + profileTo.image
            "
            alt=""
        /></span>
        <span class="information">
          <p class="username" style="cursor:pointer;">{{ profileTo.name }}</p>
          <p
            class="status"
            v-if="isTyping.typing == 1 && isTyping.username !== user.user_name"
          >
            Typing
          </p>
        </span>
      </div>
      <div class="body-room">
        <div class="" v-for="(item, index) in listChatRoom" :key="index">
          <span v-if="user.user_id == item.user_id_from"
            ><img
              class="image-profiles"
              style="margin-bottom:10px;"
              :src="
                item.user_image == '' || item.user_image == null
                  ? require('../../assets/image/profile.jpg')
                  : path + item.user_image
              "
              alt=""
            />
            <p class="sender">{{ item.chat_content }}</p></span
          >
          <span v-else>
            <img
              class="receiver-image"
              style="margin-bottom:10px;"
              :src="
                item.user_image == '' || item.user_image == null
                  ? require('../../assets/image/profile.jpg')
                  : path + item.user_image
              "
              alt=""
            />
            <p class="receiver">{{ item.chat_content }}</p>
          </span>
        </div>
      </div>
    </div>
    <span class="typing-message" v-if="chat === 1">
      <textarea
        name=""
        class="typing-area"
        rows="2"
        v-model="chat_content"
        placeholder="type your message here..."
      ></textarea>
      <span class="emot-1" @click="showMenu()">+</span>
      <img class="emot-2" src="../../assets/image/smile.png" alt="" />
      <i class="emot-3 fa fa-camera" @click="sendMessages()"></i>
    </span>
    <div class="menu-chat" v-if="showMenuChat == 1">
      <p class="menuchat">Image</p>
      <p class="menuchat">Documents</p>
      <p class="menuchat">Contacts</p>
      <p class="menuchat">Location</p>
    </div>
  </div>
</template>
<script>
import io from 'socket.io-client'
import { mapGetters, mapActions } from 'vuex'
import dotenv from 'dotenv'
dotenv.config()
export default {
  name: 'RoomChat',
  data() {
    return {
      online: 1,
      showMenuChat: 0,
      clickMenu: 0,
      chat_content: '',
      allChat: [],
      path: process.env.VUE_APP_URL,
      socket: io('http://localhost:3000')
    }
  },
  watch: {
    chat_content(value) {
      value
        ? this.socket.emit('typing', {
            username: this.user.user_name,
            room: this.profileTo.room,
            typing: 1
          })
        : this.socket.emit('typing', {
            username: this.user.user_name,
            room: this.profileTo.room,
            typing: 0
          })
    }
  },
  computed: {
    ...mapGetters({
      user: 'setUser',
      chat: 'getChat',
      listChatRoom: 'getChatPerRoom',
      profileTo: 'getProfileTo',
      isTyping: 'getTyping'
    })
  },
  created() {
    this.chat
    this.allChat = this.listChatRoom
  },
  methods: {
    ...mapActions(['sendChat']),
    ...mapActions(['realTimeChat']),
    showMenu() {
      if (this.clickMenu == 0) {
        this.showMenuChat = 1
        this.clickMenu = 1
      } else {
        this.showMenuChat = 0
        this.clickMenu = 0
      }
    },
    sendMessages() {
      const all = {
        room_chat: this.profileTo.room,
        user_id_to: this.profileTo.id,
        chat_content: this.chat_content,
        user_id_from: this.user.user_id,
        user_image: this.profileTo.image
      }
      this.sendChat(all)
      this.socket.emit('roomMessage', all)
      this.chat_content = ''
    }
  }
}
</script>
<style scoped>
.room-chat {
  font-family: rubik;
}
.room-empty {
  margin-top: 30%;
  font-weight: 400;
  color: #848484;
}
.menuchat {
  cursor: pointer;
}
.head-room {
  position: relative;
  text-align: left;
  padding-top: 28px;
  margin-bottom: 20px;
}
.image-profile {
  width: 64px;
  height: 64px;
  margin-right: 30px;
}
.information {
  line-height: 15px;
  top: 38px;
  position: absolute;
}
.username {
  font-size: 18px;
  font-weight: 500;
}
.status {
  font-size: 15px;
  color: #7e98df;
}
.body-room {
  height: 440px;
  overflow-y: scroll;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
}
.receiver {
  text-align: left;
  max-width: 300px;
  min-height: 50px;
  padding-top: 1%;
  padding-right: 20px;
  padding-left: 20px;
  padding: 10px 10px 20px 20px;
  margin-left: 80px;
  background-color: #7e98df;
  color: white;
  justify-content: space-between;
  border-radius: 15px 15px 15px 0px;
}
.sender {
  text-align: right !important;
}
.image-profiles {
  float: right;
  height: 64px;
  width: 64px;
  margin-left: 40px;
}
.receiver-image {
  height: 64px;
  width: 64px;
  float: left;
}
.typing-message {
  display: flex;
  flex-direction: row;
}
.typing-area {
  margin-top: 10px;
  width: 75%;
  float: left;
  border: none;
  border-radius: 40px;
  padding-left: 5%;
  padding-top: 20px;
  margin-right: 40px;
}
.typing-area:focus {
  border-radius: 40px !important;
  outline: none;
}
.emot-2 {
  height: 30px;
  width: 30px;
  margin-top: 3%;
  margin-right: 20px;
  cursor: pointer;
}
.emot-1 {
  padding-top: 1%;
  font-size: 42px;
  margin-right: 20px;
  color: #7e98df;
  cursor: pointer;
}
.emot-3 {
  margin-top: 3%;
  font-size: 28px;
  color: #7e98df;
  cursor: pointer;
}
.menu-chat {
  position: absolute;
  width: 150px;
  bottom: 70px;
  right: 210px;
  background-color: #7e98df;
  color: white;
  z-index: 1;
  border-radius: 20px 20px 0px 20px;
  text-align: left;
  padding-left: 15px;
  padding-top: 10px;
}
</style>
