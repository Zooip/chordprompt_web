import * as api from "../../api";
import * as types from "../mutation-types";
import store from "../index";

export default {

  actions: {
    fetchAll({commit, dispatch}) {
      api.songs.allPromise().then(({data}) => {
        console.log(data)
        dispatch('create', {data: data})
        commit(types.SET_LOADED, null, { root: true })
      })
    },
    fetch({commit}, id) {
      api.songs.findPromise(id).then((song) => {
        dispatch('update', song)
      })
    }
  }
}