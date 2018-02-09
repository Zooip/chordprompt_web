import * as types from './mutation-types'
import * as api from '../api'

export const fetchAllSongs = ({commit}) => {
    api.songs.allPromise().then(({data, included})=>{
      console.log(data)
      for (let i = 0; i < data.length; i++){
        commit(types.UPDATE_SONG,data[i])
      }
    })

}

export const fetchSong = ({commit},id) => {
  api.songs.findPromise(id).then((song)=>{
    commit(types.UPDATE_SONG,song)
  })

}