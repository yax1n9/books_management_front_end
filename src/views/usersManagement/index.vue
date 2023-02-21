<template>
  <header>
    <el-input v-model="filterData.name" placeholder="请输入姓名" clearable @change="initTableData"
              style="width: 280px; margin-right: 20px;"/>
  </header>
  <section class="table" style="width: 100%">
    <el-table :data="tableData" border stripe height="100%">
      <el-table-column label="姓名" width="100px" fixed prop="name"/>
      <el-table-column label="账号" width="120px" prop="account"/>
      <el-table-column label="性别" width="70px" prop="gender"/>
      <el-table-column label="电话" width="120px" prop="phone"/>
      <el-table-column label="权限" width="90px" prop="role">
        <template v-slot="{row}">
          <el-tag :type="row.role? '':'success'">{{ row.role ? 'admin' : 'user' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="120px" prop="department"/>
      <el-table-column label="职位" width="120px" prop="position"/>
      <el-table-column label="职称" width="120px" prop="professionalTitle"/>
      <el-table-column label="学历" width="100px" prop="education"/>
      <el-table-column label="专业" min-width="120px" show-overflow-tooltip prop="major"/>
      <el-table-column label="办证日期" width="120px" show-overflow-tooltip prop="issuanceDate"/>
      <el-table-column label="书证编号" min-width="120px" show-overflow-tooltip prop="documentaryNumber"/>
      <el-table-column label="读者类别" width="100px" show-overflow-tooltip prop="readerType">
        <template v-slot="{row}">
          {{
            typeStore.typeList.filter(item => item.readerType === row.type)[0] ? typeStore.typeList.filter(item => item.readerType === row.type)[0].name : ''
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px" fixed="right">
        <template v-slot="{row}">
          <el-link type="primary" underline @click="editClick(row)">修改</el-link>
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


  <!-- 修改对话框 -->
  <el-dialog
      v-model="editDialogVisible"
      title="修改"
      width="40%"
      align-center
      destroy-on-close
  >
    <el-form
        ref="formRef"
        :model="curUser"
        label-width="90px"
        class="demo-ruleForm"
        status-icon
        inline
    >

      <el-form-item label="姓名">
        <el-input v-model="curUser.name" style="width: 215px"></el-input>
      </el-form-item>

      <el-form-item label="账号">
        {{ curUser.account }}
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="curUser.gender">
          <el-option label="女" :value="0"/>
          <el-option label="男" :value="1"/>
        </el-select>
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="curUser.phone" style="width: 215px"></el-input>
      </el-form-item>

      <el-form-item label="部门">
        <el-select v-model="curUser.departmentId">
          <el-option v-for="item in departmentOptions" :key="item.departmentId" :value="item.departmentId"
                     :label="item.name"/>
        </el-select>
      </el-form-item>

      <el-form-item label="职位">
        <el-select v-model="curUser.positionId">
          <el-option v-for="item in positionOptions" :key="item.positionId" :value="item.positionId"
                     :label="item.name"/>
        </el-select>
      </el-form-item>

      <el-form-item label="职称">
        <el-select v-model="curUser.professionalTitleId">
          <el-option v-for="item in professionalTitleOptions" :key="item.professionalTitleId"
                     :value="item.professionalTitleId" :label="item.name"/>
        </el-select>
      </el-form-item>

      <el-form-item label="学历">
        <el-select v-model="curUser.educationId">
          <el-option v-for="item in educationOptions" :key="item.educationId" :value="item.educationId"
                     :label="item.name"/>
        </el-select>
      </el-form-item>

      <el-form-item label="专业">
        <el-select v-model="curUser.majorId">
          <el-option v-for="item in majorOptions" :key="item.majorId" :value="item.majorId" :label="item.name"/>
        </el-select>
      </el-form-item>

      <el-form-item label="办证日期">
        <el-date-picker v-model="curUser.issuanceDate" value-format="YYYY-MM-DD"/>
      </el-form-item>

      <el-form-item label="书证编号">
        <el-input v-model="curUser.documentaryNumber" style="width: 215px"></el-input>
      </el-form-item>

      <el-form-item label="读者类别">
        <el-select v-model="curUser.readerType">
          <el-option v-for="item in typeOptions" :key="item.typeId" :value="item.typeId" :label="item.name"/>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="editDialogVisible=false">取消</el-button>
      <el-button type="primary" @click="editSubmit">
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import useTypeStore from "../../store/typeStore.js";
import {
  getUserPage,
  getDepartmentList,
  getEducationList,
  getMajorList,
  getPositionList,
  getProfessionalTitleList, getTypes, modifyUser
} from "../../api/index.js";

const typeStore = useTypeStore()

onMounted(() => {
  initSelectOptions()
  initTableData()
})

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const filterData = reactive({
  name: ''
})

const tableData = ref([])

const initTableData = async () => {
  const params = {
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    user: filterData
  }
  const res = await getUserPage(params)
  if (res.data.code === 200) {
    tableData.value = res.data.data.records
    pagination.total = res.data.data.total
  }
}

/*
修改对话框
 */
const editDialogVisible = ref(false)
const formRef = ref()
const formRules = reactive({})
const curUser = ref({})
const editClick = (row) => {
  curUser.value = JSON.parse(JSON.stringify(row))
  editDialogVisible.value = true
}

const editSubmit = async () => {
  const res = await modifyUser(curUser.value)
  if (res.data.code === 200) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
  } else {
    ElMessage({
      type: 'danger',
      message: '修改失败'
    })
  }
  editDialogVisible.value = false
  await initTableData()

}

const departmentOptions = ref()
const educationOptions = ref()
const positionOptions = ref()
const professionalTitleOptions = ref()
const majorOptions = ref()
const typeOptions = ref()
const initSelectOptions = async () => {
  const res1 = await getProfessionalTitleList()
  if (res1.data.code) {
    professionalTitleOptions.value = res1.data.data
  }

  const res2 = await getMajorList()
  if (res2.data.code) {
    majorOptions.value = res2.data.data
  }

  const res3 = await getPositionList()
  if (res3.data.code) {
    positionOptions.value = res3.data.data
  }

  const res4 = await getDepartmentList()
  if (res4.data.code) {
    departmentOptions.value = res4.data.data
  }

  const res5 = await getEducationList()
  if (res5.data.code) {
    educationOptions.value = res5.data.data
  }

  const res6 = await getTypes()
  if (res5.data.code) {
    typeOptions.value = res6.data.data
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
