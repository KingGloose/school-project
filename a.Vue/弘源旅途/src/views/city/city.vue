<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import cityGroup from "./components/cityGroup.vue";

import useCityStore from "@/stores/modules/city";

const router = useRouter();

// 搜索栏
const searchValue = ref("");
const onSearch = () => {};
const onCancel = () => {
  router.back();
};

// tab切换
const tabActive = ref("");

// 城市列表
const cityStore = useCityStore();
cityStore.getCityAllAction();
const { cityList } = storeToRefs(cityStore);

const currentCityGroup = computed(() => cityList.value[tabActive.value]);
</script>

<template>
  <div class="city">
    <div class="top">
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        show-action
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
      />
      <van-tabs v-model:active="tabActive">
        <template v-for="(value, key, index) in cityList" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in cityList" :key="key">
        <cityGroup :cityData="value" v-show="key === tabActive"></cityGroup>
      </template>
    </div>
  </div>
</template>

<style scoped>
.city {
  --van-search-left-icon-color: var(--primary-color);
  --van-tabs-bottom-bar-color: var(--primary-color);
}
.city .content {
  height: calc(100vh - 98px);
  overflow-y: auto;
}
</style>
