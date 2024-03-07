import express from "express";

import { issueToken, verifyToken } from "./utils";

const mainRouter = express.Router();

// 01 - 测试服务器连通
mainRouter.get("/test", (req, res, next) => {
  res.end("测试成功");
});

// 02 - 用户登录
mainRouter.post("/login", (req, res, next) => {
  const userInfo = req.body;
  const token = issueToken(userInfo);

  res.json({
    code: 200,
    token: token,
    userInfo
  });
});

export default mainRouter;
