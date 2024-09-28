<template>
  <div class="echartsCard">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ header }}</span>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface echartsCardInter {
  header: string;
}
const props = defineProps<echartsCardInter>();
</script>

<style scoped>
.echartsCard {
  margin-bottom: 10px;
}
</style>
