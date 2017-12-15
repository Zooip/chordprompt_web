import * as types from './mutation-types'
import * as api from '../api'

export const fetchAllSongs = ({commit}) => {
    console.log("FETCH ALL SONGS")
    api.songs.allPromise().then((songs)=>{

      console.log(songs);

      for (let i = 0; i < songs.length; i++){
        commit(types.ADD_SONG,songs[i])
      }
    })

}