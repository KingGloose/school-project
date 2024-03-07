/// <reference types="vite/client" />

// 定义 .vue 文件
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "element-plus/dist/locale/zh-cn.mjs";
