<template>
    <div id="jamsession-controller">

        <div id="jamsession-buttons">
            <a class="button">
                Prev
            </a>
            <a class="button">
                Play
            </a>
            <a class="button">
                Reset
            </a>
            <a class="button">
                Next
            </a>
        </div>
        <div id="jamsession-progress-bar">
        </div>
        <song-badge v-if="isSongSelected" v-bind:song="song"></song-badge>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import SongBadge from './song-badge.vue'

  export default {
    name: "JamsessionController",
    data: function () {
      return {}
    },
    computed: {
      // rajouter les accesseurs dans `computed` avec l'opérateur de décomposition
      isSongSelected() {
        return !!this.song
      },
      ...mapState([
        'jamSession'
        // ...
      ]),
      song: function(){
        return this.$store.getters['entities/songs/find'](this.jamSession.songId)
      }
    },
    components:{
      'song-badge': SongBadge
    }
  }
</script>

<style scoped>
    #jamsession-controller {
        width: 100%;
        background-color : dodgerblue;
        position: fixed;
        bottom:0px;
        padding: 5px;
        z-index:1000;
    }

    #jamsession-buttons {
        float: right;
    }

    #jamsession-buttons .button {
        display: inline-block;
        padding: 10px;
        background-color: white;
    }
</style>
