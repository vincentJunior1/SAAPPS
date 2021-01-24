// import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
export default {
  state: {
    chatMode: 'chat'
  },
  mutations: {
    setChatMode(state, payload) {
      state.chatMode = payload
      console.log(payload)
    }
  },
  actions: {},
  getters: {
    getChatMode(state) {
      return state.chatMode
    }
  }
}
