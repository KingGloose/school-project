//引入Vue
import Vue from "vue";
import App from "./App.vue";

//引入路由器
import router from "./router/index";

//引入三级联动设置全局组件
import TypeNav from "./components/TypeNav/index";
//底部楼层轮播图
import Carousel from "./components/Carousel/index.vue";
//分页器
import Pagination from "./components/Pagination/index.vue";

//引入Vuex
import store from "./vuex/index";

//引入API统一管理
import * as API from "./api/index";

//引入mockServer.js，我们通过mock模拟的后端服务器，所以这里至少要执行一次
import "./mock/mockServer.js";

//引入swiper样式，这样的话就会全局使用了
import "swiper/css/swiper.css";

//创建全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

//elementUI注册组件
import { MessageBox } from "element-ui";
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 提示消失
// Vue.config.productionTip = false;

// 使用图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);
// 引入图片，因为图片并不能写入代码，所以是默认暴露的
import atm from "./assets/1.gif";
// 其他的设置
Vue.use(VueLazyload, {
  loading: atm,
});

//引入表单校验
import "./utils/validate"

new Vue({
  render: (h) => h(App),
  //注册路由
  router: router,
  //注册Vuex
  store: store,
  //注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");
