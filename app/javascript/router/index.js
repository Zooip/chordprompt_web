import Vue from 'vue'
import VueRouter from 'vue-router'

import SongList from '../components/song-list.vue'
import SongViewer from '../components/song-viewer.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: { name: 'songs' }},
    { path: '/songs', name: 'songs', component: SongList },
    { path: '/songs/:id', name: 'song', component: SongViewer },
    { path: '/songs/:id/:docId', name: 'song-document', component: SongViewer }
  ]
})