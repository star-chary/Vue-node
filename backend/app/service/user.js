'use strict';

const Service = require('egg').Service;
// node 内置模块 crypto 对密码进行加密
const crypto = require('crypto');

class UserService extends Service {
  // 注册
  async register(username, password) {
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
    return user;
    // const user = await ctx.model.User.findOne({ username });
    // if (!user) {
    //   ctx.throw(401, '用户名不存在');
    // }
    // const pwd = crypto.createHash('md5')
    //   .update(password)
    //   .digest('hex');
    // if (user.password !== pwd) {
    //   ctx.throw(401, '密码错误');
    // }
  }
}

module.exports = UserService;
