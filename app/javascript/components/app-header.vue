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
    width: 100%;
    background-color: #6666ff;
  }

</style>
