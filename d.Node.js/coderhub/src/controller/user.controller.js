const fs = require("fs");

const { create } = require("../service/user.service");
const UserService = require("../service/user.service");

const { AVATER_PATH } = require("../constants/file-path");

class UserController {
  async create(context, next) {
    // 获取参数
    const user = context.request.body;
    // 注册用户
    const result = await create(user);

    context.body = "用户注册成功~";
  }

  async GetAvaterByUserId(context, next) {
    const { userId } = context.request.params;

    const [result] = await UserService.GetUserAvaterByUserId(userId);

    context.response.set("content-type", result.mimetype);
    context.body = fs.createReadStream(`${AVATER_PATH}/${result.filename}`);
  }
}

module.exports = new UserController();
