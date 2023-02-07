---
title: HotModuleReplacement
order: 2
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

开发时我们修改了其中一个模块代码，`Webpack` 默认会将所有模块全部重新打包编译，速度很慢。

所以我们需要做到修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快。

## 是什么

`HotModuleReplacement`（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。

## 怎么用

(1)基本配置

```js
module.exports = {
  // 其他省略
  devServer: {
    host: 'localhost', // 启动服务器域名
    port: '3000', // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
  },
};
```

此时 css 样式经过 style-loader 处理，已经具备 HMR 功能了。 但是 js 还不行。

(2)JS 配置

```js
// main.js
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

// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept('./js/count.js', function (count) {
    const result1 = count(2, 1);
    console.log(result1);
  });

  module.hot.accept('./js/sum.js', function (sum) {
    const result2 = sum(1, 2, 3, 4);
    console.log(result2);
  });
}
```

上面这样写会很麻烦，所以实际开发我们会使用其他 `loader` 来解决。

比如：[vue-loader](https://github.com/vuejs/vue-loader), [react-hot-loader](https://github.com/gaearon/react-hot-loader)
