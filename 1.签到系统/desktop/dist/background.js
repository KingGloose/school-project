var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasMutiMac = exports.formatMac = exports.isValidMac = exports.isVirtualMac = exports.isZeroMac = exports.hasMac = exports.isMac = exports.logDebug = exports.isDebug = void 0;
    function isDebug() {
      return process.env.DEBUG === "*" || process.env.DEBUG === "GPMA" || process.env.GPA_DEBUG === "1";
    }
    exports.isDebug = isDebug;
    function logDebug(...argument) {
      var _a;
      if (!isDebug())
        return;
      if ((_a = globalThis.logger) === null || _a === void 0 ? void 0 : _a.debug)
        globalThis.logger.debug(...argument);
      else
        console.debug(...argument);
    }
    exports.logDebug = logDebug;
    function isMac(mac) {
      return /^([\da-f]{1,2}[:-]){5}([\da-f]{1,2})$/i.test(mac);
    }
    exports.isMac = isMac;
    function hasMac(content) {
      return /([\da-f]{1,2}[:-]){5}([\da-f]{1,2})/gi.test(content);
    }
    exports.hasMac = hasMac;
    function isZeroMac(mac) {
      return /^(0{1,2}[:-]){5}0{1,2}$/.test(mac);
    }
    exports.isZeroMac = isZeroMac;
    var invalidMacAddresses = /* @__PURE__ */ new Set(["00:00:00:00:00:00", "ff:ff:ff:ff:ff:ff", "ac:de:48:00:11:22"]);
    var virtualMacPrefix = /* @__PURE__ */ new Set([
      "00:05:69",
      "00:0c:29",
      "00:50:56",
      "00:1c:14",
      "00:1c:42",
      "02:00:4c",
      "00:03:ff",
      "00:0f:4b",
      "00:16:3e",
      "08:00:27",
      "0a:00:27",
      "00:ff:78",
      "00:ff:9d"
    ]);
    function isVirtualMac(mac, desc) {
      let isVirtual = false;
      if (mac) {
        isVirtual = isMac(mac) && virtualMacPrefix.has(formatMac(mac).slice(0, 8));
      }
      if (desc && !isVirtual) {
        const virtualDescList = ["virtual", " vpn ", " ssl ", "tap-windows", "hyper-v", "km-test", "microsoft loopback", "sangfor "];
        desc = String(desc).toLowerCase();
        isVirtual = virtualDescList.some((d) => desc.includes(d));
      }
      return isVirtual;
    }
    exports.isVirtualMac = isVirtualMac;
    function isValidMac(mac) {
      return !invalidMacAddresses.has(formatMac(mac)) && isMac(mac);
    }
    exports.isValidMac = isValidMac;
    function formatMac(mac) {
      return String(mac).trim().toLowerCase().replace(/-/g, ":");
    }
    exports.formatMac = formatMac;
    function hasMutiMac(list, filter) {
      if (!list || list.length === 0)
        return false;
      if (typeof filter !== "function")
        filter = isMac;
      return new Set(list.map((d) => d.mac).filter((mac) => filter(mac))).size > 1;
    }
    exports.hasMutiMac = hasMutiMac;
  }
});

// node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/getIFacesByExec.js
var require_getIFacesByExec = __commonJS({
  "node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/getIFacesByExec.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNetworkIFacesInfoByWmic = void 0;
    var child_process_1 = require("child_process");
    var process_1 = __importDefault(require("process"));
    var utils_1 = require_utils();
    function execPromisfy(cmd, options = {}, trimEmptyLine = false) {
      return new Promise((resolve) => {
        (0, child_process_1.exec)(cmd, { windowsHide: true, ...options }, (error, stdout, stderr) => {
          if (error)
            console.error("exec error:", `cmd: ${cmd}
`, error.message || error);
          stdout = stdout.replace(/\r+\n/g, "\n").trim();
          if (trimEmptyLine)
            stdout = stdout.replace(/\n{2,}/g, "\n");
          resolve({ error, stdout, stderr });
        });
      });
    }
    async function getNetworkIFacesInfoByWmic() {
      const config = {};
      let stdout = "";
      if (process_1.default.platform === "win32") {
        const keyMap = { MACAddress: "mac", Description: "desc" };
        const cmd = `wmic nic get MACAddress,Description /format:list`;
        const info = await execPromisfy(cmd);
        const lines = info.stdout.split("\n").filter((d) => d.includes("="));
        stdout = info.stdout;
        if (lines[0]) {
          let item = {};
          const setToConfig = () => {
            if (item.mac) {
              item.mac = (0, utils_1.formatMac)(item.mac);
              if (!config[item.mac] || !(0, utils_1.isVirtualMac)("", item.desc))
                config[item.mac] = item;
            }
            item = {};
          };
          for (const line of lines) {
            let [key, value] = line.split("=").map((d) => d.trim());
            key = keyMap[key] || key.toLowerCase();
            if (item[key])
              setToConfig();
            item[key] = value;
          }
          setToConfig();
        }
        if (stdout)
          (0, utils_1.logDebug)(`[getNetworkIFacesInfoByWmic]`, stdout, config);
      }
      return { stdout, config };
    }
    exports.getNetworkIFacesInfoByWmic = getNetworkIFacesInfoByWmic;
  }
});

// node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/getNetworkInteraces.js
var require_getNetworkInteraces = __commonJS({
  "node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/getNetworkInteraces.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNetworkIFaceOne = exports.getNetworkIFaces = exports.getAllNetworkIFaces = void 0;
    var os_1 = require("os");
    var getIFacesByExec_1 = require_getIFacesByExec();
    var utils_1 = require_utils();
    function ifacesSort(list) {
      return list.sort((a, b) => {
        if (a.internal !== b.internal)
          return a.internal ? 1 : -1;
        if ((0, utils_1.isZeroMac)(a.mac) !== (0, utils_1.isZeroMac)(b.mac))
          return (0, utils_1.isZeroMac)(a.mac) ? 1 : -1;
        const isVirtualA = (0, utils_1.isVirtualMac)(a.mac);
        const isVirtualB = (0, utils_1.isVirtualMac)(b.mac);
        if (isVirtualA !== isVirtualB)
          return isVirtualA ? 1 : -1;
        if (!a.address || !b.address)
          return a.address ? -1 : 1;
        if (a.family !== b.family)
          return a.family === "IPv6" ? 1 : -1;
      });
    }
    function getNif() {
      const nif = (0, os_1.networkInterfaces)();
      for (const key in nif) {
        if (key.includes("\u4EE5\u592A\u7F51")) {
          nif[key.replace("\u4EE5\u592A\u7F51", "ethernet")] = nif[key];
          delete nif[key];
        }
      }
      return nif;
    }
    function getAllNetworkIFaces() {
      const nif = getNif();
      const list = [];
      const highPriorityIfaces = /^((en|eth)\d+|ethernet)$/i;
      const lowPriorityIfaces = /^((lo|vboxnet)\d+)$/i;
      const ifaces = Object.keys(nif).sort((a, b) => {
        if (highPriorityIfaces.test(a)) {
          if (highPriorityIfaces.test(b))
            return a.localeCompare(b);
          return -1;
        }
        if (lowPriorityIfaces.test(a)) {
          if (lowPriorityIfaces.test(b))
            return a.localeCompare(b);
          return 1;
        }
        if (highPriorityIfaces.test(b))
          return 1;
        if (lowPriorityIfaces.test(b))
          return -1;
        return a.localeCompare(b);
      });
      for (const key of ifaces) {
        for (const item of nif[key])
          list.push(item);
      }
      return ifacesSort(list);
    }
    exports.getAllNetworkIFaces = getAllNetworkIFaces;
    async function getNetworkIFaces(iface, family) {
      let list = [];
      if (iface) {
        const nif = getNif();
        if (nif[iface]) {
          list = nif[iface];
          if (family)
            list = list.filter((d) => d.family === family);
          if (list.length > 1)
            list = list.filter((d) => !(0, utils_1.isZeroMac)(d.mac));
        }
        return ifacesSort(list);
      }
      list = getAllNetworkIFaces().filter((item) => !(0, utils_1.isZeroMac)(item.mac) && (!family || item.family === family));
      if ((0, utils_1.hasMutiMac)(list) && process.platform === "win32") {
        const info = await (0, getIFacesByExec_1.getNetworkIFacesInfoByWmic)();
        if (info.stdout) {
          const r = list.filter((item) => {
            if (!info.config[item.mac])
              return true;
            const desc = info.config[item.mac].desc;
            item.desc = desc;
            return !(0, utils_1.isVirtualMac)("", desc);
          });
          if (r.length > 0)
            list = r;
        }
      }
      (0, utils_1.logDebug)("[getNetworkIFaces]", list);
      return list;
    }
    exports.getNetworkIFaces = getNetworkIFaces;
    function getNetworkIFaceOne(iface) {
      return getNetworkIFaces(iface).then((list) => list[0]);
    }
    exports.getNetworkIFaceOne = getNetworkIFaceOne;
  }
});

// node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/getMac.js
var require_getMac = __commonJS({
  "node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/getMac.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMac = exports.getAllPhysicsMac = exports.getAllMac = void 0;
    var getNetworkInteraces_1 = require_getNetworkInteraces();
    var utils_1 = require_utils();
    function getAllMac() {
      const list = (0, getNetworkInteraces_1.getAllNetworkIFaces)();
      const macSet = /* @__PURE__ */ new Set();
      for (const item of list) {
        if (!item.internal && !(0, utils_1.isZeroMac)(item.mac))
          macSet.add(item.mac);
      }
      return [...macSet];
    }
    exports.getAllMac = getAllMac;
    function getAllPhysicsMac(family) {
      return (0, getNetworkInteraces_1.getNetworkIFaces)("", family).then((d) => {
        d = d.filter((m) => !(0, utils_1.isVirtualMac)(m.mac, m.desc));
        return [...new Set(d.map((m) => m.mac))];
      });
    }
    exports.getAllPhysicsMac = getAllPhysicsMac;
    function getMac2(iface) {
      return (0, getNetworkInteraces_1.getNetworkIFaceOne)(iface).then((item) => item === null || item === void 0 ? void 0 : item.mac);
    }
    exports.getMac = getMac2;
  }
});

// node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/@lzwme+get-physical-address@1.0.5/node_modules/@lzwme/get-physical-address/cjs/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_utils(), exports);
    __exportStar(require_getNetworkInteraces(), exports);
    __exportStar(require_getMac(), exports);
  }
});

// src/desktop/background.ts
var import_path = __toESM(require("path"));
var import_electron = require("electron");
var import_get_physical_address = __toESM(require_cjs());
function createWindow() {
  const win = new import_electron.BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 800,
    minHeight: 500,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: false,
      preload: import_path.default.resolve(__dirname, "./preload.js")
    }
  });
  import_electron.Menu.setApplicationMenu(null);
  import_electron.ipcMain.on("HeaderMin" /* HeaderMin */, () => {
    win.minimize();
  });
  import_electron.ipcMain.on("HeaderMax" /* HeaderMax */, () => {
    win.isMaximized() ? win.restore() : win.maximize();
  });
  import_electron.ipcMain.on("HeaderClose" /* HeaderClose */, () => {
    win.close();
  });
  import_electron.ipcMain.handle("DownloadImage", (event, downloadImgPath, downloadImg) => {
    return new Promise((resolve, reject) => {
      win.webContents.downloadURL(downloadImgPath);
      win.webContents.session.once("will-download", (event2, item, webContents) => {
        item.once("done", (event3, state) => {
          if (state === "completed") {
            resolve("ok");
          } else {
            reject("error");
          }
        });
      });
    });
  });
  import_electron.ipcMain.handle("getMacV2", async () => {
    try {
      const mac = await (0, import_get_physical_address.getMac)();
      return mac;
    } catch (error) {
      return "error~";
    }
  });
  if (process.argv[2]) {
    win.loadURL(process.argv[2]);
    win.webContents.openDevTools();
  } else {
    win.loadFile("index.html");
  }
}
import_electron.app.whenReady().then(createWindow);
import_electron.app.on("window-all-closed", function() {
  if (process.platform !== "darwin")
    import_electron.app.quit();
});
