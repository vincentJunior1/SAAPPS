import axios from 'axios'
import router from '../../router'
import dotenv from 'dotenv'
dotenv.config()
export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    delUser(state) {
      state.user = {}
      state.token = null
    }
  },
  actions: {
    registerUser(_context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}user/register/`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    activeUser(_context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}user/verification/${payload}`)
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    loginUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}user/login/`, payload)
          .then(result => {
            context.commit('setUser', result.data.data)
            localStorage.setItem('token', result.data.data.token)
            resolve(result)
            console.log(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    editProfiles(_context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL}user/editprofile/`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    changePassword(_context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL}user/changepassword/`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    searchUser(_context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios
          .post(`${process.env.VUE_APP_URL}user/finduser`, payload)
          .then(result => {
            resolve(result.data.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addFriends(_context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}user/addfriend/${payload}`)
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('delUser')
      router.push('/')
    },
    interceptorRequest(context) {
      console.log('interceptor request works!')
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      console.log('interceptor request works!')
      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          if (
            (error.response.data.status === 403 &&
              error.response.data.status === 'invalid token') ||
            error.response.data.status === 'invalid signature' ||
            error.response.data.status === 'jwt expired' ||
            error.response.data.status === 'jwt malformed'
          ) {
            context.dispatch('logout')
            alert(error.response.data.msg)
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    setUser(state) {
      return state.user
    },
    isLogin(state) {
      return state.token !== null
    }
  }
}
