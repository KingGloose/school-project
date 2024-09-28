<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('ChangePageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="StartEndPage.start > 1" @click="$emit('ChangePageNo', 1)">
      1
    </button>
    <button v-if="StartEndPage.start > 2">···</button>

    <button
      v-for="(p, index) in StartEndPage.end"
      :key="index"
      v-if="p > StartEndPage.start - 1"
      @click="$emit('ChangePageNo', p)"
      :class="{ active: p == pageNo }"
    >
      {{ p }}
    </button>

    <button v-if="StartEndPage.end < PageTotal - 1">···</button>
    <button
      v-if="StartEndPage.end < PageTotal"
      @click="$emit('ChangePageNo', PageTotal)"
    >
      {{ PageTotal }}
    </button>
    <button
      :disabled="pageNo == PageTotal"
      @click="$emit('ChangePageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continue"],
  computed: {
    PageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    StartEndPage() {
      const { pageNo, PageTotal } = this;
      // 开始的值为0
      let start = 0,
        end = 0;
      //当总页面小于continue时
      if (this.continue > PageTotal) {
        start = 0;
        end = PageTotal;
      }
      // 当总页面大于continue时
      else {
        start = pageNo - parseInt(this.continue / 2);
        end = pageNo + parseInt(this.continue / 2);
        // 如果一开始时前几位的话，就会显示负数
        if (start < 1) {
          start = 1;
          end = this.continue;
        }
        // 6 7 8 9 10
        if (end > PageTotal) {
          start = PageTotal - this.continue + 1;
          end = PageTotal;
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
