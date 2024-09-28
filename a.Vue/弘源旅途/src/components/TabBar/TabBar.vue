<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { getImage } from "../../utils/load_assets";
import tabbarData from "../../assets/data/tabbar";

const route = useRoute();
const currentIndex = ref(0);
watch(route, (newRoute) => {
  const index = tabbarData.findIndex((item) => item.path === newRoute.path);
  if (index == -1) return;
  currentIndex.value = index;
});
</script>

<template>
  <div class="tabbar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) of tabbarData" :key="item.id">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img
              :src="
                getImage(currentIndex === index ? item.imageActive : item.image)
              "
            />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style scoped>
.tabbar img {
  height: 29px;
}
</style>
