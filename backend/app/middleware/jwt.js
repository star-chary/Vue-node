// module.exports = options => {
//   return async function jwt(ctx, next) {
//     // 1. 获取 Token（处理 Bearer 前缀）
//     let token = ctx.request.header.authorization;
//
//     if (token) {
//       // 2. 移除 "Bearer " 前缀
//       if (token.startsWith('Bearer ')) {
//         token = token.slice(7); // 去掉 "Bearer "
//       }
//
//       try {
//         // ✅ 对于 multipart 请求，先保存 token，在控制器中验证
//         if (ctx.request.header['content-type'] &&
//           ctx.request.header['content-type'].includes('multipart/form-data')) {
//           ctx.jwtToken = token; // 保存 token，稍后验证
//           ctx.jwtOptions = options; // 保存配置
//           return await next();
//         }
//
//         // 对于非 multipart 请求，正常验证
//         const decode = await ctx.app.jwt.verify(token, options.secret);
//         ctx.user = decode;
//         return await next();
//
//       } catch (error) {
//         console.log('JWT 验证失败:', error.message);
//         ctx.status = 401;
//         ctx.body = {
//           code: 401,
//           status: 'fail',
//           message: 'JWT 验证失败: ' + error.message,
//         };
//         return;
//       }
//
//
//       // try {
//       //   // 3. 验证 Token（JWT 库会自动检查过期时间）
//       //   const decode = await ctx.app.jwt.verify(token, options.secret);
//       //
//       //   // 4. 将用户信息存储到 ctx 中，供后续使用
//       //   ctx.user = decode;
//       //
//       //   // 5. 对于 multipart 请求，不要尝试解析请求体，直接继续
//       //   // if (ctx.request.is('multipart/*')) {
//       //   //   // multipart 请求的请求体将在 controller 中通过 ctx.multipart() 处理
//       //   //   return await next();
//       //   // }
//       //
//       //   // 6. 对于非 multipart 请求，正常继续执行
//       //   return await next();
//       //
//       // } catch (error) {
//       //   // 7. Token 验证失败（包括过期）
//       //   console.log('JWT 验证失败:', error.message);
//       //
//       //   ctx.status = 401;
//       //   ctx.body = {
//       //     code: 401,
//       //     status: 'fail',
//       //     message: 'JWT 验证失败: ' + error.message,
//       //   };
//       //   return;
//       // }
//     }
//
//     // 8. 没有 Token，返回 401
//     ctx.status = 401;
//     ctx.body = {
//       code: 401,
//       status: 'fail',
//       message: '未授权访问 - Token 不存在',
//     };
//     return;
//   };
// };






// module.exports = options => {
//   return async function jwt(ctx, next) {
//     console.log('🔍 JWT 中间件开始执行');
//     console.log('Content-Type:', ctx.request.header['content-type']);
//
//     let token = ctx.request.header.authorization;
//
//     if (token) {
//       if (token.startsWith('Bearer ')) {
//         token = token.slice(7);
//       }
//
//       try {
//         // ✅ 检查是否为 multipart 请求
//         const contentType = ctx.request.header['content-type'];
//         if (contentType && contentType.includes('multipart/form-data')) {
//           console.log('✅ 检测到 multipart 请求，保存 token');
//           ctx.jwtToken = token;
//           ctx.jwtOptions = options;
//           return await next();
//         }
//
//         console.log('🔒 非 multipart 请求，正常验证 JWT');
//         const decode = await ctx.app.jwt.verify(token, options.secret);
//         ctx.user = decode;
//         return await next();
//
//       } catch (error) {
//         console.log('❌ JWT 验证失败:', error.message);
//         ctx.status = 401;
//         ctx.body = {
//           code: 401,
//           status: 'fail',
//           message: 'JWT 验证失败: ' + error.message,
//         };
//         return;
//       }
//     }
//
//     console.log('❌ 没有 Token');
//     ctx.status = 401;
//     ctx.body = {
//       code: 401,
//       status: 'fail',
//       message: '未授权访问 - Token 不存在',
//     };
//     return;
//   };
// };


module.exports = options => {
  return async function jwt(ctx, next) {
    console.log('🔍 JWT 中间件开始执行');
    console.log('Content-Type:', ctx.request.header['content-type']);

    let token = ctx.request.header.authorization;

    if (token) {
      if (token.startsWith('Bearer ')) {
        token = token.slice(7);
      }

      // ✅ 对于 multipart 请求，完全跳过验证，直接传递
      const contentType = ctx.request.header['content-type'];
      if (contentType && contentType.includes('multipart/form-data')) {
        console.log('✅ multipart 请求，跳过 JWT 验证，直接传递到控制器');
        ctx.jwtToken = token;
        ctx.jwtOptions = options;
        // ⚠️ 关键：不要做任何可能消费请求流的操作
        return await next();
      }

      try {
        console.log('🔒 非 multipart 请求，正常验证 JWT');
        const decode = await ctx.app.jwt.verify(token, options.secret);
        ctx.user = decode;
        return await next();
      } catch (error) {
        console.log('❌ JWT 验证失败:', error.message);
        ctx.status = 401;
        ctx.body = {
          code: 401,
          status: 'fail',
          message: 'JWT 验证失败: ' + error.message,
        };
        return;
      }
    }

    console.log('❌ 没有 Token');
    ctx.status = 401;
    ctx.body = {
      code: 401,
      status: 'fail',
      message: '未授权访问 - Token 不存在',
    };
    return;
  };
};
