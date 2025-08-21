const Controller = require('egg').Controller;

class LogController extends Controller {
  async getLogs() {
    const { ctx } = this;
    const { page, pageSize,all } = ctx.query;
    try {
      ctx.status = 200;
      const { total, data } = await ctx.service.logService.getLogs({ page, pageSize ,all});
      ctx.body = {
        data,
        total,
      };
    } catch (e) {
      console.log(e);
      ctx.status = 404;
    }
  }
}

module.exports = LogController;
