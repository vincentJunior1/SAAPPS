<template>
  <div class="chat-page">
    <b-container fluid>
      <b-row>
        <b-col sm="3">
          <FriendList v-if="chat == 'chat'" />
          <Profile v-if="chat == 'profile'" />
        </b-col>
        <b-col sm="9">
          <RoomChat />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FriendList from '../components/chat/FriendList'
import RoomChat from '../components/chat/RoomChat'
import Profile from '../components/chat/Profile'
// import io from 'socket.io-client'
export default {
  name: 'Chat',
  data() {
    return {
      chatMode: ''
    }
  },
  created() {
    this.getChatLists()
    this.chatMode = this.chat
  },
  computed: {
    ...mapGetters({ chat: 'getChatMode', chatList: 'getChatList' })
  },
  methods: {
    ...mapActions(['getRoomChat', 'getChatLists'])
  },
  components: {
    FriendList,
    RoomChat,
    Profile
  }
}
</script>

<style scoped></style>
