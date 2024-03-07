// 生产环境的插件
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

import type { AddressInfo } from "net";
import type { Plugin } from "vite";

import { findFiles } from "./utils";

// 初始化electron函数 - 将ts编译为js使用
const initElectron = () => {
  const allFilePath = findFiles(path.resolve(__dirname, "../src/desktop"), "ts").map((item) => item.path);

  require("esbuild").buildSync({
    entryPoints: allFilePath,
    bundle: true,
    outdir: "dist",
    platform: "node",
    external: ["electron"]
    // minify: true // 压缩代码
  });
};

export const viteElectronDev = (): Plugin => ({
  name: "vite-electron-dev",
  configureServer(server) {
    initElectron(); // 服务器启动 初始化electron

    server.httpServer?.once("listening", () => {
      // 获取HTTP服务的监听地址和端口号
      const addressInfo = server.httpServer?.address() as AddressInfo;
      const url = `http://localhost:${addressInfo.port}`;

      // 启动electron进程
      let electronProcess = spawn(require("electron"), ["dist/background.js", url]);

      // desktop/*.ts 文件修改就重新编译使用
      const allFilePath = findFiles(path.resolve(__dirname, "../src/desktop"), "ts").map((item) => item.path);
      allFilePath.forEach((item) => {
        fs.watchFile(item, () => {
          electronProcess.kill(); // 杀死当前electron进程
          initElectron(); // 重新编译

          // 重新启动electron进程
          electronProcess = spawn(require("electron"), ["dist/background.js", url]);
        });
      });

      // 监听打印日志
      electronProcess.stdout.on("data", (data) => {
        if (data) console.log(`[electron log]: ${data.toString()}`);
      });
    });
  }
});
