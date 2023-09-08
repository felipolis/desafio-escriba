<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
})

</script>

<template>
    <main>
        <h1>{{ title }}</h1>
    </main>
</template>

<style lang="scss" scoped>
    h1 {
        display: block;
        border-bottom: 2px solid #ccc;
    }
</style>
