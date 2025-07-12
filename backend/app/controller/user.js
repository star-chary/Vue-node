// Controller 是 Egg.js 框架中处理 HTTP 请求的组件
const Controller = require('egg').Controller;

// 创建一个继承自 Egg.controller 的自定义控制器
class UserController extends Controller {
  // 自定义一个名为 reginster 的方法
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    await ctx.service.user.register(username, password);
    // 设置响应内容，将用户名和密码作为 JSON 返回
    ctx.body = { username, password };
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.login(username, password);
    if (user) {
      const token = await ctx.app.jwt.sign({ username: user.username, id: user._id },
        this.config.jwt.secret, {
          expiresIn: 3600,
        });
      ctx.body = { status: 'success', token };
    } else {
      ctx.body = { status: 'fail' };
    }
  }
}

module.exports = UserController;
