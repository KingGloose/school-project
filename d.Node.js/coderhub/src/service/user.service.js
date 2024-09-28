const connection = require("../app/database");
const { MD5PassWord } = require("../utils/password-handle");

class UserService {
  // 注册用户
  async create(user) {
    const { name, password } = user;
    // 执行sql语句
    const statement = "insert into users(name,password) values(?,?)";
    const result = await connection.execute(statement, [
      name,
      MD5PassWord(password),
    ]);

    return result;
  }

  // 通过名字来查询用户
  async GetUserByName(name) {
    const statement = "select * from users where name = ?";
    const result = await connection.execute(statement, [name]);

    return result[0];
  }

  // 查找用户的头像
  async GetUserAvaterByUserId(UserId) {
    const statement = "select * from avatar where user_id = ?";
    const result = await connection.execute(statement, [UserId]);

    return result[0];
  }

  // 更新用户头像
  async UpdateAvaterUrl(avaterUrl, UserId) {
    const statement = `update users set avaterUrl = ? where id = ?`;
    const result = connection.execute(statement, [avaterUrl, UserId]);

    return result[0];
  }
}

module.exports = new UserService();
