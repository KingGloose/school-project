<script setup>
import { defineProps } from "vue";

const props = defineProps({
  homeItemInfo: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="homeItemV3Style">
    <div class="homeItenInner">
      <div
        class="img"
        :style="{
          width: homeItemInfo.image.width,
          height: homeItemInfo.image.height,
        }"
      >
        <img :src="homeItemInfo.image.url" alt="" />
      </div>
      <div class="text">
        <div class="location">
          <img src="@/assets/img/home/location.png" />
          <span>{{ homeItemInfo.location }}</span>
        </div>
        <div class="name">{{ homeItemInfo.houseName }}</div>
        <div class="summary">{{ homeItemInfo.summaryText }}</div>
        <div class="price">
          <div class="new">￥{{ homeItemInfo.finalPrice }}</div>
          <div class="old">￥{{ homeItemInfo.productPrice }}</div>
          <div class="tip">{{ homeItemInfo.priceTipBadge?.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homeItemV3Style {
  width: 50%;
}
.homeItemV3Style .homeItenInner {
  margin: 5px;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
}
.homeItemV3Style .homeItenInner img {
  width: 100%;
}
.homeItemV3Style .homeItenInner .text {
  padding: 8px 10px;
  color: #666;
  font-size: 12px;
}
.homeItemV3Style .homeItenInner .text .location {
  display: flex;
  align-items: center;
}
.homeItemV3Style .homeItenInner .text .location img {
  width: 12px;
  height: 12px;
}
.homeItemV3Style .homeItenInner .text .location span {
  margin-left: 2px;
  font-size: 12px;
  color: #666;
}
.homeItemV3Style .homeItenInner .text .name {
  margin: 5px 0;
  font-size: 14px;
  color: #333;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.homeItemV3Style .homeItenInner .text .price {
  display: flex;
  margin: 8px 0;
}
.homeItemV3Style .homeItenInner .text .price .new {
  font-size: 14px;
  color: var(--primary-color);
}
.homeItemV3Style .homeItenInner .text .price .old {
  margin: 0 3px;
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
}
.homeItemV3Style .homeItenInner .text .price .tip {
  background-image: linear-gradient(270deg, #f66, #ff9f9f);
  color: #fff;
  padding: 0 6px;
  border-radius: 8px;
}
</style>
