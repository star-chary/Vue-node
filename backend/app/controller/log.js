const Controller = require('egg').Controller;

class LogController extends Controller {
  async getLogList() {
    const { ctx } = this;
    try {
      ctx.status = 200;
      const logList = ctx.model.Log.find();
      ctx.body = {
        logList,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = LogController;
