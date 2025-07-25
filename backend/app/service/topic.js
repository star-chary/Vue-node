const Service = require('egg').Service;

class TopicService extends Service {
  // 增加
  async create(topicData) {
    const { ctx } = this;

    const topic = new ctx.model.Topic();
    topic.title = topicData.title;
    topic.content = topicData.content;
    topic.author_id = topicData.author_id; // ✅ 从传入参数获取
    topic.author_name = topicData.author_name; // ✅ 从传入参数获取
    topic.images = topicData.images || [];
    topic.cover_image = topicData.cover_image || null;

    return topic.save();
  }

  // 获取和查询文章列表  首页用
  async getList(page = 1, pageSize = 10, title = '') {
    const { ctx } = this;

    // 构建查询条件
    const query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    // 计算跳过的记录数
    const skip = (page - 1) * pageSize;
    // 并行执行查询和计数
    const [ topics, total ] = await Promise.all([
      ctx.model.Topic.find(query)
        .sort({ create_at: -1 }) // 按创建时间倒序
        .skip(skip)
        .limit(pageSize),
      ctx.model.Topic.countDocuments(query), // 获取总数
    ]);

    return {
      list: topics,
      total,
    };


  }

  // 获取当前用户的文章列表 - 个人管理页面用
  async getMyTopic(userId, page = 1, pageSize = 10) {
    const { ctx } = this;

    // 验证 ID 是否有效
    if (!userId || !ctx.app.mongoose.Types.ObjectId.isValid(userId)) {
      ctx.throw(400, '用户 ID 无效');
    }

    const skip = pageSize * (page - 1);
    const query = { author_id: userId };


    const [ topics, total ] = await Promise.all([
      ctx.model.Topic.find(query)
        .sort({ create_at: -1 })
        .skip(skip)
        .limit(pageSize),
      ctx.model.Topic.countDocuments(query),
    ]);

    return {
      list: topics,
      total,
    };


  }


  // 获取主题详情
  async getDetail(id) {
    const { ctx } = this;
    if (!id) {
      return null;
    }
    const detail = await ctx.model.Topic.findById({ _id: id });

    if (!detail) {
      const error = new Error('主题不存在');
      error.status = 404;
      throw error;
    }
    return detail;
  }

  // 删除文章
  async delTopicItem(id) {
    const { ctx } = this;
    const deleteItem = await ctx.model.Topic.deleteOne({ _id: id });

    // 删除失败
    if (deleteItem.deletedCount === 0) {
      const error = new Error('主题不存在或删除失败');
      error.status = 404;
      throw error;
    }

    const delResult = await ctx.model.Topic.find()
      .sort({ create_at: -1 });

    return delResult;
  }

  // 删除文章，只能删除自己的
  async delMyTopicItem(id) {
    const { ctx } = this;
    // const user = await ctx.service.user.getCurrentUser();
    // 先查找文章，确认是当前用户创建的
    const topic = await ctx.model.Topic.findById(id);
    if (!topic) {
      ctx.throw(404, '文章不存在');
    }
    ctx.model.Topic.deleteOne({ _id: id, author_id: ctx.user.id });
  }

  // 更新或修改某一项
  async modifyTopicItem(body) {
    const { ctx } = this;
    const { id } = body;

    if (!id) {
      const error = new Error('id不能为空');
      error.status = 404;
      throw error;
    }

    await ctx.model.Topic.updateOne({ _id: id }, {
      $set: { title: body.title, content: body.content },
    });
  }


}

module.exports = TopicService;
