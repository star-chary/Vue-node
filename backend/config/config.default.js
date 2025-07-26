/* eslint valid-jsdoc: "off" */
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1752162675358_9300';

  // add your middleware config here
  config.middleware = [];

  // 新增 MongoDB 配置
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/myapp',
      // 如果想添加更多配置选项，如设置连接超时、认证等，在 options 对象中添加相应配置
      options: {},
    },
  };
  config.jwt = {
    secret: 'jwt-secret',
  };

  // 配置跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  // 配置文件上传
  config.multipart = {
    mode: 'file', // 设置 file 模式 Egg 会自动处理 multipart请求
    fileSize: '50mb',
    fileExtensions: [ '.jpg', '.jpeg', '.png', '.gif', '.bmp' ],
    files: 10,
  };
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    // 开启动态文件，生产环境建议关闭
    dynamic: true,
    preload: false,
    maxAge: 31536000, // 缓存一年
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    security: {
      csrf: {
        enable: false,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

