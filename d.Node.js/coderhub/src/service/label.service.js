const connection = require("../app/database");

class LabelService {
  // 创建label
  async CreateLabel(name) {
    const statement = `insert into label(name) values(?)`;
    const result = connection.execute(statement, [name]);

    return result;
  }

  // 获取是否有该label
  async GetLabelByName(name) {
    const statement = `select * from label where name = ?`;
    const result = await connection.execute(statement, [name]);

    return result[0][0];
  }

  // 查找该动态是否有该标签
  async hasLabelInMoment(momentId, labelId) {
    const statement = `select * from moment_label where moment_id = ? and label_id = ?`;
    const result = await connection.execute(statement, [momentId, labelId]);

    return result[0][0] ? true : false;
  }

  // 为动态添加标签
  async addLabel(momentId, labelId) {
    const statement = `insert into moment_label(moment_id,label_id) values(?,?)`;
    const result = await connection.execute(statement, [momentId, labelId]);

    return result[0];
  }

  // 查看标签
  async GetLabel(page, size) {
    const SqlPage = String((page - 1) * size);
    const SqlSize = String(size);

    const statement = "select * from label limit ?,?";
    const result = await connection.execute(statement, [SqlPage, SqlSize]);

    return result;
  }

  // 通过momentId来查询标签
  async GetLabelByMomentId(momentId) {
    const statement = `select * from moment_label where moment_id = ?`;
    const result = connection.execute(statement, [momentId]);

    return result;
  }

  // 通过labelId来查看标签的名字
  async GetLabelByLabelId(labelId) {
    const statement = `select * from label where id = ?`;
    const result = connection.execute(statement, [labelId]);

    return result;
  }
}

module.exports = new LabelService();
