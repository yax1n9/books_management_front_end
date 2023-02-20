<template>
  <div class="login-box">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>图书资源管理系统</span>
        </div>
      </template>
      <el-form ref="loginForm" :model="loginFormData" :rules="loginFormRules" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginFormData.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginFormData.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>

        <el-button type="primary" @click="submitLogin">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {login} from '../../api'
import {useRouter} from 'vue-router'
import useUserStore from "../../store/userStore.js";

// 表单数据
const loginFormData = ref({
  account: '',
  password: ''
})
// 表单 DOM
const loginForm = ref(null)
// 表单校验规则
const loginFormRules = reactive({
  account: [
    {required: true, message: '请输入正确的账号', trigger: 'blur'},
    {min: 3, max: 16, message: '账号长度为3-16位', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入正确的密码', trigger: 'blur'},
    {min: 3, max: 16, message: '密码长度为3-16位', trigger: 'blur'},
  ]
})
// router
const router = useRouter()
// role store
const userStore = useUserStore()


/**
 * 提交登录
 */
const submitLogin = () => {
  loginForm.value.validate((async valid => {
    if (valid) {
      const res = await login(loginFormData.value)
      if (res.data.code === 200) {
        // 登陆成功
        userStore.role = res.data.data.role ? 'admin' : 'user'
        userStore.user = res.data.data
        await router.push({name: 'main'})
        ElMessage({
          message: `欢迎您，${res.data.data.name}`,
          type: 'success'
        })
      } else {
        ElMessage({
          message: '用户名或密码错误',
          type: 'error'
        })
      }
    } else {
      ElMessage({
        message: '请输入合法的用户名或密码',
        type: 'error'
      })
    }
  }))
}

</script>

<style scoped lang="less">
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .box-card {
    text-align: center;
    width: 480px;
    margin: 0 auto;

    .el-button {
      width: 60%;
    }
  }
}
</style>

