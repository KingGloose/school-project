const connection = require("../app/database");

const sqlFragment = `
select m.id,content,
  JSON_OBJECT('user_id',users.id,'user_name',name,"avaterUrl",avaterUrl) as user,
  m.createAt,m.updateAt,
  (select count(*) from comment c where c.moment_id = m.id) CommentCount,
  (select count(*) from moment_label ml where m.id = ml.moment_id) labelCount
    from moment m 
  left join users on users.id = m.user_id `;

class MomentService {
  // 插入一个文章
  async IncertContext(userId, content) {
    const statement = "insert into moment(content,user_id) values(?,?)";
    const result = await connection.execute(statement, [content, userId]);

    return result[0];
  }

  // 查询某一条文章
  async getContentById(id) {
    const statement = sqlFragment + `where m.id = ?`;
    const result = await connection.execute(statement, [id]);

    return result[0][0];
  }

  // 查询多条文章
  async getContentList(page, size) {
    const SqlPage = String((page - 1) * size);
    const SqlSize = String(size);

    const statement = sqlFragment + `limit ?,?`;
    const result = await connection.execute(statement, [SqlPage, SqlSize]);

    return result[0];
  }

  // 修改文章
  async UpdateContent(id, content) {
    const statement = `update moment set content = ? where id = ?`;
    const result = await connection.execute(statement, [content, id]);

    return result[0];
  }

  // 删除文章
  async RemoveContent(id) {
    const statement = "delete from moment where id = ?";
    const result = await connection.execute(statement, [id]);

    return result[0];
  }

  // 查看图片通过momentId
  async GetPictrueByMomentId(momentId) {
    const statement = `select * from file where moment_id = ?`;
    const result = connection.execute(statement, [momentId]);

    return result;
  }

  // 查看图片通过图片id
  async GetPictrueById(id) {
    const statement = `select * from file where id = ?`;
    const result = connection.execute(statement, [id]);

    return result;
  }
}

module.exports = new MomentService();
