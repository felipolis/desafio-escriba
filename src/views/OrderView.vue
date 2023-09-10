<script setup>
import Table from "../components/Table.vue";
import SearchBar from "../components/SearchBar.vue";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import store from "../store";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const header = ref(["ID", "Cliente", "EMISSÃO", "VALOR TOTAL"]);

const data = computed(() => store.state.searchedOrders);

const getOrders = async () => {
  try {
    const response = await axios.get("http://localhost:3000/pedidos");
    store.commit("setSearchedOrders", response.data);
  } catch (error) {
    createToast("Erro ao buscar pedidos", {
      type: "danger",
      hideProgressBar: true,
      position: "top-center",
      timeout: 2000,
    });
  }
};

onMounted(() => {
  getOrders();
});
</script>

<template>
  <div class="order-container">
    <!-- SEARCH -->
    <SearchBar />

    <!-- TABLE -->
    <Table :header="header" :data="data" type="pedido" />
  </div>
</template>

<style lang="scss" scoped>
.order-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
}
</style>
