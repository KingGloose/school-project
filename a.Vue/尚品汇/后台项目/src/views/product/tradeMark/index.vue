<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" @click="showDialog"
      >添加</el-button
    >

    <!-- 数据列表 -->
    <el-table style="width: 100%" border class="table" :data="records">
      <el-table-column label="序号" width="80px" type="index"></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="scope">
          <img
            :src="scope.row.logoUrl"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="scope">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="UpdateDialog(scope.row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="DelDialog(scope.row)"
            >删除</el-button
          >
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
      class="pagination"
    >
    </el-pagination>

    <!-- 添加|修改品牌 -->
    <el-dialog
      :title="TradeMark.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- from表单 -->
      <el-form :model="TradeMark" :rules="rules" ref="formName">
        <!-- frmo表单 收集品牌得名字 -->
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            autocomplete="off"
            style="width: 60%"
            v-model="TradeMark.tmName"
          ></el-input>
        </el-form-item>
        <!-- from表单 收集图片得数据
          action：设置图片上传得地址
          handleAvatarSuccess：当图片执行成功就执行一次
          beforeAvatarUpload：在上传之前执行一次
         -->
        <el-form-item label="品牌名称" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="TradeMark.logoUrl"
              :src="TradeMark.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    // 自定义校验规则
    var validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("输入得名称应该是2-10个"));
      } else {
        callback();
      }
    };
    return {
      page: 1, // 当前页数
      limit: 3, // 每页展示多少数据
      total: 0, // 数据总数
      records: [], // 数据
      dialogFormVisible: false, //控制对话框的显示
      TradeMark: {
        //品牌信息
        tmName: "", //品牌名称
        logoUrl: "", //图片URL
      },
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // 使用自定义得校验规则，具体得规则方式是validateTmName
          { validator: validateTmName, trigger: "change" },
        ],
        logoUrl: [{ required: true, message: "请选择图片" }],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //  获取品牌列表的接口
    async getList(pageNew = 1) {
      this.page = pageNew;
      const { page, limit } = this;
      let result = await this.$API.tradeMark.reqbaseTrademark(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 每页内容个数得限制
    handleSizeChange(limitNew) {
      this.limit = limitNew;
      this.getList();
    },
    // 显示对话框
    showDialog() {
      this.dialogFormVisible = true;
      this.TradeMark = { tmName: "", logoUrl: "" };
    },
    // 修改品牌
    UpdateDialog(row) {
      /*
        因为row时records数据中得一个数据(对象)
        我们直接赋值给对象TradeMark，这样就是浅拷贝
        所以就会修改这里面得值
      */
      this.dialogFormVisible = true;
      this.TradeMark = { ...row };
      // this.AddUpdateTradeMark()
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // res：上传服务器成功，返回这个图片在服务器得地址
      // file：上床服务器成功后服务器返回给前端得信息
      this.TradeMark.logoUrl = res.data;
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加按钮点击确认
    AddUpdateTradeMark() {
      this.$refs.formName.validate(async (valid) => {
        console.log(valid);
        if (valid) {
          this.dialogFormVisible = false;
          let result = await this.$API.tradeMark.reqSaveUpdatebaseTrademark(
            this.TradeMark
          );
          if (result.code == 200) {
            this.$message(this.TradeMark.id ? "修改品牌成功" : "添加品牌成功");
            this.getList();
          }
          this.TradeMark = { tmName: "", logoUrl: "" };
          alert("提交成功");
        } else {
          alert("提交失败");
          return false;
        }
      });
    },
    // 删除品牌
    DelDialog(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.tradeMark.reqRemoveTradeMark(row.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList(this.records.length > 1 ? this.page : this.page - 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.table {
  margin: 10px 0px;
}
.pagination {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>