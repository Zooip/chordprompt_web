<template>
    <div class="document-viewer">
        <div v-bind:is="viewer_component_name" v-bind:document="document"></div>
    </div>
</template>

<script>
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
      "document-viewer-pdf": PdfViewer
    }
  }
</script>

<style scoped>
    .document-viewer {
        background: white;
    }


</style>