module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TopicSchema = new Schema({
    title: String,
    author_name: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    content: { type: String },
    reply_count: { type: Number, default: 0 },
    last_reply_at: { type: Date, default: Date.now },
  });

  return mongoose.model('Topic', TopicSchema);
};
