<template>
  <div>
    <!-- inline：代表行内表单，表示一行有多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" v-model="CategorysId">
      <el-form-item label="一级分类">
        <!-- 
            一级分类里面的:value就是收集你选择的id值，然后放置在
            el-select的CategorysId.Category1Id里面
          -->
        <el-select
          placeholder="请选择"
          v-model="CategorysId.Category1Id"
          @change="OneChange"
          :disabled="isShow"
        >
          <el-option
            :label="co.name"
            :value="co.id"
            v-for="(co, index) in CategoryOne"
            :key="co.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="CategorysId.Category2Id"
          @change="TwoChange"
          :disabled="isShow"
        >
          <el-option
            :label="ct.name"
            :value="ct.id"
            v-for="(ct, index) in CategoryTwo"
            :key="ct.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="CategorysId.Category3Id"
          @change="ThreeChange"
          :disabled="isShow"
        >
          <el-option
            :label="cr.name"
            :value="cr.id"
            v-for="(cr, index) in CategoryThree"
            :key="cr.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['isShow'],
  data() {
    return {
      //  一级分类数据
      CategoryOne: [],
      // 二级分类数据
      CategoryTwo: [],
      // 三级分类数据
      CategoryThree: [],
      // 你选取得分类得数据得id
      CategorysId: {
        Category1Id: "",
        Category2Id: "",
        Category3Id: "",
      },
    };
  },
  mounted() {
    this.GetGategoryList();
  },
  methods: {
    async GetGategoryList() {
      let result = await this.$API.attr.reqCategoryOne();
      if (result.code == 200) {
        this.CategoryOne = result.data;
      }
    },
    //  一级分类改变，获取二级分类数据
    async OneChange() {
      this.CategoryTwo = [];
      this.CategoryThree = [];
      this.CategorysId.Category2Id = "";
      this.CategorysId.Category3Id = "";
      this.$emit('getCategoryList',this.CategorysId)
      let result = await this.$API.attr.reqCategoryTwo(
        this.CategorysId.Category1Id
      );
      if (result.code == 200) {
        this.CategoryTwo = result.data;
      }
    },
    //  二级分类改变，获取二级分类数据
    async TwoChange() {
      this.CategoryThree = [];
      this.CategorysId.Category3Id = "";
      this.$emit('getCategoryList',this.CategorysId)
      let result = await this.$API.attr.reqCategoryThree(
        this.CategorysId.Category2Id
      );
      if (result.code == 200) {
        this.CategoryThree = result.data;
      }
    },
    // 三级分类改变
    ThreeChange() {
      this.$emit('getCategoryList',this.CategorysId)
    },
  },
};
</script>

<style>
</style>