<template>
  <div class="dashboard">
    <!-- countCard -->
    <el-row :gutter="20">
      <template v-for="item of countlist" :key="item.amount">
        <el-col :xs="24" :sm="12" :lg="6">
          <countCard
            :amount="item.amount"
            :number1="item.number1"
            :number2="item.number2"
            :subtitle="item.subtitle"
            :tips="item.tips"
            :title="item.title"
          ></countCard>
        </el-col>
      </template>
    </el-row>

    <!-- 中间图表 -->
    <el-row :gutter="20">
      <el-col :sm="24" :lg="7">
        <echartsCard header="分类商品数量(饼图)">
          <pieEcharts :data="showGategotyGoods"></pieEcharts>
        </echartsCard>
      </el-col>
      <el-col :sm="24" :lg="10">
        <echartsCard header="分类商品数量(地图)">
          <mapEcharts :mapData="showAddressSale"></mapEcharts>
        </echartsCard>
      </el-col>
      <el-col :sm="24" :lg="7">
        <echartsCard header="分类商品数量(玫瑰图)">
          <roseEcharts :data="showGategotyGoods"></roseEcharts>
        </echartsCard>
      </el-col>
    </el-row>

    <!-- 底部图表 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <echartsCard header="分类商品数量(折线图)">
          <lineEcharts :labels="showCategoryFaver.labels" :values="showCategoryFaver.values"></lineEcharts>
        </echartsCard>
      </el-col>
      <el-col :span="12">
        <echartsCard header="分类商品数量(柱状图)">
          <BarEcharts :labels="showCategoryFaver.labels" :values="showCategoryFaver.values"></BarEcharts>
        </echartsCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { pieEcharts, lineEcharts, roseEcharts, mapEcharts } from "@/components/pageEcharts";
import countCard from "@/views/Main/components/analysis/dashboard/components/countCard.vue";
import echartsCard from "@/views/Main/components/analysis/dashboard/components/echartsCard.vue";
import useAnalysisStore from "@/store/modules/main/analysis";

// countCard - 初始化数据
const analysisStore = useAnalysisStore();
analysisStore.getCountListDataAction();
const { countlist } = storeToRefs(analysisStore);

// echarts - 初始化数据
analysisStore.fetchEchartsDataAction();
const { categoryGoods, categoryFaver, addressSale } = storeToRefs(analysisStore);
// echarts - 数据映射
const showGategotyGoods = computed(() => {
  return categoryGoods.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }));
});
const showCategoryFaver = computed(() => {
  const labels = categoryFaver.value.map((item) => item.name);
  const values = categoryFaver.value.map((item) => item.goodsFavor);

  return { labels, values };
});
const showAddressSale = computed(() => {
  return addressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }));
});
</script>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
