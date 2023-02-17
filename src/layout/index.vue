<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <nav-menu/>
      </el-aside>
      <el-container>
        <el-header>
          <page-header/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import NavMenu from './NavMenu/index.vue'
import PageHeader from './PageHeader/index.vue'
import useTypeStore from "../store/typeStore.js";
import {onMounted} from "vue";

const typeStore = useTypeStore()
onMounted(() => {
  // 获取分类列表
  typeStore.getTypeList()
})

</script>

<style scoped lang="less">
.common-layout {
  height: 100%;

  .el-container {
    height: 100%;

    .el-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px #ccc solid;
    }
  }
}
</style>
