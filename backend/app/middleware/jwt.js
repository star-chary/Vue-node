module.exports = options => {
  return async function jwt(ctx, next) {
    // 1. 获取 Token（处理 Bearer 前缀）
    let token = ctx.request.header.authorization;

    if (token) {
      // 2. 移除 "Bearer " 前缀
      if (token.startsWith('Bearer ')) {
        token = token.slice(7); // 去掉 "Bearer "
      }

      try {
        // 3. 验证 Token（JWT 库会自动检查过期时间）
        const decode = await ctx.app.jwt.verify(token, options.secret);

        // 4. 将用户信息存储到 ctx 中，供后续使用
        ctx.user = decode;

        // 5. 继续执行下一个中间件
        return await next();

      } catch (error) {
        // 6. Token 验证失败（包括过期）
        console.log('JWT 验证失败:', error.message);
      }
    }

    // 7. 没有 Token 或验证失败，返回 401
    ctx.status = 401;
    ctx.body = {
      status: 'fail',
      message: '未授权访问',
    };
    return;
  };
};
