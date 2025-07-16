const Controller = require('egg').Controller;

class TopicController extends Controller {
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;
    const user = await ctx.service.user.getCurrentUser();
    await ctx.service.topic.create({ ...body, author_name: user.username });
    ctx.body = {
      code: 200,
      msg: '创建成功',
    };
  }

  // 获取列表
  async getList() {
    const { ctx } = this;
    const { title } = ctx.query;
    // 如果不是搜索
    if (!title) {
      const topics = await ctx.service.topic.getList();
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '列表获取成功',
        data: {
          list: topics,
        },
      };
    } else {
      // 如果是搜索
      const topics = await ctx.service.topic.getList(title);
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '列表获取成功',
        data: {
          list: topics,
        },
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


}

module.exports = TopicController;
