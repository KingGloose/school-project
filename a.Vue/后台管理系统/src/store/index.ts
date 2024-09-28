import useLoginStore from "@/store/modules/login/login";
import { createPinia } from "pinia";
import type { App } from "vue";

const pinia = createPinia();

function registerPinia(app: App<Element>) {
  app.use(pinia);
  useLoginStore().loadLocalCacheAction();
}

export default registerPinia;
