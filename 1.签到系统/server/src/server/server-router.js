const fs = require("fs");
const path = require("path");

const express = require("express");
const jwt = require("jsonwebtoken");

const connections = require("./database");

const {
  selectSignBySignCode,
  userCheckIn,
  selectSignHistory,
  selectSignBySignAndUserId,
  selectUserByUserId,
  updateUserMacByUserId
} = require("./database-sql");
const { issueToken, verifyToken } = require("../utils/jwt");
const { formatDateTime } = require("../utils/time");
const { chalkThirdConsole } = require("../utils/console");

const router = express.Router();

const isUserExist = async (req, res, next) => {
  const { account, password } = req.body;

  const statement = "select * from user where user_account = ? and user_password = ?";
  const result = await connections.execute(statement, [account, password]);
  const data = result[0];

  if (data.length > 0) {
    req.userInfo = data[0];
    await next();
  } else {
    res.status(400);
    res.json({
      code: 400,
      data: "用户不存在"
    });
  }
};

const verifyUserToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401);
    res.json({
      code: 401,
      data: "请登录设备"
    });
    return;
  }

  const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../keys/public.key"));

  try {
    const token = authorization.replace("Bearer ", "");
    const info = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });

    req.userInfo = info;
    await next();
  } catch (error) {
    res.status(400);
    res.json({
      code: 400,
      data: "error~"
    });
  }
};

// 01 - 服务器测试
router.get("/test", (req, res, next) => {
  res.status(200);
  res.json({
    code: 200,
    message: "ok"
  });
});

// 02 - 用户登录
router.post("/login", isUserExist, (req, res, next) => {
  try {
    const userInfo = req.userInfo;
    const token = issueToken(userInfo);

    res.status(200);
    res.json({
      code: 200,
      token: token,
      userInfo
    });
  } catch (error) {
    res.status(401);
    res.json({
      code: 401,
      data: "error~"
    });
  }
});

// 03 - 用户签到
router.post("/sign", verifyUserToken, async (req, res, next) => {
  const userInfo = req.userInfo;
  const { sign_code, mac } = req.body;

  // 更新Mac
  const user_result = await selectUserByUserId(userInfo.user_id);
  if (user_result.length > 0) {
    const user_mac = user_result[0].user_mac;
    if (!user_mac) await updateUserMacByUserId(mac, userInfo.user_id);
  }

  // 用户签到
  const sign_datas = await selectSignBySignCode(sign_code);
  if (sign_datas.length > 0) {
    const sign_info = sign_datas[0];
    // 查找该用户是否签到
    const sign_user_info = await selectSignBySignAndUserId(sign_info.sign_id, userInfo.user_id);
    if (sign_user_info.length > 0) {
      res.status(400);
      res.json({ code: 400, data: "exist~" });
    } else {
      try {
        const sign_time = formatDateTime(new Date().getTime());
        const is_mac_error = user_result[0].user_mac === mac ? 1 : 0; // 1表示正常 0表示异常
        await userCheckIn(userInfo.user_id, sign_info.sign_id, sign_time, mac, is_mac_error);

        chalkThirdConsole(`${userInfo.user_name} 已经签到`);

        res.status(200);
        res.json({ code: 200, data: "ok" });
      } catch (error) {
        res.status(400);
        res.json({ code: 400, data: "error~" });
      }
    }
  } else {
    res.status(400);
    res.json({ code: 400, data: "签到码错误~" });
  }
});

// 04 - 用户查看记录
router.get("/query-sign", verifyUserToken, async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const result = await selectSignHistory(user_id);

    res.status(200);
    res.json({
      code: 200,
      data: result
    });
  } catch (error) {
    res.status(400);
    res.json({
      code: 400,
      data: "error~"
    });
  }
});

module.exports = router;
