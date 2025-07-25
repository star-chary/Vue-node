// Controller 是 Egg.js 框架中处理 HTTP 请求的组件
const Controller = require('egg').Controller;

// 创建一个继承自 Egg.controller 的自定义控制器
class UserController extends Controller {

  // 自定义一个名为 reginster 的方法
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    try {
      await ctx.service.user.register(username, password);
      // 设置响应内容，将用户名和密码作为 JSON 返回
      ctx.status = 200;
      ctx.body = { username, password };
    } catch (e) {
      if (e.status === 409) {
        ctx.status = 409;
        ctx.body = {
          status: 'fail',
          message: '用户名已存在',
        };
      }
    }
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.login(username, password);
    if (user) {
      const token = await ctx.app.jwt.sign({ username: user.username, id: user._id },
        this.config.jwt.secret, {
          expiresIn: '7d',
        });
      // const userInfo = await ctx.service.user.getCurrentUser();
      ctx.status = 200;
      ctx.body = {
        msg: '登录成功',
        code: 200,
        data: {
          token,
          userInfo: {
            username: user.username,
            id: user._id,
          },
        },
      };
    } else {
      ctx.status = 401;
      ctx.body = { code: 401, msg: '用户名或密码错误', data: null };
    }
  }

  // 获取用户信息
  async getUserInfo() {
    const { ctx } = this;
    const user = await ctx.service.user.getCurrentUser();
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: {
        username: user.username,
        id: user._id,
      },
    };
  }

}

module.exports = UserController;
