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
          <p
            class="username"
            style="cursor:pointer;"
            @click="
              getProfiles(profileTo.id)
              $bvModal.show('profile-info')
            "
          >
            {{ profileTo.name }}
          </p>
          <p
            class="status"
            v-if="isTyping.typing == 1 && isTyping.username !== user.user_name"
          >
            Typing...
          </p>
        </span>
      </div>
      <b-modal id="profile-info" hide-footer>
        <template #modal-title>{{ profileFriend.user_name }} </template>
        <div class="d-block text-center">
          <img
            class="friends-image"
            :src="
              profileFriend.user_image !== '' ||
              profileFriend.user_image != null
                ? path + profileFriend.user_image
                : require('../../assets/image/profile.jpg')
            "
            alt=""
          />
          <p class="friend-name">{{ profileFriend.user_name }}</p>
          <p class="friend-email">{{ profileFriend.user_email }}</p>
          <p class="title-bio" style="font-weight:700; margin-bottom:-10px;">
            Bio:
          </p>
          <p class="friend-bio">{{ profileFriend.user_bio }}</p>
          <p class="title-bio" style="font-weight:700; margin-bottom:-10px;">
            Phone:
          </p>
          <p class="friend-phone">{{ profileFriend.user_phone }}</p>

          <div class="location">
            <GmapMap
              :center="coordinate"
              :zoom="10"
              map-type-id="terrain"
              style="width: auto; height: 300px"
            >
              <GmapMarker
                :position="coordinate"
                :clickable="true"
                :draggable="true"
                icon="https://img.icons8.com/color/48/000000/map-pin.png"
              />
            </GmapMap>
          </div>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('profile-info')"
          >Close Me</b-button
        >
      </b-modal>
      <div class="body-room">
        <div class="" v-for="(item, index) in listChatRoom" :key="index">
          <span v-if="item.user_id_to === user.user_id"
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
            <p class="sender">
              {{ item.chat_content }}
            </p></span
          >
          <span v-if="item.user_id_to == profileTo.id">
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
      <b-button
        style="height:40px; margin-top:25px; background-color:#7e98df; border:none;"
        @click="sendMessages()"
        >Send</b-button
      >
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
      socket: io(process.env.VUE_APP_URL_SOCKETIO, { path: '/api3/socket.io' }),
      coordinate: {
        lat: 10,
        lng: 10
      }
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
      isTyping: 'getTyping',
      profileFriend: 'getFriendProfile'
    })
  },
  created() {
    this.chat
    this.allChat = this.listChatRoom
    console.log(this.profileTo)
  },
  methods: {
    ...mapActions(['sendChat']),
    ...mapActions(['realTimeChat', 'showProfileFriend']),
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
        user_id_to: this.user.user_id,
        chat_content: this.chat_content,
        user_id_from: this.profileTo.id,
        user_image: this.user.user_image
      }
      this.sendChat(all)
      console.log(all)
      this.socket.emit('roomMessage', all)
      this.chat_content = ''
    },
    getProfiles(id) {
      this.showProfileFriend(id)
      this.$getLocation()
        .then(() => {
          if (
            this.profileFriend.user_lat == '' ||
            this.profileFriend.user_lat == null
          ) {
            this.coordinate
          } else {
            this.coordinate = {
              lat: parseFloat(this.profileFriend.user_lat),
              lng: parseFloat(this.profileFriend.user_lng)
            }
          }
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>
<style scoped>
.friend-name {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
}
.friend-email {
  font-size: 18px;
  /* font-weight: 500; */
  line-height: 0px;
  color: #7e98df;
}
.friend-bio {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  line-height: 20px;
  width: 40%;
}
.friend-bio::selection {
  margin-left: auto;
  margin-right: auto;
  font-weight: 600;
  margin-top: 20px;
  width: 40%;
  color: white;
  background-color: #7e98df;
}
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
.friends-image {
  width: 140px;
  height: 120px;
  border: 1px solid black;
  border-radius: 20px;
}
.friend-phone {
  margin-top: 10px;
  font-size: 18px;
}
</style>
