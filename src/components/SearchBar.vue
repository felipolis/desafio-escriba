<script setup>
import { ref } from "vue";
import store from "../store";
import { useRoute } from "vue-router";

const route = useRoute();

const keyword = ref("");
const routeName = route.name;

const search = async () => {
    if (routeName === 'pessoas') {
        store.dispatch("searchPeople", keyword.value);
    }

}

</script>

<template>
    <div class="search">
            <div class="search-input">
                <input
                    type="text" 
                    placeholder="Pesquisar" 
                    v-model="keyword"
                    @input="search"
                />
            </div>
            <div class="search-button">
                <button @click="search">Pesquisar</button>
            </div>
        </div>
</template>

<style lang="scss" scoped>
.search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 8%;
        width: 100%;
        background-color: white;
        border-radius: 1rem;
        padding: 1rem;
        margin-bottom: 1rem;

        .search-input {
            width: 70%;
            input {
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 1rem;
                padding: 1rem;

                &:focus {
                    outline: none;
                }
            }
        }

        .search-button {
            width: 20%;
            button {
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 1rem;
                padding: 1rem;
                background-color: #2c3e50;
                color: white;
                font-weight: bold;
                cursor: pointer;

                &:hover {
                    background-color: #34495e;
                }
            }
        }
    }
</style>