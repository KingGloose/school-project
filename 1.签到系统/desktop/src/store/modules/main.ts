import { localCache } from "@/utils/cache";
import { defineStore } from "pinia";

import { userHistory } from "@/service/modules/main";

const getCacheData = (name: string) => {
  const data = localCache.getCache(name);
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }
  if (typeof data === "object" && Object.keys(data).length > 0) {
    return data;
  }
};

type stateType = {
  userDialogVisibleHistory: boolean;
  userDialogVisibleEdit: boolean;
  userDialogVisibleLogin: boolean;
  historyData: any[];
  userInfoData: any;
};

const useMainStore = defineStore("mainStore", {
  state: (): stateType => ({
    userDialogVisibleHistory: false, // 签到者 - 记录对话框
    userDialogVisibleEdit: false, // 签到者 - 编辑对话框
    userDialogVisibleLogin: false, // 签到者 - 登录对话框

    historyData: getCacheData("historyData") || [], // 历史数据
    userInfoData: getCacheData("userInfo") || {} // 个人信息
  }),
  actions: {
    changeDialogVisibleHistory() {
      this.userDialogVisibleHistory = !this.userDialogVisibleLogin;
    },
    changeDialogVisibleEditOpen() {
      this.userDialogVisibleEdit = true;
    },
    changeDialogVisibleEditClose() {
      this.userDialogVisibleEdit = false;
    },
    changeDialogVisibleLogin() {
      this.userDialogVisibleLogin = !this.userDialogVisibleLogin;
    },
    async querySignAction(user_id: string) {
      const result = await userHistory(user_id);

      if (result.code === 200) {
        this.historyData = result.data;
        localCache.setCache("historyData", result.data);
      }
    },
    changeUserInfo(userInfo: any) {
      this.userInfoData = userInfo;
    }
  }
});

export default useMainStore;
