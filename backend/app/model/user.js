'use strict';

// egg-mongoose 默认使用 app/model 目录保存模型， Context 实例化时，会自动将这些模型信息挂在实例上
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 定义用户模型的结构
  const UserSchema = new Schema({
    username: String,
    password: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });

  return mongoose.model('User', UserSchema);
};

