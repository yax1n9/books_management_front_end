<template>
  <div class="not-found">
    <div class="not-found-text">
      页面找不到了~~
    </div>
    <div class="not-found-png"/>
    <el-button type="primary" round @click="router.replace('/login')">go home</el-button>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<style scoped lang="less">
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .not-found-png {
    width: 780px;
    height: 450px;
    margin: 0 auto;
    background: url("../../assets/404.png") no-repeat;
  }

  .not-found-text {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    color: #3663a2;
  }

  .el-button{
    width: 100px;
    margin: 0 auto;
  }
}

</style>
