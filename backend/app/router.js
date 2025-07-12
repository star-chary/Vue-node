/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  /*
  *const {
    router,      // 路由器
    controller,  // 控制器
    config,      // 配置
    logger,      // 日志器
    cache,       // 缓存
    messenger,   // 进程间通信
    HttpClient,  // HTTP 客户端
    curl,        // HTTP 请求工具
    middlewares, // 中间件集合
    // ... 其他 app 级别的属性
  } = app;
  * */
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 注册
  router.post('/register', controller.user.register);
  // 登录
  router.post('/login', controller.user.login);
};
