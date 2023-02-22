<template>
  <header>
    <el-input v-model="filterData.bookName" placeholder="请输入图书名称" clearable @change="initTableData"
              style="width: 280px; margin-right: 20px;"/>
  </header>

  <section class="table" style="width: 100%">
    <el-table :data="tableData" border stripe height="100%">
      <el-table-column label="图书名称" prop="bookName"/>
      <el-table-column label="借阅人名称" prop="userName"/>
      <el-table-column label="借阅时间">
        <template v-slot="{row}">
          {{ new Date(row.borrowDate).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="归还时间">
        <template v-slot="{row}">
          {{ new Date(row.reversionDate).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="归还状态">
        <template v-slot="{row}">
          <el-tag :type="row.status? 'success':'danger'">{{ row.status ? '已归还' : '未归还' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-link type="primary" :disabled="row.status===1" @click="backClick(row)">立即归还</el-link>
        </template>
      </el-table-column>
    </el-table>
  </section>

  <footer class="pagination">
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :current-page.sync="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="initTableData"
    />
  </footer>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import useUserStore from "../../store/userStore.js";
import {getBorrowLog, modifyBorrowLog, modifyBook} from "../../api/index.js";

const filterData = reactive({
  bookName: ''
})

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const userStore = useUserStore()

const tableData = ref()

onMounted(() => {
  initTableData()
})

const initTableData = async () => {
  const params = {
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    borrowLog: {
      userName: userStore.user.name,
      bookName: filterData.bookName
    }
  }

  const res = await getBorrowLog(params)
  if (res.data.code === 200) {
    tableData.value = res.data.data.records
    pagination.total = res.data.data.total
  }
}

const backClick = (row) => {
  ElMessageBox.confirm(`是否归还图书《${row.bookName}》?`, '归还图书', {
    type: 'info',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async () => {
    // borrowId 设置借阅记录状态
    const params1 = JSON.parse(JSON.stringify(row))
    params1.status = 1
    const res1 = await modifyBorrowLog(params1)
    if (res1.data.code === 200) {
      const params2 = {
        bookId: row.bookId,
        status: 0
      }
      const res2 = await modifyBook(params2)
      if (res2.data.code === 200) {
        ElNotification({
          type: 'success',
          title: '返还结果通知',
          message: `《${row.bookName}》已成功归还!`
        })
      } else {
        ElNotification({
          type: 'error',
          title: '返还结果通知',
          message: `《${row.bookName}》归还失败!`
        })
      }
    } else {
      ElNotification({
        type: 'error',
        title: '返还结果通知',
        message: `《${row.bookName}》归还失败!`
      })
    }
  }).catch(e => {
    ElMessage({
      type: 'info',
      message: '取消归还'
    })
  }).finally(() => {
    initTableData()
  })


  // const res1 =
  // bookId 设置图书状态
}
</script>

<style scoped>
.table {
  height: 88%;
  margin-top: 20px;
}

.pagination {
  margin-top: 20px;
}

.el-pagination {
  justify-content: right;
}
</style>
