const Controller = require('egg').Controller;

class UserProfileController extends Controller {
  async getUserProfile() {
    const { ctx } = this;

    try {
      const userId = ctx.user.id;
      // 查找目标用户信息
      const data = await ctx.model.UserProfile.findOne({ user_id: userId });
      ctx.body = {
        data,
      };
    } catch (e) {
      ctx.status = 404;
      ctx.body = {
        msg: e.message,
      };
    }
  }
}

module.exports = UserProfileController;
