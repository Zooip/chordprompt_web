<template>
    <div class="song-list">
        <h1>Liste des morceaux</h1>
        <ul>
            <li v-for="song in songArray">
                <router-link :to="{ name: 'song', params: { id: song.id }}">{{song.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: "song-list",
    data: function () {
      return {}
    },
    computed: {
      songArray() {return this.$store.getters['entities/songs/all']()}
    }
  }
</script>

<style scoped>

</style>
