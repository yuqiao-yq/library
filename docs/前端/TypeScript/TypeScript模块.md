---
title: TypeScript模块
order: 13
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /TypeScript
  title: TypeScript
  order: 4
---

模块导出使用关键字 **export** 关键字

```ts
// 文件名 : SomeInterface.ts
export interface SomeInterface {
  // 代码部分
}
```

要在另外一个文件使用该模块就需要使用 **import** 关键字来导入

```ts
import someInterfaceRef = require('./SomeInterface');
```
