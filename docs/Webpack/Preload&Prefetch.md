---
title: Preload / Prefetch
order: 11
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

我们前面已经做了代码分割，同时会使用 `import` 动态导入语法来进行代码按需加载（我们也叫懒加载，比如路由懒加载就是这样实现的）。

但是加载速度还不够好，比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果。

我们想在浏览器空闲时间，加载后续需要使用的资源。我们就需要用上 `Preload` 或 `Prefetch`` 技术。

## 是什么

- `Preload`：告诉浏览器立即加载资源。

- `Prefetch`：告诉浏览器在空闲时才开始加载资源。

它们共同点：

- 都只会加载资源，并不执行。
- 都有缓存。

它们区别：

- `Preload`加载优先级高，`Prefetch`加载优先级低。
- `Preload`只能加载当前页面需要使用的资源，`Prefetch`可以加载当前页面资源，也可以加载下一个页面需要使用的资源。

总结：

- 当前页面优先级高的资源用 `Preload` 加载。
- 下一个页面需要使用的资源用 `Prefetch` 加载。
- 它们的问题：兼容性较差。

我们可以去 [Can I Use](https://caniuse.com/)网站查询 `API` 的兼容性问题。

`Preload` 相对于 `Prefetch` 兼容性好一点。

## 怎么用
