

<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <h1>Message</h1>
    <ul id="example-1">
      <li v-for="message in messages">
        {{message}}
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import SongScroller from './SongScroller.vue'
  import AppHeader from './app-header.vue'
  import SongList from './song-list.vue'
  import SongViewer from './song-viewer.vue'

  export default {
    props: [],
    data: function () {
      return {

      }
    },
    computed:{
      username(){
        return this.$store.state.currentUser.email
      },
      ...mapState({
        messages: 'messages'
      })
    },
    components:{
        SongScroller,
        AppHeader
    }
  }
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
