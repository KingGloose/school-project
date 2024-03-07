import express from "express";

import mainRouter from "./router";

const app = express();

app.use(express.json());

app.use("/api", mainRouter);

// 导出服务器
export const openService = () => {
  const service = app.listen(8080, () => {
    console.log("8080端口开启");
  });

  return service;
};
