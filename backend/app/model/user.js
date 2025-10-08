'use strict';

// egg-mongoose 默认使用 app/model 目录保存模型， Context 实例化时，会自动将这些模型信息挂在实例上
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 定义用户模型的结构
  const UserSchema = new Schema({
    username: String,
    password: String,
    // 用户头像
    // avatar: { type: String, default: '' },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  }, {
    // 允许虚拟字段被 JSON.stringify 序列化
    toJSON: { virtuals: true },
    // 允许虚拟字段被 Object.assign 复制
    toObject: { virtuals: true },
  });
  // 💥 关键：定义一个虚拟字段 'profile'
  UserSchema.virtual('profile', {
    ref: 'UserProfile', // 引用目标模型
    localField: '_id', // User 模型的本地字段 (即 User._id)
    foreignField: 'user_id', // UserProfile 模型中用于关联的字段
    justOne: true, // 因为一个 User 只有一个 UserProfile
  });

  return mongoose.model('User', UserSchema);
};

