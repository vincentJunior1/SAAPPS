<template>
  <div class="friend-list">
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown = 0"
      style="position:absolute; left:0px;z-index: 1; top: 0px; "
      @dismiss-count-down="countDownChanged"
    >
      <p>New Message</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
    <div class="navbar" style="position:relative;">
      <span><p class="nav-title" @click="showLists()">SAAPS</p></span>
      <span class="nav-icon" @click="trigerSubMenu()"
        ><div class="bar1"></div>
        <div class="bar2" @click="showLists"></div>
        <div class="bar3" @click="showLists"></div
      ></span>
      <div class="menu" v-if="showList == 1">
        <i class="icon-menu fa fa-users" @click="showSearchFriend"></i>
        <i class="icon-menu fa fa-lock"></i>
        <i class="icon-menu fa fa-bullhorn"></i>
        <i class="close" @click="closeList()">X</i>
      </div>
      <div class="search-friends" v-if="searchFriend === 1">
        <b-form @submit.prevent="addFriend()">
          <input
            type="text"
            class="search-friend"
            v-model="userEmail"
            placeholder="Insert Your Friend Email"
          />
          <div class="friend-found">
            <img
              class="profile-image"
              v-if="showPicture == 1"
              style="margin-left:5px;"
              :src="
                friend.user_image == ''
                  ? require('../../assets/image/profile.jpg')
                  : path + friend.user_image
              "
              alt=""
            />
            <p style="color:white;">{{ friend.user_name }}</p>
            <b-button
              @click="addToFriendList"
              class="add-friend"
              v-if="showButtonAdd == 1"
              >Add Friend</b-button
            >
          </div>
        </b-form>
      </div>
      <div class="submenu" v-if="showSubMenu == 1">
        <p class="sub-menu" @click="changeChatMode('profile')">Settings</p>
        <p class="sub-menu" @click="getAllContact">Contacts</p>
        <p class="sub-menu">Invite Friends</p>
        <p class="sub-menu">Telegram FAQ</p>
        <p class="sub-menu" @click="logOut">Log Out</p>
        <p class="close-sub-menu" @click="closeSubMenu">X</p>
      </div>
      <div class="search" style="position:relative;">
        <input
          class="search-navbar"
          type="text"
          placeholder="Type Your Message Here"
        /><i class="fa fa-plus" aria-hidden="true" @click="showChat()"></i>
      </div>
    </div>
    <div class="list-chat">
      <div
        class="room-chat"
        style="position:relative;"
        v-for="(item, index) in friends"
        :key="index"
        v-long-press="500"
        @long-press-start="
          onLongPressStart(item.room_chat)
          $bvModal.show('bv-modal-example')
        "
        @click="
          makeRoomChat(
            item.user_id,
            item.room_chat,
            item.user_image,
            item.user_name
          )
        "
      >
        <span
          ><img
            class="profile-image"
            :src="
              item.user_image == ''
                ? require('../../assets/image/profile.jpg')
                : path + item.user_image
            "
            alt=""
          />
        </span>
        <span class="information">
          <p class="username">{{ item.user_name }}</p>
          <p class="message" v-if="listChat == 1">{{ item.chat_content }}</p>
        </span>
      </div>
    </div>
    <b-modal id="bv-modal-example" hide-footer>
      <div class="d-block text-center">
        <h3>Do You Want delete this chat?</h3>
      </div>
      <b-button class="mt-3" variant="danger" block @click="deleteChat"
        >Delete</b-button
      >
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
        >Cancel</b-button
      >
    </b-modal>
  </div>
</template>
<script>
import io from 'socket.io-client'
import dotenv from 'dotenv'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import LongPress from 'vue-directive-long-press'
import { alert } from '../../mixins/alert'
dotenv.config()
export default {
  name: 'FriendList',
  mixins: [alert],
  data() {
    return {
      isChange: false,
      showList: 0,
      showSubMenu: 0,
      searchFriend: 0,
      clickSearch: 0,
      userEmail: '',
      friend: {},
      path: process.env.VUE_APP_URL,
      showButtonAdd: 0,
      listFriend: 0,
      listChat: 1,
      showPicture: 0,
      socket: io(process.env.VUE_APP_URL_SOCKETIO, {
        reconnection: false,
        path: '/api3/socket.io'
      }),
      roomNumber: 0,
      oldRoom: '',
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  computed: {
    ...mapGetters({ friends: 'getChatList' }),
    ...mapGetters({ user: 'setUser' })
  },
  directives: {
    'long-press': LongPress
  },
  created() {
    // this.friends = this.chats
    this.socket.on('chatMessage', data => {
      if (data.user_id_to != this.user.user_id) {
        this.showAlert()
      }
      this.setChat(data)
    })
    this.socket.on('notificationSound', data => {
      console.log(data)
    })
    this.socket.on('typingMessage', data => {
      this.setTyping(data)
    })
  },
  methods: {
    ...mapMutations(['setChatMode', 'setChat', 'setTyping']),
    ...mapActions([
      'getChatLists',
      'joinRoom',
      'searchUser',
      'addFriends',
      'getFriendList',
      'makeRoomChats',
      'getRoomChat',
      'logout',
      'deleteChatUser',
      'setChats'
    ]),
    closeList() {
      this.showList = 0
      this.searchFriend = 0
    },
    showChat() {
      // this.friends = this.chats
      this.listChat = 1
      this.listFriend = 0
    },
    showLists() {
      console.log('oke')
      this.showList = 1
    },
    trigerSubMenu() {
      this.showSubMenu = 1
    },
    closeSubMenu() {
      this.showSubMenu = 0
    },
    changeChatMode() {
      this.setChatMode('profile')
    },
    showSearchFriend() {
      if (this.clickSearch == 0) {
        this.searchFriend = 1
        this.clickSearch = 1
      } else {
        this.searchFriend = 0
        this.clickSearch = 0
      }
    },
    addFriend() {
      const email = { userEmail: this.userEmail }
      console.log(email)
      this.searchUser(email)
        .then(result => {
          this.showPicture = 1
          this.friend = result
          this.showButtonAdd = 1
        })
        .catch(err => {
          this.errorAlert(err.response.data.msg)
        })
    },
    addToFriendList() {
      this.addFriends(this.friend.user_id)
        .then(result => {
          this.successAlert(result.data.msg)
          this.getAllContat()
        })
        .catch(() => {
          this.errorAlert('User Already Added')
        })
    },
    getAllContact() {
      this.getFriendList()
        .then(result => {
          this.friends = result.data.data
          this.listFriend = 1
          this.listChat = 0
        })
        .catch(err => {
          console.log(err)
        })
    },
    //  item.user_image, item.user_name
    makeRoomChat(id, room, image, name) {
      if (this.listFriend == 1) {
        this.makeRoomChats(id)
          .then(result => {
            console.log(result)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        const all = { id, room, image, name }
        if (this.oldRoom == '') {
          this.getRoomChat(all)
          this.socket.emit('joinRoom', all)
          this.oldRoom = room
        } else {
          this.getRoomChat(all)
          let newData = { ...all, ...{ oldRoom: this.oldRoom } }
          console.log(newData)
          this.socket.emit('changeRoom', newData)
          this.oldRoom = room
        }
      }
    },
    onLongPressStart(room) {
      this.roomNumber = room
    },
    deleteChat() {
      this.deleteChatUser(this.roomNumber)
        .then(result => {
          this.getChatLists()
          this.successAlert(result.data.msg)
          this.roomNumber = 0
        })
        .catch(err => {
          this.errorAlert(err.data.msg)
          this.roomNumber = 0
        })
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    logOut() {
      this.$router.push('/')
      this.logout()
    }
  }
}
</script>
<style scoped>
.friend-list {
  font-family: Rubik;
  border-right: 1px solid rgb(216, 216, 216);
}
.navbar {
  border-bottom: 1px solid rgb(216, 216, 216);
}
.icon-menu {
  cursor: pointer;
}
.nav-title {
  cursor: pointer;
  margin-top: 23px;
  font-size: 32px;
  font-weight: 600;
  color: #7e98df;
}
.nav-icon {
  margin-top: 5px;
  cursor: pointer;
}
.bar1,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #7e98df;
  margin: 6px 0;
  transition: 0.4s;
}
.bar2 {
  width: 25px;
  height: 5px;
  background-color: #7e98df;
  margin: 6px 0;
  transition: 0.4s;
}
.search {
  margin-top: 40px;
  /* margin-left: -40px; */
}
.search-navbar {
  width: 100%;
  padding-left: 5%;
  height: 45px;
  font-size: 16px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  background-color: #ededed;
  margin-right: 20px;
  /* padding-right: 70px; */
  /* margin-left: -30px; */
}
.fa-plus {
  margin-left: 20px;
  font-size: 32px;
  position: absolute;
  top: 5px;
  right: -20px;
  color: #7e98df;
  font-weight: 300;
  right: -65px;
}
.select-type {
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: transparent;
  border: none;
  font-weight: 500;
  color: black;
}
.select-type:focus {
  background-color: #7e98df !important;
}
.focus {
  background-color: #7e98df;
}
.select-type:hover {
  background-color: #7e98df;
}
.menu {
  position: absolute;
  top: 23px;
  height: 50px;
  left: 0px;
  width: 70%;
  text-align: left;
  border-radius: 30px;
  padding-left: 20px;
  color: white;
  background-color: #7e98df;
  font-size: 38px;
  padding-top: 5px;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
}
.submenu {
  position: absolute;
  top: 70px;
  right: 50px;
  z-index: 1;
  width: 180px;
  padding-left: 3%;
  padding-bottom: 1%;
  padding-top: 3%;
  text-align: left;
  background-color: #7e98df;
  color: white;
  border-radius: 15px 0px 15px 15px;
}
.sub-menu {
  cursor: pointer;
}
.close {
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  top: 0px;
  right: 0px;
}
.list-chat {
  height: 460px;
  overflow-y: scroll;
}
.room-chat {
  padding-top: 8px;
  text-align: left;
  margin-top: 10px;
  padding-left: 10px;
  height: 80px;
  cursor: pointer;
}
.room-chat:hover {
  background-color: #ededed;
}
.profile-image {
  width: 64px;
  height: 64px;
  margin-right: 10px;
  border-radius: 10px;
}
.information {
  position: absolute;
  top: 20px;
  line-height: 10px;
}
.username {
  font-size: 18px;
  font-weight: 500;
}
.message {
  font-size: 14px;
  color: #7e98df;
}
.time {
  position: absolute;
  top: 10px;
  right: 20px;
  color: #848484;
  font-size: 14px;
}
.notification {
  position: absolute;
  top: 40px;
  right: 20px;
  min-width: 25px;
  text-align: center;
  border-radius: 40px;
  background-color: #7e98df;
  color: white;
}
.close-sub-menu {
  position: absolute;
  top: 0px;
  right: 10px;
  font-weight: 700;
  cursor: pointer;
}
.search-friends {
  position: absolute;
  top: 80px;
  height: 300px;
  background-color: white;
  z-index: 1;
  padding-top: 30px;
  background-color: #7e98df;
  border-radius: 20px;
  padding-right: 10px;
  padding-left: 10px;
}
.search-friend {
  height: 40px;
  border: none;
  background-color: #ededed;
  border-radius: 20px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 14px;
}
.search-friend:focus {
  outline: none;
}
.friend-found {
  margin-top: 30px;
}
/* scroll*/
</style>
