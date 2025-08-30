const Service = require('egg').Service;

class CommentService extends Service {
  // 创建评论
  async createComment(comment_content, topic_id, author_id, author_name) {
    const { ctx } = this;

    const commentItme = new ctx.model.Comment();
    commentItme.comment_content = comment_content;
    commentItme.topic_id = topic_id;
    commentItme.author_id = author_id;
    commentItme.author_name = author_name;
    await commentItme.save();
  }

  // 获取评论列表
  async getCommentList(topic_id) {
    const { ctx } = this;
    const comments = await ctx.model.Comment.find({ topic_id });
    if (!comments) {
      const error = new Error('获取评论列表失败或文章暂无评论，请检查参数是否正确');
      error.status = 404;
      throw error;
    }
    const total = await ctx.model.Comment.countDocuments({ topic_id });
    return {
      data: comments,
      total,
    };
  }
}

module.exports = CommentService;
