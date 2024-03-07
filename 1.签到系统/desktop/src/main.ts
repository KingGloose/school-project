import { createApp } from "vue";
import App from "./App.vue";

import "normalize.css"; // 引入重置CSS
import router from "./router"; // 引入路由
import pinia from "./store"; // 引入pinia

import icon from "@/utils/register-icons";
import "./assets/css/main.css";
import "element-plus/theme-chalk/el-message.css";

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(icon);

app.mount("#app");
