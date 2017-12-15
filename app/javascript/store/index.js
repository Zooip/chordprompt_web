import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    messages: []
  },
  mutations: {
    init(state,initializer){
      state.currentUser=initializer.currentUser
    },
    addMessage(state,message){
      state.messages.push(message)
    }
  }
})