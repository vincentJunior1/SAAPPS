<template>
  <div class="login">
    <b-container>
      <div>
        <b-row>
          <b-col sm="5" class="login-page">
            <LoginCard />
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
import LoginCard from '../components/LoginCard'
export default {
  name: 'Login',
  components: {
    LoginCard
  }
}
</script>
<style scoped>
.login {
  text-align: left;
  background-color: #e5e5e5;
  height: 1024px;
  padding-top: 5%;
  padding-bottom: auto;
  font-family: Rubik;
}
.login-page {
  margin-left: auto;
  margin-right: auto;
}
</style>
