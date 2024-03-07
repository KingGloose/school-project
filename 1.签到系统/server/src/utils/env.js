const os = require("os");
const { execSync, exec } = require("child_process");

/**
 * 该函数用于获取系统的Java地址
 * @param {string} cmd 指令
 * @returns 包含 jdk 和 jre 的 java.exe，并且返回java_home
 */
const getJavaEnv = (cmd = "where java") => {
  const runPlatform = os.platform();

  if (runPlatform === "win32") {
    const outInfo = execSync(cmd, { encoding: "utf-8" })
      ?.split("\n")
      ?.filter((item) => item);

    if (outInfo.length === 0) {
      throw new Error("error: commond is errer~");
    }

    // 获取 jdk 和 jre 下面的java.exe
    const newOutInfo = outInfo.map((item) => {
      const lastIndex = item.lastIndexOf("\r");
      if (lastIndex !== -1) {
        return item.substring(0, lastIndex);
      }
    });

    // 获取 JAVA_HOME
    const java_home = newOutInfo[0].substring(0, newOutInfo[0].lastIndexOf("\\bin\\java.exe"));

    return {
      JAVA_JDK_EXE: newOutInfo[0],
      JAVA_JRE_EXE: newOutInfo[1],
      JAVA_HOME: java_home
    };
  } else {
    console.log("error os platform~");
  }
};

/**
 * 根据网址打开浏览器
 * @param {string} url 网址
 */
const openBrowser = (url) => {
  const platform = os.platform();

  if (platform === "win32") {
    exec(`start ${url}`);
  } else if (platform === "darwin") {
    exec(`open ${url}`);
  } else {
    exec(`xdg-open ${url}`);
  }
};

module.exports = {
  getJavaEnv,
  openBrowser
};
