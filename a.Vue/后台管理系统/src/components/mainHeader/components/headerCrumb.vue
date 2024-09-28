<template>
  <div class="headerCrumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item of crumbList" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/store/modules/login/login";
import { mapPathToCrumb } from "@/utils/map-menu";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loginStore = useLoginStore();
const crumbList = computed(() => mapPathToCrumb(route.path, loginStore.menuInfo));
</script>

<style scoped></style>
