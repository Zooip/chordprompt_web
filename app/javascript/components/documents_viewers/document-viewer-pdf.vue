<template>
    <div class="pdf-viewer">
        <pdf
                v-for="i in numPages"
            :src="loadingTask"
            :page="i"
                :key="i"
             style="display: inline-block; width: 100%;max-width: 1000px;"
        > </pdf>
    </div>


</template>

<script>
  import pdf from 'vue-pdf'

  export default {
    name: "document-viewer-pdf",
    data: function () {
      return {
        numPages: undefined,
      }
    },
    props: ['document'],
    computed: {
      html_content: function () {
        return this.html_source
      },
      link() {return this.document.links.content},
      loadingTask() {return pdf.createLoadingTask(this.link);}

    },
    components:{
      pdf
    },
    mounted() {
      this.loadingTask.then(pdf => {
        this.numPages = pdf.numPages;
      });
    }
  }
</script>

<style scoped>

</style>