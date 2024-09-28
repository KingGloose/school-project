<template>
  <el-card class="box-card">
    <!-- 头部切换部分 -->
    <div class="clearfix" slot="header">
      <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="Sales"> </el-tab-pane>
        <el-tab-pane label="访问量" name="Visits"> </el-tab-pane>
      </el-tabs>
      <div class="boxtab">
        <span @click="setToday">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">今年</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="|"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 底部数据展示 -->
    <div class="content">
      <el-row :gutter="10">
        <!-- 左边图标显示 -->
        <el-col :span="19">
          <div class="charts" ref="SalesCharts"></div>
        </el-col>
        <!-- 右边门店显示 -->
        <el-col :span="5">
          <div class="mendian">
            <h3>门店{{ ActiveName }}排名</h3>
            <ul>
              <li>
                <span class="rindex">1</span>
                <span>肯德基</span>
                <span class="rvalue">323,125</span>
              </li>
              <li>
                <span class="rindex">2</span>
                <span>麦当劳</span>
                <span class="rvalue">323,125</span>
              </li>
              <li>
                <span class="rindex">3</span>
                <span>汉堡王</span>
                <span>323,125</span>
              </li>
              <li>
                <span>4</span>
                <span>汉江山</span>
                <span>323,125</span>
              </li>
              <li>
                <span>5</span>
                <span>华莱士</span>
                <span>323,125</span>
              </li>
              <li>
                <span>6</span>
                <span>七个堡</span>
                <span>323,125</span>
              </li>
              <li>
                <span>7</span>
                <span>超牛堡</span>
                <span>323,125</span>
              </li>
              <li>
                <span>8</span>
                <span>北区食堂</span>
                <span>323,125</span>
              </li>
              <li>
                <span>9</span>
                <span>南区食堂</span>
                <span>323,125</span>
              </li>
              <li>
                <span>10</span>
                <span>海底捞</span>
                <span>323,125</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      activeName: "Sales",
      barcharts: null,
      date: [],
    };
  },
  computed: {
    ActiveName() {
      return this.activeName == "Sales" ? "销售额" : "访问量";
    },
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  watch: {
    activeName() {
      this.barcharts.setOption({
        title: {
          text: this.ActiveName + "趋势",
        },
        xAxis: {
          data:
            this.ActiveName == "销售额"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.ActiveName == "销售额"
                ? this.listState.orderFullYear
                : this.listState.userFullYear,
            color: "#1e90ff",
          },
        ],
      });
    },
    listState() {
      this.barcharts.setOption({
        title: {
          text: this.ActiveName + "趋势",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.listState.orderFullYearAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: this.listState.orderFullYear,
            color: "#1e90ff",
          },
        ],
      });
    },
  },
  mounted() {
    this.barcharts = echarts.init(this.$refs.SalesCharts);
    this.barcharts.setOption({
      title: {
        text: this.ActiveName + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
          color: "#1e90ff",
        },
      ],
    });
  },
  methods: {
    setToday() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.box-card >>> .el-card__header {
  border-bottom: none;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tabs {
  width: 100%;
}
.boxtab {
  position: absolute;
  right: 0px;
}
.boxtab span {
  margin-right: 20px;
  font-size: 15px;
}
.charts {
  width: 100%;
  height: 300px;
}
.mendian {
  margin-top: -50px;
}
.mendian ul {
  width: 100%;
  height: 300px;
  list-style: none;
  padding: 0px;
}
.mendian ul li {
  height: 10%;
}
.mendian .rindex {
  float: left;
  height: 18px;
  width: 18px;
  text-align: center;
  border-radius: 50%;
  background-color: black;
  color: white;
}
.mendian ul li > span:nth-child(1) {
  margin-right: 5px;
}
.mendian ul li > span:nth-child(3) {
  float: right;
}
.mendian ul li > span:nth-child(1):not(.rindex) {
  margin-left: 7px;
}
</style>