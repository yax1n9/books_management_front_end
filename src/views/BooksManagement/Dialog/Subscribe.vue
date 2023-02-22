<template>
  <el-dialog
      v-model="dialogStore.subscribeDialogVisible"
      :title="`借阅《${bookData.name}》`"
      width="30%"
      align-center
      destroy-on-close
  >
    <el-form label-width="120px">
      <el-form-item label="借阅时长">
        <el-select v-model="formData.duration">
          <el-option :value="1" label="7天"/>
          <el-option :value="2" label="15天"/>
          <el-option :value="3" label="30天"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="default" @click="dialogStore.subscribeDialogVisible=false">取消</el-button>
      <el-button type="primary" @click="submitSubscribe">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import useDialogStore from "../../../store/dialogStore.js";
import useUserStore from "../../../store/userStore.js";
import {reactive, defineEmits, defineProps, watch, ref} from "vue";
import {insertBorrowLog, modifyBook} from "../../../api/index.js";

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
const userStore = useUserStore()

const formData = reactive({
  duration: 1,
})

const durations = [
  7 * 24 * 60 * 60 * 1000,
  15 * 24 * 60 * 60 * 1000,
  30 * 24 * 60 * 60 * 1000,
]

/**
 * 提交订阅信息
 */
const submitSubscribe = async () => {
  // 提交借阅信息 图书id  图书name  借阅人id 借阅人姓名 借阅时间 返还时间
  const borrowDate = new Date()
  const reversionDate = borrowDate.getTime() + durations[formData.duration - 1]
  const params1 = {
    bookId: bookData.value.bookId,
    bookName: bookData.value.name,
    userId: userStore.user.userId,
    userName: userStore.user.name,
    borrowDate: borrowDate.getTime(),
    reversionDate: reversionDate
  }
  console.log(bookData.value)
  console.log(params1)
  const res1 = await insertBorrowLog(params1)
  if (res1.data.code === 200) {
    // 提交修改图书状态  1
    const params2 = JSON.parse(JSON.stringify(bookData.value))
    params2.status = 1
    const res2 = await modifyBook(params2)
    if (res2.data.code === 200) {
      // 成功，关闭, 谈消息框
      dialogStore.subscribeDialogVisible = false
      ElNotification({
        title: '借阅结果',
        message: `您成功借阅了《${bookData.value.name}》，请于${getHMS(reversionDate)}前归还。`,
        duration: 0,
        type: 'success'
      })
      bookData.value = {}
    } else {
      ElNotification({
        title: '借阅结果',
        message: `您借阅《${bookData.value.name}》的操作失败，请稍后再试。`,
        duration: 0,
        type: 'error'
      })
    }
  } else {
    ElNotification({
      title: '借阅结果',
      message: `您借阅《${bookData.value.name}》的操作失败，请稍后再试。`,
      duration: 0,
      type: 'error'
    })
  }
  emit('initTableData')
}


//时间戳转时间  年/月/日 时:分:秒
const getHMS = (timestamp) => {
  const date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '/';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  const h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
  const m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
  const s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
  return Y + M + D + h + m + s;
}
</script>

<style scoped>

</style>
