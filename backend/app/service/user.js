'use strict';

const Service = require('egg').Service;
// node 内置模块 crypto 对密码进行加密
const crypto = require('crypto');

class UserService extends Service {
  // 注册
  async register(username, password) {

    // 检查用户是否存在
    const existingUser = await this.ctx.model.User.findOne({ username });
    if (existingUser) {
      this.ctx.throw(409, '用户名已存在');
      return;
    }
    const user = new this.ctx.model.User();
    const pwd = crypto.createHash('md5')
      .update(password)
      .digest('hex');
    user.username = username;
    user.password = pwd;

    return user.save();
  }

  // 登录
  async login(username, password) {
    const { ctx } = this;
    const pwd = crypto.createHash('md5')
      .update(password)
      .digest('hex');
    const user = await ctx.model.User.findOne({ username, password: pwd });
    if (!user) {
      ctx.throw(401, '用户名不存在');
    }
    if (user.password !== pwd) {
      ctx.throw(401, '密码错误');
    }
    return user;
  }

  async getCurrentUser() {
    const { ctx, config } = this;
    const token = ctx.request.header.authorization;
    if (!token) {
      ctx.throw(401, '请先登录');
    }
    // jwt.verify(),token 密钥
    const decode = await ctx.app.jwt.verify(token, config.jwt.secret);
    return await ctx.model.User.findOne({ _id: decode.id }).exec();
  }


}

module.exports = UserService;
