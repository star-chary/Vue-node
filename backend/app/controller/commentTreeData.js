const Controller = require('egg').Controller;

class CommentTreeDataController extends Controller {
  // 创建评论
  async createComment() {
    const { ctx } = this;
    try {
      const { content, userId, postId, parentId, replyTo, userName, userAvatar } = ctx.request.body;

      // 参数验证
      if (!content || !userId || !postId || !userName) {
        ctx.body = {
          code: 400,
          msg: '缺少必要参数',
          data: null,
        };
        return;
      }

      ctx.body = {
        code: 200,
        content,
        userId,
        postId,
        userName,
        userAvatar: userAvatar || null,
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
