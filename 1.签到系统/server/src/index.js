const fs = require("fs");
const path = require("path");

const select = require("@inquirer/select");
const input = require("@inquirer/input");
const consolePng = require("console-png");

const instrBranch = require("./branch");
const connections = require("./server/database");

const { delay } = require("./utils/main");
const { getTimeOfDay } = require("./utils/time");
const { chalkMainConsole } = require("./utils/console");

consolePng.attachTo(console); // 为console扩展png能力

// 欢迎界面
const initWelcome = async () => {
  return new Promise(async (resolve, reject) => {
    // 01 - 显示图片
    const png_path = fs.readFileSync(path.resolve(__dirname, "./assets/ava.png"));
    console.png(png_path);

    await delay(1000); // 延时1s
    console.log("\n\n\n");

    // 02 - 欢迎语
    chalkMainConsole("欢迎使用签到系统~");

    resolve();
  });
};

// 用户登录
const initiatorLogin = () => {
  return new Promise(async (resolve, reject) => {
    const account = await input.default({ message: "用户名" });
    const password = await input.default({ message: "密码" });

    const statement = "select * from initiator where initiator_account = ? and initiator_password = ?";
    const result = await connections.execute(statement, [account, password]);

    if (result[0].length === 1) {
      const data = result[0][0];
      const initiator_name = data.initiator_name;
      chalkMainConsole(`${getTimeOfDay()}好！${initiator_name}，祝您愉快每一天~`);
      resolve(data);
    } else {
      reject("账户密码错误~");
    }
  });
};

// 处理命令
const instrBranchHandler = (flag, ...params) => {
  const target = instrBranch.find((item) => item[0](flag));
  if (target) {
    return target[1](params);
  } else {
    console.log("嘿man,你输错了,看仔细再输入哦~");
  }
};

(async () => {
  try {
    await initWelcome();

    const userInfo = await initiatorLogin();

    while (true) {
      console.log("\n===============================================");
      const answer = await select.default({
        message: "请选择你要做的操作~",
        choices: [
          { name: "开启签到", value: "qd" },
          { name: "查看记录", value: "ck" },
          { name: "帮忙补签", value: "bq" },
          { name: "导入信息", value: "dr" },
          { name: "导出信息", value: "dc" },
          { name: "退出程序", value: "tc" },
          { name: "查看源码", value: "ym" }
        ]
      });

      await instrBranchHandler(answer, userInfo);
    }
  } catch (error) {
    return console.log(error);
  }
})();
