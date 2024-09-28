<template>
  <div>
    <!-- 三级分类 -->
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryList="getCategoryList"
        :isShow="scene != 0"
      ></CategorySelect>
    </el-card>

    <!-- 主要内容展示 -->
    <el-card>
      <!-- 数据展示 -->
      <div v-show="scene == 0">
        <!-- 添加 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!Category3Id"
          @click="AppSpu"
          >添加Spu</el-button
        >
        <!-- 数据展示 -->
        <el-table style="width: 100%" border :data="records">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <!-- Spu名称 -->
          <el-table-column prop="spuName" label="Spu名称" width="width">
          </el-table-column>
          <!-- Spu描述 -->
          <el-table-column prop="description" label="Spu描述" width="width">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="width">
            <template slot-scope="scope">
              <!-- 添加Sku -->
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加Sku"
                @click="AddSku(scope.row)"
              ></el-button>
              <!-- 修改Spu -->
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="添加Spu"
                @click="UpdateSpu(scope.row)"
              ></el-button>
              <!-- 查看当前Spu全部Sku列表 -->
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前Spu全部Sku列表"
                @click="SelectSpuInSku(scope.row)"
              ></el-button>
              <!-- 删除Spu -->
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="DeleteSpu(scope.row)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除Spu"
                  slot="reference"
                  style="margin-left: 10px"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器
        分页器需要知道的数据
        1、当前第几页：:current-page="pageNum"
        2、数据总数：:total
        3、每页多少个数据：:page-size
        4、页数
     -->
        <el-pagination
          :current-page="page"
          :total="total"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          layout="prev, pager, next, jumper,->,total, sizes"
          @current-change="getList"
          @size-change="handleSizeChange"
          style="text-align: canter"
        >
        </el-pagination>
      </div>
      <!-- 添加Spu -->
      <SpuForm
        v-show="scene == 1"
        @ChangeScene="ChangeScene"
        ref="spu"
      ></SpuForm>
      <!-- 添加Sku -->
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @ChangeScene="ChangeScene"
      ></SkuForm>
    </el-card>

    <!-- 展示Spu下的Sku -->
    <el-dialog
      :title="`${SpuName}的Sku商品`"
      :visible.sync="dialogTableVisible"
      :before-close="CloseTable"
    >
      <el-table
        :data="SkuInfoList"
        width="100%"
        border
        v-loading="loading"
      >
        <el-table-column
          property="skuName"
          label="名称"
          width="width"
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="width"
        ></el-table-column>
        <el-table-column
          property="weight"
          label="重量"
          width="width"
        ></el-table-column>
        <el-table-column
          property="skuDefaultImg"
          label="默认图片"
          width="width"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.skuDefaultImg"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./SpuForm/index";
import SkuForm from "./SkuForm/index";

export default {
  name: "",
  components: { SpuForm, SkuForm },
  data() {
    return {
      isShow: true, //三级联动可用性
      records: [], //数据
      page: 1, //当前是第几页
      limit: 3, //一页有多少数据
      total: 0, //一共多少个数据
      Category3Id: "",
      CategoryList: "",
      scene: 0, //控制展示场景  0.数据展示 1.添加Spu|修改Spu  2.添加Sku
      dialogTableVisible: false,
      SpuName: "",
      SkuInfoList: [],
      loading: true,
    };
  },
  methods: {
    // 获取三级联动数据
    async getCategoryList(CategoryList) {
      const { Category3Id } = CategoryList;
      if (Category3Id) {
        this.Category3Id = Category3Id;
        this.CategoryList = CategoryList;
        this.getSpuList();
      }
    },
    // 获取Spu列表数据得方法
    async getSpuList() {
      const { page, limit, Category3Id } = this;
      let result = await this.$API.spu.reqSpuInfo(page, limit, Category3Id);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    //  获取Spu分页器
    getList(pageNew = 1) {
      this.page = pageNew;
      this.getSpuList();
    },
    // 每页内容个数得限制
    handleSizeChange(limitNew) {
      this.limit = limitNew;
      this.getSpuList();
    },
    // 添加Spu|修改Spu
    AppSpu() {
      this.scene = 1;
      this.$refs.spu.GetSimInfo(this.Category3Id);
    },
    // 更新Spu
    UpdateSpu(row) {
      this.scene = 1;
      this.$refs.spu.GetInfo(row);
    },
    // 修改scene
    ChangeScene({ scene, flag }) {
      // 这里的flag控制是否保持原页
      this.scene = scene;
      flag
        ? this.getList()
        : this.getList(this.records.length > 1 ? this.page : this.page - 1);
      this.getSpuList();
    },
    //删除spu
    async DeleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      } else {
        this.$message({ type: "error", message: "删除失败" });
      }
    },
    // 添加Sku
    AddSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(row, this.CategoryList);
    },
    // 查看Spu下的Sku
    async SelectSpuInSku(row) {
      this.SpuName = row.spuName;
      this.dialogTableVisible = true;
      let result = await this.$API.sku.reqFindBySpuId(row.id);
      if (result.code == 200) {
        this.SkuInfoList = result.data;
        this.loading = false;
      }
    },
    // 关闭dialog回调函数
    CloseTable(done) {
      this.loading = true;
      this.SkuInfoList = [];
      done()
    },
  },
};
</script>

<style>
</style>