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
  config.middleware = [ 'logger' ];
  // 信任代理（使 ctx.ip/ctx.ips 会基于 X-Forwarded-For）
  config.proxy = true;


  // 新增 MongoDB 配置
  config.mongoose = {
    client: {
      // url: 'mongodb://admin:Lcq-0813@127.0.0.1:27017/myapp?authSource=myapp',
      // url: 'mongodb://appuser:Lcq-0813@127.0.0.1:27017/myapp?authSource=myapp', // 上传到服务器要用这个
      url: 'mongodb://127.0.0.1:27017/myapp', // 本地用这个
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
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
  // exports.cors = {
  //   origin: 'http://1.92.114.63', // 精确到协议+域名+端口，不能用 *
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  //   allowHeaders: 'Content-Type,Authorization,X-Requested-With',
  //   credentials: true, // 返回 Access-Control-Allow-Credentials: true
  //   keepHeadersOnError: true,
  // };


  // 配置文件上传
  config.multipart = {
    mode: 'file', // 设置 file 模式 Egg 会自动处理 multipart请求
    fileSize: '50mb',
    fileExtensions: [ '.jpg', '.jpeg', '.png', '.gif', '.bmp' ],
    files: 10,
  };
  config.static = {
    prefix: '/', // 所有静态资源统一从这个前缀访问
    dir: path.join(appInfo.baseDir, 'app/public'), // 把 app/public 暴露出去 意味着 app/public/uploads/xxx.jpg  ⬅️➡️  http://1.92.114.63:7001/uploads/xxx.jpg

    // 开启动态文件，生产环境建议关闭
    dynamic: true,
    preload: false,
    maxAge: 31536000, // 缓存一年
  };
  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0', // 或者写成 '127.0.0.1'
    },
  };
  // 启动 socket.io 插件
  // config.io = {
  //   init: {
  //     // wsEngine: 'ws',
  //     cors: {
  //       origin: '*', // 允许所有来源，生产环境指定具体的域名
  //       methods: [ 'GET', 'POST' ],
  //     },
  //   },
  //   namespace: {
  //     '/': {
  //       connectionMiddleware: [], // 连接中间件
  //       packetMiddleware: [], // 包中间件
  //     },
  //   },
  // };


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

