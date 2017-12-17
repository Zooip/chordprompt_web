import * as types from './mutation-types'
import * as api from '../api'

export const fetchAllSongs = ({commit}) => {
    api.songs.allPromise().then((songs)=>{
      for (let i = 0; i < songs.length; i++){
        commit(types.UPDATE_SONG,songs[i])
      }
    })

}

export const fetchSong = ({commit},id) => {
  api.songs.findPromise(id).then((song)=>{
    commit(types.UPDATE_SONG,song)
  })

}