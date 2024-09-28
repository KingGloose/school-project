<template>
  <div class="menu">
    <div class="content">
      <pageContent
        ref="pageContentRef"
        :itemDataList="contentConfig.itemDataList"
        :pageName="contentConfig.pageName"
        :contentHeader="contentConfig.header"
        :childrenTree="contentConfig.childrenTree"
        @handleCreateEvent="handleCreateEvent"
        @handleEditClickEvent="handleEditClickEvent"
      >
        <!-- 创建时间 -->
        <template #createAt="{ scoped }">
          {{ formatUTC(scoped.row.createAt) }}
        </template>
        <!-- 更新时间 -->
        <template #updateAt="{ scoped }">
          {{ formatUTC(scoped.row.updateAt) }}
        </template>
      </pageContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatUTC } from "@/utils/format";
import { useContentHook, useSearchAndModelHook } from "@/hooks/usePageHook";
import pageContent from "@/components/pageContent/pageContent.vue";
import contentConfig from "./config/content.config";

const { handleCreateEvent, handleEditClickEvent } = useContentHook();
const { pageContentRef } = useSearchAndModelHook();
</script>

<style scoped></style>
