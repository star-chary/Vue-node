const Controller = require('egg').Controller;

class TopicController extends Controller {

  // POST /create - 新建主题
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;
    try {
      // ✅ 直接传递body，用户信息在service中通过JWT获取
      await ctx.service.topic.create(body);

      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '创建成功',
        data: null,
      };
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500,
        msg: error.message || '创建失败',
        data: null,
      };
    }

  }

  // 获取列表
  async getList() {
    const { ctx } = this;

    try {
      const { title = '', page = 1, pageSize = 10 } = ctx.request.body;
      const result = await ctx.service.topic.getList(page, pageSize, title);
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '列表获取成功',
        data: result,
      };
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500,
        msg: error.message || '获取列表失败',
        data: null,
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
      const user = await ctx.service.user.getCurrentUser();
      // 从查询参数或请求体获取分页参数
      const { page = 1, pageSize = 10 } = ctx.request.body || {};

      const result = await ctx.service.topic.getMyTopic(user._id, page, pageSize);
      // 使用验证后的用户 ID 查询数据
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '列表获取成功',
        data: result,
      };
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500,
        msg: error.message || '服务器错误',
        data: null,
      };
    }
  }

  // 获取主题详情
  async getDetail() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {

      const detail = await ctx.service.topic.getDetail(id);
      if (detail) {
        ctx.status = 200;
        ctx.body = {
          code: 200,
          msg: '详情获取成功',
          data: {
            list: detail,
          },
        };
      }
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500,
        msg: error.message || '服务器错误',
        data: null,
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
      code: 200,
      msg: '删除成功',
      data: {
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
        code: 200,
        msg: '修改成功',
        data: null,
      };
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.status || 500,
        msg: error.message || '修改失败',
        data: null,
      };
    }

  }


}

module.exports = TopicController;
