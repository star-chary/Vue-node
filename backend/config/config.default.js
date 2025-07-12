/* eslint valid-jsdoc: "off" */

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

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
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

