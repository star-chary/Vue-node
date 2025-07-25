module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TopicSchema = new Schema({
    title: String,
    author_name: { type: String },
    author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 关联用户 ID
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    content: { type: String },
    reply_count: { type: Number, default: 0 },
    last_reply_at: { type: Date, default: Date.now },
    images: [{
      url: String, // 图片 URL
      width: Number, // 图片宽度
      height: Number, // 图片高度
      size: Number, // 图片大小（字节）
      filename: String, // 原始文件名
      author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    }],
    cover_image: { // 封面图 （瀑布流显示用）
      url: String,
      width: Number,
      height: Number,
    },
  });

  return mongoose.model('Topic', TopicSchema);
};
