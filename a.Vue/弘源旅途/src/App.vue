<script setup>
import { useRoute } from "vue-router";
import useMainStore from "./stores/modules/main";

import Loading from "./components/Loading/Loading.vue";
import TabBar from "./components/TabBar/TabBar.vue";
import { ref } from "vue";

const route = useRoute();
const mainStore = useMainStore();
</script>

<template>
  <Loading v-show="mainStore.isLoading"></Loading>

  <RouterView v-slot="props">
    <KeepAlive include="home">
      <component :is="props.Component"></component>
    </KeepAlive>
  </RouterView>
  <TabBar v-show="!route.meta.hideTabbar"></TabBar>
</template>

<style scoped></style>
