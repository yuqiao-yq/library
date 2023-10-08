---
title: fs 文件系统模块
order: 1
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /node
  title: Node
  order: 7
---

## fs 文件系统模块

### 读取文件

#### 简单文件读取

语法格式：

```js
fs.readFile(path[, options], callback)
```

- `path`：文件路径
- `options`：配置选项，若是字符串则指定编码格式
  - `encoding`：编码格式
  - `flag`：打开方式
- `callback`：回调函数
  - `err`：错误信息
  - `data`：读取的数据，如果未指定编码格式则返回一个 Buffer

```js
const fs = require('fs')

fs.readFile('./files/1.txt', 'utf-8', (err, data) => {
  if(err) {
    return console.log('failed!' + err.message)
  }
  console.log('content:' + data)
})


// 复制文件内容
fs.readFile("C:/Users/笔记.mp3", (err, data) {
	if(!err) {
		console.log(data);
		// 将data写入到文件中
		fs.writeFile("C:/Users/hello.jpg", data, (err){
			if(!err){
				console.log("文件写入成功");
			}
		} );
	}
});
```

#### 流式文件读取

简单文件读取的方式会一次性读取文件内容到内存中，若文件较大，会占用过多内存影响系统性能，且读取速度慢

大文件适合用流式文件读取，它会分多次将文件读取到内存中

```js
var fs = require('fs');

// 创建一个可读流
var rs = fs.createReadStream('C:/Users/笔记.mp3');
// 创建一个可写流
var ws = fs.createWriteStream('a.mp3');

// 监听流的开启和关闭
// 这几个监听不是必须的
rs.once('open', function () {
  console.log('可读流打开了~~');
});

rs.once('close', function () {
  console.log('可读流关闭了~~');
  //数据读取完毕，关闭可写流
  ws.end();
});

ws.once('open', function () {
  console.log('可写流打开了~~');
});

ws.once('close', function () {
  console.log('可写流关闭了~~');
});

//要读取一个可读流中的数据，要为可读流绑定一个data事件，data事件绑定完毕自动开始读取数据
rs.on('data', function (data) {
  console.log(data);
  //将读取到的数据写入到可写流中
  ws.write(data);
});
```

简便方式：

```javascript
var fs = require('fs');

var rs = fs.createReadStream('C:/Users/lilichao/Desktop/笔记.mp3');
var ws = fs.createWriteStream('b.mp3');

// pipe()可以将可读流中的内容，直接输出到可写流中
rs.pipe(ws);
```

### 写入文件

#### 简单文件写入

语法格式：

```js
fs.writeFile(file, data[, options], callback)
```

- `file`：文件路径
- `data`：写入内容
- `options`：配置选项，包含 `encoding`, `mode`, `flag`；若是字符串则指定编码格式
- `callback`：回调函数

```js
const fs = require('fs');
fs.writeFile('./files/2.txt', 'Hello Nodejs', function (err) {
  if (err) {
    return console.log('failed!' + err.message);
  }
  console.log('success!');
});

fs.writeFile('C:/Users/hello.txt', '通过 writeFile 写入的内容', { flag: 'w' }, function (err) {
  if (!err) {
    console.log('写入成功！');
  } else {
    console.log(err);
  }
});
```

#### 流式文件写入

```js
// 同步、异步、简单文件的写入都不适合大文件的写入，性能较差，容易导致内存溢出
var fs = require('fs');

// 创建一个可写流
var ws = fs.createWriteStream('hello3.txt');

ws.once('open', function () {
  console.log('流打开了~~');
});

ws.once('close', function () {
  console.log('流关闭了~~');
});

// 通过ws向文件中输出内容
ws.write('通过可写流写入文件的内容');
ws.write('1');
ws.write('2');
ws.write('3');
ws.write('4');

// 关闭流
ws.end();
```

### 路径动态拼接问题 `__dirname`

在使用 fs 模块操作文件时，如果提供的操作路径是以 `./` 或 `../` 开头的相对路径时，容易出现路径动态拼接错误的问题

- 原因：代码在运行的时候，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径
- 解决方案：在使用 fs 模块操作文件时，直接提供完整的路径，从而防止路径动态拼接的问题
- \_\_dirname 获取文件所处的绝对路径

```js
fs.readFile(__dirname + '/files/1.txt', 'utf8', function(err, data) {
  ...
})
```

### 其它操作

- 验证路径是否存在：

```js
fs.exists(path, callback);
fs.existsSync(path);
```

- 获取文件信息：

```js
fs.stat(path, callback);
fs.stat(path);
```

- 删除文件：

```js
fs.unlink(path, callback);
fs.unlinkSync(path);
```

- 列出文件：

```js
fs.readdir(path[,options], callback)
fs.readdirSync(path[, options])
```

- 截断文件：

```js
fs.truncate(path, len, callback);
fs.truncateSync(path, len);
```

- 建立目录：

```js
fs.mkdir(path[, mode], callback)
fs.mkdirSync(path[, mode])
```

- 删除目录：

```js
fs.rmdir(path, callback);
fs.rmdirSync(path);
```

- 重命名文件和目录：

```js
fs.rename(oldPath, newPath, callback);
fs.renameSync(oldPath, newPath);
```

- 监视文件更改：

```js
fs.watchFile(filename[, options], listener)
```
