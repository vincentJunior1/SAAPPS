<template>
  <div class="register-card">
    <p class="register-title">Register</p>
    <i class="fa fa-angle-left" style="font-size:38px;" @click="back"></i>
    <p class="greeting">Let's Create Your Account!</p>
    <b-form @submit.prevent="postRegister">
      <b-form-group
        id="input-group-2"
        label="Name"
        label-for="input-2"
        class="label"
      >
        <b-form-input
          id="input-2"
          type="text"
          v-model="form.user_name"
          required
          placeholder="Enter Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Email"
        label-for="input-2"
        class="label"
      >
        <b-form-input
          id="input-2"
          type="email"
          v-model="form.user_email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password"
        label-for="input-2"
        class="label"
      >
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.user_password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <b-button class="submit" type="submit" variant="primary"
        >Register</b-button
      >
      <span class="line">
        <h2><span>Register with</span></h2></span
      >
      <b-button class="google-button" variant="info">Google</b-button>
    </b-form>
  </div>
</template>

<script>
import { alert } from '../../mixins/alert'
import { mapActions } from 'vuex'
export default {
  name: 'RegisterCard',
  mixins: [alert],
  data() {
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: '',
        user_phone: 0,
        user_bio: 'Default'
      }
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    postRegister() {
      this.registerUser(this.form)
        .then(result => {
          this.successAlert(result.data.msg)
          this.$router.push('/')
        })
        .catch(() => {
          this.errorAlert('Email Has Been Registred')
        })
    },
    back() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.register-card {
  background-color: white;
  height: 700px;
  margin: auto auto auto auto;
  margin-bottom: 40px;
  padding-top: 42px;
  padding-left: 70px;
  padding-right: 70px;
  border-radius: 20px;
  position: relative;
}
.fa-angle-left {
  cursor: pointer;
  position: absolute;
  top: 40px;
  left: 70px;
  color: #7e98df;
}
.register-title {
  text-align: center;
  font-family: Rubik;
  font-size: 22px;
  color: #7e98df;
  font-weight: 500;
}
input {
  border: none;
  border-radius: 1px !important;
  border-bottom: 1px solid black;
  padding-left: 0px;
  margin-bottom: 10px;
}
input:focus {
  outline: none;
  box-shadow: none;
}
.greeting {
  margin-top: 30px;
  font-size: 14px;
  margin-bottom: 35px;
}
.label {
  font-size: 14px;
  color: #848484;
  margin-top: 35px;
}
.forget-password {
  float: right;
  margin-bottom: 10px;
}
.button {
  margin-top: 70px;
}
.submit {
  width: 100%;
  border-radius: 40px;
  height: 50px;
  background: #7e98df;
  margin-top: 10px;
}
.line {
  display: block;
  margin: 25px;
}
.line h2 {
  font-size: 15px;
  text-align: center;
  border-bottom: 1px solid black;
  position: relative;
}
.line h2 span {
  background-color: white;
  position: relative;
  top: 10px;
  padding: 0 10px;
}
.google-button {
  margin-top: 20px;
  background: #ffffff;
  border: 1px solid #7e98df;
  border-radius: 70px;
  width: 100%;
  height: 50px;
  color: #7e98df;
}
.sign-up-text {
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}
strong {
  cursor: pointer;
  color: #7e98df;
  font-weight: 500;
}
@media only screen and (max-width: 600px) {
  .register-card {
    background-color: white;
    height: 700px;
    margin: auto auto auto auto;
    margin-bottom: 40px;
    padding-top: 42px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 20px;
  }
}
</style>
