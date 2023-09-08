<script setup>
import Table from '../components/Table.vue'
import { ref } from 'vue'

const header = ref([
    'ID',
    'Nome',
    'CPF',
    'Nascimento',
    'Ações'
])

const data = ref([
    {
        id: 1,
        nome: 'teste',
        cpf: '41182700809',
        dataNascimento: '14/12/1999'
    },
    {
        id: 1,
        nome: 'teste',
        cpf: '41182700809',
        dataNascimento: '14/12/1999'
    },
    {
        id: 1,
        nome: 'teste',
        cpf: '41182700809',
        dataNascimento: '14/12/1999'
    },
])


</script>

<template>
    <div class="person-container">
        <!-- SEARCH -->
        <div class="search">
            <div class="search-input">
                <input type="text" placeholder="Pesquisar" />
            </div>
            <div class="search-button">
                <button>Pesquisar</button>
            </div>
        </div>
        <!-- TABLE -->
        <Table :header="header" :data="data" />

        
        
    </div>
</template>

<style lang="scss">
.person-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;

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

}
</style>

