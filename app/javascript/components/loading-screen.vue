<template>
    <div id="loading-screen">
        <div id="loading-text">
            LOADING ...
        </div>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: "loading-screen",
    data: function () {
      return {}
    }
  }
</script>

<style scoped>
    #loading-screen {
        text-align: center;
        background: #6a98d6;
        color: white;
        font-size: 5em;
        margin: 0;
        height: 100vh;
    }

    #loading-text {
        padding-top: 2em;
    }

</style>
