<template>
  <div class="register">
    <b-container>
      <b-row>
        <b-col sm="5" class="register-card">
          <RegisterCard />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import RegisterCard from '../components/register/RegisterCard'
export default {
  name: 'Register',
  components: {
    RegisterCard
  }
}
</script>

<style scoped>
.register {
  text-align: left;
  background-color: #e5e5e5;
  height: 1024px;
  padding-top: 5%;
  padding-bottom: auto;
  font-family: Rubik;
}
.register-card {
  margin-left: auto;
  margin-right: auto;
}
@media only screen and (max-width: 600px) {
  .register {
    height: auto;
  }
  .register-card {
    margin-top: 5%;
    margin-bottom: 40px;
  }
}
</style>
