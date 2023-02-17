<template>
  <el-page-header :icon="ArrowLeft" title="返回" @back="router.back()">
    <template #content>
      <span class="text-large font-600 mr-3"> {{ route.meta.label }} </span>
    </template>
    <template #extra>
      <el-tag :type="role==='admin' ? '':'success'">{{ role }}</el-tag>
      <el-dropdown>
        <el-avatar
            :size="40"
            class="mr-3"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-page-header>
</template>

<script setup>
import {ArrowLeft} from "@element-plus/icons-vue";
import {useRoute, useRouter} from "vue-router";
import useUserStore from "../../store/userStore.js";
import {ref} from "vue";

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const role = ref(userStore.role)

const logout = () => {
  userStore.$reset()
  router.replace({name: 'login'})
}
</script>

<style scoped>
/deep/ .el-page-header__extra {
  display: flex;
  align-items: center;
}

.el-tag {
  margin-right: 10px;
}
</style>
