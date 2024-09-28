<script setup>
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";

const homeStore = useHomeStore();
homeStore.getCategoriesAction();
const { categories } = storeToRefs(homeStore);
</script>

<template>
  <div class="homeCategories">
    <template v-for="item of categories" :key="item.id">
      <div class="CategoriesItem">
        <img :src="item.pictureUrl" />
        <div>{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.homeCategories {
  display: flex;
  overflow-x: auto;
  margin: 10px;
  height: 70px;
}
.homeCategories::-webkit-scrollbar {
  display: none;
}
.CategoriesItem {
  flex-shrink: 0;
  width: 70px;
  text-align: center;
}
.CategoriesItem img {
  width: 32px;
  height: 32px;
}
.CategoriesItem div {
  margin-top: 2px;
}
</style>
