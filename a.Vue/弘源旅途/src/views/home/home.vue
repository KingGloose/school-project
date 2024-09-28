<script setup name="home">
import { ref, watch, computed, onActivated } from "vue";

import useScroll from "@/hooks/useScroll";
import useHomeStore from "@/stores/modules/home";

import homeNarBar from "./components/homeNarBar.vue";
import homeSearchBax from "./components/homeSearchBox.vue";
import homeCategories from "./components/homeCategories.vue";
import homeContent from "./components/homeContent.vue";
import searchBar from "@/components/searchBar/searchBar.vue";

const homeStore = useHomeStore();
homeStore.getHouseListAction();

const homeRef = ref();
let { isReachBottom, scrollTop } = useScroll(homeRef);
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.getHouseListAction().then(() => {
      isReachBottom.value = false;
    });
  }
});

// 监听搜索栏的显示
const isShowSearchBar = computed(() => scrollTop.value >= 450);

// 保留首页跳转记录
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  });
});
</script>

<template>
  <div class="home" ref="homeRef">
    <homeNarBar></homeNarBar>
    <div class="Banner">
      <img src="@/assets/img/home/banner.webp" />
    </div>
    <homeSearchBax></homeSearchBax>
    <div class="search" v-if="isShowSearchBar">
      <searchBar></searchBar>
    </div>
    <homeCategories></homeCategories>
    <homeContent></homeContent>
  </div>
</template>

<style scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 50px;
}
.Banner img {
  width: 100%;
}
.search {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
