const Router = require("koa-router");
const MomentRouter = new Router({ prefix: "/moment" });

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const { ContentIsNull } = require("../middleware/moment.middleware");
const {
  create,
  detail,
  GetList,
  update,
  remove,
} = require("../controller/moment.controller");

/*
   1.verifyAuth 验证Token
   2.ContentIsNull 检测文章为空
   3.create 插入文章
*/
MomentRouter.post("/", verifyAuth, ContentIsNull, create);

/*
   1.detail 查询单条数据
*/
MomentRouter.get("/:momentId", detail);

/*
   1.GetList 查询多条数据
*/
MomentRouter.get("/", GetList);

/*
   1.verifyAuth 验证Token,用户需要登录
   2.verifyPermission 验证是否是自己的动态
   2.ContentIsNull 检测文章为空
   3.update 修改文章
*/
MomentRouter.patch(
  "/:momentId",
  verifyAuth,
  verifyPermission("moment"),
  ContentIsNull,
  update
);

/*
   1.verifyAuth 验证Token,用户需要登录
   2.verifyPermission 验证是否是自己的动态
   3.remove 删除动态
*/
MomentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

module.exports = MomentRouter;
