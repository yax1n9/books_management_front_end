<template>
  <Dialog title="修改" :data="props.data" @submit="editBook"/>
</template>

<script setup>
import Dialog from './index.vue'
import {defineProps, defineEmits} from 'vue'
import {modifyBook} from "../../../api/index.js";

const emit = defineEmits(['initTableData'])

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

const editBook = async (book) => {
  const res = await modifyBook(book.value)
  if (res.data.code === 200) {
    emit('initTableData')
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '修改失败',
      type: "error"
    })
  }
  // console.log(res)
  // console.log('edit book', book.value)
}
</script>

<style scoped>

</style>
