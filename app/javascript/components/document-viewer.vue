<template>
    <div class="document-viewer" id="document-viewer">
        <input type="text" v-model="position"/>
        <VuePerfectScrollbar class="scroll-area" v-bind:id="scrollAreaId">
            <div class="document-container" v-bind:id="innerId">
              <div v-if="document" v-bind:is="viewer_component_name" v-bind:document="document"></div>
            </div>
        </VuePerfectScrollbar>
    </div>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import ChorproViewer from './documents_viewers/document-viewer-chords'
  import PdfViewer from './documents_viewers/document-viewer-pdf'

  export default {
    name: "document-viewer",
    data: function () {
      return {
        position: 50,
        scrollAreaId: Math.random().toString(36).replace(/[^a-z]+/g, '')
      }
    },
    props: ['document'],
    computed:{
      viewer_component_name(){
        return "document-viewer-"+this.document.sub_type
      },
      innerId(){
        return "inner-"+this.scrollAreaId
      }
    },
    methods:{
      updatePosition(newPos){
        let container = document.getElementById(this.scrollAreaId);
        let inner= document.getElementById(this.innerId)
        let target=inner.offsetHeight/100.0*newPos
        container.scrollTop = target;
      }
    },
    components: {
      "document-viewer-chords": ChorproViewer,
      "document-viewer-pdf": PdfViewer,
      VuePerfectScrollbar
    },
    watch: {
    // à chaque fois que la question change, cette fonction s'exécutera
      position: function(newPos, oldPos){
        this.updatePosition(newPos)
      }
    }
  }
</script>

<style scoped>
    .document-viewer {
        background: white;
        max-width: 800px;
        overflow: hidden;
        margin: auto;
    }

    .scroll-area {
      position: relative;
      margin: auto;
      height: 100%;
    }




</style>