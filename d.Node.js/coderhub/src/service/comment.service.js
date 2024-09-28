const connection = require("../app/database");

class CommentService {
  // 发表评论
  async InsertComment(momentId, id, content) {
    try {
      const statement =
        "insert into comment(content,moment_id,user_id) values(?,?,?)";
      const [result] = await connection.execute(statement, [
        content,
        momentId,
        id,
      ]);

      return result;
    } catch (e) {
      console.log(e);
    }
  }

  // 回复评论
  async ReplyComment(momentId, id, content, commentId) {
    try {
      const statement =
        "insert into comment(content,moment_id,user_id,comment_id) values(?,?,?,?)";
      const result = connection.execute(statement, [
        content,
        momentId,
        id,
        commentId,
      ]);

      return result;
    } catch (e) {
      console.log(e);
    }
  }

  // 修改评论
  async UpdateComment(commentId, content) {
    const statement = "update comment set content = ? where id = ?";
    const result = connection.execute(statement, [content, commentId]);

    return result;
  }

  // 删除评论
  async RemoveComment(commentId) {
    const statement = "delete from comment where id = ?";
    const result = await connection.execute(statement, [commentId]);

    return result[0];
  }

  // 获取评论
  async GetCommentByMomentId(momentId) {
    const statement = `select c.id,content,moment_id,
      JSON_OBJECT("id",u.id,"name",u.name) user,
      comment_id,c.createAt,c.updateAt 
      from comment c
      left join users u on u.id = c.user_id
      where moment_id = ?`;
    const result = await connection.execute(statement, [momentId]);

    return result[0];
  }
}

module.exports = new CommentService();
