<template>
  <div class="DeskTabs">
    <div class="tab" ref="tabRef">
      <div class="tab-item active">签到</div>
      <div class="tab-item">查看</div>
      <div class="tab-item">编辑</div>
    </div>
    <div class="block"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";

const tabRef = ref<HTMLDivElement>();
nextTick(() => {
  const childrens = tabRef.value?.children;
  console.log(childrens);
});
</script>

<style scoped lang="scss">
.DeskTabs {
  width: 100%;
  height: 100%;

  @include flexAllCenter();

  .tab {
    width: 100%;
    height: 100%;
    @include flexAllCenter();

    .tab-item {
      text-align: center;
      font-size: 19px;
      margin: 0 20px;
    }
  }
}
</style>
