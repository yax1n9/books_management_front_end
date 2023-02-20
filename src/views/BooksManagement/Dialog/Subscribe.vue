<template>
  <el-dialog
      v-model="dialogStore.subscribeDialogVisible"
      :title="`借阅《${bookData.name}》`"
      width="40%"
      align-center
      destroy-on-close
  >
    <el-form>
      <el-form-item label="借阅时长">
        <el-select v-model="formData.duration">
          <el-option :value="1" label="7天"/>
          <el-option :value="2" label="15天"/>
          <el-option :value="3" label="30天"/>
        </el-select>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import useDialogStore from "../../../store/dialogStore.js";
import {reactive, defineEmits, defineProps, watch, ref} from "vue";

const emit = defineEmits(['initTableData'])
const props = defineProps({
  data: {
    required: true,
    type: Object
  }
})

const bookData = ref({})
watch(() => props.data, (n, o) => {
  bookData.value = JSON.parse(JSON.stringify(n))
}, {immediate: true})

const dialogStore = useDialogStore()

const formData = reactive({
  duration: 1,
})
</script>

<style scoped>

</style>
