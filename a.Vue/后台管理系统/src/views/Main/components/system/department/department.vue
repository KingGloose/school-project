<template>
  <div class="department">
    <div class="header">
      <pageSearch
        :itemDataList="searchConfig.itemDataList"
        :label-width="searchConfig.labelWidth"
        :pageName="searchConfig.pageName"
        @handleResetAndSearchEvent="handleResetAndSearchEvent"
      ></pageSearch>
    </div>
    <div class="content">
      <pageContent
        ref="pageContentRef"
        :contentHeader="contentConfig.header"
        :itemDataList="contentConfig.itemDataList"
        :pageName="contentConfig.pageName"
        @handleCreateEvent="handleCreateEvent"
        @handleEditClickEvent="handleEditClickEvent"
      >
        <!-- 上级部门 -->
        <template #parentId="{ scoped }">
          {{ getNameByDepartmentID(scoped.row.parentId) }}
        </template>
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
    <pageModel
      ref="pageModalRef"
      :header="modelConfig.header"
      :pageName="modelConfig.pageName"
      :formItems="modelConfigHandler"
      @fetchUserListDataEvent="fetchUserListDataEvent"
    ></pageModel>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { formatUTC } from "@/utils/format";
import useSystemStore from "@/store/modules/main/system";
import { useContentHook, useSearchAndModelHook } from "@/hooks/usePageHook";

import pageSearch from "@/components/pageSearch/pageSearch.vue";
import pageContent from "@/components/pageContent/pageContent.vue";
import pageModel from "@/components/pageModel/pageModel.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

// 初始化数据 -> 添加options数据
const systemStore = useSystemStore();
systemStore.getMenuDepartDataPageAction();
const { DepartmentsData } = storeToRefs(systemStore);
const modelConfigHandler = computed(() => {
  const formItemsArray = modelConfig.formItems;
  const optionsDepartArray = DepartmentsData.value.map((item) => ({ label: item.name, value: item.id }));
  for (const item of formItemsArray) {
    if (item.options) {
      if (item.prop === "parentId") item.options = optionsDepartArray as any;
    }
  }
  return formItemsArray;
});

// 获取上级部门信息
const getNameByDepartmentID = (id: number) => (id ? DepartmentsData.value.find((item) => item.id === id)?.name : "");

// Hook抽取
const { pageModalRef, handleCreateEvent, handleEditClickEvent } = useContentHook();
const { pageContentRef, handleResetAndSearchEvent, fetchUserListDataEvent } = useSearchAndModelHook();
</script>

<style scoped></style>
