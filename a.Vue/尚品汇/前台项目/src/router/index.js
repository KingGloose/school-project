//引入Vue
import Vue from "vue";

// 引入路由
import VueRouter from "vue-router";

//引入routes
import routes from "./routes.js";

//引入vuex
import store from "../vuex/index";

//使用路由插件
Vue.use(VueRouter);

//用于设置点击相同路由时报错的问题
//重写push方法
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

//重写replace方法
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

//创建一个路由
let router = new VueRouter({
  routes,
  // 滚动行为：控制路由跳转滚动条在初始位置
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.UserToken;
  const info = store.state.user.UserInfo.name;

  if (token) {
    // 登录得情况
    if (to.path == "/ShopLogin") {
      // 登录后不能再登录
      next("/ShopHome");
    } else {
      if (info) {
        next();
      } else {
        try {
          await store.dispatch("GetUserInfo");
          next();
        } catch (error) {
          await store.dispatch("GetExitUserInfo");
          next("/ShopLogin");
        }
      }
    }
  } else {
    // 没登陆得情况
    let ToPath = to.path;
    if (
      ToPath.indexOf("/Trade") != -1 ||
      ToPath.indexOf("Pay") != -1 ||
      ToPath.indexOf("center") != -1
    ) {
      next("/ShopLogin?redirect=" + ToPath);
    } else {
      next();
    }
  }
});

export default router;
