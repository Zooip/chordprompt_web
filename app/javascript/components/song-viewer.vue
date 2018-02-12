<template>
    <div>
        <h1>{{song.title}}</h1>
        <h2>{{song.artist}}</h2>
        <div>
            <img :src="song.links.image">
        </div>
        <div>
            <h3>Documents</h3>
            <ul>
                <li v-for="doc in song.song_documents">
                    {{doc.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: "song-viewer",
    data: function () {
      return {
        currentId: this.$route.params.id
      }
    },
    computed:{
      song() {
        return this.$store.getters['entities/songs/find'](this.currentId)
      }
    },
    beforeRouteUpdate (to, from, next){
      this.currentId=to.params.id
      this.refreshCurrentSong();
      next()
    }, methods:{
      refreshCurrentSong: function() {
        this.$store.dispatch("entities/songs/fetch",this.currentId)
      }
    },
    mounted: function(){
        this.refreshCurrentSong();
    }

  }
</script>

<style scoped>

</style>
