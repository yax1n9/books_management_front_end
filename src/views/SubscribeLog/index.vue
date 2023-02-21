<template>
  <header>
    <el-input v-model="filterData.name" placeholder="请输入姓名" clearable @change="initTableData"
              style="width: 280px; margin-right: 20px;"/>
  </header>

  <section class="table" style="width: 100%">
    <el-table :data="tableData" border stripe height="100%">
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
import {reactive, ref} from "vue";

const filterData = reactive({
  name: ''
})

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const tableData = ref()

const initTableData = () => {
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
