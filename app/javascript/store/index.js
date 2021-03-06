import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'


import * as types from './mutation-types'
import * as actions from './actions'

import Song from '../models/Song'
import songs from './modules/songs'

import SongDocument from '../models/SongDocument'
import song_documents from './modules/song-documents'

import User from '../models/User'
import users from './modules/users'

Vue.use(Vuex)

// Create a new database instance.
const database = new VuexORM.Database()

database.register(Song, songs)
database.register(SongDocument, song_documents)
database.register(User,users)

export default new Vuex.Store({
  plugins: [
    VuexORM.install(database)
  ],
  state: {
    isLoading: true,
    currentUser: null,
    jamSession: null,
  },
  mutations: {
    [types.INIT](state, initializer) {
      state.currentUser = initializer.currentUser;
      state.jamSession = initializer.jamSession
    },
    [types.SET_LOADED](state) {
      state.isLoading = false
    },
    [types.UPDATE_JAMSESSION](state, jamSession) {
      state.jamSession = jamSession
    },
    [types.UPDATE_JAMSESSION_SONG](state, song_id) {
      state.jamSession = {...state.jamSession, id: song_id}
    },
    [types.UPDATE_JAMSESSION_PLAYING](state, playing) {
      state.jamSession = {...state.jamSession, playing: playing}
    }


  },
  actions
})

