import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    jamSession: null,
    messages: [],
    songs:{},
    songsIds:[]
  },
  mutations: {
    [types.INIT](state,initializer){
      state.currentUser=initializer.currentUser
      state.jamSession=initializer.jamSession
    },
    [types.ADD_MESSAGE](state,message){
      state.messages.push(message)
    },
    [types.UPDATE_SONG](state, song){
      Vue.set(state.songs,song.id,song);
      if(!state.songsIds.includes(song.id)){
        state.songsIds.push(song.id);
      }
    },
    [types.UPDATE_JAMSESSION](state, jamSession){
      state.jamSession=jamSession
    }
  },
  getters: {
    songArray: (state) => state.songsIds.map( songId => state.songs[songId] )
  },
  actions
})