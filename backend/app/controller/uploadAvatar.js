// app/controller/uploadAvatar.js
const Controller = require('egg').Controller;
const { existsSync } = require('node:fs');
const fs = require('node:fs').promises;

class UploadAvatarController extends Controller {
  async uploadAvatar() {
    const { ctx } = this;
    const { files } = ctx.request; // 解构获取文件数组


    // 核心：使用中间件传递的 token 和 options 进行验证
    const decode = await ctx.app.jwt.verify(ctx.jwtToken, ctx.jwtOptions.secret);
    ctx.user = decode;
    // 假设用户ID可以从 ctx.user 获取（需要JWT或其他认证）
    const userId = ctx.user.id;

    try {
      // 1. 验证文件：确保文件存在且只处理第一个
      if (!files || files.length === 0) {
        ctx.status = 400;
        ctx.body = { code: 400, msg: '请上传图片' };
        return;
      }

      // 2. 核心逻辑：调用 Service 处理单个文件
      const tempFile = files[0]; // 仅处理第一个文件 (头像)
      // Service 命名为 file, 所以调用 ctx.service.file
      const fileData = await ctx.service.upload.processAndSaveFile(tempFile, 'avatar');
      const newAvatarUrl = fileData.url;

      // 3. 数据库更新：将新的头像 URL 写入 User 模型
      // 假设你的 User 模型可以通过 ctx.model.User 访问
      const updateResult = await ctx.model.UserProfile.updateOne(
        // 筛选条件：使用 user_id 字段
        { user_id: userId },
        // 更新字段：使用 avatar_url
        { avatar_url: newAvatarUrl, update_at: new Date() },
        // 选项：如果找不到 UserProfile，则创建它 (upsert: true)
        { upsert: true }
      );

      if (updateResult.modifiedCount === 0) {
        // 如果没有修改任何文档，可能用户ID不存在
        ctx.logger.warn(`用户头像更新失败，用户ID不存在: ${userId}`);
      }

      // 4. 返回成功响应
      ctx.body = {
        code: 200,
        msg: '头像上传成功',
        data: {
          url: newAvatarUrl,
          // 可以在这里返回其他文件信息，例如 filename: fileData.filename
        },
      };

    } catch (e) {
      ctx.logger.error('上传头像失败:', e);
      // 确保在出错时，文件列表中的临时文件被清理（尽管 Service 内部已处理，这里是安全措施）
      // if (files && files.length > 0) {
      //   files.forEach(async file => {
      //     if (file.filepath && existsSync(file.filepath)) {
      //       await fs.unlink(file.filepath)
      //         .catch(err => ctx.logger.error('清理临时文件失败:', err));
      //     }
      //   });
      // }

      if (files && files.length > 0) {
        // ❌ 错误：forEach 无法 await
        files.forEach(async file => {
          if (file.filepath && existsSync(file.filepath)) {
            // 应该使用 Promise.all 或 for...of 循环来确保 await
            await fs.promises.unlink(file.filepath) // 💥 修正：使用 fs.promises
              .catch(err => ctx.logger.error('清理临时文件失败:', err));
          }
        });
        // ⚠️ 建议使用 Promise.all(files.map(...)) 或 for...of 来确保所有文件清理完毕
      }

      ctx.status = 500;
      ctx.body = {
        code: 500,
        msg: '上传失败: ' + e.message,
      };
    }
  }
}

module.exports = UploadAvatarController;
