<template>
  <div class="user">
    <div class="header">
      <pageSearch
        :itemDataList="searchConfig.itemDataList"
        :labelWidth="searchConfig.labelWidth"
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
        <!-- 启动/禁用按钮 -->
        <template #enable="{ scoped }">
          <el-button :type="scoped.row.enable === 1 ? 'primary' : 'danger'" size="small" plain>
            {{ scoped.row.enable === 1 ? "启动" : "禁用" }}
          </el-button>
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

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

import pageSearch from "@/components/pageSearch/pageSearch.vue";
import pageContent from "@/components/pageContent/pageContent.vue";
import pageModel from "@/components/pageModel/pageModel.vue";

// 初始化数据 -> 添加options数据
const systemStore = useSystemStore();
systemStore.getMenuDepartDataPageAction();
const { RolesData, DepartmentsData } = storeToRefs(systemStore);
const modelConfigHandler = computed(() => {
  const formItemsArray = modelConfig.formItems;
  const optionsRolesArray = RolesData.value.map((item) => ({ label: item.name, value: item.id }));
  const optionsDepartArray = DepartmentsData.value.map((item) => ({ label: item.name, value: item.id }));

  for (const item of formItemsArray) {
    if (item.options) {
      if (item.prop === "roleId") item.options = optionsRolesArray as any;
      if (item.prop === "departmentId") item.options = optionsDepartArray as any;
    }
  }

  return formItemsArray;
});

const { pageModalRef, handleCreateEvent, handleEditClickEvent } = useContentHook();
const { pageContentRef, handleResetAndSearchEvent, fetchUserListDataEvent } = useSearchAndModelHook();
</script>

<style scoped></style>
