const Service = require('egg').Service;

class TopicService extends Service {
  async create(body) {
    const { ctx } = this;
    const topic = new ctx.model.Topic();
    topic.title = body.title;
    topic.content = body.content;
    return topic.save();
  }

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

  // 删除
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


}

module.exports = TopicService;
