<template>
  <header>
    <el-input v-model="filterData.name" placeholder="请输入图书名称或借阅人名称" clearable @change="initTableData"
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
import {getBorrowLog} from "../../api/index.js";

const filterData = reactive({
  name: ''
})

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

onMounted(() => {
  initTableData()
})

const tableData = ref()

const initTableData = async () => {
  const params = {
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    borrowLog: {
      bookName: filterData.name,
    },
  }

  const res = await getBorrowLog(params)
  if (res.data.code === 200) {
    tableData.value = res.data.data.records
    pagination.total = res.data.data.total
  }

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
