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
  const jwt = app.middleware.jwt(app.config.jwt);
  router.get('/', controller.home.index);
  // 登录 注册
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);

  // 主题资源
  // 新建主题
  router.post('/topic', jwt, controller.topic.create);
  // 主题列表
  router.post('/list', jwt, controller.topic.getList);
  // 主题详情
  router.get('/list/:id', jwt, controller.topic.getDetail);
  // 删除主题
  router.post('/del', jwt, controller.topic.delTopicItem);
  // 修改主题
  router.post('/modify', jwt, controller.topic.modifyTopicItem);
  // 获取当前用户文章
  router.post('/myTopic', jwt, controller.topic.getMyTopic);

  // 评论路由
  router.post('/createComment', jwt, controller.comment.createComment);
  // 获取文章评论
  router.post('/getCommentList', jwt, controller.comment.getCommentList);

};
