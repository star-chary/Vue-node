module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const LogSchema = new Schema({
    ip: String,
    location: { // 位置信息
      province: String,
      city: String,
      district: String,
    },
    userAgent: String, // 浏览器信息
    browser: String, // 解析出来的浏览器名
    os: String, // 解析出来的操作系统
    path: String, // 请求路径
    method: String, // 请求方法
    time: { type: Date, default: Date.now },
  });
  return mongoose.model('Log', LogSchema);
};
