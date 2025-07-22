const controller = require('egg').Controller;

class CommentController extends Controller {
// 创建评论
  async createComment() {
    const { ctx } = this;
    const {content,topic_id,_id} = ctx.request.body;
  }
}
