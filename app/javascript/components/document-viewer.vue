<template>
    <div class="document-viewer">
        <vue-scrollbar classes="my-scrollbar" ref="Scrollbar">
            <div v-if="document" v-bind:is="viewer_component_name" v-bind:document="document"></div>
        </vue-scrollbar>
    </div>
</template>

<script>
  import VueScrollbar from 'vue2-scrollbar'
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
      "vue-scrollbar": VueScrollbar,
    }
  }
</script>

<style scoped>
    .document-viewer {
        background: white;
        max-width: 800px;
        max-height: 600px;
    }


</style>