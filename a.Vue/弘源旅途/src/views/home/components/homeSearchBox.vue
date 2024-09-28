<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import useCityStore from "@/stores/modules/city";
import useHomeStore from "@/stores/modules/home";
import useMainStore from "@/stores/modules/main";

import { formateMonthDay, getDiffDays } from "@/utils/format_date";
import { computed } from "@vue/reactivity";

// 获取当前位置
const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("已经获取到地址", res);
    },
    (err) => {
      console.log("没有获取到地址", err);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};

// 跳转至city页面
const router = useRouter();
const getCurrentCity = () => {
  router.push("/city");
};

// 动态展示home页面的city
const cityStore = useCityStore();
const { currentCityInfo } = storeToRefs(cityStore);

// 日期范围处理
const mainStore = useMainStore();
const { startDateShared, endDateShared } = storeToRefs(mainStore);

const startDate = computed(() => formateMonthDay(startDateShared.value));
const endDate = computed(() => formateMonthDay(endDateShared.value));

// 日历选择
const calendarShow = ref(false);
const minDate = new Date();
const dateDiff = ref(1);
const confirmDateRange = (value) => {
  const startSelectDate = value[0];
  const endSelectDate = value[1];

  dateDiff.value = getDiffDays(startSelectDate, endSelectDate);
  startDateShared.value = startSelectDate;
  endDateShared.value = endSelectDate;

  calendarShow.value = false;
};
const dateFormatText = (day) => {
  // 自定义文字
  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }

  return day;
};
const showCalendar = () => {
  calendarShow.value = true;
};

// 获取热门建议/分类
const homeStore = useHomeStore();
homeStore.getHotSuggestsAction();
const { hotSuggests } = storeToRefs(homeStore);

// 搜索按钮
const toSearchViews = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCityInfo: currentCityInfo.value.cityName,
    },
  });
};
</script>

<template>
  <div class="searchBox">
    <!-- 获取位置 -->
    <div class="location">
      <div class="city" @click="getCurrentCity">
        {{ currentCityInfo.cityName }}
      </div>
      <div class="position" @click="getCurrentPosition">
        <span>我的位置</span>
        <img src="@/assets/img/home/icon_location.png" />
      </div>
    </div>
    <!-- 入住时间 -->
    <div class="date" @click="showCalendar">
      <div class="dateStart dateSelect">
        <span>入住</span>
        <span>{{ startDate }}</span>
      </div>
      <div class="dateTotal">
        <span>共 {{ dateDiff }} 晚</span>
      </div>
      <div class="dateEnd dateSelect">
        <span>离店</span>
        <span>{{ endDate }}</span>
      </div>
    </div>
    <van-calendar
      v-model:show="calendarShow"
      @confirm="confirmDateRange"
      :formatter="dateFormatText"
      :min-date="minDate"
      type="range"
      color="#ff9854"
      :round="false"
    />
    <!-- 价格和人数 -->
    <div class="priceCounter">
      <div>价格不限</div>
      <div>人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="searchKey">
      <div>关键字/位置/名宿名</div>
    </div>
    <!-- 热门建议 -->
    <div class="hotSuggest">
      <template v-for="(item, index) of hotSuggests" :key="index">
        <div
          :style="{
            color: item.tagText.color,
            'background-color': item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
    <!-- 搜索按钮 -->
    <div class="searchButton">
      <div @click="toSearchViews">点击搜索</div>
    </div>
  </div>
</template>

<style scoped>
.searchBox {
  --van-calendar-popup-height: 100%;
}
.location {
  height: 44px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.city {
  flex: 1;
}
.position {
  width: 74px;
  display: flex;
  align-items: center;
}
.position span {
  position: relative;
  top: 1px;
  font-size: 12px;
}
.position img {
  margin-left: 5px;
  width: 18px;
  height: 18px;
}

.date {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
}
.dateSelect {
  display: flex;
  flex-direction: column;
}
.dateSelect span:nth-child(1) {
  font-size: 10px;
  color: #999;
}
.dateSelect span:nth-child(2) {
  font-size: 16px;
  font-weight: 500;
}
.priceCounter {
  height: 44px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  color: #999;
  line-height: 44px;
}
.priceCounter div:nth-child(2) {
  margin-right: 20px;
}
.searchKey {
  height: 44px;
  line-height: 44px;
  padding-left: 20px;
  color: #999;
}

.hotSuggest {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 10px;
}
.hotSuggest div {
  padding: 2px 4px;
  margin: 8px;
}

.searchButton {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.searchButton div {
  width: 342px;
  height: 38px;
  max-height: 50px;
  font-weight: 500;
  font-size: 18px;
  line-height: 38px;
  text-align: center;
  border-radius: 20px;
  color: #fff;
  background-image: var(--theme-linear-gradient);
}
</style>
