import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    messages: [],
    songs:{},
    songsIds:[]
  },
  mutations: {
    [types.INIT](state,initializer){
      state.currentUser=initializer.currentUser
    },
    [types.ADD_MESSAGE](state,message){
      state.messages.push(message)
    },
    [types.ADD_SONG](state,song){
      Vue.set(state.songs,song.id,song);
      state.songsIds.push(song.id);
    }
  },
  getters: {
    songArray: (state) => state.songsIds.map( songId => state.songs[songId] )
  },
  actions
})