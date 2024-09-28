<template>
  <el-card>
    <div slot="header" class="header">
      <div class="headercategory">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio3" size="small">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="main">
      <pie></pie>
    </div>
  </el-card>
</template>

<script>
import pie from "./pie/index.vue";
export default {
  name: "",
  components: { pie },
  data() {
    return {
      radio3: "",
    };
  },
};
</script>

<style scoped>
.headercategory {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -14px;
}
</style>