const connection = require("../app/database");

class AuthService {
  async CheckResources(tableName, id, userid) {
    const statement = `select * from ${tableName} where id = ? and user_id = ?`;
    const result = await connection.execute(statement, [id, userid]);

    return result[0].length === 0;
  }
}

module.exports = new AuthService();
