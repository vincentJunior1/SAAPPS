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
    profileTo: {}
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
      return new Promise(() => {
        axios
          .post(
            `${process.env.VUE_APP_URL}chat/sendmessage/${payload.room_chat}`,
            payload
          )
          .then(result => {
            console.log(result)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    realTimeChat(context, payload) {
      console.log(payload)
      context.state.socket.emit('roomMessage', payload)
    },
    getRealTime(context) {
      context.state.socket.on('chatMessage', data => {
        context.commit.chatPerRoom.push(data)
      })
    },
    joinRoom(context, payload) {
      context.state.socket.emit('joinRoom', payload)
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
    }
  }
}
