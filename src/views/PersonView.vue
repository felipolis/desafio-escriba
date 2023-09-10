<script setup>
import Table from "../components/Table.vue";
import SearchBar from "../components/SearchBar.vue";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import store from "../store";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const header = ref(["ID", "Nome", "CPF", "Nascimento"]);

const data = computed(() => store.state.searchedPeople);

const getPeople = async () => {
  try {
    const response = await axios.get("http://localhost:3000/pessoas");
    store.commit("setSearchedPeople", response.data);
  } catch (error) {
    createToast("Erro ao buscar pessoas", {
      type: "danger",
      hideProgressBar: true,
      position: "top-center",
      timeout: 2000,
    });
  }
};

onMounted(() => {
  getPeople();
});
</script>

<template>
  <div class="person-container">
    <!-- SEARCH -->
    <SearchBar />

    <!-- TABLE -->
    <Table :header="header" :data="data" type="pessoa" />
  </div>
</template>

<style lang="scss">
.person-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
}
</style>
