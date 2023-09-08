<script setup>
  import { RouterView } from 'vue-router'
  
  import SideBar from './components/SideBar.vue'

</script>

<template>
  <main class="main">
    <SideBar />
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
  }
</style>