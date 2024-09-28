<template>
  <div class="pageContent">
    <!-- 表格头部 -->
    <div class="header">
      <h2>{{ contentHeader.title }}</h2>
      <template v-if="isCreate">
        <el-button type="primary" @click="handleCreateClick">{{ contentHeader.btnTitle }}</el-button>
      </template>
    </div>
    <div class="content">
      <el-table
        :data="listData"
        v-loading="loading"
        style="width: 100%"
        table-layout="auto"
        v-bind="childrenTree"
        border
      >
        <template v-for="item of itemDataList" :key="item.prop">
          <!-- 选择框 -->
          <template v-if="item.type === 'selection'">
            <el-table-column :type="item.type" />
          </template>
          <!-- 序号框 -->
          <template v-else-if="item.type === 'index'">
            <el-table-column :type="item.type" :label="item.label" :width="item.width" align="center" />
          </template>
          <!-- 普通数据 -->
          <template v-else-if="item.type === 'normal'">
            <el-table-column :prop="item.prop" :label="item.label" align="center" :width="item.width ?? ''" />
          </template>
          <!-- 非普通数据 - 插槽 -->
          <template v-else-if="item.type === 'custom'">
            <el-table-column :prop="item.prop" :label="item.label" align="center">
              <template #default="scoped">
                <slot :name="item.slotName" :scoped="scoped"></slot>
              </template>
            </el-table-column>
          </template>
          <!-- 操作 -->
          <template v-else-if="item.type === 'handle'">
            <!-- 如果拥有编辑和删除的权限就显示，否则就消失 -->
            <el-table-column :label="item.label" align="center" v-if="isUpdate || isDelete">
              <template #default="scoped">
                <el-button v-if="isUpdate" type="primary" icon="Edit" @click="handleEditClick(scoped.row)" text>
                  编辑
                </el-button>
                <el-button v-if="isDelete" type="danger" icon="Delete" @click="handleDeleteClick(scoped.row.id)" text>
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <template v-if="pageName !== 'menu'">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="pageSizeArray"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, onUnmounted } from "vue";

import useSystemStore from "@/store/modules/main/system";
import usePremissions from "@/hooks/usePermissions";
import { showMessageSuccess, showMessageWarning } from "@/utils/show-elmessage";
import { PRE_DELETE, PER_CREATE, PRE_UPDATE, PRE_QUERY } from "@/utils/constants";

interface IProps {
  pageName: string;
  contentHeader: any;
  itemDataList: any[];
  childrenTree?: any;
}
const props = defineProps<IProps>();

// 初始化数据
const systemStore = useSystemStore();
const currentPage = ref(1);
const pageSize = ref(10);
const pageSizeArray = ref<number[]>([]);
const loading = ref(true);

// 初始化权限设置
const isCreate = usePremissions(props.pageName, PER_CREATE);
const isDelete = usePremissions(props.pageName, PRE_DELETE);
const isUpdate = usePremissions(props.pageName, PRE_UPDATE);

// 初始化pageSizeArray
for (let i = 1; i <= 5; i++) {
  pageSizeArray.value.push(i * pageSize.value);
}

// 监听网络请求
const unscrible = systemStore.$onAction(({ name, after }) => {
  if (name === "createDataPageAction") {
    after((result) => {
      if (result.code === 0) {
        currentPage.value = 1;
      }
    });
  }
});
onUnmounted(() => {
  unscrible(); // 组件消失就取消监听
});

// 初始化网络请求
const searchFormData = ref({});
const fetchUserListData = (searchForm: any = {}) => {
  // 计算页码
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;

  // 在进行查询条件的情况下，进行翻页可以保存数据
  if (Object.getOwnPropertyNames(searchForm).length !== 0) searchFormData.value = searchForm;

  // 如果暂时没有数据的话就显示loading
  loading.value = true;
  systemStore.getListDataPageAction(props.pageName, size, offset, searchFormData.value).then((res) => {
    if (res) loading.value = false;
  });
};
fetchUserListData();

// 获取数据
const { listData, listTotalCount } = storeToRefs(systemStore);

// 分页器事件 - size改变
const handleSizeChange = (value: number) => {
  if (currentPage.value === 1) {
    fetchUserListData();
    return;
  }
  if (value > listTotalCount.value) return;
  fetchUserListData();
};
// 分页器事件 - current改变
const handleCurrentChange = (value: number) => fetchUserListData();

// 删除数据
const handleDeleteClick = async (id: string) => {
  const result = (await systemStore.deleteDataByIdPageAction(props.pageName, id + "")).code;
  if (result === 0) {
    showMessageSuccess("用户删除成功~");
    fetchUserListData();
  } else {
    showMessageWarning("用户删除失败,请联系管理员~");
  }
};

// 新建/编辑数据
const emits = defineEmits(["handleCreateEvent", "handleEditClickEvent"]);
const handleCreateClick = () => emits("handleCreateEvent");
const handleEditClick = (itemData: any) => emits("handleEditClickEvent", itemData);

defineExpose({ fetchUserListData });
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.content {
  margin-top: 20px;
}
.footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pageContent {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 20px 20px 20px;
  border-radius: 8px;
}
</style>
