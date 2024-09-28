const Router = require("koa-router");
const CommentRouter = new Router({ prefix: "/comment" });

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  create,
  reply,
  update,
  remove,
  list
} = require("../controller/comment.controller");

/*
   1.verifyAuth 验证是否登录
   2.create 创建评论 
*/
CommentRouter.post("/", verifyAuth, create);

/*
   1.
*/
CommentRouter.post("/reply/:commentId", verifyAuth, reply);

/*
   1.
*/
CommentRouter.patch(
  "/:commentId",
  verifyAuth,
  verifyPermission("comment"),
  update
);

/*
   1.
*/
CommentRouter.delete(
  "/:commentId",
  verifyAuth,
  verifyPermission("comment"),
  remove
);

/*
  1.
*/
CommentRouter.get("/:momentId",list)

module.exports = CommentRouter;
