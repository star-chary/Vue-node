module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserProfileSchema = new Schema({
    // 关键：关联到 User 模型的 _id
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    // ✅ 用户头像 URL
    avatar_url: { type: String, default: '' },

    // ✅ 昵称 (可以和 username 不同)
    nickname: { type: String, default: '' },

    // ✅ 个人简介/签名
    bio: { type: String, default: '' },

    // ✅ 性别 (0:保密, 1:男, 2:女)
    gender: { type: Number, enum: [ 0, 1, 2 ], default: 0 },

    // ✅ 所在城市/地区
    location: { type: String, default: '' },

    // ✅ 生日
    birthday: { type: Date },

    // ✅ 额外的统计信息 (如帖子数、粉丝数)
    post_count: { type: Number, default: 0 },

    update_at: { type: Date, default: Date.now },
  });

  return mongoose.model('UserProfile', UserProfileSchema);
};
