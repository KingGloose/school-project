import { memo, Suspense } from "react";
import { useRoutes } from "react-router-dom";

import AppHeader from "./components/1.app-header";
import AppFooter from "./components/1.app-footer";
import Loading from "./views/other/loading";

import routes from "./router";

import { useScrollTop } from "@/hooks/index";

const App = memo(() => {
  useScrollTop(); // 路由变化就跳转到顶部

  return (
    <div className="app">
      <AppHeader></AppHeader>
      <Suspense fallback={<Loading></Loading>}>{useRoutes(routes)}</Suspense>
      <AppFooter></AppFooter>
    </div>
  );
});

export default App;
