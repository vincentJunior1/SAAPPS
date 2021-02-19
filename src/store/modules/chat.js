import axios from 'axios'
import dotenv from 'dotenv'
import io from 'socket.io-client'
dotenv.config()
export default {
  state: {
    socket: io(`${process.env.VUE_APP_URL}`),
    chatMode: 'chat',
    chats: {},
    chatPerRoom: {},
    chat: 0,
    profileTo: {},
    isTyping: {}
  },
  mutations: {
    setChatMode(state, payload) {
      state.chatMode = payload
    },
    setChatList(state, payload) {
      state.chats = payload
    },
    setChatPerRoom(state, payload) {
      state.chatPerRoom = payload
      state.chat = 1
    },
    setProfileTo(state, payload) {
      state.profileTo = payload
    },
    setChat(state, payload) {
      state.chatPerRoom.push(payload)
    },
    setTyping(state, payload) {
      state.isTyping = payload
    }
  },
  actions: {
    getChatLists(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}chat/getallchat/`)
          .then(result => {
            context.commit('setChatList', result.data.data)
            resolve(result)
          })
          .catch(err => {
            reject(err.response)
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
            reject(err.response)
          })
      })
    },
    makeRoomChats(_context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}chat/chatroom/${payload}`)
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    getRoomChat(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('setProfileTo', payload)
        axios
          .get(`${process.env.VUE_APP_URL}chat/getchat/${payload.room}`)
          .then(result => {
            context.commit('setChatPerRoom', result.data.data)
            resolve(result)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    sendChat(_context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${process.env.VUE_APP_URL}chat/sendmessage/${payload.room_chat}`,
            payload
          )
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
    getChatMode(state) {
      return state.chatMode
    },
    getChatList(state) {
      return state.chats
    },
    getChatPerRoom(state) {
      return state.chatPerRoom
    },
    getChat(state) {
      return state.chat
    },
    getProfileTo(state) {
      return state.profileTo
    },
    getTyping(state) {
      return state.isTyping
    }
  }
}
