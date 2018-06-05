<template>
    <div class="document-viewer" id="document-viewer">
        <input type="text" v-model="position"/>

        <VuePerfectScrollbar class="scroll-area" v-bind:id="scrollAreaId" :settings="scrollbarSettings" :swicher="scrollbarSwitcher" @ps-scroll-y="scrollHandle">
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
        scrollAreaId: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        scrollbarSettings: {
          suppressScrollX: true
        }
      }
    },
    props: ['document','position', 'playing'],
    computed:{
      viewer_component_name(){
        return "document-viewer-"+this.document.sub_type
      },
      innerId(){
        return "inner-"+this.scrollAreaId
      },
      scrollbarSwitcher() {
        return !this.playing
      }
    },
    methods:{
      updatePosition(newPos){
        let container = document.getElementById(this.scrollAreaId);
        let inner= document.getElementById(this.innerId);
        let target=Math.max(inner.offsetHeight-container.offsetHeight,0)/100.0*newPos;
        container.scrollTop = target;
      },
      scrollHandle(evt) {
        if(evt.explicitOriginalTarget===evt.target){ //Hack : Manual scrollTo can't direct target the container
        }else{
          //Scrolled by position changing
          let pos=0;
          //manually scrolled
          let container = document.getElementById(this.scrollAreaId);
          let inner= document.getElementById(this.innerId);
          let base=Math.max(inner.offsetHeight-container.offsetHeight,0);
          if(0===base){
            pos=0
          }else {
            pos = Math.round((container.scrollTop * 1000.0) / base)/10.0
          }
          this.$emit('scrolledTo', pos)
        }
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
      },
      document: function(newDoc, oldDoc){
        let that=this
        setTimeout(function(){
          that.updatePosition(that.position);
        }, 100);
      }

    },
    mounted(){
      console.log(this.scrollbarSettings);
      this.updatePosition(this.position);
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