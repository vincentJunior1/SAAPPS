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
            src="../../assets/image/profile.jpg"
            alt=""
        /></span>
        <span class="information">
          <p class="username">Username</p>
          <p class="status" v-if="online == 1">Online</p>
        </span>
      </div>
      <div class="body-room">
        <span
          ><img
            class="image-profiles"
            src="../../assets/image/profile.jpg"
            alt=""
          />
          <p class="sender">Hello</p></span
        >
        <span>
          <img
            class="receiver-image"
            src="../../assets/image/profile.jpg"
            alt=""
          />
          <p class="receiver">Hello juga</p>
        </span>
        <span
          ><img
            class="image-profiles"
            src="../../assets/image/profile.jpg"
            alt=""
          />
          <p class="sender">Hello</p></span
        >
        <span>
          <img
            class="receiver-image"
            src="../../assets/image/profile.jpg"
            alt=""
          />
          <p class="receiver">Hello juga</p>
        </span>
        <span>
          <img
            class="receiver-image"
            src="../../assets/image/profile.jpg"
            alt=""
          />
          <p class="receiver">Hello juga</p>
        </span>
      </div>
    </div>
    <span class="typing-message">
      <textarea
        name=""
        class="typing-area"
        rows="2"
        placeholder="type your message here..."
      ></textarea>
      <span class="emot-1" @click="showMenu()">+</span>
      <img class="emot-2" src="../../assets/image/smile.png" alt="" />
      <i class="emot-3 fa fa-camera"></i>
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
export default {
  name: 'RoomChat',
  data() {
    return {
      chat: 1,
      online: 1,
      showMenuChat: 0,
      clickMenu: 0
    }
  },
  methods: {
    showMenu() {
      if (this.clickMenu == 0) {
        this.showMenuChat = 1
        this.clickMenu = 1
      } else {
        this.showMenuChat = 0
        this.clickMenu = 0
      }
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
  flex-direction: column-reverse;
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
