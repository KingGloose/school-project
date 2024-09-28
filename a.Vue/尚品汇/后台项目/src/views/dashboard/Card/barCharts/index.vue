<template>
  <div class="charts" ref="charts">haahh</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  mounted() {
    let barcharts = echarts.init(this.$refs.charts);
    barcharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
      gird: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip:{},
      color:"#3498db"
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>