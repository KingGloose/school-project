<template>
  <div class="login">
    <panel></panel>
  </div>
</template>

<script setup lang="ts">
import panel from "./components/panel.vue";
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;

  background: url("@/assets/img/login-bg.svg");

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
