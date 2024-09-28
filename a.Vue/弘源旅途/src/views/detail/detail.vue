<template>
  <div class="homeItemDetail" ref="detailRef">
    <div class="tabControl" v-if="isShowTabControl">
      <tabControl
        :titles="names"
        @ChangeNameEmit="ChangeName"
        ref="tabControlRef"
      ></tabControl>
    </div>
    <NavBar></NavBar>
    <div class="main" v-if="mainPart" v-memo="['mainPart']">
      <Swiper :swiperData="mainPart.topModule.housePicture.housePics"></Swiper>
      <Infos
        :topInfos="mainPart.topModule"
        :ref="getSelectRef"
        name="详情"
      ></Infos>
      <Facility
        :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility"
        :ref="getSelectRef"
        name="设施"
      ></Facility>
      <Landlord
        :landlord="mainPart.dynamicModule.landlordModule"
        :ref="getSelectRef"
        name="房东"
      ></Landlord>
      <Comment
        :comment="mainPart.dynamicModule.commentModule"
        :ref="getSelectRef"
        name="评论"
      ></Comment>
      <Notice
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
        :ref="getSelectRef"
        name="须知"
      ></Notice>
      <Map
        :position="mainPart.dynamicModule.positionModule"
        :ref="getSelectRef"
        name="地图"
      ></Map>
      <Intro :price-intro="mainPart.introductionModule"></Intro>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { getHomeItemDetail } from "../../services";

import NavBar from "./components/01_NavBar.vue";
import Swiper from "./components/02_Swiper.vue";
import Infos from "./components/03_infos.vue";
import Facility from "./components/04_facility.vue";
import Landlord from "./components/05_landlord.vue";
import Comment from "./components/06_comment.vue";
import Notice from "./components/07_notice.vue";
import Map from "./components/08_map.vue";
import Intro from "./components/09_intro.vue";
import tabControl from "@/components/tabControl/tabControl.vue";

import useScroll from "@/hooks/useScroll";

// 路由跳转获取参数
const route = useRoute();
const { id } = route.params;
const homeItemDetail = ref({});
const mainPart = computed(() => homeItemDetail.value.mainPart);
getHomeItemDetail(id).then((res) => {
  homeItemDetail.value = res.data;
});

// tabControl显示控制
const detailRef = ref();
let { scrollTop } = useScroll(detailRef);
const isShowTabControl = computed(() => scrollTop.value >= 300);

const selectEl = ref({});
const getSelectRef = (value) => {
  if (!value) return;
  const name = value.$el.getAttribute("name");
  if (!selectEl.value[name]) selectEl.value[name] = value.$el;
};
const names = computed(() => Object.keys(selectEl.value));

let isClick = false;
let currentDistance = -1;
const ChangeName = (index) => {
  const keys = Object.keys(selectEl.value)[index];
  let distance = selectEl.value[keys].offsetTop;
  if (index !== 0) distance -= 40;

  isClick = true;
  currentDistance = distance;

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth",
  });
};

const tabControlRef = ref();
watch(scrollTop, (newValue) => {
  if (currentDistance === newValue) {
    isClick = false;
  }
  console.log(currentDistance, newValue, isClick);
  if (isClick) return;

  const keys = Object.keys(selectEl.value);
  const values = keys.map((item) => selectEl.value[item].offsetTop);

  let index = values.length - 1;
  for (let i = 0; i < values.length; i++) {
    if (newValue < values[i] - 44) {
      index = i - 1;
      break;
    }
  }

  const currentIndex = tabControlRef.value?.getCurrentIndex();
  if (index !== currentIndex) {
    tabControlRef.value?.setCurrentIndex(index);
  }
});
</script>

<style scoped lang="less">
.homeItemDetail {
  height: 100vh;
  overflow-y: auto;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
.tabControl {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}
</style>
