<template>
  <div>
    <el-form ref="form" label-width="80px">
      <!-- Spu名称 -->
      <el-form-item label="Spu名称"> {{ SpuName }} </el-form-item>
      <!-- Sku名称 -->
      <el-form-item label="Sku名称">
        <el-input placeholder="请输入" v-model="SkuInfo.skuName"></el-input>
      </el-form-item>
      <!-- 价格 -->
      <el-form-item label="价格">
        <el-input
          placeholder="价格(元)"
          v-model="SkuInfo.price"
          type="number"
        ></el-input>
      </el-form-item>
      <!-- 重量 -->
      <el-form-item label="重量">
        <el-input placeholder="重量(千克)" v-model="SkuInfo.weight"></el-input>
      </el-form-item>
      <!-- 规格描述 -->
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          rows="4"
          v-model="SkuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <el-form ref="form" label-width="80px" inline>
          <el-form-item
            :label="a.attrName"
            v-for="(a, index) in AttrInfo"
            :key="a.id"
            style="margin-bottom: 20px"
          >
            <el-select placeholder="请选择" v-model="a.AttrInfoId">
              <el-option
                :label="s.valueName"
                v-for="(s, index) in a.attrValueList"
                :key="s.id"
                :value="`${a.id}:${s.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-form ref="form" label-width="80px" inline>
          <el-form-item
            :label="s.saleAttrName"
            v-for="(s, index) in SpuSaleAttr"
            :key="s.id"
            style="margin-bottom: 20px"
          >
            <el-select placeholder="请选择" v-model="s.AttrSaleInfoId">
              <el-option
                :label="v.saleAttrValueName"
                v-for="(v, index) in s.spuSaleAttrValueList"
                :key="v.id"
                :value="`${s.id}:${v.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 图片列表 -->
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          :data="SpuImage"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="imgUrl" label="图片" width="width">
            <template slot-scope="scope">
              <img
                :src="scope.row.imgUrl"
                style="width: 200px; height: 200px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
            <template slot-scope="scope">
              {{ scope.row.imgName }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                v-show="scope.row.isDefault == 0"
                @click="SetDefault(scope.row)"
                >设为默认</el-button
              >
              <el-button size="mini" v-show="scope.row.isDefault == 1"
                >默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 操作 -->
      <el-form-item label="操作">
        <el-button type="primary" @click="SaveSkuInfo">保存</el-button>
        <el-button @click="CancelSku">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      SpuName: "",
      SpuImage: [],
      SpuSaleAttr: [],
      AttrInfo: [],
      imageList: [],
      SkuInfo: {
        category3Id: 0,
        spuId: 0,
        tmId: 0,

        price: 0,
        weight: "",
        skuName: "",
        skuDesc: "",

        skuDefaultImg: "",
        skuImageList: [],
        skuAttrValueList: [],
        skusaleAttrValueList: [],
      },
    };
  },
  methods: {
    async getData(row, { Category1Id, Category2Id, Category3Id }) {
      // 获取图片接口
      let SpuImage = await this.$API.sku.reqSpuImageList(row.id);
      if (SpuImage.code == 200) {
        this.SpuImage = SpuImage.data;
      }
      this.SpuImage.forEach((item) => {
        this.$set(item, "isDefault", "0");
      });
      // 获取销售属性
      let SpuSaleAttr = await this.$API.sku.reqSpuSaleAttrList(row.id);
      if (SpuSaleAttr.code == 200) {
        this.SpuSaleAttr = SpuSaleAttr.data;
      }
      // 获取属性信息
      let AttrInfo = await this.$API.sku.reqAttrInfoList(
        Category1Id,
        Category2Id,
        Category3Id
      );
      if (AttrInfo.code == 200) {
        this.AttrInfo = AttrInfo.data;
      }

      this.SpuName = row.spuName;
      this.SkuInfo.category3Id = row.category3Id;
      this.SkuInfo.spuId = row.id;
      this.SkuInfo.tmId = row.tmId;
    },
    // 设置默认
    SetDefault(row) {
      this.SpuImage.forEach((item) => {
        item.isDefault = "0";
      });
      row.isDefault = "1";
      console.log(row);
      this.SkuInfo.skuDefaultImg = row.imgUrl;
    },
    //选择图片
    handleSelectionChange(selection) {
      this.imageList = selection;
    },
    // 保存Sku
    async SaveSkuInfo() {
      const { SpuSaleAttr, AttrInfo, imageList, SkuInfo } = this;
      AttrInfo.forEach((item) => {
        if (item.AttrInfoId) {
          const [attrId, valueId] = item.AttrInfoId.split(":");
          SkuInfo.skuAttrValueList.push({ attrId, valueId });
        }
      });

      SpuSaleAttr.forEach((item) => {
        if (item.AttrSaleInfoId) {
          const [saleAttrId, saleAttrValueId] = item.AttrSaleInfoId.split(":");
          SkuInfo.skusaleAttrValueList.push({
            saleAttrId,
            saleAttrValueId,
          });
        }
      });

      SkuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      let result = await this.$API.sku.reqSaveSkuInfo(SkuInfo);
      if (result.code == 200) {
        this.CancelSku();
        this.$message({ type: "success", message: "保存成功" });
      } else {
        this.$message({ type: "warning", message: "保存失败" });
        return;
      }
    },
    // 点击取消，切换场景
    CancelSku() {
      this.$emit("ChangeScene", { scene: 0, flag: false });
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
</style>