const koa = require("koa");
const BodyParser = require("koa-bodyparser");

const app = new koa();

// 动态加载路由
const { useRouter } = require("../router/index");
// 错误处理
let errorHandle = require("./error-handle");

app.use(BodyParser());
useRouter(app); // 自动注册路由

app.on("error", errorHandle);

module.exports = app;
