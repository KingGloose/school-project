const Router = require("koa-router");
const userRouter = new Router({ prefix: "/user" });
const { create } = require("../controller/user.controller");
const {
  verifyUser,
  NamePassNull,
} = require("../middleware/user.middleware.js");
const { GetAvaterByUserId } = require("../controller/user.controller");

// 用户注册接口
/*
  中间件功能分别为
  1. 判断用户名和密码是否为空
  2. 判断这次注册的用户名和密码是否被注册过
  3. 对密码进行MD5加密,并和数据库密码进行比对
  4. 注册用户
*/
userRouter.post("/register", NamePassNull, verifyUser, create);

/*
   1.
*/
userRouter.get("/avater/:userId", GetAvaterByUserId);

module.exports = userRouter;
