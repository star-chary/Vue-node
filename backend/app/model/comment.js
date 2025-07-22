module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const commentsSchema = new Schema({
    content: String,
    author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // 关联用户 ID
    author_name: { type: String, required: true },
    topic_id: { type: Schema.Types.ObjectId, ref: 'Topic', required: true }, // 关联主题 ID
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });

  return mongoose.model('Comment', commentsSchema);
};
