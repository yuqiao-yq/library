---
title: Core-js
order: 13
toc: content
path:
# nav:
#   title:
#   order: 1
group:
  path: /Advanced
  title: 高级优化
  order: 2
---

## 为什么

过去我们使用 babel 对 js 代码进行了兼容性处理，其中使用@babel/preset-env 智能预设来处理兼容性问题。

它能将 ES6 的一些语法进行编译转换，比如箭头函数、点点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理。

所以此时我们 js 代码仍然存在兼容性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将 js 兼容性问题彻底解决

## 是什么

`core-js` 是专门用来做 `ES6` 以及以上 `API` 的 `polyfill`。

`polyfill`翻译过来叫做`垫片/补丁`。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性。

## 怎么用

1. 修改 main.js

```js
import count from './js/count';
import sum from './js/sum';
// 引入资源，Webpack才会对其打包
import './css/iconfont.css';
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './styl/index.styl';

const result1 = count(2, 1);
console.log(result1);
const result2 = sum(1, 2, 3, 4);
console.log(result2);
// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log('hello promise');
});
```

此时 `Eslint` 会对 `Promise` 报错。

2. 修改配置文件

- 下载包

```
npm i @babel/eslint-parser -D
```

- `.eslintrc.js`

```js
module.exports = {
  // 继承 Eslint 规则
  extends: ['eslint:recommended'],
  parser: '@babel/eslint-parser', // 支持最新的最终 ECMAScript 标准
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  plugins: ['import'], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
  parserOptions: {
    ecmaVersion: 6, // es6
    sourceType: 'module', // es module
  },
  rules: {
    'no-var': 2, // 不能使用 var 定义变量
  },
};
```

3. 运行指令

```
npm run build
```

此时观察打包输出的 `js` 文件，我们发现 `Promise` 语法并没有编译转换，所以我们需要使用 `core-js` 来进行 `polyfill`。

4. 使用`core-js`

- 下载包

```
npm i core-js
```

- 手动全部引入

```js
import 'core-js';
import count from './js/count';
import sum from './js/sum';
// 引入资源，Webpack才会对其打包
import './css/iconfont.css';
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './styl/index.styl';

const result1 = count(2, 1);
console.log(result1);
const result2 = sum(1, 2, 3, 4);
console.log(result2);
// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log('hello promise');
});
```

这样引入会将所有兼容性代码全部引入，体积太大了。我们只想引入 `promise` 的 `polyfill`。

- 手动按需引入

```js
import 'core-js/es/promise';
import count from './js/count';
import sum from './js/sum';
// 引入资源，Webpack才会对其打包
import './css/iconfont.css';
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';
import './styl/index.styl';

const result1 = count(2, 1);
console.log(result1);
const result2 = sum(1, 2, 3, 4);
console.log(result2);
// 添加promise代码
const promise = Promise.resolve();
promise.then(() => {
  console.log('hello promise');
});
```

只引入打包 `promise` 的 `polyfill`，打包体积更小。但是将来如果还想使用其他语法，我需要手动引入库很麻烦。

- 自动按需引入

  - main.js

  ```js
  import count from './js/count';
  import sum from './js/sum';
  // 引入资源，Webpack才会对其打包
  import './css/iconfont.css';
  import './css/index.css';
  import './less/index.less';
  import './sass/index.sass';
  import './sass/index.scss';
  import './styl/index.styl';

  const result1 = count(2, 1);
  console.log(result1);
  const result2 = sum(1, 2, 3, 4);
  console.log(result2);
  // 添加promise代码
  const promise = Promise.resolve();
  promise.then(() => {
    console.log('hello promise');
  });
  ```

  - `babel.config.js`

  ```js
  module.exports = {
    // 智能预设：能够编译ES6语法
    presets: [
      [
        '@babel/preset-env',
        // 按需加载core-js的polyfill
        { useBuiltIns: 'usage', corejs: { version: '3', proposals: true } },
      ],
    ],
  };
  ```

  此时就会自动根据我们代码中使用的语法，来按需加载相应的 `polyfill` 了。
