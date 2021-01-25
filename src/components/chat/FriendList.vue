<template>
  <div class="friend-list">
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
        <i
          class="close"
          @click="
            closeList()
            showSearchFriend()
          "
          >X</i
        >
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
              style="margin-left:5px;"
              :src="
                friend.user_image == ''
                  ? require('../../assets/image/profile.jpg')
                  : 'http://localhost:3000/' + friend.user_image
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
        <p class="close-sub-menu" @click="closeSubMenu">X</p>
      </div>
      <div class="search" style="position:relative;">
        <input
          class="search-navbar"
          type="text"
          placeholder="Type Your Message Here"
        /><i class="fa fa-plus" aria-hidden="true"></i>
      </div>
    </div>
    <div class="list-chat">
      <div
        class="room-chat"
        style="position:relative;"
        v-for="(item, index) in friends"
        :key="index"
      >
        <span
          ><img
            class="profile-image"
            :src="
              item.user_image == ''
                ? require('../../assets/image/profile.jpg')
                : 'http://localhost:3000/' + item.user_image
            "
            alt=""
          />
        </span>
        <span class="information">
          <p class="username">{{ item.user_name }}</p>
          <p class="message">Usermessagew</p>
        </span>
        <p class="time">19:00</p>
        <p class="notification">2</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { alert } from '../../mixins/alert'
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
      friends: {},
      showButtonAdd: 0
    }
  },
  created() {
    this.getChatList()
  },
  methods: {
    ...mapMutations(['setChatMode']),
    ...mapActions(['getChatList']),
    ...mapActions(['searchUser']),
    ...mapActions(['addFriends']),
    ...mapActions(['getFriendList']),
    closeList() {
      this.showList = 0
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
          this.friend = result
          this.showButtonAdd = 1
        })
        .catch(err => {
          this.errorAlert(err)
        })
    },
    addToFriendList() {
      this.addFriends(this.friend.user_id)
        .then(result => {
          this.successAlert(result.data.msg)
        })
        .catch(() => {
          this.errorAlert('User Already Added')
        })
    },
    getAllContact() {
      this.getFriendList()
        .then(result => {
          this.friends = result.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.friend-list {
  font-family: Rubik;
  border-right: 1px solid black;
}
.navbar {
  border-bottom: 1px solid black;
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
