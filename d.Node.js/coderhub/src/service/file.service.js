const connection = require("../app/database");

class FileService {
  // 添加头像
  async AddAvater(mimetype, size, filename, userId) {
    const statement =
      "insert into avatar(mimetype, size, filename, user_id) values(?,?,?,?)";
    const result = connection.execute(statement, [
      mimetype,
      size,
      filename,
      userId,
    ]);

    return result[0];
  }

  // 添加图片
  async AddPrictureFiles(filename, mimetype, size, momentId, id) {
    try {
      const statement = `
        insert into file(filename, mimetype, size, moment_id, user_id)
        value(? , ? , ? , ? , ?)
      `;
      const result = connection.execute(statement, [
        filename,
        mimetype,
        size,
        momentId,
        id,
      ]);

      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new FileService();
