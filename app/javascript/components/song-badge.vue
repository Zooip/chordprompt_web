<template>
    <div class="song-badge">
        <div class="image badge-avatar"><img :src="song.links.image"></div>
        <div class="badge-title">
            <div>
                <router-link :to="{ name: 'song', params: { id: song.id }}">
                    {{song.title}}
                </router-link>
            </div>
            <div>{{song.artist}}</div>
        </div>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: "song-badge",
    props: ['song'],
    data: function (){
      return {}
    }
  }
</script>

<style scoped>

</style>
