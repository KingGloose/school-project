const CommentService = require("../service/comment.service");

class CommentController {
  // 发表评论
  async create(context, next) {
    const { momentId, content } = context.request.body;
    const { id } = context.user;
    const result = await CommentService.InsertComment(momentId, id, content);

    context.body = "添加成功";
  }

  // 回复评论
  async reply(context, next) {
    const { momentId, content } = context.request.body;
    const { commentId } = context.request.params;
    const { id } = context.user;

    const result = await CommentService.ReplyComment(
      momentId,
      id,
      content,
      commentId
    );

    context.body = "添加成功";
  }

  // 修改评论
  async update(context, next) {
    const { commentId } = context.request.params;
    const { content } = context.request.body;

    const result = await CommentService.UpdateComment(commentId, content);

    context.body = "修改完毕~";
  }

  // 删除评论
  async remove(context, next) {
    const { commentId } = context.request.params;
    const result = await CommentService.RemoveComment(commentId);
    console.log(result);

    context.body = "删除成功~";
  }

  // 获取评论列表
  async list(context, next) {
    const { momentId } = context.request.params;
    const result = await CommentService.GetCommentByMomentId(momentId);

    context.body = result;
  }
}

module.exports = new CommentController();
