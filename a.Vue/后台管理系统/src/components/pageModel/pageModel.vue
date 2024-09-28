<template>
  <div class="userModal">
    <el-dialog @close="handleCloseModel" v-model="dialogVisible" title="Warning" width="40%" center :show-close="false">
      <!-- 头部 -->
      <template #header>
        <span class="dialog-header">
          <h3>{{ isModelNew ? header.newTitle : header.editTitle }}</h3>
        </span>
      </template>
      <!-- 内容 -->
      <div class="form">
        <el-form :model="searchForm" label-width="90px" ref="elFormRef">
          <template v-for="item of formItems" :key="item.prop">
            <!-- 普通输入 -->
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder"></el-input>
              </el-form-item>
            </template>
            <!-- 密码输入 -->
            <template v-if="item.type === 'password'">
              <el-form-item label="密码" prop="password" v-if="isModelNew">
                <el-input v-model="searchForm[item.prop]" placeholder="请输入创建的密码" show-password></el-input>
              </el-form-item>
            </template>
            <!-- 下拉选择 -->
            <template v-if="item.type === 'select'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select :placeholder="item.placeholder" style="width: 100%" v-model="searchForm[item.prop]">
                  <template v-for="data in item.options" :key="data.value">
                    <el-option :label="data.label" :value="data.value"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </template>
            <!-- 自定义插槽 -->
            <template v-if="item.type === 'custom'">
              <el-form-item>
                <slot :name="item.slotName"></slot>
              </el-form-item>
            </template>
          </template>
        </el-form>
      </div>
      <!-- 尾部 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancelClick">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { ElForm } from "element-plus";

import useSystemStore from "@/store/modules/main/system";
import { showMessageSuccess, showMessageWarning } from "@/utils/show-elmessage";
import { handleMessageName } from "@/utils/show-elmessage";

interface IProps {
  pageName: string;
  header: any;
  formItems: any[];
  extraParam?: any;
}
const props = defineProps<IProps>();
const systemStore = useSystemStore();

// 初始化searchForm的值
const handleDefineSearchForm = () => {
  let defineSearchForm: any = {};
  for (const item of props.formItems) {
    /*
      1、存在初始化值(initialPropData) -> 赋值初始化值
      2、如果不存在初始化值 -> 赋值""
    */
    if (item.prop) defineSearchForm[item.prop] = item.initialPropData ?? "";
  }
  return defineSearchForm;
};
const searchForm = reactive(handleDefineSearchForm());

const dialogVisible = ref(false); // 控制模态框显示
const isModelNew = ref(true); // 控制是否为新建用户,如果是新建用户为true,编辑用户为false
const changeDialogVisible = (showModal: boolean = true, isNew: boolean = true) => {
  isModelNew.value = isNew;
  dialogVisible.value = showModal;
};

// 取消/创建用户
const itemDataId = ref();
const elFormRef = ref<InstanceType<typeof ElForm>>();

const emits = defineEmits(["fetchUserListDataEvent"]);

const handleCancelClick = () => (dialogVisible.value = false);
const handleConfirmClick = async () => {
  let messageName: string = handleMessageName(props.pageName);

  let searchFormData: any;
  if (props.extraParam) {
    searchFormData = { ...searchForm, ...props.extraParam };
  } else {
    searchFormData = { ...searchForm };
  }

  if (isModelNew.value) {
    // 创建用户的逻辑
    const result = (await systemStore.createDataPageAction(props.pageName, searchFormData))?.code;
    if (result === 0) {
      showMessageSuccess(`${messageName}创建成功~`);
      emits("fetchUserListDataEvent");
    } else {
      showMessageWarning(`${messageName}创建失败,请联系管理员~`);
    }
  } else {
    // 修改用户的逻辑
    const result = (await systemStore.editDataPageAction(props.pageName, itemDataId.value, searchFormData))?.code;
    if (result === 0) {
      showMessageSuccess(`${messageName}修改成功~`);
      emits("fetchUserListDataEvent");
    } else {
      showMessageWarning(`${messageName}修改失败,请联系管理员~`);
    }
  }
  dialogVisible.value = false;
};

// 编辑用户
const handleEditUserInfo = (itemData: any) => {
  if (itemData) {
    for (const key in searchForm) searchForm[key] = itemData[key];
    itemDataId.value = itemData.id;
  }
};

// 关闭模态框，初始化所有数据
const handleCloseModel = () => {
  for (const key in searchForm) searchForm[key] = "";
};

defineExpose({ changeDialogVisible, handleEditUserInfo });
</script>

<style scoped></style>
