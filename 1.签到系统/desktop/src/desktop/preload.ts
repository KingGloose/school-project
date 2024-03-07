import { contextBridge, ipcRenderer } from "electron";

import { rigthDeskEnum } from "@/types/common";

contextBridge.exposeInMainWorld("DeskTopHeader", {
  HeaderMin: () => ipcRenderer.send(rigthDeskEnum.HeaderMin),
  HeaderMax: () => ipcRenderer.send(rigthDeskEnum.HeaderMax),
  HeaderClose: () => ipcRenderer.send(rigthDeskEnum.HeaderClose)
});

contextBridge.exposeInMainWorld("DeskMainAPI", {
  DownloadImage: (downloadImgPath: string, upload_img: string) =>
    ipcRenderer.invoke("DownloadImage", downloadImgPath, upload_img),
  getMacV2: () => ipcRenderer.invoke("getMacV2")
});
