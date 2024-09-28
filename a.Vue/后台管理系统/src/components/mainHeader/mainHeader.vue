<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuFold">
      <el-icon size="28px">
        <component :is="isMenuFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <headerCrumb></headerCrumb>
      </div>
      <div class="info">
        <headerInfo></headerInfo>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import headerInfo from "./components/headerInfo.vue";
import headerCrumb from "./components/headerCrumb.vue";
import { ref } from "vue";

const isMenuFold = ref(false);
const emits = defineEmits(["changeMenuFoldEmit"]);
const handleMenuFold = () => {
  isMenuFold.value = !isMenuFold.value;
  emits("changeMenuFoldEmit", isMenuFold.value);
};
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
