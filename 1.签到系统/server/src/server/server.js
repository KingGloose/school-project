const express = require("express");
const { parentPort } = require("worker_threads");

const router = require("./server-router");
const { HTTP_PORT } = require("../../env");

const app = express();

app.use(express.json());
app.use("/api", router);

// 子线程处理
let server = null; // http服务
parentPort.on("message", async (message) => {
  // 服务器启动
  if (message === "server:start") {
    server = app.listen(HTTP_PORT, () => {
      parentPort.postMessage("server:start:ok");
    });
  }
  // 服务器关闭
  if (message === "server:close") {
    if (server) {
      if (server.closeAllConnections) {
        server.closeAllConnections();
      }

      await server.close(() => {
        parentPort.postMessage("server:close:ok");
      });
    }
  }
});

module.exports = {
  HTTP_PORT
};
