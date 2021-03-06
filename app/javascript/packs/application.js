import * as types from '../store/mutation-types'
import Vue from 'vue'

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)

import store from '../store'
import router from '../router'
import ActionCable from 'actioncable'
import * as api from '../api'

import * as Chordpro from 'chordprojs'

console.log(api);

import App from '../components/app.vue'

document.addEventListener('DOMContentLoaded', () => {
  // Get the properties BEFORE the app is instantiated
  const node = document.getElementById('chordprompt-app')
  const props = JSON.parse(node.getAttribute('data'))
  store.commit(types.INIT,props)

  const app = new Vue({
    render: h => h(App),
    store,
    router
  }).$mount('#chordprompt-app');

  console.log(app)

  const cable = ActionCable.createConsumer()


    cable.subscriptions.create('TestChannel', {
        received: function (data){
            store.commit('ADD_MESSAGE',data)
        }
    })

    store.dispatch('entities/songs/fetchAll');


    cable.subscriptions.create({ channel: 'JamSessionChannel', id: app.$store.state.jamSession.id }, {
        received: function (data){
            console.log(data)
            store.commit('UPDATE_JAMSESSION', data.jamSession)
        }
    })

    // const data = [
    //   {
    //     id: 1,
    //     title: 'Hello, world!',
    //     duration: 120
    //   }
    // ]



})

