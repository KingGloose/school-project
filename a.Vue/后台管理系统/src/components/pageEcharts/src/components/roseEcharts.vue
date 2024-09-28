<template>
  <div class="roseEcharts">
    <baseEcharts :echartsConfig="echartsConfig"></baseEcharts>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import baseEcharts from "../baseEcharts.vue";

interface roseEchartsInter {
  data: any[];
}
const props = defineProps<roseEchartsInter>();

const echartsConfig = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        // 内半径/外半径的大小
        radius: [10, 160],
        // 设置区域的位置
        center: ["50%", "50%"],
        left: "20%",
        roseType: "area", // 圆心角一样, 通过半径的不同表示大小
        itemStyle: {
          borderRadius: 8
        },
        data: props.data,
        label: {
          show: false
        }
      }
    ]
  };
});
</script>

<style scoped></style>
