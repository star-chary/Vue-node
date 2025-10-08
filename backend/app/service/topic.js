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
  // async getList(page = 1, pageSize = 10, title = '') {
  //   const { ctx } = this;
  //
  //   // 构建查询条件
  //   const query = {};
  //   if (title) {
  //     query.title = { $regex: title, $options: 'i' };
  //   }
  //   // 计算跳过的记录数
  //   const skip = (page - 1) * pageSize;
  //   // 并行执行查询和计数
  //   const [ topics, total ] = await Promise.all([
  //     ctx.model.Topic.find(query)
  //       .sort({ create_at: -1 }) // 按创建时间倒序
  //       .skip(skip)
  //       .limit(pageSize),
  //     ctx.model.Topic.countDocuments(query), // 获取总数
  //   ]);
  //
  //   return {
  //     list: topics,
  //     total,
  //   };
  // }


  // 获取和查询文章列表 首页用
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
        .limit(pageSize)
        // 💥 核心修改：使用 Populate 关联数据
        .populate({
          path: 'author_id', // 1. 关联到 User 模型
          select: 'username', // 只获取 User.username 字段

          // 2. 嵌套 Populate：通过 User 模型的虚拟字段 'profile' 关联到 UserProfile
          populate: {
            path: 'profile', // 虚拟字段名，指向 UserProfile
            select: 'nickname avatar_url', // 只获取 UserProfile.nickname 和 avatar_url
          },
        }),

      ctx.model.Topic.countDocuments(query), // 获取总数
    ]);

    // 💥 最终处理：格式化返回数据
    const formattedTopics = topics.map(topic => {
      // 转换为普通对象以便修改和返回
      const topicObj = topic.toObject();

      // 从关联数据中安全地提取信息
      const user = topicObj.author_id;
      // user.profile 现在是一个对象 (或 null/undefined)
      const profile = user ? user.profile : null;

      // 1. ✅ 修正：直接访问 profile.nickname，不再使用 profile[0]
      const authorNickname = profile && profile.nickname // 👈 修正这里
        ? profile.nickname
        : (user ? user.username : '匿名');

      // 2. ✅ 修正：直接访问 profile.avatar_url，不再使用 profile[0]
      const authorAvatar = profile ? profile.avatar_url : ''; // 👈 修正这里

      return {
        ...topicObj,
        author_name: authorNickname, // 实时获取昵称
        author_avatar: authorAvatar, // 实时获取头像
        // 移除原始的 author_id 对象，仅保留 ID
        author_id: user ? user._id : null,
      };
    });


    return {
      list: formattedTopics, // 返回格式化后的列表
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
