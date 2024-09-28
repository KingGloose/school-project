<template>
  <div>
    <el-card class="card">
      <div slot="header" class="header clearfix">
        <span>线上热门搜索</span>
        <el-dropdown class="cardlink">
          <span>
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <LineCharts></LineCharts>
          </el-col>
          <el-col :span="12">
            <LineCharts></LineCharts>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          border
        >
          <el-table-column label="排名" width="80" type="index">
          </el-table-column>
          <el-table-column label="搜索关键字" width="width"> </el-table-column>
          <el-table-column
            label="用户数"
            sortable
            :formatter="formatter"
            width="width"
          >
          </el-table-column>
          <el-table-column
            label="周涨幅"
            sortable
            :formatter="formatter"
            width="width"
          >
          </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="1000" class="page">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import LineCharts from "./lineCharts/index.vue";
export default {
  name: "",
  components: { LineCharts },
  methods: {
    formatter(row, column) {
      return row.address;
    },
  },
  data() {
    return {
      tableData: [{}],
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.header .cardlink {
  position: absolute;
  right: 0px;
}
.card {
  height: 500px;
}
.page {
  text-align: center;
}
</style>