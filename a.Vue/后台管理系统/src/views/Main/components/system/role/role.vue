<template>
  <div class="department">
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
      :extraParam="extraParam"
      :header="modelConfig.header"
      :pageName="modelConfig.pageName"
      :formItems="modelConfig.formItems"
      @fetchUserListDataEvent="fetchUserListDataEvent"
    >
      <template #menulist>
        <el-tree
          ref="elTreeRef"
          class="menuListItem"
          node-key="id"
          :data="MenuData"
          :props="defineProps"
          @check="handleMenuListClick"
          show-checkbox
        />
      </template>
    </pageModel>
  </div>
</template>

<script setup lang="ts">
import type { ElTree } from "element-plus";
import { ref, nextTick } from "vue";
import { storeToRefs } from "pinia";

import { mapMenuToId } from "@/utils/map-menu";
import useSystemStore from "@/store/modules/main/system";
import { formatUTC } from "@/utils/format";
import { useContentHook, useSearchAndModelHook } from "@/hooks/usePageHook";

import pageSearch from "@/components/pageSearch/pageSearch.vue";
import pageContent from "@/components/pageContent/pageContent.vue";
import pageModel from "@/components/pageModel/pageModel.vue";
import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

// 获取树形结构
const defineProps = { children: "children", label: "name" };
const systemStore = useSystemStore();
systemStore.getMenuDepartDataPageAction();
const { MenuData } = storeToRefs(systemStore);

// 创建用户时传入菜单值
const extraParam = ref({});
const handleMenuListClick = (currentNode: any, checkNodes: any) => {
  let menuList = [...checkNodes.checkedKeys, ...checkNodes.halfCheckedKeys];
  extraParam.value = { menuList };
};

// 创建新用户时数据清除
const handleClearTreeKeys = () => nextTick(() => elTreeRef.value?.setCheckedKeys([]));
// 新建用户的回调函数
const handleCreateCallBack = () => handleClearTreeKeys();
// 数据回显 - 新建用户的回调函数
const elTreeRef = ref<InstanceType<typeof ElTree>>();
const handleEditCallBack = (itemData: any) => {
  nextTick(() => {
    const ids = mapMenuToId(itemData.menuList);
    elTreeRef.value?.setCheckedKeys(ids);
  });
};

// Hook抽取
const { pageModalRef, handleCreateEvent, handleEditClickEvent } = useContentHook(
  handleEditCallBack,
  handleCreateCallBack
);
const { pageContentRef, handleResetAndSearchEvent, fetchUserListDataEvent } = useSearchAndModelHook();
</script>

<style scoped>
.menuListItem {
  margin-left: -90px;
}
</style>
