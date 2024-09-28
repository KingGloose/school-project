<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  mounted() {
    let linecharts = echarts.init(this.$refs.charts);
    linecharts.setOption({
      title: {
        text: "视频",
        subtext: "123",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    linecharts.on("mouseover", function (params) {
      const { name, value } = params.data;
      linecharts.setOption({
        title: {
          text: name,
          subtext: value,
          left: "center",
          top: "center",
        },
      });
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 300px;
}
</style>