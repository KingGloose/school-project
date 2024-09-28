<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <Search></Search>
      </el-col>
      <el-col :span="12">
        <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "./Search/index";
import Category from "./Category/index";

export default {
  name: "",
  components: { Search, Category },
};
</script>

<style scoped>
.card {
  height: 350px;
}
</style>