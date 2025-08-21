module.exports = (options, app) => {
  return async function logger(ctx, next) {
    if (ctx.path === '/login') {
      // 获取 ip
      const ip = ctx.request.headers['x-forwarded-for'] || ctx.ip;
      // const ip = '117.147.27.69';
      // ip 转换的地址
      // const location = await app.service.ip.getLocation(ip);
      const location = await ctx.service.ipService.getLocation(ip);
      // 获取 UA
      const userAgent = ctx.get('user-agent') || '';
      // 去请求的路径和方法
      const path = ctx.request.url;
      const method = ctx.request.method;
      // 时间
      const time = new Date();

      await ctx.model.Log.create({ ip, location, userAgent, path, method, time });
      app.logger.info('[LOGGER]', { ip, location, userAgent, path, method, time }, '------------------------------');// 打印到控制台
    }
    await next();
  };
};
