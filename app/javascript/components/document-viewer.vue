<template>
    <div class="document-viewer" id="document-viewer">
        <vue-perfect-scrollbar class="scroll-area">
            <div v-if="document" v-bind:is="viewer_component_name" v-bind:document="document"></div>
        </vue-perfect-scrollbar>
    </div>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar/index.vue'
  import ChorproViewer from './documents_viewers/document-viewer-chords'
  import PdfViewer from './documents_viewers/document-viewer-pdf'

  export default {
    name: "document-viewer",
    data: function () {
      return {}
    },
    props: ['document'],
    computed:{
      viewer_component_name(){
        return "document-viewer-"+this.document.sub_type
      }
    },
    components: {
      "document-viewer-chords": ChorproViewer,
      "document-viewer-pdf": PdfViewer,
      "vue-perfect-scrollbar":VuePerfectScrollbar,
    }
  }
</script>

<style scoped>
    .document-viewer {
        background: white;
        max-width: 800px;
        overflow: hidden;
    }




</style>