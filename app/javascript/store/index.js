import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'


import * as types from './mutation-types'
import * as actions from './actions'
import Song from  '../models/Song'
import songs from './modules/songs'

Vue.use(Vuex)

// Create a new database instance.
const database = new VuexORM.Database()

database.register(Song, songs)

export default new Vuex.Store({
  plugins: [
    VuexORM.install(database)
  ],
  state: {
    isLoading: true,
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
    [types.SET_LOADED](state){
      state.isLoading=false
    },
    [types.ADD_MESSAGE](state,message){
      state.messages.push(message)
    },
    [types.UPDATE_JAMSESSION](state, jamSession){
      state.jamSession=jamSession
    }
  },
  actions
})

