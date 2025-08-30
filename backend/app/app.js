module.exports = app => {
  app.once('server', server => {
    // server 就是 http.Server 实例
    const io = require('socket.io')(server, {
      cors: {
        origin: "*", // 允许所有来源，生产环境应该指定具体域名
        methods: ["GET", "POST"],
        credentials: true
      },
      transports: ['websocket', 'polling'] // 支持多种传输方式
    });

    io.on('connection', socket => {
      console.log('客户端连接成功', socket.id);

      socket.on('sendMsg', msg => {
        console.log('收到前端消息:', msg);
        socket.emit('res', `服务器收到了：${JSON.stringify(msg)}`);
      });

      socket.on('disconnect', () => {
        console.log('客户端断开连接');
      });
    });

    console.log('Socket.IO 服务器已启动');
  });
};
