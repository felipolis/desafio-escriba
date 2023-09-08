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
  .main {
    background-color: rgb(243 244 246);
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    padding: 1rem;
    gap: 1rem;
  }
</style>