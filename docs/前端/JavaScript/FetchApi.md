---
title: Fetch Api
order: 17
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /JavaScript
  title: JavaScript
  order: 3
---

## `Fetch Api` 概述

### `XMLHttpRequest`的问题

- 所有的功能全部集中在同一个对象上，容易书写出混乱不易维护的代码
- 采用传统的事件驱动模式，无法适配新的 `Promise Api`

### `Fetch Api` 的特点

- 并非取代 `AJAX`，而是对 `AJAX` 传统 `API` 的改进
- 精细的功能分割：头部信息、请求信息、响应信息等均分布到不同的对象，更利于处理各种复杂的 AJAX 场景
- 使用 `Promise Api`，更利于异步代码的书写
- `Fetch Api` 并非 `ES6` 的内容，属于 `HTML5` 新增的 `Web Api`
- 需要掌握网络通信的知识

## 基本使用

<Alert type="">请求测试地址：http://study.yuanjin.tech/api/local </Alert> 使用 fetch 函数即可立即向服务器发送网络请求

```html
<body>
  <button>得到所有的省份数据</button>
  <script>
    async function getProvinces() {
      const url = 'http://study.yuanjin.tech/api/local';
      const resp = await fetch(url);
      const result = await resp.json();
      console.log(result);
    }

    document.querySelector('button').onclick = function () {
      getProvinces();
    };
  </script>
</body>
```

### 参数

该函数有两个参数：

- 必填，字符串，请求地址
- 选填，对象，请求配置

#### 请求配置对象

- `method`：字符串，请求方法，默认值 GET
- `headers`：对象，请求头信息
- `body`: 请求体的内容，必须匹配请求头中的 Content-Type
- `mode`：字符串，请求模式
  - `cors`：默认值，配置为该值，会在请求头中加入 origin 和 referer
  - `no-cors`：配置为该值，不会在请求头中加入 origin 和 referer，跨域的时候可能会出现问题
  - `same-origin`：指示请求必须在同一个域中发生，如果请求其他域，则会报错
- `credentials`: 如何携带凭据（cookie）
  - `omit`：默认值，不携带 cookie
  - `same-origin`：请求同源地址时携带 cookie
  - `include`：请求任何地址都携带 cookie
- `cache`：配置缓存模式
  - `default`: 表示 fetch 请求之前将检查下 http 的缓存.
  - `no-store`: 表示 fetch 请求将完全忽略 http 缓存的存在. 这意味着请求之前将不再检查下 http 的缓存, 拿到响应后, 它也不会更新 http 缓存.
  - `no-cache`: 如果存在缓存, 那么 fetch 将发送一个条件查询 request 和一个正常的 request, 拿到响应后, 它会更新 http 缓存.
  - `reload`: 表示 fetch 请求之前将忽略 http 缓存的存在, 但是请求拿到响应后, 它将主动更新 http 缓存.
  - `force-cache`: 表示 fetch 请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取. 除非没有任何缓存, 那么它将发送一个正常的 request.
  - `only-if-cached`: 表示 fetch 请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取. 如果没有缓存, 它将抛出网络错误(该设置只在 mode 为"same-origin"时有效).

#### 返回值

`fetch` 函数返回一个 `Promise` 对象

- 当收到服务器的返回结果后，Promise 进入 resolved 状态，状态数据为 Response 对象
- 当网络发生错误（或其他导致无法完成交互的错误）时，Promise 进入 rejected 状态，状态数据为错误信息

### Response 对象

- `ok`：boolean，当响应消息码在 200~299 之间时为 true，其他为 false
- `status`：number，响应的状态码
- `text()`：用于处理文本格式的 Ajax 响应。它从响应中获取文本流，将其读完，然后返回一个被解决为 string 对象的 Promise。
- `blob()`：用于处理二进制文件格式（比如图片或者电子表格）的 Ajax 响应。它读取文件的原始数据，一旦读取完整个文件，就返回一个被解决为 blob 对象的 Promise。
- `json()`：用于处理 JSON 格式的 Ajax 的响应。它将 JSON 数据流转换为一个被解决为 JavaScript 对象的 promise。
- `redirect()`：可以用于重定向到另一个 URL。它会创建一个新的 Promise，以解决来自重定向的 URL 的响应。

## Request 对象

除了使用基本的 fetch 方法，还可以通过创建一个 Request 对象来完成请求（实际上，fetch 的内部会帮你创建一个 Request 对象）

```js
new Request(url地址, 配置);
```

注意点：

- 尽量保证每次请求都是一个新的 Request 对象

```html
<body>
  <button>得到所有的省份数据</button>
  <script>
    let req;

    function getRequestInfo() {
      if (!req) {
        const url = 'http://study.yuanjin.tech/api/local';
        req = new Request(url, {});
        console.log(req);
      }
      return req.clone(); //克隆一个全新的request对象，配置一致
    }

    async function getProvinces() {
      const resp = await fetch(getRequestInfo());
      const result = await resp.json();
      console.log(result);
    }

    document.querySelector('button').onclick = function () {
      getProvinces();
    };
  </script>
</body>
```

## Response 对象

```html
<body>
  <button>得到所有的省份数据</button>
  <script>
    let req;

    function getRequestInfo() {
      if (!req) {
        const url = 'http://study.yuanjin.tech/api/local';
        req = new Request(url, {});
        console.log(req);
      }
      return req.clone(); //克隆一个全新的request对象，配置一致
    }

    async function getProvinces() {
      // const resp = await fetch(getRequestInfo())

      const resp = new Response(
        `[
                {"id":1, "name":"北京"},
                {"id":2, "name":"天津"}
            ]`,
        {
          ok: true,
          status: 200,
        },
      );
      const result = await getJSON(resp);
      console.log(result);
    }

    async function getJSON(resp) {
      const json = await resp.json();
      return json;
    }

    document.querySelector('button').onclick = function () {
      getProvinces();
    };
  </script>
</body>
```

## Headers 对象

在`Request`和`Response`对象内部，会将传递的请求头对象，转换为`Headers`

### Headers 对象中的方法：

- `has(key)`：检查请求头中是否存在指定的 key 值
- `get(key)`: 得到请求头中对应的 key 值
- `set(key, value)`：修改对应的键值对
- `append(key, value)`：添加对应的键值对
- `keys()`: 得到所有的请求头键的集合
- `values()`: 得到所有的请求头中的值的集合
- `entries()`: 得到所有请求头中的键值对的集合

```html
    <button>得到所有的省份数据</button>
    <script>
      let req;

      function getCommonHeaders() {
        return new Headers({
          a: 1,
          b: 2,
        });
      }

      function printHeaders(headers) {
        const datas = headers.entries();
        for (const pair of datas) {
          console.log(`key: ${pair[0]}，value: ${pair[1]}`);
        }
      }

      function getRequestInfo() {
        if (!req) {
          const url = 'http://study.yuanjin.tech/api/local';
          const headers = getCommonHeaders();
          headers.set('a', 3);
          req = new Request(url, {
            headers,
          });
          printHeaders(headers);
        }
        return req.clone(); //克隆一个全新的request对象，配置一致
      }

      async function getProvinces() {
        const resp = await fetch(getRequestInfo());
        printHeaders(resp.headers);
        const result = await getJSON(resp);
        console.log(result);
      }

      async function getJSON(resp) {
        const json = await resp.json();
        return json;
      }

      document.querySelector('button').onclick = function () {
        getProvinces();
      };
    </script>
  </body>
```

## 文件上传

流程：

- 1.客户端将文件数据发送给服务器
- 2.服务器保存上传的文件数据到服务器端
- 3.服务器响应给客户端一个文件访问地址

<Alert type="">
测试地址：http://study.yuanjin.tech/api/upload 键的名称（表单域名称）：imagefile
</Alert>

请求方法：POST

请求的表单格式：multipart/form-data

请求体中必须包含一个键值对，键的名称是服务器要求的名称，值是文件数据

<Alert type="info">
HTML5 中，JS 仍然无法随意的获取文件数据，但是可以获取到 input 元素中，被用户选中的文件数据 可以利用 HTML5 提供的 FormData 构造函数来创建请求体
</Alert>

```html
<body>
  <img src="" alt="" id="imgAvatar" />
  <input type="file" id="avatar" />
  <button>上传</button>
  <script>
    async function upload() {
      const inp = document.getElementById('avatar');
      if (inp.files.length === 0) {
        alert('请选择要上传的文件');
        return;
      }
      const formData = new FormData(); //构建请求体
      formData.append('imagefile', inp.files[0]);
      const url = 'http://study.yuanjin.tech/api/upload';
      const resp = await fetch(url, {
        method: 'POST',
        body: formData, //自动修改请求头
      });
      const result = await resp.json();
      return result;
    }

    document.querySelector('button').onclick = async function () {
      const result = await upload();
      const img = document.getElementById('imgAvatar');
      img.src = result.path;
    };
  </script>
</body>
```
