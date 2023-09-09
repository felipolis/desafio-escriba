<script setup>
import { defineProps } from 'vue'
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
</script>

<template>
	<div class="table">
		<table>
			<thead>
				<tr>
					<th v-for="t in header" :key="t">{{ t }}</th>
					<th class="add">
						<button>Adicionar</button>
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
						<button class="edit">Editar</button>
						<button class="del">Excluir</button>
					</td>
				</tr>
			</tbody>
		</table>
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