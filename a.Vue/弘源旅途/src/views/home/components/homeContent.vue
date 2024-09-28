<script setup>
import { storeToRefs } from "pinia";
import useHomeStore from "@/stores/modules/home";

import homeItemV9 from "@/components/homeItemV9/homeItemV9.vue";
import homeItemV3 from "@/components/homeItemV3/homeItemV3.vue";
import { useRouter } from "vue-router";

const homeStore = useHomeStore();
const { houseList, currentPage } = storeToRefs(homeStore);

const router = useRouter();
const toHomeItemDetail = (id) => {
  router.push(`/detail/${id}`);
};
</script>

<template>
  <div class="homeContent">
    <div class="title">热门精选</div>
    <div class="content">
      <template v-for="(item, index) of houseList" key="item.city.cityId">
        <template v-if="item.discoveryContentType === 9">
          <homeItemV9
            :homeItemInfo="item.data"
            @click="toHomeItemDetail(item.data.houseId)"
          ></homeItemV9>
        </template>
        <template v-else>
          <homeItemV3
            :homeItemInfo="item.data"
            @click="toHomeItemDetail(item.data.houseId)"
          ></homeItemV3>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.title {
  margin: 10px 20px;
  font-size: 20px;
  font-weight: 700;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
</style>
