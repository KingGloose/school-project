<template>
  <div class="App dark">
    <DeskHeader></DeskHeader>
    <FlaotMenu></FlaotMenu>

    <el-config-provider :locale="zhCn">
      <RouterView></RouterView>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import DeskHeader from "@/components/Desk-Header/Desk-Header.vue";
import FlaotMenu from "@/components/float-menu/float-menu.vue";
</script>

<style scoped lang="scss">
.App {
  width: 100vw;
  height: 100vh;

  position: relative;
  top: 0px;
}
</style>
