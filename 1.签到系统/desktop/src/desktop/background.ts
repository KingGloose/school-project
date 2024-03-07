import path from "path";

import { app, BrowserWindow, Menu, ipcMain, dialog } from "electron";
import { getMac } from "@lzwme/get-physical-address";

import { rigthDeskEnum } from "@/types/common";
import { openService } from "@/server";

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 800,
    minHeight: 500,
    frame: false,
    webPreferences: {
      nodeIntegration: true, // 可以在渲染进程中使用node的api
      contextIsolation: true, // 关闭渲染进程的沙箱
      webSecurity: false, // 关闭跨域检测
      preload: path.resolve(__dirname, "./preload.js") // 预加载
    }
  });

  Menu.setApplicationMenu(null); // 取消菜单栏

  // ipc 监听
  ipcMain.on(rigthDeskEnum.HeaderMin, () => {
    win.minimize();
  });
  ipcMain.on(rigthDeskEnum.HeaderMax, () => {
    win.isMaximized() ? win.restore() : win.maximize();
  });
  ipcMain.on(rigthDeskEnum.HeaderClose, () => {
    win.close();
  });
  // ipc双向监听
  // 下载图片
  ipcMain.handle("DownloadImage", (event, downloadImgPath, downloadImg) => {
    return new Promise((resolve, reject) => {
      win.webContents.downloadURL(downloadImgPath);
      win.webContents.session.once("will-download", (event, item, webContents) => {
        item.once("done", (event, state) => {
          if (state === "completed") {
            resolve("ok");
          } else {
            reject("error");
          }
        });
      });
    });
  });
  // 获取电脑Mac
  ipcMain.handle("getMacV2", async () => {
    try {
      const mac = await getMac();
      return mac;
    } catch (error) {
      return "error~";
    }
  });

  // 加载资源 - 区分开发环境还是生产环境
  if (process.argv[2]) {
    win.loadURL(process.argv[2]);
    win.webContents.openDevTools(); // 打开开发者工具
  } else {
    win.loadFile("index.html");
  }

  // const service = openService(); // 开启局域网
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
