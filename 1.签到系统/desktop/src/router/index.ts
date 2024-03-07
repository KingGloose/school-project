import { createRouter, createWebHashHistory } from "vue-router";

import { localCache } from "@/utils/cache";

import UserSign from "@/views/UserSign/UserSign.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/user-sign"
    },
    {
      path: "/user-sign",
      component: UserSign
    }
  ]
});

router.beforeEach((to, from) => {
  // const token = localCache.getCache("token");
  // if (to.path.startsWith("/user-sign") && !token) {
  //   return "/user-sign";
  // }
});

export default router;
