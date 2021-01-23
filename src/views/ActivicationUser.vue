<template>
  <div class="activation">
    Click Here To Activate Your Account
    <p class="active" @click="activateAccount">Activate</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  naem: 'ActivicationUser',
  data() {
    return {
      code: 0
    }
  },
  created() {
    this.code = this.$route.params.id
  },
  methods: {
    ...mapActions(['activeUser']),
    activateAccount() {
      this.activeUser(this.code)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.active {
  cursor: pointer;
}
.active:hover {
  color: #7e98df;
}
</style>
