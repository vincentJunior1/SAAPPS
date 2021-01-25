import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
export default {
  state: {
    chatMode: 'chat'
  },
  mutations: {
    setChatMode(state, payload) {
      state.chatMode = payload
    }
  },
  actions: {
    getChatList() {
      return new Promise(() => {
        axios
          .get(`${process.env.VUE_APP_URL}chat/getallchat/`)
          .then(result => {
            console.log(result)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    getFriendList() {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}chat/getallfriends`)
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(new Error(err))
          })
      })
    }
  },
  getters: {
    getChatMode(state) {
      return state.chatMode
    }
  }
}
