---
title: JS
order: 1
toc: content
---

## 常见题

### 树形结构转成列表

```js
const data = [
  {
    id: 1,
    text: '节点1',
    parentId: 0,
    children: [
      {
        id: 2,
        text: '节点1_1',
        parentId: 1,
      },
    ],
  },
];
function treeToList(data) {
  let res = [];
  const dfs = (tree) => {
    tree.forEach((item) => {
      if (item.children) {
        dfs(item.children);
        delete item.children;
      }
      res.push(item);
    });
  };
  dfs(data);
  return res;
}
```

## 冷门题

### 数据类型

<Alert type="info">用一种方法来判断所有类型的数据，要求准确；</Alert>

```js
// 常用来判断类型的方法是 typeof 和 instance of, 但是遇到null 、array等复杂数据类型时，并不能准确得到结果
// Object.prototype.toString方法返回对象的类型字符串，因此可以用来判断一个值的类型。默认返回当前对象的[[Class]]。其格式为[object XXX] ，其中 XXX 即为目标的类型
Object.prototype.toString.call(value);
```

- 数值：返回[object Number]。
- 字符串：返回[object String]。
- 布尔值：返回[object Boolean]。
- undefined：返回[object Undefined]。
- null：返回[object Null]。
- 数组：返回[object Array]。
- arguments 对象：返回[object Arguments]。
- 函数：返回[object Function]。
- Error 对象：返回[object Error]。
- Date 对象：返回[object Date]。
- RegExp 对象：返回[object RegExp]。
- 其他对象：返回[object Object]。

#### 封装成函数

```js
function myTypeOf(target) {
  // Object.prototype.toString.call(target) 通过此便可获得目标的[[Class]]
  // 再由正则匹配 就能获得目标的类型
  // toLocaleLowerCase()将其转换为小写 留到下面扩展用
  return /^\[object (\w+)]$/.exec(Object.prototype.toString.call(target))[1].toLocaleLowerCase();
}
//原生typeof
typeof new Set(); //object
typeof null; // object
myTypeOf(new Set()); //set
myTypeOf(null); //null
```
