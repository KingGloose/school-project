import { ref } from "vue";
import type pageContent from "@/components/pageContent/pageContent.vue";
import type pageModel from "@/components/pageModel/pageModel.vue";

export const useSearchAndModelHook = () => {
  const pageContentRef = ref<InstanceType<typeof pageContent>>();

  // 查询/重置操作 - search
  const handleResetAndSearchEvent = (userSearchForm: any) => pageContentRef.value?.fetchUserListData(userSearchForm);

  // 重新发送请求 - model
  const fetchUserListDataEvent = () => pageContentRef.value?.fetchUserListData();

  return { pageContentRef, handleResetAndSearchEvent, fetchUserListDataEvent };
};

export const useContentHook = (handleEditCallBack?: any, handleCreateCallBack?: any) => {
  const pageModalRef = ref<InstanceType<typeof pageModel>>();

  // 新建/编辑操作 - content
  const handleCreateEvent = () => {
    pageModalRef.value?.changeDialogVisible(true);

    // 显示模态框 -> 清空内部参数，如果不将该函数放置在后面的话就会出现第一次显示无数据的情况
    if (handleCreateCallBack) handleCreateCallBack(); // 使用回调函数获取内部参数
  };
  const handleEditClickEvent = (itemData: any) => {
    pageModalRef.value?.changeDialogVisible(true, false);
    pageModalRef.value?.handleEditUserInfo(itemData);

    // 显示模态框 -> 设置内部参数，如果不将该函数放置在后面的话就会出现第一次显示无数据的情况
    if (handleEditCallBack) handleEditCallBack(itemData); // 使用回调函数获取内部参数
  };

  return { pageModalRef, handleCreateEvent, handleEditClickEvent };
};
