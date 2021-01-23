import axios from 'axios'
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
    }
  },
  actions: {
    registerUser(_context, payload) {
      console.log(payload)
      return new Promise(() => {
        axios
          .post(`${process.env.VUE_APP_URL}user/register/`, payload)
          .then(result => {
            console.log(result)
          })
          .catch(err => {
            console.log(err.data.msg)
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
            reject(new Error(err))
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
            reject(new Error(err))
          })
      })
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
