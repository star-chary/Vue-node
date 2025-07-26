const Controller = require('egg').Controller;
const path = require('node:path');
const dayjs = require('dayjs');
const fs = require('node:fs');
const { mkdirp } = require('mkdirp');
const sharp = require('sharp');

class TopicController extends Controller {
  async create() {
    const { ctx } = this;

    try {
      // ✅ 添加 JWT 验证
      if (ctx.jwtToken) {
        const decode = await ctx.app.jwt.verify(ctx.jwtToken, ctx.jwtOptions.secret);
        ctx.user = decode;
        console.log('✅ JWT 验证成功, 用户:', ctx.user.username || ctx.user.id);
      } else {
        console.log('❌ 没有找到 jwtToken');
        ctx.status = 401;
        ctx.body = { code: 401, status: 'fail', message: '未授权访问' };
        return;
      }

      // 检查是否有文件上传
      if (!ctx.request.files || ctx.request.files.length === 0) {
        ctx.status = 400;
        ctx.body = {
          code: 400,
          msg: '请上传图片',
          data: null,
        };
        return;
      }

      // 验证表单数据
      if (!ctx.request.body.title || !ctx.request.body.content) {
        ctx.status = 400;
        ctx.body = {
          code: 400,
          msg: '标题和内容不能为空',
          data: null,
        };
        return;
      }

      // 创建文件夹
      const uploadDir = path.join(ctx.app.baseDir, 'app/public/uploads', dayjs()
        .format('YYYY-MM-DD'));
      await mkdirp(uploadDir);

      const images = [];
      let counter = 0; // ✅ 添加计数器防止文件名重复

      // 处理每个文件
      for (const file of ctx.request.files) {
        // ✅ 改进文件名生成，防止重复
        const filename = `${Date.now()}-${counter++}-${file.filename}`;
        const finalPath = path.join(uploadDir, filename);

        try {
          // file 模式：从临时路径复制到目标路径
          if (file.filepath && fs.existsSync(file.filepath)) {
            await fs.promises.copyFile(file.filepath, finalPath);
            // 删除临时文件
            await fs.promises.unlink(file.filepath);
            console.log('✅ 文件复制成功:', finalPath);
          } else {
            throw new Error(`临时文件不存在: ${file.filepath}`);
          }

          // 获取文件信息
          const metadada = await sharp(finalPath)
            .metadata();
          const stats = await fs.promises.stat(finalPath); // ✅ 使用 promises 版本

          images.push({
            url: `/public/uploads/${dayjs()
              .format('YYYY-MM-DD')}/${filename}`,
            width: metadada.width || 0,
            height: metadada.height || 0,
            size: stats.size,
            filename: file.filename,
            author_id: ctx.user.id,
          });

          console.log('✅ 图片信息获取成功:', images[images.length - 1]);

        } catch (fileError) {
          console.error('❌ 文件处理错误:', fileError);

          // 清理临时文件
          if (file.filepath && fs.existsSync(file.filepath)) {
            try {
              await fs.promises.unlink(file.filepath);
            } catch (cleanupError) {
              console.error('清理临时文件失败:', cleanupError);
            }
          }

          // 清理目标文件
          if (fs.existsSync(finalPath)) {
            await fs.promises.unlink(finalPath);
          }

          throw fileError;
        }
      }

      // 构建主题数据
      const topicData = {
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        author_id: ctx.user.id,
        author_name: ctx.user.username,
        images,
        cover_image: images.length > 0 ? {
          url: images[0].url,
          width: images[0].width,
          height: images[0].height, // ✅ 添加缺少的 height
        } : null, // ✅ 改为 null 而不是空对象
      };

      console.log('📝 准备创建主题:', topicData.title);

      const topic = ctx.model.Topic;
      const result = await topic.create(topicData);

      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '创建成功',
        data: result,
      };

      console.log('✅ 主题创建成功');

    } catch (error) {
      console.error('❌ 创建主题失败:', error);

      // ✅ 在外层错误处理中清理可能的临时文件
      if (ctx.request.files) {
        for (const file of ctx.request.files) {
          if (file.filepath && fs.existsSync(file.filepath)) {
            try {
              await fs.promises.unlink(file.filepath);
              console.log('🧹 清理临时文件:', file.filepath);
            } catch (cleanupError) {
              console.error('清理临时文件失败:', cleanupError);
            }
          }
        }
      }

      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500,
        msg: error.message || '创建失败',
        data: null,
      };
    }
  }

  // 获取列表 table
  async getList() {
    const { ctx } = this;

    try {
      const { title = '', page = 1, pageSize = 10 } = ctx.request.body;
      const result = await ctx.service.topic.getList(page, pageSize, title);
      ctx.status = 200;
      ctx.body = {
        code: 200, msg: '列表获取成功', data: result,
      };
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500, msg: error.message || '获取列表失败', data: null,
      };
    }

    // // 如果不是搜索
    // if (!title) {
    //   const topics = await ctx.service.topic.getList(page, pageSize);
    //   ctx.status = 200;
    //   ctx.body = {
    //     code: 200,
    //     msg: '列表获取成功',
    //     data: {
    //       list: topics,
    //     },
    //   };
    // } else {
    //   // 如果是搜索
    //   const topics = await ctx.service.topic.getList(title);
    //   ctx.status = 200;
    //   ctx.body = {
    //     code: 200,
    //     msg: '列表获取成功',
    //     data: {
    //       list: topics,
    //     },
    //   };
    // }
  }


  // 获取当前用户的文章列表 - 需要登录
  async getMyTopic() {
    const { ctx } = this;
    try {
      // 通过 jwt 验证获取当前用户信息
      // const user = await ctx.service.user.getCurrentUser();
      // 从查询参数或请求体获取分页参数
      const { page = 1, pageSize = 10 } = ctx.request.body || {};

      const result = await ctx.service.topic.getMyTopic(ctx.user.id, page, pageSize);
      // 使用验证后的用户 ID 查询数据
      ctx.status = 200;
      ctx.body = {
        code: 200, msg: '列表获取成功', data: result,
      };
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500, msg: error.message || '服务器错误', data: null,
      };
    }
  }

  // 获取主题详情
  async getDetail() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      // ✅ 在调用 service 之前先验证 ID
      if (!id || id.trim() === '') {
        ctx.status = 400;
        ctx.body = {
          code: 400, msg: 'ID 参数不能为空', data: null,
        };
        return;
      }

      const detail = await ctx.service.topic.getDetail(id);
      if (detail) {
        ctx.status = 200;
        ctx.body = {
          code: 200, msg: '详情获取成功', data: {
            list: detail,
          },
        };
      }
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500, msg: error.message || '服务器错误', data: null,
      };
    }
  }

  // 删除某一项
  async delTopicItem() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    const data = await ctx.service.topic.delTopicItem(id);

    ctx.status = 200;
    ctx.body = {
      code: 200, msg: '删除成功', data: {
        list: data,
      },
    };
  }

  // 更新/修改某一项
  async modifyTopicItem() {
    const { ctx } = this;
    try {
      const { body } = ctx.request;
      await ctx.service.topic.modifyTopicItem(body);

      ctx.status = 200;
      ctx.body = {
        code: 200, msg: '修改成功', data: null,
      };
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500, msg: error.message || '修改失败', data: null,
      };
    }
  }
}

module.exports = TopicController;
