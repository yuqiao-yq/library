---
title: 按钮Widget
order: 2
toc: content
path:
# nav:
#   title:
#   order: 1
group:
  path: /flutter/Flutter
  title: Flutter
  order: 3
---

## 1. 按钮的基础

Material widget 库中提供了多种按钮 Widget 如 FloatingActionButton、RaisedButton、FlatButton、OutlineButton 等

我们直接来对他们进行一个展示：

```js
class MyHomeBody extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        FloatingActionButton(
          child: Text("FloatingActionButton"),
          onPressed: () {
            print("FloatingActionButton Click");
          },
        ),
        RaisedButton(
          child: Text("RaisedButton"),
          onPressed: () {
            print("RaisedButton Click");
          },
        ),
        FlatButton(
          child: Text("FlatButton"),
          onPressed: () {
            print("FlatButton Click");
          },
        ),
        OutlineButton(
          child: Text("OutlineButton"),
          onPressed: () {
            print("OutlineButton Click");
          },
        )
      ],
    );
  }
}
```

## 2. 自定义样式

前面的按钮我们使用的都是默认样式，我们可以通过一些属性来改变按钮的样式

```js
RaisedButton(
  child: Text("同意协议", style: TextStyle(color: Colors.white)),
  color: Colors.orange, // 按钮的颜色
  highlightColor: Colors.orange[700], // 按下去高亮颜色
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)), // 圆角的实现
  onPressed: () {
    print("同意协议");
  },
)
```

这里还有一个比较常见的属性：elevation，用于控制阴影的大小
