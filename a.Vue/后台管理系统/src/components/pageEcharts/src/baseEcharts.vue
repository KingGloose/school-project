<template>
  <div class="pageEcharts">
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import ChinaJSON from "../data/china.json";

interface echartsInter {
  echartsConfig: EChartsOption;
}
const props = defineProps<echartsInter>();

// 注册地图
echarts.registerMap("china", ChinaJSON as any);

const echartsRef = ref<HTMLElement>();

onMounted(() => {
  // 实例化echarts
  const echartsInstace = echarts.init(echartsRef.value!, "ligth", {
    renderer: "canvas"
  });

  // 只要响应式数据变化就重新渲染图表
  watchEffect(() => echartsInstace.setOption(props.echartsConfig));

  const handleEchartsResize = () => {
    echartsInstace.resize();
  };
  window.addEventListener("resize", handleEchartsResize);

  // 当卸载之后取消监听
  onUnmounted(() => {
    window.removeEventListener("resize", handleEchartsResize);
  });
});
</script>

<style scoped>
.echarts {
  height: 300px;
}
</style>
