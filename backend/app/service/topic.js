const Service = require('egg').Service;

class TopicService extends Service {
  // 增加
  async create(body) {
    const { ctx } = this;
    const user = await ctx.service.user.getCurrentUser();

    const topic = new ctx.model.Topic();
    topic.title = body.title;
    topic.content = body.content;
    topic.author_id = user._id;
    topic.author_name = user.username;
    return topic.save();
  }

  // 获取和查询文章列表  首页用
  async getList(title) {
    const { ctx } = this;
    let allTopics;
    if (title) {
      allTopics = await ctx.model.Topic.find({ title: { $regex: title, $options: 'i' } });
    } else {
      allTopics = await ctx.model.Topic.find();
    }
    return allTopics;
  }

  // 获取当前用户的文章列表 - 个人管理页面用
  async getMyTopic(userId) {
    const { ctx } = this;

    // 验证 ID 是否有效
    if (!userId || !ctx.app.mongoose.Types.ObjectId.isValid(userId)) {
      ctx.throw(400, '用户 ID 无效');
    }

    return ctx.model.Topic.find({ author_id: userId })
      .sort({ create_at: -1 });

  }


  // 获取主题详情
  async getDetail(id) {
    const { ctx } = this;
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
    const user = await ctx.service.user.getCurrentUser();
    // 先查找文章，确认是当前用户创建的
    const topic = await ctx.model.Topic.findById(id);
    if (!topic) {
      ctx.throw(404, '文章不存在');
    }
    ctx.model.Topic.deleteOne({ _id: id, author_id: user._id });
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
