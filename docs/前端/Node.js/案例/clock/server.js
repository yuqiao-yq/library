const fs = require('fs');
const path = require('path');
const http = require('http');

// 创建web服务器
const server = http.createServer();
// 监听服务器的request事件
server.on('request', (req, res) => {
  const { url } = req;
  // const fullPath = path.join(__dirname, url) // 将请求的URl地址映射为具体的文件存放路径
  let fullPath = '';
  if (url === '/') {
    fullPath = path.join(__dirname, './dist/index.html');
  } else {
    fullPath = path.join(__dirname, '/dist', url);
  }

  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) return res.end('404 Not Found');
    res.end(data);
  });
});

// 启动服务器
server.listen(8088, (err, result) => {
  console.log('server running at http://localhost:8088');
});
