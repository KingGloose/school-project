// src/desktop/preload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("DeskTopHeader", {
  HeaderMin: () => import_electron.ipcRenderer.send("HeaderMin" /* HeaderMin */),
  HeaderMax: () => import_electron.ipcRenderer.send("HeaderMax" /* HeaderMax */),
  HeaderClose: () => import_electron.ipcRenderer.send("HeaderClose" /* HeaderClose */)
});
import_electron.contextBridge.exposeInMainWorld("DeskMainAPI", {
  DownloadImage: (downloadImgPath, upload_img) => import_electron.ipcRenderer.invoke("DownloadImage", downloadImgPath, upload_img),
  getMacV2: () => import_electron.ipcRenderer.invoke("getMacV2")
});
