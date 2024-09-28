<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const { startDate, endDate, currentCityInfo } = route.query;
console.log(startDate, endDate, currentCityInfo);
</script>

<template>search页面</template>

<style scoped></style>
