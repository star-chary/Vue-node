const Service = require('egg').Service;

class LogService extends Service {
  async getLogs({ page = 1, pageSize = 10, all }) {
    const { ctx } = this;
    if (all) {
      const data = await ctx.model.Log.find();
      return {
        total: data.length,
        data,
      };
    }
    const [ total, data ] = await Promise.all([
      ctx.model.Log.countDocuments(),
      ctx.model.Log.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize),
    ]);
    return {
      total,
      data,
    };
  }
}

module.exports = LogService;
