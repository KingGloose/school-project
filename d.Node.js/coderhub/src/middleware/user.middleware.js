const errorType = require("../constants/error-types");
const { GetUserByName } = require("../service/user.service");
const { MD5PassWord } = require("../utils/password-handle");

// 判断用户名和密码是否为空
const NamePassNull = async (context, next) => {
  const { name, password } = context.request.body;

  if (!name || !password || password === "" || name === "") {
    // 抛出错误
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_NULL);
    context.app.emit("error", error, context);
  } else {
    await next();
  }
};

// 判断这次注册的用户名和密码是否被注册过
const verifyUser = async (context, next) => {
  const { name } = context.request.body;
  const result = await GetUserByName(name);

  if (result.length) {
    const error = new Error(errorType.USERNAME_ALREADY_EXISTS);
    context.app.emit("error", error, context);
  } else {
    await next();
  }
};

// 对密码进行加密
const handlePassword = async (context, next) => {
  let { password } = context.request.body;
  context.request.body.password = MD5PassWord(password);

  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
  NamePassNull,
};
