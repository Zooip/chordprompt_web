import * as types from '../store/mutation-types'
import Vue from 'vue'
import store from '../store'
import router from '../router'
import ActionCable from 'actioncable'
import * as api from '../api'

console.log(api);

import App from '../components/app.vue'

document.addEventListener('DOMContentLoaded', () => {
  // Get the properties BEFORE the app is instantiated
  const node = document.getElementById('chordprompt-app')
  const props = JSON.parse(node.getAttribute('data'))
  store.commit(types['INIT'],props)

  const app = new Vue({
    render: h => h(App),
    store,
    router
  }).$mount('#chordprompt-app');

  console.log(app)

    const cable = ActionCable.createConsumer()

    cable.subscriptions.create('TestChannel', {
        received: function (data){
            store.commit('addMessage',data)
        }
    });

    cable.subscriptions.create({channel: "JamSessionChannel", id: props.jamSession.id}, {
        received: function (data){
            console.log(data)
        }
    });

})



store.dispatch('fetchAllSongs')
