<template>
  <div class="count-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="countRef1">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="countRef2">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from "countup.js";
import { ref, onMounted } from "vue";

interface countListInter {
  amount: string;
  number1: number;
  number2: number;
  subtitle: string;
  tips: string;
  title: string;
}

const props = defineProps<countListInter>();

// 设置滚动数字
const countRef1 = ref<HTMLElement>();
const countRef2 = ref<HTMLElement>();

onMounted(() => {
  const countConfig = {
    prefix: props.amount === "saleroom" ? "￥" : ""
  };

  const countUp1 = new CountUp(countRef1.value!, props.number1, countConfig);
  const countUp2 = new CountUp(countRef2.value!, props.number2, countConfig);

  countUp1.start();
  countUp2.start();
});
</script>

<style scoped lang="less">
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 10px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
