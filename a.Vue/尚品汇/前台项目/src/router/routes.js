//引入组件
// import ShopHome from "../pages/Home/index.vue";
// import ShopLogin from "../pages/Login/index.vue";
// import ShopRegister from "../pages/Register/index.vue";
// import ShopSearch from "../pages/Search/index.vue";
// import Detail from "../pages/Detail/index.vue";
// import AddCartSuccess from "../pages/AddCartSuccess/index";
// import ShopCart from "../pages/ShopCart/index";
// import Trade from "../pages/Trade/index";
// import Pay from "../pages/Pay/index";
// import PaySuccess from "../pages/PaySuccess/index";
// import center from "../pages/Center/index";
// center得二级路由组件
// import MyOrder from "../pages/Center/MyOrder/index";
// import GroupOrder from "../pages/Center/GroupOrder/index";

export default [
  {
    name: "ShopHome",
    path: "/ShopHome",
    component: () => import("../pages/Home/index.vue"),
    meta: { isShowFooter: true },
  },
  {
    path: "/ShopLogin",
    component: () => import("../pages/Login/index.vue"),
    meta: { isShowFooter: false },
  },
  {
    path: "/ShopRegister",
    component: () => import("../pages/Register/index.vue"),
    meta: { isShowFooter: false },
  },
  {
    path: "/ShopSearch/:keyword?",
    component: () => import("../pages/Search/index.vue"),
    meta: { isShowFooter: true },
    name: "ShopSearch",
  },
  {
    path: "/Detail/:skuId?",
    component: () => import("../pages/Detail/index.vue"),
    meta: { isShowFooter: true },
  },
  {
    path: "/AddCartSuccess",
    component: () => import("../pages/AddCartSuccess/index"),
    meta: { isShowFooter: true },
  },
  {
    path: "/ShopCart",
    component: () => import("../pages/ShopCart/index"),
    meta: { isShowFooter: true },
  },
  {
    path: "/Trade",
    component: () => import("../pages/Trade/index"),
    meta: { isShowFooter: false },
    beforeEnter: (to, from, next) => {
      if (from.path == "/ShopCart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/Pay",
    component: () => import("../pages/Pay/index"),
    meta: { isShowFooter: false },
    beforeEnter: (to, from, next) => {
      if (from.path == "/Trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/PaySuccess",
    component: () => import("../pages/PaySuccess/index"),
    meta: { isShowFooter: false },
    beforeEnter: (to, from, next) => {
      if (from.path == "/Pay") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/center",
    component: () => import("../pages/Center/index"),
    meta: { isShowFooter: false },
    children: [
      {
        path: "MyOrder",
        component: () => import("../pages/Center/MyOrder/index"),
      },
      {
        path: "GroupOrder",
        component: () => import("../pages/Center/GroupOrder/index"),
      },
      {
        path: "/center",
        redirect: "MyOrder",
      },
    ],
  },
  //重定向：url不规范的话就返回到/ShopHome
  {
    path: "*",
    redirect: "/ShopHome",
  },
];
