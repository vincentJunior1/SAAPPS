<template>
  <div class="friend-list">
    <div class="navbar" style="position:relative;">
      <span><p class="nav-title">SAAPS</p></span>
      <span class="nav-icon" @click="showLists()"
        ><div class="bar1"></div>
        <div class="bar2" @click="showLists"></div>
        <div class="bar3" @click="showLists"></div
      ></span>
      <div class="menu" v-if="showList == 1">
        <i class="icon-menu fa fa-users"></i>
        <i class="icon-menu fa fa-lock"></i>
        <i class="icon-menu fa fa-bullhorn"></i>
        <i class="close" @click="closeList">X</i>
      </div>
      <div class="search" style="position:relative;">
        <input
          class="search-navbar"
          type="text"
          placeholder="Type Your Message Here"
        /><i class="fa fa-plus" aria-hidden="true"></i>
      </div>
    </div>
    <div class="friend-chat">
      <span><b-button class="select-type">All</b-button></span>
      <span><b-button class="select-type">Important</b-button></span>
      <span><b-button class="select-type">Unread </b-button></span>
    </div>
    <div class="list-chat">
      <div class="room-chat" style="position:relative;">
        <span
          ><img
            class="profile-image"
            src="../../assets/image/profile.jpg"
            alt=""
          />
        </span>
        <span class="information">
          <p class="username">Username</p>
          <p class="message">Usermessagew</p>
        </span>
        <p class="time">19:00</p>
        <p class="notification">2</p>
      </div>
      <div class="room-chat" style="position:relative;">
        <span
          ><img
            class="profile-image"
            src="../../assets/image/profile.jpg"
            alt=""
          />
        </span>
        <span class="information">
          <p class="username">Username</p>
          <p class="message">Usermessagew</p>
        </span>
        <p class="time">19:00</p>
        <p class="notification">2</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FriendList',
  data() {
    return {
      isChange: false,
      showList: 0
    }
  },
  methods: {
    closeList() {
      this.showList = 0
    },
    showLists() {
      console.log('oke')
      this.showList = 1
    }
  }
}
</script>
<style scoped>
.friend-list {
  font-family: Rubik;
  height: 1024px;
  border-right: 1px solid black;
}
.navbar {
  border-bottom: 1px solid black;
}
.nav-title {
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
  padding-right: 5%;
  /* margin-left: -30px; */
}
.fa-plus {
  margin-left: 20px;
  font-size: 32px;
  position: absolute;
  top: 5px;
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
  width: 70%;
  text-align: left;
  border-radius: 30px;
  padding-left: 20px;
  color: white;
  background-color: #7e98df;
  border: 1px solid black;
  font-size: 38px;
  padding-top: 5px;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
}
.close {
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: white;
}
.list-chat {
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
/* dropdown */
</style>
