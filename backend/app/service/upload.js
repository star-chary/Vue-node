// // app/service/upload.js
//
// const Service = require('egg').Service;
// const path = require('path');
// const fs = require('fs/promises'); // 使用 fs.promises
// const fse = require('fs-extra'); // 使用 fs-extra 的 mkdirp
// const sharp = require('sharp');
// const dayjs = require('dayjs');
//
// class UploadService extends Service {
//   /**
//    * 通用文件上传和处理逻辑
//    * @param {Array<Object>} files - ctx.request.files 文件数组
//    * @param {string} subDir - 存储文件的子目录，例如 'avatars' 或 'topics'
//    * @returns {Array<Object>} 包含上传后文件信息的数组
//    */
//   async handleFileUpload(files, subDir = 'general') {
//     const { ctx, app } = this;
//
//     if (!files || files.length === 0) {
//       ctx.throw(400, '没有文件被上传');
//     }
//
//     const todayStr = dayjs().format('YYYY-MM-DD');
//     // 最终存放路径: app/public/uploads/subDir/YYYY-MM-DD
//     const uploadDir = path.join(app.baseDir, 'app/public/uploads', subDir, todayStr);
//
//     // 使用 fs-extra 确保目录存在
//     await fse.ensureDir(uploadDir);
//
//     const uploadedFilesInfo = [];
//     let counter = 0;
//
//     for (const file of files) {
//       const filename = `${Date.now()}-${counter++}-${file.filename}`;
//       const finalPath = path.join(uploadDir, filename);
//
//       try {
//         // 1. 复制临时文件到目标路径
//         if (file.filepath && (await fse.pathExists(file.filepath))) {
//           await fs.copyFile(file.filepath, finalPath);
//           // 2. 删除临时文件
//           await fs.unlink(file.filepath);
//           console.log(`✅ 文件复制成功: ${finalPath}`);
//         } else {
//           ctx.throw(500, `临时文件不存在: ${file.filepath}`);
//         }
//
//         // 3. 获取文件信息 (使用 sharp 和 fs.stat)
//         const metadada = await sharp(finalPath).metadata();
//         const stats = await fs.stat(finalPath);
//
//         const fileInfo = {
//           // 相对 public 目录的访问 URL
//           url: `/public/uploads/${subDir}/${todayStr}/${filename}`,
//           width: metadada.width || 0,
//           height: metadada.height || 0,
//           size: stats.size,
//           filename: file.filename,
//         };
//
//         uploadedFilesInfo.push(fileInfo);
//         console.log('✅ 文件信息获取成功:', fileInfo);
//       } catch (fileError) {
//         console.error('❌ 文件处理错误:', fileError);
//
//         // 4. 出现错误时，清理可能已创建的目标文件
//         if (await fse.pathExists(finalPath)) {
//           await fs.unlink(finalPath).catch(err => console.error('清理目标文件失败:', err));
//         }
//
//         // 抛出错误，外层统一处理
//         ctx.throw(500, '文件处理失败');
//       }
//     }
//
//     return uploadedFilesInfo;
//   }
// }
//
// module.exports = UploadService;

// app/service/upload.js
const Service = require('egg').Service;

// ❗ 重点：这里我们使用 Controller 中提供的所有依赖。
// 在 Service 中，通常只 require 需要的模块，这里为了演示兼容你的配置，我们保持一致。
const path = require('node:path');
const dayjs = require('dayjs');
const fs = require('node:fs').promises; // ✅ 将 fs 导入为 Promise 版本，以便使用 await
const { existsSync } = require('node:fs'); // ✅ 导入同步检查函数
const { mkdirp } = require('mkdirp');     // ✅ 导入 mkdirp 库本身
const sharp = require('sharp');
// ❗ 注意：如果你安装的 sharp 无法使用，你需要确保它已正确安装：npm install sharp

class FileService extends Service {
  /**
   * 核心文件处理逻辑：将临时文件移动到永久存储位置，并返回其元数据。
   *
   * @param {Object} tempFile - Egg.js ctx.request.files 中的单个文件对象
   * @param {string} bizType - 业务类型（如 'avatar', 'topic'），用于创建分类子目录
   * @returns {Object} 包含最终 URL 和元数据的对象
   */
  async processAndSaveFile(tempFile, bizType = 'general') {
    const { ctx, app } = this;

    // 1. 定义存储路径
    const dateDir = dayjs().format('YYYY-MM-DD');
    const uploadDir = path.join(app.baseDir, 'app/public/uploads', bizType, dateDir);

    // 2. 确保目标目录存在
    // ❌ 错误：await mkdirp(uploadDir);
    // ✅ 修复：直接调用 mkdirp()，它返回一个 Promise
    await mkdirp(uploadDir);

    // 3. 生成唯一文件名
    const filename = `${Date.now()}-${path.basename(tempFile.filename)}`;
    const finalPath = path.join(uploadDir, filename);

    const tempFilePath = tempFile.filepath;

    if (!tempFilePath || !existsSync(tempFilePath)) { // 检查临时文件是否存在
      throw new Error(`临时文件不存在: ${tempFilePath}`);
    }

    try {
      // 4. 从临时路径复制/移动到目标路径 (使用 fs.promises 版本)
      await fs.copyFile(tempFilePath, finalPath);
      ctx.logger.info('✅ 文件复制成功:', finalPath);

      // 5. 获取文件信息 (使用 fs.promises 版本)
      const metadada = await sharp(finalPath).metadata();
      const stats = await fs.stat(finalPath);

      // 6. 构造访问 URL
      const relativeUrl = `/uploads/${bizType}/${dateDir}/${filename}`;

      return {
        url: relativeUrl,
        width: metadada.width || 0,
        height: metadada.height || 0,
        size: stats.size,
        filename: tempFile.filename,
      };

    } catch (error) {
      ctx.logger.error('❌ 文件处理或存储失败:', error);

      // 存储失败，尝试删除已创建的目标文件 (使用 fs.promises 版本)
      if (existsSync(finalPath)) {
        await fs.unlink(finalPath);
      }
      throw error;
    } finally {
      // 7. 最终清理：无论成功失败，必须删除临时文件 (使用 fs.promises 版本)
      if (existsSync(tempFilePath)) {
        await fs.unlink(tempFilePath);
        ctx.logger.info('🧹 临时文件已清理:', tempFilePath);
      }
    }
  }
}

module.exports = FileService;
