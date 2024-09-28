<template>
  <div class="pieEcharts">
    <baseEcharts :echartsConfig="echartsConfig"></baseEcharts>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";

import baseEcharts from "../baseEcharts.vue";

interface pieEchartsInter {
  data: any[];
}
const props = defineProps<pieEchartsInter>();

const echartsConfig = computed<EChartsOption>(() => {
  return {
    // 手指放上去的时候显示的文本
    tooltip: {
      trigger: "item"
    },
    // 图例:
    legend: {
      orient: "horizontal",
      left: "left"
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "50%",
        bottom: "-10%",
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
});
</script>

<style scoped></style>
