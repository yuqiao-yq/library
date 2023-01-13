---
title: React简介&基础使用
order: 1
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /react
  title: React
  order: 6
---

## 一、React 简介

### 1、React 的特点

- 声明式区别于命令式（例如 jQuery），声明式编码不用关心具体每一步的实现过程，只需声明需要的结果，大大提高了开发效率；

- 组件化采用组件化模式，方便拆分和复用，提高组件复用率，还可以做到高内聚和低耦合。

- 一次学习，随处编写可以用 React 开发 Web、Android、ios、VR 和命令行程序： React Native 使用 React 来创建 Android 和 ios 原生应用； React360 是一个创建 3D 和 VR 用户交互的框架；

#### 优点

- 开发团队和社区强大；
- 一次学习，随处编写；
- API 比较简洁

#### 缺点

- 没有官方系统解决方案，选型成本高；
- 过于灵活，不容易写出高质量的应用；

#### 其他拓展

- JSX 实现声明式；
- 虚拟 DOM 可以实现跨平台；
- React 使用的设计模式；
- 自己 React 大型架构经验；

## 二、React 基础

### 1、React 的基本使用

最简单的 react 需要： 相关 js 库、容器、虚拟 DOM、将虚拟 DOM 渲染到页面；

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>hello_react</title>
  </head>
  <body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库 -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">
      /* 此处一定要写babel */
      //1.创建虚拟DOM
      const VDOM = <h1>Hello,React</h1>; /* 此处一定不要写引号，因为不是字符串 */
      //2.渲染虚拟DOM到页面
      ReactDOM.render(VDOM, document.getElementById('test'));
    </script>
  </body>
</html>
```

### 2、创建虚拟 DOM 的两种方式

#### 2.1 纯 JS 方式(一般不用)

```js
// const VDOM = React.createElement('xx',{id:'xx'},'xx')
<script type="text/javascript" >
	// 创建虚拟DOM
	const VDOM = React.createElement('h1', {
		id: 'title'
	}, React.createElement('span', {}, 'Hello,React'))
</script>
```

#### 2.2 JSX 方式

```js
<script type="text/babel">
  // 创建虚拟DOM const VDOM = ( /* 此处一定不要写引号，因为不是字符串 */
  <h1 id="title">
    <span>Hello,React</span>
  </h1>)
</script>
```

### 3、虚拟 DOM 与真实 DOM

虚拟 DOM 对象最终都会被 React 转换为真实的 DOM

我们编码时基本只需要操作 react 的虚拟 DOM 相关数据, react 会转换为真实 DOM 变化而更新界。

```js
//1.创建虚拟DOM
const VDOM = (
  /* 此处一定不要写引号，因为不是字符串 */
  <h1 id="title">
    <span>Hello,React</span>
  </h1>
);
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM, document.getElementById('test'));

// 获取真实DOM
const TDOM = document.getElementById('demo');

console.log('虚拟DOM', VDOM);
console.log('真实DOM', TDOM);

/* 
关于虚拟DOM：
	1.本质是Object类型的对象（一般对象）
	2.虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。
	3.虚拟DOM最终会被React转化为真实DOM，呈现在页面上。
*/
```

### 4、JSX

全称: `JavaScript XML`

react 定义的一种类似于 XML 的 JS 扩展语法: `JS + XML`本质是 `React.createElement(component, props, ...children)`方法的语法糖。

作用: 用来简化创建虚拟 DOM

1. 写法：`var ele = <h1>Hello JSX!</h1>`
2. 注意 1：它不是字符串, 也不是 HTML/XML 标签
3. 注意 2：它最终产生的就是一个 JS 对象

#### jsx 语法规则：

- 1.定义虚拟 DOM 时，不要写引号。
- 2.标签中混入 JS 表达式时要用{}。
- 3.样式的类名指定不要用 class，要用 className。
- 4.内联样式，要用 style={{key:value}}的形式去写。
- 5.只有一个根标签
- 6.标签必须闭合
- 7.标签首字母
  - 若小写字母开头，则将该标签转为 html 中同名元素，若 html 中无该标签对应的同名元素，则报错。
  - 若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错。

```js
<script type="text/babel">
  const myId = 'aTgUiGu' const myData = 'HeLlo,rEaCt' //1.创建虚拟DOM const VDOM = (
  <div>
    <h2 className="title" id={myId.toLowerCase()}>
      <span style={{ color: 'white', fontSize: '29px' }}>{myData.toLowerCase()}</span>
    </h2>
    <h2 className="title" id={myId.toUpperCase()}>
      <span style={{ color: 'white', fontSize: '29px' }}>{myData.toLowerCase()}</span>
    </h2>
    <input type="text" />
  </div>
  ) //2.渲染虚拟DOM到页面 ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```

#### 实例：渲染列表

```js
<script type="text/babel">
  //模拟一些数据 const data = ['Angular','React','Vue'] //1.创建虚拟DOM const VDOM = (
  <div>
    <h1>前端js框架列表</h1>
    <ul>
      {data.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  </div>
  ) //2.渲染虚拟DOM到页面 ReactDOM.render(VDOM,document.getElementById('test'))
</script>

//！ jsx 的{}内只能写表达式，不能写语句
/* 
			一定注意区分：【js语句(代码)】与【js表达式】
					1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
								下面这些都是表达式：
										(1). a
										(2). a+b
										(3). demo(1)
										(4). arr.map() 
										(5). function test () {}
					2.语句(代码)：
								下面这些都是语句(代码)：
										(1).if(){}
										(2).for(){}
										(3).switch(){case:xxxx}
	 */
```

### 5、渲染虚拟 DOM 元素

语法：`ReactDOM.render(VirtualDOM, containerDOM)`

作用: 将虚拟 DOM 元素渲染到页面中的真实容器 DOM 中显示

参数说明

    参数一: 纯js或jsx创建的虚拟dom对象

    参数二: 用来包含虚拟DOM元素的真实dom元素对象(一般是一个div)
