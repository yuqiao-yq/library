---
title: 手写实现简易Vue--响应式原理
order: 0
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /Vue
  title: Vue
  order: 5
---

## Vue

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <p>{{name}}</p>
      <p>{{birth}}</p>
    </div>
    <script src="./index.js"></script>
  </body>
</html>
```

### index.js

```js
let user = {
  name: '张三',
  birth: '2002-02-02',
};

//  显示姓氏
function showName() {
  console.log(user.name);
}

//  显示生日
function showBirth() {
  console.log(user.birth);
}

// function observe(obj) {
//   if (typeof obj !== 'object' || obj === null) {
//     return;
//   }
//   Object.keys(obj).forEach((key) => {

//   })
// }
```
