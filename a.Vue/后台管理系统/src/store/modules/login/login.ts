import { defineStore } from "pinia";
import router from "@/router";

import { accountLoginRequest, getUserInfoById, getUserMenuById } from "@/service/modules/login/index";
import type { MyAccount } from "@/types";
import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN, LOGIN_USERINFO, LOGIN_MENUINFO, LOGIN_PERMISSIONS } from "@/utils/constants";
import { mapMenuToRouter, mapMenuToPermissions } from "@/utils/map-menu";

const useLoginStore = defineStore("login", {
  state: () => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    userInfo: localCache.getCache(LOGIN_USERINFO) ?? {},
    menuInfo: [],
    premissions: localCache.getCache(LOGIN_PERMISSIONS) ?? []
  }),
  actions: {
    async accountLoginAction(account: MyAccount) {
      const res = (await accountLoginRequest(account))?.data;
      if (res) {
        this.token = res.token;
        localCache.setCache(LOGIN_TOKEN, this.token);

        // 获取用户信息
        const resUser = (await getUserInfoById(res.id))?.data;
        this.userInfo = resUser;

        // 获取菜单信息
        const meueInfo = (await getUserMenuById(resUser.role.id))?.data;
        this.menuInfo = meueInfo;

        // 获取按钮权限
        const permissions = mapMenuToPermissions(meueInfo);
        localCache.setCache(LOGIN_PERMISSIONS, permissions);
        this.premissions = permissions;

        // 动态加载路由
        const localRoutes = mapMenuToRouter(meueInfo);
        localRoutes.forEach((item) => router.addRoute("main", item));

        localCache.setCache(LOGIN_USERINFO, resUser);
        localCache.setCache(LOGIN_MENUINFO, meueInfo);

        router.push("/main");
      }
    },
    loadLocalCacheAction() {
      const menuInfo = localCache.getCache(LOGIN_MENUINFO);
      if (menuInfo) this.menuInfo = menuInfo;

      // 动态加载路由
      const localRoutes = mapMenuToRouter(this.menuInfo);
      localRoutes.forEach((item) => router.addRoute("main", item));
    }
  }
});

export default useLoginStore;
