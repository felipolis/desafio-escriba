<script setup>
import { defineProps } from 'vue'
const props = defineProps({
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
						<th>ID</th>
						<th>Nome</th>
						<th>CPF</th>
						<th>Nascimento</th>
						<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="pessoa in data" :key="pessoa.id">
					<td>{{ pessoa.id }}</td>
					<td>{{ pessoa.nome }}</td>
					<td>{{ pessoa.cpf }}</td>
					<td>{{ pessoa.dataNascimento }}</td>
					<td>Ações</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>


<style lang="scss" scoped>
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
			}
		}

		tbody {
			tr {
				td {
					padding: 1rem;
					text-align: left;
					border-bottom: 1px solid #bdc3c7;
				}
			}
		}
	}
}
</style>