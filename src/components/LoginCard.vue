<template>
  <div class="login-card">
    <p class="login-title">Login</p>
    <p class="greeting">Hi, Welcome Back</p>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
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
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Password"
        label-for="input-3"
        class="label"
      >
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.user_password"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <p class="forget-password">Forget Password ?</p>
      <div class="button" style="position:relative;">
        <b-button class="submit" type="submit" variant="primary"
          >Login</b-button
        >
        <span class="line">
          <h2><span>Login With</span></h2></span
        >
        <b-button class="google-button" variant="info">Google</b-button>
      </div>
    </b-form>
    <p class="sign-up-text">
      Dont have an account?<button
        @click="goToRegister"
        style="border:none; background-color:transparent; box-shadow: none !important;"
      >
        Sign Up
      </button>
    </p>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'loginCard',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    onSubmit() {
      this.loginUser(this.form)
        .then(() => {
          this.$router.push('/chat')
        })
        .catch(err => {
          console.log(err)
        })
    },
    goToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.login-card {
  background-color: white;
  height: 700px;
  margin: auto auto auto auto;
  margin-bottom: 40px;
  padding-top: 42px;
  padding-left: 70px;
  padding-right: 70px;
  border-radius: 20px;
}

.login-title {
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
  .login-card {
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
