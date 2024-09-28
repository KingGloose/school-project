import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

// 组件导入
import App from "./App";

// 引入样式
import "./assets/style/index.less";
import "normalize.css";
// import "antd/dist/reset.css"; // antd的reset.css

// 引入store
import store from "./store";

// 引入主题
import theme from "./assets/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
