import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN } from "@/utils/constants";
import { createRouter, createWebHistory } from "vue-router";
import { firstRoutes } from "@/utils/map-menu";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      name: "main",
      path: "/main",
      component: () => import("@/views/Main/main.vue")
    },
    {
      path: "/login",
      component: () => import("@/views/Login/login.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/NotFound/notFound.vue")
    }
  ]
});

router.beforeEach((to, form) => {
  const token = localCache.getCache(LOGIN_TOKEN);

  if (to.path.startsWith("/main") && !token) {
    return "/login";
  }
  if (to.path === "/main") {
    return firstRoutes;
  }
  if (to.path === "/login" && token) {
    return "/main";
  }
});

export default router;
