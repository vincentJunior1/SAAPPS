<template>
  <div class="login">
    <b-container>
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-form-group id="input-group-1" label="Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            required
            v-model="form.user_name"
            placeholder="Enter username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Email address:"
          label-for="input-2"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-2"
            type="email"
            v-model="form.email"
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Your Password:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            type="password"
            v-model="form.password"
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({
        name: 'Chat',
        params: {
          ...this.form
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  text-align: left;
}
</style>
