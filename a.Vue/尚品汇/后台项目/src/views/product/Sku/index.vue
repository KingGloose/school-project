<template>
  <div>
    <!-- Sku数据展示 -->
    <el-table :data="SkuList" style="width: 100%" border>
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <!-- 名称 -->
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <!-- 描述 -->
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <!-- 默认照片 -->
      <el-table-column prop="skuDefaultImg" label="默认图片" width="width">
        <template slot-scope="scope">
          <img
            :src="scope.row.skuDefaultImg"
            style="width: 100px; heigth: 100px"
          />
        </template>
      </el-table-column>
      <!-- 重量 -->
      <el-table-column prop="weight" label="重量(Kg)" width="width">
      </el-table-column>
      <!-- 价格 -->
      <el-table-column prop="price" label="价格(元)" width="width">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column prop="prop" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-down"
            v-show="scope.row.isSale == 0"
            @click="CancelSku(scope.row)"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-up"
            v-show="scope.row.isSale == 1"
            @click="OnSku(scope.row)"
          ></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="SelectSkuAllInfo(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
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
      :page-count="5"
      layout="prev, pager, next, jumper,->,total, sizes"
      @current-change="getList"
      @size-change="handleSizeChange"
      style="text-align: center"
    >
    </el-pagination>

    <el-drawer :visible.sync="drawer" :direction="direction" size="35%">
      <!-- 名称 -->
      <el-row>
        <el-col :span="6">
          <span>名称：</span>
        </el-col>
        <el-col :span="16">
          <span>{{ SkuAllInfo.skuName }}</span>
        </el-col>
      </el-row>
      <!-- 描述 -->
      <el-row>
        <el-col :span="6">
          <span>描述：</span>
        </el-col>
        <el-col :span="16">
          <span>{{ SkuAllInfo.skuDesc }}</span>
        </el-col>
      </el-row>
      <!-- 价格 -->
      <el-row>
        <el-col :span="6">
          <span>价格：</span>
        </el-col>
        <el-col :span="16">
          <span>{{ SkuAllInfo.price }}</span>
        </el-col>
      </el-row>
      <!-- 平台属性 -->
      <el-row>
        <el-col :span="6">
          <span>平台属性：</span>
        </el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="(s, index) in SkuAllInfo.skuAttrValueList"
              :key="s.id"
              style="margin: 0px 10px; margin-bottom: 10px"
              >{{ s.attrId }} - {{ s.attrName }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <!-- 商品图片 -->
      <el-row>
        <el-col :span="6">
          <span>图片：</span>
        </el-col>
        <el-col :span="16">
          <el-carousel indicator-position="outside">
            <el-carousel-item
              v-for="(s, index) in SkuAllInfo.skuImageList"
              :key="s.id"
            >
              <img :src="s.imgUrl" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      page: 1, // 当前页数
      limit: 10, // 每页展示多少数据
      total: 0, // 数据总数
      SkuList: [], //所有sku的数据
      SkuAllInfo: [],
      drawer: false,
      direction: "rtl",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //  获取Sku列表的接口
    async getList(pageNew = 1) {
      this.page = pageNew;
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuAllList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.SkuList = result.data.records;
      }
    },
    // 每页内容个数得限制
    handleSizeChange(limitNew) {
      this.limit = limitNew;
      this.getList();
    },
    // 上架Sku
    async OnSku(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "上架成功" });
        row.isSale = 0;
      } else {
        this.$message({ type: "error", message: "上架失败" });
      }
    },
    // 下架Sku
    async CancelSku(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "下架成功" });
        row.isSale = 1;
      } else {
        this.$message({ type: "error", message: "下架失败" });
      }
    },
    // 查看Sku的详细信息
    async SelectSkuAllInfo(row) {
      let result = await this.$API.sku.reqGetSkuAllInfo(row.id);
      if (result.code == 200) {
        this.SkuAllInfo = result.data;
        this.drawer = true;
      }
    },
  },
};
</script>

<style scoped>
.el-col-6 {
  text-align: right;
  font-size: 20px;
}
.el-col-16 {
  line-height: 23px;
}
.el-row {
  margin: 20px 0px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>