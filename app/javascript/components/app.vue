

<template>
  <div id="app">
    <loading-screen v-if="isLoading"></loading-screen>
    <div id="content" v-else>
      <jamsession-controller></jamsession-controller>
      <app-header></app-header>
      <div id="routed-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import SongScroller from './SongScroller.vue'
  import AppHeader from './app-header.vue'
  import SongList from './song-list.vue'
  import SongViewer from './song-viewer.vue'
  import JamsessionController from './jamsession-controller.vue'
  import LoadingScreen from './loading-screen'


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
        messages: 'messages',
        isLoading: 'isLoading'
      })
    },
    components:{
      JamsessionController,
      LoadingScreen,
      SongScroller,
      AppHeader
    }
  }
</script>

<style scoped>
  #app {
    position: absolute;
    bottom:0;
    top:0;
    left:0;
    right: 0;
  }

p {
  font-size: 2em;
  text-align: center;
}

#routed-content {
  position: absolute;
  left:0;
  right: 0;
  top: 40px;
  bottom: 50px;
}
</style>
