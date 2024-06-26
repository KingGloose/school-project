<template>
  <div style="min-height: calc(100vh - 70px)">

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd" > 新增救助信息</el-button>
    </div>

    <el-table :data="tableData" stripe :show-header="false"  style="border-radius: 10px">
      <el-table-column label="图片" width="150"><template slot-scope="scope"><el-image style="width: 100px; height: 100px"
            :src="$store.state.baseApi + scope.row.img"
            :preview-src-list="[$store.state.baseApi + scope.row.img]"></el-image></template></el-table-column>
      <el-table-column prop="information" label="情况描述"></el-table-column>
      <el-table-column prop="address" label="地点"></el-table-column>
      <el-table-column prop="time" label="发现时间"></el-table-column>
      <el-table-column prop="person" label="联系人"></el-table-column>
      <el-table-column prop="phone" label="联系方式"></el-table-column>
      <el-table-column prop="state" label="解决状态"></el-table-column>
    </el-table>
    <div style="margin: 10px 0; padding: 10px; background-color: #fff">
      <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageNum" :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>


    <div style="margin: 10px 0">
      <div class="rescueFind"> 救助站</div>
      <!-- 救助站模块-->
      <rescue></rescue>
    </div>

    <div style="margin: 10px 0">
      <div class="feed"> 宠物喂养点</div>
      <!-- 救助站模块-->
      <feed></feed>
    </div>

    <el-dialog title="信息" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form label-width="100px"  style="width: 90%">
        <el-form-item label="情况描述" >
          <el-input v-model="form.information" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现场照片">
          <el-upload :action="$store.state.baseApi + '/file/upload'" ref="img" :on-success="handleImgUploadSuccess">
            <el-button  type="primary"> 点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="地点">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发现时间">
          <el-date-picker v-model="form.time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.person" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" > 取 消</el-button>
        <el-button type="primary" @click="save" > 确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import rescue from '@/components/front/Rescue.vue'
import feed from '@/components/front/Feed.vue'
export default {
  name: "Salvation",
  components: {
    rescue,
    feed
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      name: "",
      form: {},
      dialogFormVisible: false,
      multipleSelection: [],
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/salvation/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save() {
      this.request.post("/salvation", this.form).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
      this.$nextTick(() => {
        if (this.$refs.img) {
          this.$refs.img.clearFiles();
        }
        if (this.$refs.file) {
          this.$refs.file.clearFiles();
        }
      })
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
      this.$nextTick(() => {
        if (this.$refs.img) {
          this.$refs.img.clearFiles();
        }
        if (this.$refs.file) {
          this.$refs.file.clearFiles();
        }
      })
    },
    del(id) {
      this.request.delete("/salvation/" + id).then(res => {
        if (res.code === '200') {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    delBatch() {
      if (!this.multipleSelection.length) {
        this.$message.error("请选择需要删除的数据")
        return
      }
      let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
      this.request.post("/salvation/del/batch", ids).then(res => {
        if (res.code === '200') {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    reset() {
      this.name = ""
      this.load()
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleFileUploadSuccess(res) {
      this.form.file = res
    },
    handleImgUploadSuccess(res) {
      this.form.img = res
    },
    download(url) {
      window.open(url)
    },
    exp() {
      window.open(this.$store.state.baseApi + "/salvation/export")
    },
    handleExcelImportSuccess() {
      this.$message.success("导入成功")
      this.load()
    }
  }
}
</script>


<style>
.headerBg {
  background: #eee !important;
}

.rescueFind {
  padding: 20px 10px;
  font-size: 28px;
  background-color: #fff;
  border-radius: 10px;
  color: rgb(30, 144, 255);
}

.feed {
  padding: 20px 10px;
  font-size: 28px;
  background-color: #fff;
  border-radius: 10px;
  color: green;
}
</style>
