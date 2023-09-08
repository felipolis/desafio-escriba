<template>
	<main class="home-container">
		<h1>Bem Vindo ao Desafio</h1>
		<div class="img-container">
				<img src="../assets/logo.png" alt="logo" />
		</div>
	</main>
</template>

<style lang="scss" scoped>
	.home-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		.img-container {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 30%;

			img {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>

<script setup>



</script>