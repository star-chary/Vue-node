const Controller = require('egg').Controller;

class CommentController extends Controller {
// 创建评论
  async createComment() {
    const { ctx } = this;
    const { comment_content, topic_id, author_id, author_name } = ctx.request.body;

    // 调用 service 中的创建评论方法
    await ctx.service.comment.createComment(comment_content, topic_id, author_id, author_name);
    try {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '创建成功',
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        msg: '创建失败',
        data: null,
      };
    }
  }

  // 获取文章评论
  async getCommentList() {
    const { ctx } = this;

    try {
      const { topic_id } = ctx.request.body;
      const { comments, total } = await ctx.service.comment.getCommentList(topic_id);
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: {
          list: comments,
          total,
        },
      };
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500,
        msg: error.message || '获取失败',
        data: null,
      };
    }
  }
}

module.exports = CommentController;
