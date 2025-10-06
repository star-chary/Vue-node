const Controller = require('egg').Controller;

class CommentTreeDataController extends Controller {
  // 创建评论
  async createComment() {
    const { ctx } = this;
    try {
      const { content, userId, postId, parentId, replyTo } = ctx.request.body;

      ctx.body = {
        code: 200,
        content,
        userId,
        postId,
        parentId: parentId || null,
        replyTo: replyTo || null,
      };
    } catch (e) {
      ctx.body = {
        code: 400,
        msg: '创建失败',
        data: null,
      };
    }
  }

}

module.exports = CommentTreeDataController;
