// // Controller 是 Egg.js 框架中处理 HTTP 请求的组件
// const Controller = require('egg').Controller;
//
// // 创建一个继承自 Egg.controller 的自定义控制器
// class UserController extends Controller {
//
//   // 自定义一个名为 reginster 的方法
//   async register() {
//     const { ctx } = this;
//     const { username, password } = ctx.request.body;
//
//     try {
//       await ctx.service.user.register(username, password);
//       // 设置响应内容，将用户名和密码作为 JSON 返回
//       ctx.status = 200;
//       ctx.body = { username, password };
//     } catch (e) {
//       if (e.status === 409) {
//         ctx.status = 409;
//         ctx.body = {
//           status: 'fail',
//           message: '用户名已存在',
//         };
//       }
//     }
//   }
//
//   async login() {
//     const { ctx } = this;
//     const { username, password } = ctx.request.body;
//     const user = await ctx.service.user.login(username, password);
//     if (user) {
//       const token = await ctx.app.jwt.sign({ username: user.username, id: user._id },
//         this.config.jwt.secret, {
//           expiresIn: '7d',
//         });
//       // const userInfo = await ctx.service.user.getCurrentUser();
//       ctx.status = 200;
//       ctx.body = {
//         msg: '登录成功',
//         code: 200,
//         data: {
//           token,
//           userInfo: {
//             username: user.username,
//             id: user._id,
//           },
//         },
//       };
//     } else {
//       ctx.status = 401;
//       ctx.body = { code: 401, msg: '用户名或密码错误', data: null };
//     }
//   }
//
//   // 获取用户信息
//   async getUserInfo() {
//     const { ctx } = this;
//     const user = await ctx.service.user.getCurrentUser();
//     ctx.body = {
//       code: 200,
//       msg: '获取成功',
//       data: {
//         username: user.username,
//         id: user._id,
//       },
//     };
//   }
//
//
// }
//
// module.exports = UserController;


// Controller 是 Egg.js 框架中处理 HTTP 请求的组件
const Controller = require('egg').Controller;
const path = require('node:path');
const dayjs = require('dayjs');
const fs = require('node:fs');
const { mkdirp } = require('mkdirp');
const sharp = require('sharp');

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
            avatar: user.avatar || '', // 新增：返回头像
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
        avatar: user.avatar || '', // 新增：返回头像
      },
    };
  }

  // 新增：上传并更新用户头像
  async uploadAvatar() {
    const { ctx } = this;

    try {
      // 1) JWT校验（与你在 TopicController 中的做法一致）
      if (ctx.jwtToken) {
        const decode = await ctx.app.jwt.verify(ctx.jwtToken, ctx.jwtOptions.secret);
        ctx.user = decode;
      } else {
        ctx.status = 401;
        ctx.body = { code: 401, status: 'fail', message: '未授权访问' };
        return;
      }

      // 2) 检查是否有文件
      const files = ctx.request.files;
      if (!files || files.length === 0) {
        ctx.status = 400;
        ctx.body = { code: 400, msg: '请上传头像图片', data: null };
        return;
      }

      const file = files[0];

      // 3) 基础校验（类型/大小）- 也可以在 config.multipart 做白名单，这里双保险
      const allowed = [ '.png', '.jpg', '.jpeg', '.webp', '.gif' ];
      const ext = path.extname(file.filename)
        .toLowerCase();
      if (!allowed.includes(ext)) {
        // 清理临时文件
        if (file.filepath && fs.existsSync(file.filepath)) {
          await fs.promises.unlink(file.filepath);
        }
        ctx.status = 400;
        ctx.body = { code: 400, msg: '不支持的图片格式', data: null };
        return;
      }

      // 4) 生成保存目录与文件名
      const dateDir = dayjs()
        .format('YYYY-MM-DD');
      const uploadDir = path.join(ctx.app.baseDir, 'app/public/uploads/avatars', dateDir);
      await mkdirp(uploadDir);

      const filename = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}${ext}`;
      const finalPath = path.join(uploadDir, filename);

      try {
        // 保存文件到目标位置
        if (file.filepath && fs.existsSync(file.filepath)) {
          await fs.promises.copyFile(file.filepath, finalPath);
          await fs.promises.unlink(file.filepath);
        } else {
          throw new Error(`临时文件不存在: ${file.filepath}`);
        }

        // 5) 可选：用 sharp 进行压缩/缩放/裁剪到方形（比如 256x256）
        // 如果不需要裁剪，可注释掉
        await sharp(finalPath)
          .resize(256, 256, { fit: 'cover' })
          .toFile(finalPath + '.tmp');
        await fs.promises.rename(finalPath + '.tmp', finalPath);

        // 6) 生成可访问 URL（假设静态资源指向 /public，或你已有 /uploads 的映射）
        const url = `/uploads/avatars/${dateDir}/${filename}`;

        // 7) 更新当前用户的头像字段
        const User = ctx.model.User;
        await User.findByIdAndUpdate(ctx.user.id, {
          avatar: url,
          update_at: new Date(),
        });

        ctx.status = 200;
        ctx.body = {
          code: 200,
          msg: '头像上传成功',
          data: { url },
        };
      } catch (fileError) {
        // 清理文件
        if (file.filepath && fs.existsSync(file.filepath)) {
          try {
            await fs.promises.unlink(file.filepath);
          } catch {
          }
        }
        if (fs.existsSync(finalPath)) {
          try {
            await fs.promises.unlink(finalPath);
          } catch {
          }
        }
        throw fileError;
      }
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = { code: ctx.status, msg: error.message || '头像上传失败', data: null };
    }
  }


}

module.exports = UserController;
