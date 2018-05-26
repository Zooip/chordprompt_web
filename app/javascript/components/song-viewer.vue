<template>
    <div class="song-viewer" id="song-viewer">
        <div id="song-header-container" class="song-header-container">
            <div class="song-header">
                <img class="song-avatar" :src="song.links.image">
                <div class="song-header-text">
                    <div class="song-artist">{{song.artist}}</div>
                    <div class="song-title">{{song.title}}</div>
                </div>
            </div>
            <div class="song-document-selecter-container">
                <v-select :options="options"
                          :value="docToOptions(document)"
                          @input="changeDocument"
                ></v-select>
            </div>
        </div>
        <document-viewer :document="document"></document-viewer>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import DocumentViewer from './document-viewer'
  import vSelect from 'vue-select'
  import router from '../router'
  import $ from "jquery";

  export default {
    name: "song-viewer",
    data: function () {
      return {
        currentId: this.$route.params.id,
        currentDocId: this.$route.params.docId,
      }
    },
    computed:{
      options(){
        return this.song.song_documents.map(doc => this.docToOptions(doc));
      },
      song() {
        return this.$store.getters['entities/songs/query']().with('song_documents').with('owner')
          .find(this.currentId)
      },
      document(){
        let routeDocument=this.currentDocId&&this.song&&this.song.song_documents.find(doc =>doc.id==this.currentDocId);
        return routeDocument||this.song&&this.song.song_documents[0]
      }
    },
    beforeRouteUpdate (to, from, next){
      this.currentId=to.params.id
      this.refreshCurrentSong();
      next()
    }, methods:{
      refreshCurrentSong: function() {
        this.$store.dispatch("entities/songs/fetch",this.currentId)
      },
      docToOptions(doc){ return doc&&{
        label: doc.name,
        value: doc.id
      }},
      changeDocument(doc){
        this.currentDocId=doc.value
        //router.replace({name:'song-document', params:{id: this.currentId, docId: doc.value}})
      },
      handleResize(){
        console.log('Resize !');
        if(document.getElementById('song-viewer')){
          let remaining_size=document.getElementById('song-viewer').offsetHeight-document.getElementById('song-header-container').offsetHeight;
          console.log(remaining_size);
          document.getElementById('document-viewer').style.height = remaining_size+"px";
        }
      }
    },
    mounted: function(){
        this.refreshCurrentSong();
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    components:{
      "document-viewer": DocumentViewer,
      vSelect
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    }


  }
</script>

<style scoped>

    .song-viewer{
        height: 100%;
    }

    .song-header{
        background: #ffffff;
        margin-left: 30px;
        margin-top: 20px;
        min-width: 400px;
        display: inline-flex;
    }

    .song-header .song-avatar{
        background: #eeeeee;
        width: 130px;
        height: 117px;
        object-fit: cover;
        margin: 0;
    }

    .song-header .song-header-text{
        display: inline-block;
        margin: auto;
        margin-left: 15px;
        margin-right: 15px;
    }

    .song-header .song-header-text .song-artist{
        font-size: 24px;
        font-family: Roboto,Arial;
        color: #4f4f4f
    }

    .song-header .song-header-text .song-title{
        font-size: 36px;
        font-family: Roboto,Arial;
    }

    .document-viewer {

    }

</style>
