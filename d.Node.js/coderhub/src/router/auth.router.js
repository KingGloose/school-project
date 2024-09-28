const Router = require("koa-router");
const authRouter = new Router();

const { login, success } = require("../controller/auth.controller");
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");
const { NamePassNull } = require("../middleware/user.middleware");

/*
   中间件功能分别为
   1. 判断用户名和密码是否为空
   2. 判断这次登录的用户是否存在
   3. 对密码进行MD5加密
*/
authRouter.post("/login", NamePassNull, verifyLogin, login);
authRouter.get("/test", verifyAuth, success);

module.exports = authRouter;
