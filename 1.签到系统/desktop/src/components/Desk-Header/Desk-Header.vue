<template>
  <div class="DeskHeader">
    <div class="left">
      <slot></slot>
      <!-- <DeskTabs></DeskTabs> -->
    </div>

    <div class="center">
      <div class="title">{{ title }}</div>
    </div>

    <div class="right">
      <div class="line"></div>

      <div class="min item" @click="deskRightClck(rigthDeskEnum.HeaderMin)">
        <DeskHeaderMin width="20" height="20"></DeskHeaderMin>
      </div>
      <div class="max item" @click="deskRightClck(rigthDeskEnum.HeaderMax)">
        <DeskHeaderFull v-if="isWinFlag" width="20" height="20"></DeskHeaderFull>
        <DeskHeaderWin v-if="!isWinFlag" width="20" height="20"></DeskHeaderWin>
      </div>
      <div
        class="close item"
        @mouseenter="closeColor = closeColorEnum.mouseenterColor"
        @mouseleave="closeColor = closeColorEnum.mouseleaveColor"
        @click="deskRightClck(rigthDeskEnum.HeaderClose)"
      >
        <DeskHeaderClose width="24" height="24" :color="closeColor"></DeskHeaderClose>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { rigthDeskEnum, closeColorEnum } from "@/types/common";

import DeskHeaderMin from "@/assets/svg/Desk-Header-Min.vue";
import DeskHeaderWin from "@/assets/svg/Desk-Header-Win.vue";
import DeskHeaderFull from "@/assets/svg/Desk-Header-Full.vue";
import DeskHeaderClose from "@/assets/svg/Desk-Header-Close.vue";
import DeskTabs from "./cpns/Desk-Tabs.vue";

type DeskHeaderProps = {
  title: string;
};
withDefaults(defineProps<DeskHeaderProps>(), {
  title: ""
});

const isWinFlag = ref(true);
const deskRightClck = (flag: rigthDeskEnum) => {
  switch (flag) {
    case rigthDeskEnum.HeaderMin:
      window.DeskTopHeader.HeaderMin();
      break;
    case rigthDeskEnum.HeaderMax:
      isWinFlag.value = !isWinFlag.value;
      window.DeskTopHeader.HeaderMax();
      break;
    case rigthDeskEnum.HeaderClose:
      window.DeskTopHeader.HeaderClose();
      break;
  }
};

const closeColor = ref(closeColorEnum.mouseleaveColor);
</script>

<style scoped lang="scss">
.DeskHeader {
  height: 60px;

  display: flex;
  align-items: center;

  -webkit-app-region: drag; // 可以拖拽

  .left {
    width: 400px;
    height: 100%;
    /* -webkit-app-region: no-drag; */
  }

  .center {
    flex: 1;

    @include flexAllCenter();
  }

  .right {
    width: 200px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    .line {
      position: absolute;
      left: 0;
      width: 1px;
      height: 20px;
      background-color: #d2d0ce;
    }

    .item {
      width: 43px;
      height: 43px;

      margin: 0 4px;
      border-radius: 10px;

      -webkit-app-region: no-drag;

      @include flexAllCenter();
    }

    .item:hover {
      background-color: #d2d0ce;
    }

    /* 关闭按钮 颜色显示红色 */
    .close.item:hover {
      background-color: #d83b01;
      color: white;
    }
  }
}
</style>
