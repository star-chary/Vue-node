module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const commentTreeDataSchema = new Schema({
    content: { type: String, required: true }, // 评论内容
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 评论人
    userName: { type: String, required: true },
    userAvatar: { type: String, required: true }, // 用户头像
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }, // 归属的文章/笔记
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, // 父评论
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, // 回复某条评论
    replyToUserName: { type: String }, // 回复的用户名，用于显示"回复@用户名"
    likeCount: { type: Number, default: 0 }, // 点赞数
    replyCount: { type: Number, default: 0 }, // 回复数量
    createdAt: { type: Date, default: Date.now }, // 创建时间

  });
  // 添加索引优化查询性能
  commentTreeDataSchema.index({ postId: 1, createdAt: -1 });
  commentTreeDataSchema.index({ parentId: 1, createdAt: 1 });
  commentTreeDataSchema.index({ userId: 1 });

  return mongoose.model('CommentTreeData', commentTreeDataSchema);
};
