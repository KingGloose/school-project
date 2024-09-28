const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  //给该用户颁发token
  async login(context, next) {
    // 1. 获取数据
    const { id, name } = context.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    context.response.body = { id, name, token };
  }

  async success(context, next) {
    context.body = "授权成功";
  }
}

module.exports = new AuthController();
