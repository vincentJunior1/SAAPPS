import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Chat from './modules/chat'
import createPersistedState from 'vuex-persistedstate'
import SecureLs from 'secure-ls'
const ls = new SecureLs({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { Auth, Chat },
  state: {},
  mutations: {},
  actions: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      },
      paths: ['Auth.user']
    })
  ]
})
