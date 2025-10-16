module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TopicSchema = new Schema({
    title: String,
    author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 关联用户 ID
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    content: { type: String },
    // 统一命名：将 reply_count 保留为 comment_count（首页需要评论数）
    reply_count: { type: Number, default: 0 },
    last_reply_at: { type: Date, default: Date.now },
    images: [ {
      url: String, // 图片 URL
      width: Number, // 图片宽度
      height: Number, // 图片高度
      size: Number, // 图片大小（字节）
      filename: String, // 原始文件名
      // author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    } ],
    cover_image: { // 封面图 （瀑布流显示用）
      url: String,
      width: Number,
      height: Number,
    },
    like: {
      type: Number,
      default: 0,
    },
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

  // 新增索引：首页/详情常用
  TopicSchema.index({ create_at: -1 });
  TopicSchema.index({ author_id: 1, create_at: -1 });

  // 兼容你现有字段，同时建议提供一致别名虚拟字段，方便前端统一读取
  TopicSchema.virtual('like_count')
    .get(function() {
      return this.like || 0;
    });
  TopicSchema.virtual('comment_count')
    .get(function() {
      // 向后兼容：已有 reply_count 字段，导出为 comment_count
      return this.reply_count || 0;
    });

  TopicSchema.virtual('author', {
    ref: 'User',
    localField: 'author_id',
    foreignField: '_id',
    justOne: true,
  });


  return mongoose.model('Topic', TopicSchema);
};

