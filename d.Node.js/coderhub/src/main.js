// 导入app，用于创建服务器
const app = require("./app/index");
// 读取环境变量
const config = require("./app/config");

// 服务器端口监听
app.listen(config.APP_PORT, () => {
  console.log(`${APP_PORT}端口正在监听~`);
});
