<script setup>
import { computed, defineProps, onMounted, ref } from "vue";
import store from "../store";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import axios from "axios";

const props = defineProps({
  type: String,
  header: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const modalTitle = ref("");
const isModalOpen = computed(() => store.state.isModalOpen);
const currentItem = ref({});
const action = ref("");
const selectedProducts = ref([]); // Array de produtos selecionados
const currentProduct = ref({}); // Produto selecionado
const currentQtd = ref(0);

onMounted(() => {
  store.dispatch("searchPeople");
  store.dispatch("searchProducts");
});

const closeModal = () => {
  store.commit("setModalState", false);
  currentItem.value = {};
  selectedProducts.value = [];
  currentProduct.value = {};
  currentQtd.value = 0;
};

const openModal = (mode, item = null) => {
  if (mode === "create") {
    modalTitle.value = "Adicionar " + props.type;
    action.value = "create";
  } else if (mode === "edit") {
    modalTitle.value = "Editar " + props.type;
    currentItem.value = { ...item };
    action.value = "edit";
    if (props.type === "pedido") {
      selectedProducts.value = [...item.itens];
    }
  }
  store.commit("setModalState", true);
};

const enviarFormulario = () => {

  if (props.type === "pessoa") {
    if (Object.keys(currentItem.value).length === 0) {
      if (!currentItem.value.nome) {
        createToast("Preencha o nome", {
          type: "danger",
          hideProgressBar: true,
          position: "top-center",
          timeout: 2000,
        });
      }

      if (!currentItem.value.cpf) {
        createToast("Preencha o CPF", {
          type: "danger",
          hideProgressBar: true,
          position: "top-center",
          timeout: 2000,
        });
      }

      if (!currentItem.value.dataNascimento) {
        createToast("Preencha a data de nascimento", {
          type: "danger",
          hideProgressBar: true,
          position: "top-center",
          timeout: 2000,
        });
      }
      return;
    }

    // Envia o formulário
    if (action.value === "create") {
      createPerson();
    } else if (action.value === "edit") {
      editPerson();
    }
  } else if (props.type === "produto") {
    if (Object.keys(currentItem.value).length === 0) {
      if (!currentItem.value.descricao) {
        createToast("Preencha a descrição", {
          type: "danger",
          hideProgressBar: true,
          position: "top-center",
          timeout: 2000,
        });
      }

      if (!currentItem.value.valoUnitario) {
        createToast("Preencha o valor unitário", {
          type: "danger",
          hideProgressBar: true,
          position: "top-center",
          timeout: 2000,
        });
      }
      return;
    }

    // Envia o formulário
    if (action.value === "create") {
      createProduct();
    } else if (action.value === "edit") {
      editProduct();
    }
  } else if (props.type === "pedido") {
    if (Object.keys(currentItem.value).length === 0) {
      if (!currentItem.value.cliente) {
        createToast("Selecione um cliente", {
          type: "danger",
          hideProgressBar: true,
          position: "top-center",
          timeout: 2000,
        });
      }

      if (selectedProducts.value.length === 0) {
        createToast("Adicione pelo menos um produto", {
          type: "danger",
          hideProgressBar: true,
          position: "top-center",
          timeout: 2000,
        });
      }
      return;
    }

    // Envia o formulário
    if (action.value === "create") {
      createOrder();
    } else if (action.value === "edit") {
      editOrder();
    }
  }

  closeModal();
};

const handleDelete = (item) => {
  if (props.type === "pessoa") {
    deletePerson(item);
  } else if (props.type === "produto") {
    deleteProduct(item);
  } else if (props.type === "pedido") {
    deleteOrder(item);
  }
};

const createPerson = async () => {
  const id = Math.floor(Math.random() * 1000) + 1;

  try {
    const response = await axios.post("http://localhost:3000/pessoas", {
      id: id,
      nome: currentItem.value.nome,
      cpf: currentItem.value.cpf,
      dataNascimento: currentItem.value.dataNascimento,
    });
    store.commit("addPerson", response.data);
  } catch (error) {
    console.log(error);
  }
};
const editPerson = async () => {
  try {
    await axios.put(`http://localhost:3000/pessoas/${currentItem.value.id}`, {
      nome: currentItem.value.nome,
      cpf: currentItem.value.cpf,
      dataNascimento: currentItem.value.dataNascimento,
    });
  } catch (error) {
    console.log(error);
  }
};
const deletePerson = async (item) => {
  console.log(item);
  try {
    await axios.delete(`http://localhost:3000/pessoas/${item.id}`);
    store.commit("deletePerson", item);
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async () => {
  const id = Math.floor(Math.random() * 1000) + 1;

  try {
    const response = await axios.post("http://localhost:3000/produtos", {
      id: id,
      descricao: currentItem.value.descricao,
      valoUnitario: currentItem.value.valoUnitario,
    });
    store.commit("addProduct", response.data);
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async () => {
  try {
    await axios.put(`http://localhost:3000/produtos/${currentItem.value.id}`, {
      descricao: currentItem.value.descricao,
      valoUnitario: currentItem.value.valoUnitario,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (item) => {
  console.log(item);
  try {
    await axios.delete(`http://localhost:3000/produtos/${item.id}`);
    store.commit("deleteProduct", item);
  } catch (error) {
    console.log(error);
  }
};

const addProduct = () => {
  // Verifica se o produto ja nao foi adicionado em selectedProducst
  if (
    selectedProducts.value.find(
      (product) => product.produto?.id === currentProduct.value,
    )
  ) {
    createToast("Produto já adicionado", {
      type: "danger",
      hideProgressBar: true,
      position: "top-center",
      timeout: 2000,
    });
    return;
  }

  // Verifica se a quantidade é maior que 0
  if (currentQtd.value <= 0) {
    createToast("Quantidade deve ser maior que 0", {
      type: "danger",
      hideProgressBar: true,
      position: "top-center",
      timeout: 2000,
    });
    return;
  }

  // Adiciona o produto em selectedProducts
  selectedProducts.value.push({
    id: Math.floor(Math.random() * 1000) + 1,
    produto: {
      id: currentProduct.value,
      descricao: store.state.searchedProducts.find(
        (product) => product.id === currentProduct.value,
      ).descricao,
    },
    quantidade: currentQtd.value,
    valor: store.state.searchedProducts.find(
      (product) => product.id === currentProduct.value,
    ).valoUnitario,
    subtotal:
      currentQtd.value *
      store.state.searchedProducts.find(
        (product) => product.id === currentProduct.value,
      ).valoUnitario,
  });
};

const createOrder = async () => {
  const id = Math.floor(Math.random() * 1000) + 1;

  try {
    const response = await axios.post("http://localhost:3000/pedidos", {
      id: id,
      cliente: {
        id: currentItem.value.cliente.id,
        nome: currentItem.value.cliente.nome,
      },
      dataEmissao: new Date().toISOString().slice(0, 10),
      valorTotal: selectedProducts.value.reduce(
        (acc, cur) => acc + cur.valor * cur.quantidade,
        0,
      ),
      itens: selectedProducts.value,
    });
    store.commit("addOrder", response.data);
  } catch (error) {
    console.log(error);
  }
};

const editOrder = async () => {
  try {
    await axios.put(`http://localhost:3000/pedidos/${currentItem.value.id}`, {
      cliente: {
        id: currentItem.value.cliente.id,
        nome: currentItem.value.cliente.nome,
      },
      dataEmissao: new Date().toISOString().slice(0, 10),
      valorTotal: selectedProducts.value.reduce(
        (acc, cur) => acc + cur.valor * cur.quantidade,
        0,
      ),
      itens: selectedProducts.value,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (item) => {
  console.log(item);
  try {
    await axios.delete(`http://localhost:3000/pedidos/${item.id}`);
    store.commit("deleteOrder", item);
  } catch (error) {
    console.log(error);
  }
};

const formatCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // Aplica a máscara
  return cpf;
};
</script>

<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th v-for="t in header" :key="t" :class="{ 'hide-on-small-screens': t !== header[0] && t !== header[1] }">{{ t }}</th>
          <th class="add">
            <button @click="openModal('create')">Adicionar</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.id }}</td>

          <td v-if="type === 'pessoa'">{{ item.nome }}</td>
          <td v-if="type === 'pessoa'" class="hide-on-small-screens">{{ item.cpf }}</td>
          <td v-if="type === 'pessoa'" class="hide-on-small-screens">{{ item.dataNascimento }}</td>

          <td v-if="type === 'produto'">{{ item.descricao }}</td>
          <td v-if="type === 'produto'" class="hide-on-small-screens">{{ item.valoUnitario }}</td>

          <td v-if="type === 'pedido'">{{ item.cliente.nome }}</td>
          <td v-if="type === 'pedido'" class="hide-on-small-screens">{{ item.dataEmissao }}</td>
          <td v-if="type === 'pedido'" class="hide-on-small-screens">{{ item.valorTotal }}</td>

          <td class="btns">
            <button class="edit" @click="openModal('edit', item)">
              Editar
            </button>
            <button class="del" @click="handleDelete(item)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <!-- header -->
        <div class="modal-header">
          <span>{{ modalTitle }}</span>
          <i class="modal-close fa-solid fa-x" @click="closeModal"></i>
        </div>

        <!-- body -->
        <div class="modal-body">
          <!-- Formulário -->
          <div class="form-group">
            <!-- PESSOA -->
            <label v-if="props.type === 'pessoa'" for="nome">Nome</label>
            <input
              v-if="props.type === 'pessoa'"
              type="text"
              id="nome"
              v-model="currentItem.nome"
            />

            <label v-if="props.type === 'pessoa'" for="cpf">CPF</label>
            <input
              v-if="props.type === 'pessoa'"
              type="text"
              id="cpf"
              v-model="currentItem.cpf"
              @input="currentItem.cpf = formatCPF($event.target.value)"
              :maxlength="14"
            />

            <label v-if="props.type === 'pessoa'" for="dataNascimento"
              >Data de Nascimento</label
            >
            <input
              v-if="props.type === 'pessoa'"
              type="text"
              id="dataNascimento"
              v-model="currentItem.dataNascimento"
            />

            <!-- PRODUTO -->
            <label v-if="props.type === 'produto'" for="descricao"
              >Descrição</label
            >
            <input
              v-if="props.type === 'produto'"
              type="text"
              id="descricao"
              v-model="currentItem.descricao"
            />

            <label v-if="props.type === 'produto'" for="valorUnitario"
              >Valor Unitário</label
            >
            <input
              v-if="props.type === 'produto'"
              type="text"
              id="valorUnitario"
              v-model="currentItem.valoUnitario"
            />

            <!-- PEDIDO -->

            <!-- select de um cliente -->
            <label v-if="props.type === 'pedido'" for="cliente">Cliente</label>
            <select
              v-if="props.type === 'pedido'"
              name="cliente"
              id="cliente"
              v-model="currentItem.cliente"
            >
              <option
                v-for="cliente in store.state.searchedPeople"
                :key="cliente.id"
                :value="cliente"
              >
                {{ cliente.nome }}
              </option>
            </select>

            <!-- input produto | input quantidade | btn + -->
            <div v-if="props.type === 'pedido'" class="select-item">
              <label v-if="props.type === 'pedido'" for="produto"
                >Produto</label
              >
              <select
                v-if="props.type === 'pedido'"
                name="produto"
                id="produto"
                v-model="currentProduct"
              >
                <option
                  v-for="produto in store.state.searchedProducts"
                  :key="produto.id"
                  :value="produto.id"
                >
                  {{ produto.descricao }}
                </option>
              </select>

              <label v-if="props.type === 'pedido'" for="quantidade"
                >Quantidade</label
              >
              <input
                v-if="props.type === 'pedido'"
                type="number"
                id="quantidade"
                v-model="currentQtd"
              />

              <button v-if="props.type === 'pedido'" @click="addProduct()">
                +
              </button>
            </div>

            <!-- lista de produtos selecionados -->
            <div
              class="select-item"
              v-for="produto in selectedProducts"
              :key="produto.id"
            >
              <input type="text" :value="produto.produto.descricao" disabled />
              <input type="text" :value="produto.quantidade" disabled />
              <button
                @click="
                  selectedProducts.splice(selectedProducts.indexOf(produto), 1)
                "
              >
                -
              </button>
            </div>

            <!-- Valor total -->
            <label v-if="props.type === 'pedido'" for="valorTotal"
              >Valor Total</label
            >
            <input
              v-if="props.type === 'pedido'"
              type="text"
              id="valorTotal"
              :value="
                selectedProducts.reduce(
                  (acc, cur) => acc + cur.valor * cur.quantidade,
                  0,
                )
              "
              disabled
            />
          </div>
        </div>

        <!-- footer -->
        <div class="modal-footer">
          <button @click="closeModal" class="cancel">Cancelar</button>
          <button @click="enviarFormulario" class="submit">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.table {
  width: 100%;
  height: 92%;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  overflow-y: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto;

    thead {
      tr {
        th {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #bdc3c7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .add {
          display: flex;
          justify-content: flex-end;

          button {
            background-color: #409eff;
            border: none;
            border-radius: 0.2rem;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            cursor: pointer;
            color: white;

            &:hover {
              background-color: #66b1ff;
            }
          }
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #bdc3c7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

        }

        .btns {
          display: flex;
          justify-content: flex-end;

          button {
            background-color: #409eff;
            border: none;
            border-radius: 0.2rem;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            cursor: pointer;
            color: white;

            &.edit {
              background-color: #67c23a;
              margin-right: 1rem;

              &:hover {
                background-color: #85ce61;
              }
            }

            &.del {
              background-color: #f56c6c;

              &:hover {
                background-color: #f78989;
              }
            }
          }
        }
      }
    }
  }

  /* Estilos para o modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    .modal-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      width: 40%;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;
      .modal-close {
        cursor: pointer;
      }
    }

    .modal-body {
      margin-top: 20px;
      .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        label {
          margin-bottom: 5px;
        }
        input {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #bdc3c7;
        }

        select {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #bdc3c7;
        }

        .select-item {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          margin-top: 10px;
          gap: 1rem;

          input {
            width: 50%;
            height: 100%;
          }

          select {
            width: 50%;
            height: 100%;
          }

          button {
            width: 20%;
            padding: 10px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            color: white;
            background-color: #409eff;
          }
        }
      }
    }

    .modal-footer {
      margin-top: 20px;
      text-align: right;
      button {
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        color: white;
        font-weight: bold;
        &.cancel {
          background-color: #f56c6c;
          margin-right: 10px;
        }
        &.submit {
          background-color: #409eff;
        }
      }
    }
  }
}

@media (max-width: 1300px) {
  .table {
    .modal {
      .modal-content {
        width: 70%;
      }
    }
  }
}

@media (max-width: 900px) {
  .table {
    table {
      thead {
        tr {
          th {
            font-size: 0.8rem;
          }

          .add {
            button {
              font-size: 0.8rem;
            }
          }
        }
      }

      tbody {
        tr {
          td {
            font-size: 0.8rem;
          }

          .btns {
            button {
              font-size: 0.8rem;
            }
          }
        }
      }
    }

    /* Estilos para o modal */
    .modal {
      .modal-content {
        width: 90%;
      }
    }
  }
}

@media (max-width: 600px) {
  .hide-on-small-screens {
      display: none;
    }
}
</style>
