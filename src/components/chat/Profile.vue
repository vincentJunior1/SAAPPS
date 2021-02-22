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
        <div class="profile-picture" style="position:relative;">
          <img
            class="user-image"
            id="user-image"
            :src="
              user.user_image == ''
                ? require('../../assets/image/profile.jpg')
                : 'http://localhost:3000/' + user.user_image
            "
            alt=""
          />
          <b-button class="change-profile" @click="changeImage">✏️</b-button>
          <input type="file" @change="uploadImage" id="changeProfile" hidden />
        </div>
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
        <div class="user-description" style="position:relative;">
          <p class="description" v-if="editBio == 0">
            {{ user.user_bio }}
          </p>
          <b-form-textarea
            id="textarea"
            style="position:relative; margin-top:20px;margin-bottom:20px;overflow-y:hidden;"
            v-model="user.user_bio"
            placeholder="Enter something..."
            rows="3"
            v-if="editBio == 1"
            max-rows="6"
          ></b-form-textarea>
          <p class="bio">Bio</p>
          <p class="edit-bio" @click="showBio">Edit</p>
        </div>
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
              @click="clickMarker"
              icon="https://img.icons8.com/color/48/000000/map-pin.png"
            />
          </GmapMap>
        </div>
        <div class="user-settings">
          <p class="setting">
            Setting
          </p>
          <p
            class="reset-password"
            @click="$bvModal.show('bv-modal-example')"
            style="cursor:pointer;"
          >
            Change Password
          </p>
        </div>
        <b-modal id="bv-modal-example" hide-footer>
          <template #modal-title>
            <p class="title-modal">Change Password</p>
          </template>
          <div class="d-block text-left">
            <p class="title-password">Input Your Old Password</p>
            <input
              class="change-password"
              type="password"
              v-model="oldPassword"
              placeholder="Old Password"
            />
            <p class="title-password">Input Your New Password</p>
            <input
              class="change-password"
              type="password"
              v-model="newPassword"
              placeholder="New Password"
            />
            <br />
            <input
              class="change-password"
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm Your Password"
            />
          </div>
          <b-button class="save-password" type="danger" @click="savePassword"
            >Save</b-button
          >
          <b-button
            class="cancel-password"
            @click="$bvModal.hide('bv-modal-example')"
            >Cancel</b-button
          >
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { alert } from '../../mixins/alert'
export default {
  name: 'Profile',
  data() {
    return {
      editPhone: 0,
      coordinate: {
        lat: 10,
        lng: 10
      },
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      editBio: 0
    }
  },
  mixins: [alert],
  created() {
    console.log(this.user)
    this.$getLocation()
      .then(coordinates => {
        if (this.user_lat == 10) {
          this.coordinate = {
            lat: coordinates.lat,
            lng: coordinates.lng
          }
        } else {
          this.coordinate = {
            lat: parseFloat(this.user.user_lat),
            lng: parseFloat(this.user.user_lng)
          }
        }
      })
      .catch(error => {
        alert(error)
      })
  },
  computed: {
    ...mapGetters({ user: 'setUser' })
  },
  methods: {
    ...mapMutations(['setChatMode']),
    ...mapActions(['editProfiles', 'changePassword']),
    goBackToChat() {
      this.setChatMode('chat')
    },
    showInput() {
      this.editPhone = 1
    },
    saveInput() {
      this.editProfiles(this.user)
      this.editPhone = 0
    },
    clickMarker(position) {
      ;(this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }),
        (this.user.user_lat = position.latLng.lat())
      this.user.user_lng = position.latLng.lng()
      console.log(this.coordinate)
      this.editProfiles(this.user)
        .then(result => {
          this.successAlert(result.data.msg)
        })
        .catch(err => {
          this.errorAlert(err.data.msg)
        })
    },
    changeImage() {
      document.getElementById('changeProfile').click()
      console.log('change picture')
    },
    uploadImage(event) {
      document.getElementById('user-image').src = window.URL.createObjectURL(
        event.target.files[0]
      )
      const image = event.target.files[0]
      const {
        user_name,
        user_phone,
        user_email,
        user_lat,
        user_lng
      } = this.user
      const data = new FormData()
      data.append('user_name', user_name)
      data.append('user_phone', user_phone)
      data.append('user_email', user_email)
      data.append('user_lat', user_lat)
      data.append('user_lng', user_lng)
      data.append('user_image', image)
      this.editProfiles(data)
        .then(result => {
          this.user.user_image = result.data.data.user_image
          this.successAlert(result.data.msg)
        })
        .catch(err => {
          document.getElementById('user-image').src = this.user.user_image
          this.errorAlert(err.data.msg)
        })
    },
    savePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.errorAlert('Your password is not match')
      } else {
        const data = {
          ...{ oldPassword: this.oldPassword, newPassword: this.newPassword }
        }
        this.changePassword(data)
          .then(result => {
            this.successAlert(result.data.msg)
          })
          .catch(err => {
            console.log(err)
            this.errorAlert(err.data.msg)
          })
      }
    },
    showBio() {
      if (this.editBio == 0) {
        this.editBio = 1
      } else {
        this.editProfiles(this.user)
        this.editBio = 0
      }
    }
  }
}
</script>

<style scoped>
.change-profile {
  position: absolute;
  top: -20%;
  right: 27%;
  height: 45px;
  width: 45px;
  border-radius: 50px;
  font-size: 16px;
  background-color: #7e98df;
  border: none;
}
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
  width: 100px;
  height: 100px;
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
.edit-bio {
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  right: 10px;
  font-size: 14px;
  color: #7e98df;
}
.edit-bio:hover {
  border-bottom: 1px solid #7e98df;
}
.title-modal {
  font-size: 22px;
  font-weight: 700;
  color: #7e98df;
  text-align: center;
}
.title-password {
  font-size: 22px;
  font-weight: 700;
  color: #7e98df;
}
.change-password {
  margin-top: -10px;
  border: none;
  border-bottom: 1px solid black;
  width: 50%;
  height: 30px;
  font-size: 18px;
  margin-left: 10px;
  margin-bottom: 20px;
}
.change-password:focus {
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  width: 50%;
  height: 30px;
  font-size: 18px;
}
.save-password {
  background-color: #007bff;
  border: none;
  float: right;
  width: 100px;
  font-weight: 700;
}
.cancel-password {
  background-color: #bd2130;
  border: none;
  font-weight: 700;
}
</style>
