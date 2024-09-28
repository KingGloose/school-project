<template>
  <div>
    <el-form ref="form" label-width="80px">
      <!-- Spu名称 -->
      <el-form-item label="Spu名称">
        <el-input placeholder="请输入" v-model="spu.spuName"></el-input>
      </el-form-item>
      <!-- 品牌 -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择" v-model="spu.tmId">
          <el-option
            :label="t.tmName"
            :value="t.id"
            v-for="(t, index) in Trademark"
            :key="t.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- Spu描述 -->
      <el-form-item label="Spu描述">
        <el-input
          placeholder="请输入"
          type="textarea"
          rows="4"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <!-- 
        Spu图片 action:图片上传得地址
        on-preview 图片预览功能
        on-remove 图片删除
      -->
      <el-form-item label="Spu图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="SpuImage"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <!-- 提供得3种销售属性 -->
        <el-select
          :placeholder="`还剩下${unselectsaleAttr.length}没选择`"
          v-model="attrInfo"
        >
          <el-option
            :label="s.name"
            :value="`${s.id}:${s.name}`"
            v-for="(s, index) in unselectsaleAttr"
            :key="s.id"
          ></el-option>
        </el-select>
        <!-- 添加销售属性 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 20px"
          :disabled="!attrInfo"
          @click="AddSaleAttr"
          >添加销售属性</el-button
        >
        <!-- 销售属性展示 -->
        <el-table
          style="width: 100%; margin-top: 20px"
          border
          :data="spu.spuSaleAttrList"
        >
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <!-- 属性名 -->
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <!-- 属性名列表 -->
          <el-table-column label="属性名称列表" width="width">
            <template slot-scope="scope">
              <!-- tag -->
              <el-tag
                :key="s.id"
                v-for="s in scope.row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(s, scope.row.spuSaleAttrValueList)"
              >
                {{ s.saleAttrValueName }}
              </el-tag>
              <!-- 添加tag -->
              <el-input
                class="input-new-tag"
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <!-- 显示添加 -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(scope.row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="DeleteAttr(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 保存|取消 -->
      <el-form-item>
        <el-button type="primary" @click="SaveSpuInfo">保存</el-button>
        <el-button @click="CancelAddUpdate">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuImageList: [],
        spuName: "",
        spuSaleAttrList: [],
        tmId: "",
      },
      Trademark: [],
      SpuImage: [],
      SaleAttr: [],
      attrInfo: [],
    };
  },
  computed: {
    unselectsaleAttr() {
      let result = this.SaleAttr.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
  methods: {
    // 保存
    async SaveSpuInfo() {
      this.spu.spuImageList = this.SpuImage.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      let result = await this.$API.spu.reqSaveUpdateSpu(this.spu);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("ChangeScene", {
          scene: 0,
          flag: this.spu.id ? true : false,
        });
        Object.assign(this._data, this.$options.data());
      } else {
        this.$message("保存失败");
      }
    },
    // 获取数据
    async GetInfo(info) {
      // 获取Spu信息
      let spuinfo = await this.$API.spu.reqSpuIdInfo(info.id);
      if (spuinfo.code == 200) {
        this.spu = spuinfo.data;
      }
      // 获取品牌信息
      let TrademarkInfo = await this.$API.spu.reqTrademarkList();
      if (TrademarkInfo.code == 200) {
        this.Trademark = TrademarkInfo.data;
      }

      // 获取Sku图片
      let SpuImageInfo = await this.$API.spu.reqSpuImageList(info.id);
      if (SpuImageInfo.code == 200) {
        console.log(SpuImageInfo.data);
        let ArrImage = SpuImageInfo.data;
        ArrImage.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.SpuImage = ArrImage;
      }

      // 获取品牌属性
      let SaleAttrInfo = await this.$API.spu.reqBaseSaleAttrList();
      if (SaleAttrInfo.code == 200) {
        this.SaleAttr = SaleAttrInfo.data;
      }
    },
    // 照片删除
    handleRemove(file, fileList) {
      this.SpuImage = fileList;
    },
    // 照片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传成功
    handleSuccess(response, file, fileList) {
      if (response.code == 200) {
        this.SpuImage = fileList;
      } else {
        this.$message("上传失败");
      }
    },
    // 取消按钮
    CancelAddUpdate() {
      this.$emit("ChangeScene", { scene: 0, flag: this.spu.id ? true : false });
      Object.assign(this._data, this.$options.data());
    },
    // 添加销售属性
    AddSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrInfo.split(":");
      let newArr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
      this.spu.spuSaleAttrList.push(newArr);
      this.attrInfo = "";
    },
    // 删除属性值
    handleClose(tag, tags) {
      tags.splice(tags.indexOf(tag), 1);
    },
    // 添加按钮得回调
    showInput(row, index) {
      this.$set(row, "inputVisible", true);
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 失去焦点事件
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      if (newSaleAttrValue.saleAttrValueName.trim() == "") {
        this.$message("属性值不能为空");
      }
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) {
        this.$message("属性值不能一样");
        return;
      }
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
      this.newSaleAttrValue = "";
      row.inputValue = "";
    },
    // 删除属性
    DeleteAttr(row) {
      this.spu.spuSaleAttrList.splice(this.spu.spuSaleAttrList.indexOf(row), 1);
    },
    // 获取数据(简化：用于添加)
    async GetSimInfo(Category3Id) {
      // 获取品牌信息
      let TrademarkInfo = await this.$API.spu.reqTrademarkList();
      if (TrademarkInfo.code == 200) {
        this.Trademark = TrademarkInfo.data;
      }
      // 获取品牌属性
      let SaleAttrInfo = await this.$API.spu.reqBaseSaleAttrList();
      if (SaleAttrInfo.code == 200) {
        this.SaleAttr = SaleAttrInfo.data;
      }
      // 添加三级分类id
      this.spu.category3Id = Category3Id;
    },
  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>