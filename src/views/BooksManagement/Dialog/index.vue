<!-- 对话框样式 -->
<template>
  <el-dialog
      v-model="dialogStore.bookPageDialogVisible"
      :title="title"
      width="30%"
      align-center
      destroy-on-close
  >
    <span>Open the dialog from the center from the screen</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogStore.bookPageDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="btnClick">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue'
import useDialogStore from "../../../store/dialogStore.js";

const emit = defineEmits(['submit'])

const props = defineProps({
  title: {
    required: true,
    type: String
  },
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

const dialogStore = useDialogStore()


const book = ref({})
watch(() => props.data, (newVal, oldVal) => {
  console.log(22222, newVal)
  book.value = newVal
})

// 提交请求
const btnClick = () => {
  emit('submit', book)
  dialogStore.bookPageDialogVisible = false
}
</script>

<style scoped>

</style>
