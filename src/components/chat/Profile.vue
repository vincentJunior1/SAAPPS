<template>
  <div class="profile">
    <div class="all-profile">
      <div class="nav-profile">
        <i
          class="fa fa-angle-left"
          style="font-size:42px;"
          @click="goBackToChat()"
        ></i>
        <p class="username">{{ user.user_name }}</p>
        <img
          class="user-image"
          :src="
            user.user_image == ''
              ? '../../assets/image/profile.jpg'
              : 'http://localhost:3000/' + user.user_image
          "
          alt=""
        />
        <p class="fullname">{{ user.user_name }}</p>
        <p class="email">{{ user.user_email }}</p>
        <div class="all-information">
          <p class="account-title">Account</p>
          <p class="phone" v-if="editPhone == 0">{{ user.user_phone }}</p>
          <input
            class="phone-input"
            type="number"
            v-model="user.user_phone"
            @wheel="$event.target.blur()"
            v-if="editPhone == 1"
          />
          <p class="phone-edit" v-if="editPhone == 0" @click="showInput()">
            Tap To Change Phone Number
          </p>
          <p class="phone-edit" v-if="editPhone == 1" @click="saveInput()">
            Tap To Change Phone Number
          </p>
        </div>
        <div class="user-information">
          <p class="user-username">{{ user.user_name }}</p>
          <p class="username-inf">Username</p>
        </div>
        <div class="user-description">
          <p class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p class="bio">Bio</p>
        </div>
        <div class="user-settings">
          <p class="setting">Setting</p>
          <p class="reset-password">Privacy And Security</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      editPhone: 0
    }
  },
  computed: {
    ...mapGetters({ user: 'setUser' })
  },
  methods: {
    ...mapMutations(['setChatMode']),
    ...mapActions(['editProfiles']),
    goBackToChat() {
      this.setChatMode('chat')
    },
    showInput() {
      this.editPhone = 1
      console.log('show')
    },
    saveInput() {
      this.editProfiles(this.user)
      this.editPhone = 0
    }
  }
}
</script>

<style scoped>
.profile {
  font-family: Rubik;
  overflow-y: scroll;
  max-height: 640px;
}
.reset-password {
  height: 50px;
  padding-top: 5%;
  padding-bottom: auto;
  cursor: pointer;
}
.username {
  margin-top: 25px;
  font-size: 24px;
  font-weight: 500;
  color: #7e98df;
}
.fa-angle-left {
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  color: #7e98df;
}
.user-image {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  border: 1px solid black;
}
.fullname {
  font-size: 22px;
  margin-top: 25px;
  font-weight: 500;
}
.email {
  line-height: 0px;
  font-size: 14px;
  color: #848484;
}
.all-information {
  padding-left: 10px;
  margin-top: 35px;
  margin-bottom: 30px;
  text-align: left;
  border-bottom: 1px solid #dadada;
}
.account-title {
  font-size: 19px;
  font-weight: 500;
}
.phone {
  font-size: 14px;
  font-weight: 400;
}
.phone-edit {
  font-size: 12px;
  cursor: pointer;
  color: #7e98df;
}
.phone-input {
  border: none;
  border-bottom: 1px solid black;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 12px;
  /* padding-right: -180px; */
}
.user-information {
  text-align: left;
  padding-left: 10px;
  border-bottom: 1px solid #dadada;
  padding-bottom: 10px;
}
.user-username {
  font-size: 16px;
  font-weight: 500;
}
.username-inf {
  line-height: 0px;
  font-size: 14px;
  color: #848484;
}
.user-description {
  margin-top: 20px;
  text-align: left;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dadada;
}
.description {
  font-size: 16px;
  font-weight: 500;
}
.bio {
  font-size: 14px;
  line-height: 0px;
  color: #848484;
}
.user-settings {
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
}
.setting {
  font-size: 16px;
  font-weight: 500;
}
</style>
