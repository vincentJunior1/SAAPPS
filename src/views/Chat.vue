<template>
  <b-container class="bv-example-row">
    <b-form-group>
      <b-form-select class="mb-3" v-model="room" @change="selectRoom">
        <b-form-select-option :value="null"
          >Please select Room</b-form-select-option
        >
        <b-form-select-option value="html">HTML</b-form-select-option>
        <b-form-select-option value="css">CSS</b-form-select-option>
        <b-form-select-option value="js">JS</b-form-select-option>
      </b-form-select>
    </b-form-group>
    <b-row>
      <b-col cols="2">
        <div class="chat">
          <div class="chat-window">
            <p class="room">User 1</p>
            <hr />
            <p class="room">User 2</p>
            <hr />
          </div>
        </div>
      </b-col>
      <b-col cols="10">
        <div class="chat">
          <div class="chat-window">
            <div class="output">
              <p v-if="typing.isTyping !== false">
                <em>{{ typing.user_name }} Is Typing...</em>
              </p>
              <p v-for="(item, index) in messages" :key="index">
                <strong>{{ item.user_name }} :</strong>
                {{ item.message }}
              </p>
            </div>
          </div>
          <input
            class="message"
            type="text"
            v-model="message"
            placeholder="Message"
          />
          <button class="send" @click="sendMessage">Send</button>
          <p>{{ messages }}</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import io from 'socket.io-client'
export default {
  name: 'Chat',
  watch: {
    message(value) {
      value
        ? this.socket.emit('typing', {
            user_name: this.user_name,
            room: this.room,
            isTyping: true
          })
        : this.socket.emit('typing', {
            user_name: this.user_name,
            room: this.room,
            isTyping: false
          })
    }
  },
  data() {
    return {
      socket: io('http://localhost:3000'),
      room: '',
      user_name: '',
      message: '',
      oldRoom: '',
      messages: [],
      typing: {
        isTyping: false
      }
    }
  },
  created() {
    if (!this.$route.params.user_name) {
      this.$router.push('/')
    }
    this.user_name = this.$route.params.user_name
    // console.log(this.$route.params)
    this.socket.on('chatMessage', data => {
      this.messages.push(data)
    })
    this.socket.on('typingMessage', data => {
      console.log(data)
      this.typing = data
    })
  },
  methods: {
    sendMessage() {
      // const setData = {
      //   user_name: this.user_name,
      //   message: this.message
      // }
      // console.log(setData)
      // this.socket.emit('globalMessage', setData)
      // this.socket.emit('privateMessage', setData)
      // this.socket.emit('broadcastMessage', setData)
      const setData = {
        user_name: this.user_name,
        message: this.message,
        room: this.room
      }
      this.socket.emit('roomMessage', setData)
      this.message = ''
    },
    selectRoom(data) {
      console.log(data)
      if (this.oldRoom) {
        // console.log('sudah pernah masuk ke room ' + this.oldRoom)
        // console.log('dan akan masuk ke room ' + data)
        // this.oldRoom = data
        this.socket.emit('changeRoom', {
          user_name: this.user_name,
          room: data,
          oldRoom: this.oldRoom
        })
      } else {
        console.log('belum pernah masuk ke room ' + this.oldRoom)
        console.log('dan akan masuk ke room ' + data)
        this.oldRoom = data
      }
      this.socket.emit('joinRoom', {
        user_name: this.user_name,
        room: data
      })
      this.oldRoom = data
    }
  }
}
</script>

<style scoped>
.chat {
  max-width: 600px;
  border: 1px solid #ddd;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.room {
  margin: 10px 0;
}

h2 {
  font-size: 18px;
  padding: 10px 20px;
  color: #575ed8;
}

.mario-chat {
  max-width: 600px;
  margin: 30px auto;
  border: 1px solid #ddd;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.chat-window {
  height: 400px;
  overflow: auto;
  background: #f9f9f9;
}

.output p {
  text-align: left;
  padding: 14px 0px;
  margin: 0 20px;
  border-bottom: 1px solid #e9e9e9;
  color: #555;
}

.feedback p {
  color: #aaa;
  padding: 14px 0px;
  margin: 0 20px;
}

.output strong {
  color: #575ed8;
}

label {
  box-sizing: border-box;
  display: block;
  padding: 10px 20px;
}

input {
  padding: 10px 20px;
  box-sizing: border-box;
  background: #eee;
  border: 0;
  display: block;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  font-family: Nunito;
  font-size: 16px;
}

button {
  background: #575ed8;
  color: #fff;
  font-size: 18px;
  border: 0;
  padding: 12px 0;
  width: 100%;
  border-radius: 0 0 2px 2px;
}
</style>
