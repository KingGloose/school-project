const errorType = require("../constants/error-types");
const { GetUserByName } = require("../service/user.service");
const { MD5PassWord } = require("../utils/password-handle");

const AuthService = require("../service/auth.service");

const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

const verifyLogin = async (context, next) => {
  const { name, password } = context.request.body;

  // 判断用户是否存在，如果不存在就报错
  const result = await GetUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorType.USERNAME_NOT_EXISTS);
    return context.app.emit("error", error, context);
  }

  // 对密码进行处理
  if (MD5PassWord(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_ERROR);
    return context.app.emit("error", error, context);
  }

  context.user = user;

  await next();
};

const verifyAuth = async (context, next) => {
  const authorization = context.headers.authorization;
  // 如果authorization都没有取到的话，也会报错
  if (!authorization) {
    const error = new Error(errorType.TOKEN_VERIFYAUTH_ERROR);
    return context.app.emit("error", error, context);
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    context.user = result;

    await next();
  } catch (e) {
    const error = new Error(errorType.TOKEN_VERIFYAUTH_ERROR);
    context.app.emit("error", error, context);
  }
};

const verifyPermission = (tableName) => {
  return async (context, next) => {
    var id = "";
    if (tableName === "comment") {
      id = context.request.params.commentId;
    } else if (tableName === "moment") {
      id = context.request.params.momentId;
    }

    const LoginUserId = context.user.id;

    try {
      const result = await AuthService.CheckResources(
        tableName,
        id,
        LoginUserId
      );
      if (result) throw new Error();
    } catch (err) {
      const error = new Error(errorType.PERMISSION_IS_ERROR);
      return context.app.emit("error", error, context);
    }

    await next();
  };
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
