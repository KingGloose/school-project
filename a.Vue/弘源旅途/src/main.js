import { createApp } from "vue";
import App from "./App.vue";

// 引入normalize，重置样式
import "normalize.css";
// 引入自己编写的CSS样式
import "./assets/css/index.css";

// 导入路由
import router from "./router/index";
// 引入状态管理
import pinia from "./stores";

const app = createApp(App);

app.use(router); // 使用路由
app.use(pinia); // 使用状态管理

app.mount("#app");
