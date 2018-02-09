<template>
    <div id="jamsession-controller">
        JAMSESSION : id={{jamSession.id}} - playing={{jamSession.playing}}
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
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: "JamsessionController",
    data: function () {
      return {}
    },
    computed: {
      // rajouter les accesseurs dans `computed` avec l'opérateur de décomposition
      ...mapState([
        'jamSession'
        // ...
      ])
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
