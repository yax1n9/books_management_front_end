<template>
  <Dialog title="新增图书" @submit="addBook"/>
</template>

<script setup>
import Dialog from './index.vue'
import {defineEmits} from "vue";
import {insertBook} from "../../../api/index.js";
import useDialogStore from "../../../store/dialogStore.js";

const emit = defineEmits(['initTableData'])

const dialogStore = useDialogStore()

const addBook = async (book) => {
  const res = await insertBook(book.value)
  if (res.data.code === 200) {
    emit('initTableData')
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '添加失败',
      type: 'error'
    })
  }
}
</script>

<style scoped>

</style>
