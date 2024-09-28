const errorType = require("../constants/error-types");

const errorHandle = (error, context) => {
  console.log(error.message);
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_NULL:
      status = 400;
      message = "用户名和密码不能为空";
      break;
    case errorType.USERNAME_ALREADY_EXISTS:
      status = 409;
      message = "该用户已经存在";
      break;
    case errorType.USERNAME_NOT_EXISTS:
      status = 400;
      message = "该用户不存在,请注册之后登录";
      break;
    case errorType.PASSWORD_IS_ERROR:
      status = 400;
      message = "密码错误";
      break;
    case errorType.TOKEN_VERIFYAUTH_ERROR:
      status = 401;
      message = "无效的token";
      break;
    case errorType.CONTENT_IS_NULL:
      status = 400;
      message = "文章为空";
      break;
    case errorType.PERMISSION_IS_ERROR:
      status = 401;
      message = "权限错误";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  context.response.status = status;
  context.response.body = message;
};

module.exports = errorHandle;
