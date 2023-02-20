<!-- 对话框样式 -->
<template>
  <el-dialog
      v-model="dialogStore.bookPageDialogVisible"
      :title="title"
      width="40%"
      align-center
      destroy-on-close
  >

    <el-form
        ref="formRef"
        :rules="formRules"
        :model="book"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
    >
      <el-form-item label="书名" prop="name">
        <el-input v-model="book.name"/>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="book.author"/>
      </el-form-item>
      <el-form-item label="出版社" prop="publishingHouse">
        <el-input v-model="book.publishingHouse"/>
      </el-form-item>
      <el-form-item label="出版时间" prop="publishTime">
        <el-date-picker v-model="book.publishTime" value-format="YYYY-MM-DD"/>
      </el-form-item>
      <el-form-item label="版次" prop="edition">
        <el-input-number v-model="book.edition" :min="1"/>
      </el-form-item>
      <el-form-item label="图书类别" prop="type">
        <el-select v-model="book.type">
          <el-option v-for="item in typeStore.typeList" :key="item.typeId" :value="item.typeId" :label="item.name"/>
        </el-select>
      </el-form-item>
      <el-form-item label="图书单价" prop="price">
        <el-input-number v-model="book.price" :precision="2" :min="0"></el-input-number>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogStore.bookPageDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="btnClick(formRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {defineProps, defineEmits, ref, watch, reactive} from 'vue'
import useDialogStore from "../../../store/dialogStore.js";
import useTypeStore from "../../../store/typeStore.js";

const typeStore = useTypeStore()

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
      publishingHouse: '',
      type: undefined,
      publishTime: null
    })
  }
})

const dialogStore = useDialogStore()


// 监听传参值的变化
const book = ref({})
watch(() => props.data, (newVal, oldVal) => {
  book.value = JSON.parse(JSON.stringify(newVal))
}, {immediate: true})

// 表单 Dom
const formRef = ref()
// 表单 rules
const formRules = reactive({
  name: [
    {required: true, message: '请输入书名', trigger: 'blur'}
  ],
  author: [
    {required: true, message: '请输入作者姓名', trigger: 'blur'}
  ],
  publishingHouse: [
    {required: true, message: '请输入出版社', trigger: 'blur'}
  ],
  publishTime: [
    {required: true, message: '请选择出版日期', trigger: 'change'}
  ],
  type: [
    {required: true, message: '请选择图书类型', trigger: 'change'}
  ]
})

// 提交请求
const btnClick = (formEL) => {
  try {
    formEL.validate((valid, fields) => {
      if (valid) {
        emit('submit', book)
        dialogStore.bookPageDialogVisible = false
        book.value = {}
      } else {
        return
      }
    })
  } catch (e) {
    console.log(e.message)
  }
}
</script>

<style scoped>

</style>
