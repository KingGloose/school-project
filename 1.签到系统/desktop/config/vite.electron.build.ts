import fs from "fs";
import path from "path";

import type { Plugin } from "vite";

import * as electronBuilder from "electron-builder";

import { findFiles } from "./utils";

// 初始化electron函数 - 将ts编译为js使用
const initElectron = () => {
  const allFilePath = findFiles(path.resolve(__dirname, "../src/desktop"), "ts").map((item) => item.path);

  require("esbuild").buildSync({
    entryPoints: allFilePath,
    bundle: true,
    outdir: "dist",
    platform: "node",
    external: ["electron"],
    minify: true // 压缩代码
  });
};

export const viteElectronBuild = (): Plugin => ({
  name: "vite-electron-build",
  closeBundle() {
    // 服务器启动 初始化electron
    initElectron();

    // 修改package.json文件的main字段 不然会打包失败
    const json = JSON.parse(fs.readFileSync("package.json", "utf-8"));
    json.main = "background.js";
    fs.writeFileSync("dist/package.json", JSON.stringify(json, null, 4));

    // 创建一个空的node_modules目录 不然会打包失败
    fs.mkdirSync("dist/node_modules");

    // 使用electron-builder打包Electron应用程序
    electronBuilder.build({
      config: {
        appId: "qd_desktop",
        productName: "签到系统_用户端",
        directories: {
          output: path.resolve(process.cwd(), "release"), // 输出目录
          app: path.resolve(process.cwd(), "dist") // app目录
        },
        mac: {
          icon: "../public/logo.ico"
        },
        win: {
          icon: "../public/logo.ico"
        },
        linux: {
          icon: "../public/logo.ico"
        },
        asar: true,
        nsis: {
          oneClick: false, // 取消一键安装
          allowToChangeInstallationDirectory: true // 允许用户安装
        }
      }
    });
  }
});
