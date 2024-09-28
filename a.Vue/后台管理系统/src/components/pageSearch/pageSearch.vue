<template>
  <div class="userSearch" v-if="isQuery">
    <el-form :label-width="labelWidth" :model="searchForm" ref="elFormRef">
      <el-row :gutter="20">
        <!-- 动态加载组件 -->
        <template v-for="item of itemDataList" :key="item.prop">
          <el-col :span="item.span" :offset="item.offset ?? 0">
            <!-- input -->
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input :placeholder="item.placeholder" v-model="searchForm[item.prop]" />
              </el-form-item>
            </template>
            <!-- select -->
            <template v-if="item.type === 'select'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select :placeholder="item.placeholder" v-model="searchForm[item.prop]" style="width: 100%">
                  <template v-for="option of item.options" :key="option.label">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </el-form-item>
            </template>
            <!-- datapicker -->
            <template v-if="item.type === 'datepicker'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="searchForm[item.prop]"
                />
              </el-form-item>
            </template>
            <!-- button -->
            <template v-if="item.type === 'button'">
              <el-form-item>
                <el-button icon="Search" @click="handleResetClick">重置</el-button>
                <el-button type="primary" icon="RefreshLeft" @click="handleSearchClick"> 查询 </el-button>
              </el-form-item>
            </template>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from "element-plus";
import { reactive, ref, toRaw } from "vue";
import usePremissions from "@/hooks/usePermissions";
import { PRE_QUERY } from "@/utils/constants";

// 初始化props的值
interface IProps {
  pageName: string;
  labelWidth: string;
  itemDataList: any[];
}
const props = defineProps<IProps>();

const isQuery = usePremissions(props.pageName, PRE_QUERY);

// 初始化searchForm的值
const handleDefineSearchForm = () => {
  let defineSearchForm: any = {};
  for (const item of props.itemDataList) {
    /*
      1、存在初始化值(initialPropData) -> 赋值初始化值
      2、如果不存在初始化值 -> 赋值""
    */
    if (item.prop) defineSearchForm[item.prop] = item.initialPropData ?? "";
  }
  return defineSearchForm;
};
const searchForm = reactive(handleDefineSearchForm());

// 处理查询/重置的操作
const elFormRef = ref<InstanceType<typeof ElForm>>();
const emits = defineEmits(["handleResetAndSearchEvent"]);
// 重置操作
const handleResetClick = () => {
  elFormRef.value?.resetFields();
  emits("handleResetAndSearchEvent", toRaw(searchForm));
};
// 查询操作
const handleSearchClick = () => {
  emits("handleResetAndSearchEvent", toRaw(searchForm));
};
</script>

<style scoped>
.userSearch {
  background-color: #fff;
  padding: 20px 20px 0px 20px;
  border-radius: 8px;
}
</style>
