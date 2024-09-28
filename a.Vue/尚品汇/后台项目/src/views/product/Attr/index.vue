<template>
  <div>
    <!-- 三级联动部分 -->
    <el-card class="Elcard">
      <CategorySelect
        @getCategoryList="getCategoryList"
        :isShow="!isShow"
      ></CategorySelect>
    </el-card>
    <!-- 底部展示数据部分 -->
    <el-card class="Elcard">
      <!-- 数据列表 -->
      <div v-show="isShow">
        <!-- 添加按钮 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!CategoryList.Category3Id"
          @click="AddAttrAndShow"
          >添加</el-button
        >
        <!-- 数据列表 -->
        <el-table style="width: 100%" border :data="AttInfoList">
          <!-- 序号 -->
          <el-table-column
            label="序号"
            width="80px"
            type="index"
          ></el-table-column>
          <!-- 属性名称 -->
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="width"
          ></el-table-column>
          <!-- 属性值列表 -->
          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            width="width"
          >
            <template slot-scope="scope">
              <el-tag
                v-for="(a, index) in scope.row.attrValueList"
                :key="index"
                >{{ a.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="scope">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="UpdateAttr(scope.row)"
                >修改</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加|更新数据 -->
      <div v-show="!isShow">
        <el-form ref="form" :inline="true" v-model="attrInfo">
          <!-- 输入属性名 -->
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
          <!-- 属性名操作 -->
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="AddAttrInfo"
            :disabled="!attrInfo.attrName"
            >添加属性值</el-button
          >
          <el-button @click="isShow = true">取消</el-button>
          <!-- 数据展示 -->
          <el-table style="width: 100%" :data="attrInfo.attrValueList" border>
            <!-- 序号 -->
            <el-table-column type="index" label="序号" width="width">
            </el-table-column>
            <!-- 属性值名称 -->
            <el-table-column label="属性值名称" width="width">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.valueName"
                  placeholder="请输入属性值名称"
                  v-if="scope.row.flag"
                  @blur="toLook(scope.row)"
                  @keyup.native.enter="toLook(scope.row)"
                  :ref="scope.$index"
                ></el-input>
                <span v-else @click="toEdit(scope.row, scope.$index)">{{
                  scope.row.valueName
                }}</span>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="width">
              <template slot-scope="scope">
                <el-popconfirm
                  :title="`属性值${scope.row.valueName},确定删除吗？`"
                  @onConfirm="DeleteAttrList(scope.$index)"
                >
                  <el-button
                    icon="el-icon-delete"
                    type="danger"
                    size="mini"
                    slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <!-- 操作 -->
          <el-button
            type="primary"
            @click="SaveAttrInfo"
            :disabled="attrInfo.attrValueList.length < 1"
            >保存</el-button
          >
          <el-button @click="isShow = true">取消</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      AttInfoList: [], //数据列表
      isShow: true, //控制显示和隐藏
      CategoryList: {}, //用来控制添加按钮
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: "",
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 获取数据
    async getCategoryList(CategoryList) {
      const { Category1Id, Category2Id, Category3Id } = CategoryList;
      this.CategoryList = CategoryList
      if (Category3Id) {
        let result = await this.$API.attr.reqAttrInfoList(
          Category1Id,
          Category2Id,
          Category3Id
        );
        if (result.code == 200) {
          this.AttInfoList = result.data;
        }
      } else {
        this.AttInfoList = [];
      }
    },
    // 保存数据
    async SaveAttrInfo() {
      let info = this.attrInfo.attrValueList;
      info = info.filter((item) => {
        if (item.valueName.trim() != "") {
          delete item.flag;
          return true;
        }
      });

      try {
        let result = await this.$API.attr.reqSaveAttrInfo(this.attrInfo);
        this.getCategoryList(this.CategoryList);
        this.isShow = true;
        this.$message({ type: "success", message: "保存成功" });
      } catch {
        this.$message({ type: "warning", message: "保存失败" });
      }
    },
    // 添加属性值
    AddAttrInfo() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 显示|数据置空|获取三级分类id
    AddAttrAndShow() {
      this.isShow = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.Category3Id,
        categoryLevel: 3,
      };
    },
    // 修改属性值
    UpdateAttr(row) {
      this.isShow = false;
      console.log(row);
      this.attrInfo = JSON.parse(JSON.stringify(row));
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    // 切换为非编辑模式
    toLook(row) {
      // 判断是否有相同得属性值
      let flag = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });

      if (row.valueName.trim() == "" || flag) {
        this.$message("请输入正确得属性值");
        return "false";
      } else {
        row.flag = false;
      }
    },
    // 切换为编辑模式
    toEdit(row, index) {
      row.flag = true;
      /*因为节点渲染时需要时间得，所以使用nextTick来确保节点一定渲染成功*/
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    DeleteAttrList(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.Elcard {
  margin: 20px;
}
</style>