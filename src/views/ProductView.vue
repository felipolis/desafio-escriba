<script setup>
import Table from "../components/Table.vue";
import SearchBar from "../components/SearchBar.vue";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import store from "../store";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const header = ref(["ID", "Descrição", "Valor (Unitário)"]);

const data = computed(() => store.state.searchedProducts);

const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/produtos");
    store.commit("setSearchedProducts", response.data);
  } catch (error) {
    createToast("Erro ao buscar produtos", {
      type: "danger",
      hideProgressBar: true,
      position: "top-center",
      timeout: 2000,
    });
  }
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div class="product-container">
    <!-- SEARCH -->
    <SearchBar />

    <!-- TABLE -->
    <Table :header="header" :data="data" type="produto" />
  </div>
</template>

<style lang="scss" scoped>
.product-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
}
</style>
