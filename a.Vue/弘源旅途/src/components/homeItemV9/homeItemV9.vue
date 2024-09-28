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
  <div class="homeItemV9Style">
    <div class="homeItenInner">
      <div class="img">
        <img :src="homeItemInfo?.image?.url" alt="" />
      </div>
      <div class="text">
        <div class="summary">{{ homeItemInfo.summaryText }}</div>
        <div class="name">{{ homeItemInfo.houseName }}</div>
        <div class="price">
          <van-rate
            :modelValue="Math.floor(homeItemInfo.commentScore)"
            color="#fff"
            :size="15"
            allow-half
            readonlyF
          />
          <div class="new">￥{{ homeItemInfo.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homeItemV9Style {
  width: 50%;
}
.homeItemV9Style .homeItenInner {
  margin: 5px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  background: #fff;
}
.homeItemV9Style .homeItenInner img {
  width: 100%;
}
.homeItemV9Style .homeItenInner .text {
  position: absolute;
  bottom: 0;
  padding: 8px 10px;
  color: #fff;
  font-size: 12px;
}
.homeItemV9Style .homeItenInner .text .name {
  margin: 5px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.homeItemV9Style .homeItenInner .text .price {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
