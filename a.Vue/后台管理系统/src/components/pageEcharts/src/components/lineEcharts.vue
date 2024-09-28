<template>
  <div class="lineEcharts">
    <baseEcharts :echartsConfig="echartsConfig"></baseEcharts>
  </div>
</template>

<script setup lang="ts">
import baseEcharts from "../baseEcharts.vue";
import type { EChartsOption } from "echarts";
import { computed } from "vue";

interface lineEchartsInter {
  labels: any[];
  values: any[];
}
const props = defineProps<lineEchartsInter>();

const echartsConfig = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: props.labels
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "分类销量统计",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series"
        },
        data: props.values
      }
    ]
  };
});
</script>

<style scoped></style>
