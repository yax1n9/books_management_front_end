<template>
  <Dialog title="新增图书" @submit="addBook"/>
</template>

<script setup>
import Dialog from './index.vue'

const addBook = (book) => {
  console.log('emit add', book)
}
</script>

<style scoped>

</style>
