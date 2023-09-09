<script setup>
import { computed, defineProps, ref } from 'vue'
import store from "../store";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import axios from 'axios'

const props = defineProps({
	type: String,
    header: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
})

const modalTitle = ref("")
const isModalOpen = computed(() => store.state.isModalOpen)
const currentItem = ref({})
const action = ref("")


const closeModal = () => {
    store.commit("setModalState", false);
	currentItem.value = {}
}

const openModal = (mode, item=null) => {
	if (mode === "create") {
		modalTitle.value = "Adicionar " + props.type
		action.value = "create"
	} else if (mode === "edit") {
		modalTitle.value = "Editar " + props.type
		currentItem.value = item
		action.value = "edit"
	}
	store.commit("setModalState", true);
}

const enviarFormulario = () => {
	// verifica se o formulário está vazio

	if (props.type === "pessoa") {
		// verificações
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


			return
		}

		// Envia o formulário
		if (action.value === 'create') {
			createPerson()

		} else if (action.value === 'edit') {
			editPerson()
		}
		
	}

	closeModal()
}

const handleDelete = (item) => {
	if (props.type === "pessoa") {
		deletePerson(item)
	}
}





const createPerson = async () => {
	// gera um id 
	const id = Math.floor(Math.random() * 1000) + 1

	try {
		const response = await axios.post('http://localhost:3000/pessoas', {
			id: id,
			nome: currentItem.value.nome,
			cpf: currentItem.value.cpf,
			dataNascimento: currentItem.value.dataNascimento
		})
		store.commit("addPerson", response.data);
	} catch (error) {
		console.log(error)
	}
}

const editPerson = async () => {
	try {
		await axios.put(`http://localhost:3000/pessoas/${currentItem.value.id}`, {
			nome: currentItem.value.nome,
			cpf: currentItem.value.cpf,
			dataNascimento: currentItem.value.dataNascimento
		})
	} catch (error) {
		console.log(error)
	}
}



const deletePerson = async (item) => {
	console.log(item)
	try {
		await axios.delete(`http://localhost:3000/pessoas/${item.id}`)
		store.commit("deletePerson", item);
	} catch (error) {
		console.log(error)
	}
}

</script>

<template>
	<div class="table">
		<table>
			<thead>
				<tr>
					<th v-for="t in header" :key="t">{{ t }}</th>
					<th class="add">
						<button @click="openModal('create')">Adicionar</button>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in data" :key="item.id">
					<td>{{ item.id }}</td>

					<td v-if="type === 'pessoa'">{{ item.nome }}</td>
					<td v-if="type === 'pessoa'">{{ item.cpf }}</td>
					<td v-if="type === 'pessoa'">{{ item.dataNascimento }}</td>

					<td v-if="type === 'produto'">{{ item.descricao }}</td>
					<td v-if="type === 'produto'">{{ item.valoUnitario }}</td>

					<td v-if="type === 'pedido'">{{ item.cliente.nome }}</td>
					<td v-if="type === 'pedido'">{{ item.dataEmissao }}</td>
					<td v-if="type === 'pedido'">{{ item.valorTotal }}</td>

					<td class="btns">
						<button class="edit" @click="openModal('edit', item)">Editar</button>
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
						/>

						<label v-if="props.type === 'pessoa'" for="dataNascimento">Data de Nascimento</label>
						<input 
							v-if="props.type === 'pessoa'" 
							type="text" 
							id="dataNascimento" 
							v-model="currentItem.dataNascimento"
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

		thead {
			tr {
				th {
					padding: 1rem;
					text-align: left;
					border-bottom: 1px solid #bdc3c7;

				}
				
				.add {
					display: flex;
					justify-content: flex-end;
					
					button {
						background-color: #409EFF;
						border: none;
						border-radius: 0.2rem;
						padding-left: 1rem;
						padding-right: 1rem;
						padding-top: 0.5rem;
						padding-bottom: 0.5rem;
						cursor: pointer;
						color: white;
	
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

					
				}
				
				.btns {
					display: flex;
					justify-content: flex-end;

					button {
						background-color: #409EFF;
						border: none;
						border-radius: 0.2rem;
						padding-left: 1rem;
						padding-right: 1rem;
						padding-top: 0.5rem;
						padding-bottom: 0.5rem;
						cursor: pointer;
						color: white;
	
						&.edit {
							background-color: #67C23A;
							margin-right: 1rem;
						}
	
						&.del {
							background-color: #F56C6C;
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
        width: 400px;
        max-width: 90%;
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
					margin-bottom: 10px;
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
					background-color: #F56C6C;
					margin-right: 10px;
				}
				&.submit {
					background-color: #409EFF;
				}
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
	}
}

</style>