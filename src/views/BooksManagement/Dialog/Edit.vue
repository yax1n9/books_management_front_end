<template>
  <Dialog title="修改" :data="props.data" @submit="editBook"/>
</template>

<script setup>
import Dialog from './index.vue'
import {defineProps} from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      name: '',
      author: '',
      edition: 1,
      price: 0.00,
      publishHouse: '',
      type: 1,
      publishTime: new Date()
    })
  }
})

const editBook = (book) => {
  console.log('edit book', book)
}
</script>

<style scoped>

</style>
