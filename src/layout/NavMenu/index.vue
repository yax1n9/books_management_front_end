<template>
  <div class="nav-menu">
    <el-scrollbar>
      <el-menu
          :default-active="route.path"
          class="el-menu-vertical-demo"
          router
      >
        <el-menu-item index="/main/booksManagement">
          <el-icon>
            <Menu/>
          </el-icon>
          <span>图书管理</span>
        </el-menu-item>

        <el-menu-item index="/main/usersManagement" v-permission="['admin']">
          <el-icon>
            <document/>
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>

        <el-menu-item index="/main/subscribeLog" v-permission="['admin']">
          <el-icon>
            <location/>
          </el-icon>
          <span>借阅记录</span>
        </el-menu-item>

        <el-menu-item index="/main/mySubscribeLog">
          <el-icon>
            <location/>
          </el-icon>
          <span>我的借阅</span>
        </el-menu-item>

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {Location, Menu, Document} from '@element-plus/icons-vue'
import {useRoute} from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;

  /deep/ .el-scrollbar__view {
    height: 100%;
  }

  .el-menu {
    height: 100%;
  }
}
</style>
