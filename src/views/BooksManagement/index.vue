<template>
  <!-- 条件筛选、新增等 -->
  <header>
    <el-input v-model="filterData.name" placeholder="书名筛选" clearable @change="initTableData"
              style="width: 280px; margin-right: 20px;"/>
    <el-select v-model="filterData.type" placeholder="类型筛选" clearable @change="initTableData"
               style="width: 280px; margin-right: 20px;">
      <el-option v-for="item in typeStore.typeList" :key="item.typeId" :label="item.name" :value="item.typeId"/>
    </el-select>
    <el-select v-model="filterData.status" placeholder="状态筛选" clearable @change="initTableData"
               style="width: 280px; margin-right: 20px;">
      <el-option :value="0" label="未借出"/>
      <el-option :value="1" label="已借出"/>
    </el-select>
    <el-button type="primary" @click="addBook" v-permission="['admin']">新增图书</el-button>
  </header>

  <!-- 表格 -->
  <section class="table" style="width: 100%">
    <el-table :data="tableData" border stripe height="100%">
      <el-table-column label="书名" prop="name"/>
      <el-table-column label="作者" prop="author"/>
      <el-table-column label="出版社" prop="publishingHouse"/>
      <el-table-column width="100px" label="单价（元）" prop="price"/>
      <el-table-column width="80px" label="版次" prop="edition"/>
      <el-table-column width="180px" label="出版时间" prop="publishTime"/>
      <el-table-column width="120px" label="类型">
        <template v-slot="{row}">
          {{
            typeStore.typeList.filter(item => item.typeId === row.type)[0] ? typeStore.typeList.filter(item => item.typeId === row.type)[0].name : ''
          }}
        </template>
      </el-table-column>
      <el-table-column width="85px" label="状态">
        <template v-slot="{row}">
          <el-tag :type="row.status? 'danger':'success'">
            {{ row.status ? '已借出' : '未借出' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="130px" label="操作">
        <template v-slot="{row}">
          <el-link type="primary" style="margin-right: 8px;" v-permission="['admin']" @click="editBook(row)">修改
          </el-link>
          <el-link type="danger" style="margin-right: 8px;" v-permission="['admin']" @click="deleteBook(row)">删除
          </el-link>
          <el-link type="success" @click="subscribeBook(row)" :disabled="row.status">借阅</el-link>
        </template>
      </el-table-column>
    </el-table>
  </section>

  <!-- 分页 -->
  <footer class="pagination">
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="initTableData"
    />
  </footer>

  <!-- 弹出层 -->
  <add v-if="dialogType" @init-table-data="initTableData"/>
  <edit v-else :data="curBook" @init-table-data="initTableData"/>
  <subscribe :data="curBook" @init-table-data="initTableData"/>
</template>

<script setup>
import {getBooksPage, removeBook} from "../../api/index.js";
import {reactive, onMounted, ref} from "vue";
import useTypeStore from "../../store/typeStore.js";
import useDialogStore from "../../store/dialogStore.js";
import Add from "./Dialog/Add.vue";
import Edit from "./Dialog/Edit.vue";
import Subscribe from "./Dialog/Subscribe.vue"

onMounted(() => {
  initTableData()
})

// 条件过滤
const filterData = reactive({
  name: '',
  type: undefined,
  status: undefined
})

// 类型 store
const typeStore = useTypeStore()

// 表格数据
let tableData = ref([])

// 请求表格数据
const initTableData = async () => {
  const res = await getBooksPage({currentPage: pagination.currentPage, pageSize: pagination.pageSize, book: filterData})
  if (res.data.code === 200) {
    tableData.value = res.data.data.records
    pagination.total = res.data.data.total
  }
}

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 对话框显示隐藏
const dialogStore = useDialogStore()
const dialogType = ref(true)  // true 新增  false 修改
const addBook = () => {
  dialogStore.bookPageDialogVisible = true
  dialogType.value = true
}
const curBook = ref({})

/**
 * 点击修改
 * @param book
 */
const editBook = (book) => {
  curBook.value = book
  dialogType.value = false
  dialogStore.bookPageDialogVisible = true
}

/**
 * 点击删除
 * @param book
 */
const deleteBook = (book) => {
  ElMessageBox.confirm(`确定要删除图书《${book.name}》吗？`, 'Warning', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await removeBook(book.bookId)
    if (res.data.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除'
    })
  }).finally(() => {
    initTableData()
  })
}

/**
 * 点击借阅
 * @param book
 */
const subscribeBook = (book) => {
  curBook.value = book
  dialogStore.subscribeDialogVisible = true
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
