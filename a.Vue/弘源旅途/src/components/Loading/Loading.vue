<template>
  <div class="Loading">
    <div class="background">
      <img src="@/assets/img/home/full-screen-loading.gif" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.Loading {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
}
.Loading .background {
  display: flex;
  justify-content: center;
  align-self: center;
  width: 104px;
  height: 104px;
  background: url("@/assets/img/home/loading-bg.png") 0 0 / 100% 100%;
}
.Loading .background img {
  width: 70px;
  height: 70px;
  margin-top: 12px;
}
</style>
