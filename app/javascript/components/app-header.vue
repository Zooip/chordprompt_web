<template lang="haml">
%header{id:"app-header"}
  .logo
    ChordPrompt Web
  nav
    Menu
  -#<user-widget></user-widget>
</template>


<script>
  export default {
    props:[],
    data: function () {
        return {}
    }
  }
</script>

<style scoped>

  header{
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      background-color: #6666ff;
  }

</style>
