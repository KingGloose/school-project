<template>
  <div class="navbar">
    <van-nav-bar
      title="房间详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const onClickLeft = () => {
  router.back();
};
</script>

<style scoped>
.navbar {
  --van-nav-bar-text-color: var(--primary-color);
  --van-nav-bar-icon-color: var(--primary-color);
}
</style>
