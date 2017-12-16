<template>
    <div>
        <h1>{{song.title}}</h1>
        <h2>{{song.artist}}</h2>
        <div>
            <img :src="song.links.image">
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
      ...mapState({
        song(state) {
          return state.songs[this.currentId]
        }
      })
    },
    beforeRouteUpdate (to, from, next){
      this.currentId=to.params.id
      next()
    },
  }
</script>

<style scoped>

</style>
