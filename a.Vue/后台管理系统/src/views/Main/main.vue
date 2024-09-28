<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isMenuFold ? '60px' : '240px'">
        <mainMenu :isMenuFold="isMenuFold"></mainMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <mainHeader @changeMenuFoldEmit="changeMenuFold"></mainHeader>
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from "@/components/mainMenu/mainMenu.vue";
import mainHeader from "@/components/mainHeader/mainHeader.vue";
import { ref } from "vue";

const isMenuFold = ref(false);
const changeMenuFold = (payload: boolean) => {
  isMenuFold.value = payload;
};
</script>

<style scoped lang="less">
.main {
  height: 100%;
}
.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
