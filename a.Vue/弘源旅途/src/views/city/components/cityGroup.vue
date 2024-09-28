<script setup>
import useCityStore from "@/stores/modules/city";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const props = defineProps({
  cityData: {
    type: Object,
    default: () => ({}),
  },
});

// 动态索引
const indexBar = computed(() => {
  let list = props.cityData.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});

// 监听点击城市获取信息
const router = useRouter();
const cityStore = useCityStore();
const getCityInfo = (city) => {
  cityStore.currentCityInfo = city;
  router.back();
};
</script>

<template>
  <div class="cityGroup">
    <van-index-bar :sticky="false" :index-list="indexBar">
      <!-- 热门 -->
      <van-index-anchor index="热门" />
      <div class="hotCityList">
        <template v-for="(item, index) of cityData.hotCities" :key="index">
          <div class="hotCity" @click="getCityInfo(item)">
            {{ item.cityName }}
          </div>
        </template>
      </div>

      <!-- 城市列表 -->
      <template v-for="(item, index) of cityData.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="(itemlist, index) of item.cities" :key="index">
          <van-cell :title="itemlist.cityName" @click="getCityInfo(itemlist)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<style scoped>
.hotCityList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;
}
.hotCityList .hotCity {
  width: 70px;
  height: 28px;
  border-radius: 14px;
  font-size: 12px;
  color: #000;
  text-align: center;
  line-height: 28px;
  background-color: #fff4ec;
  margin-top: 12px;
}
</style>
