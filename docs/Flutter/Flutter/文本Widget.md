---
title: 文本 Widget
order: 1
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

在 Android 中，我们使用 TextView，iOS 中我们使用 UILabel 来显示文本；

Flutter 中，我们使用 Text 组件控制文本如何展示；

## 1. 普通文本展示在 Flutter 中，我们可以将文本的控制显示分成两类：

- 控制文本布局的参数： 如文本对齐方式 textAlign、文本排版方向 textDirection，文本显示最大行数 maxLines、文本截断规则 overflow 等等，这些都是构造函数中的参数；
- 控制文本样式的参数： 如字体名称 fontFamily、字体大小 fontSize、文本颜色 color、文本阴影 shadows 等等，这些参数被统一封装到了构造函数中的参数 style 中；

下面我们来看一下其中一些属性的使用：

```js
class MyHomeBody extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return Text(
            "《定风波》 苏轼 \n 莫听穿林打叶声，何妨吟啸且徐行。\n 竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。",
            style: TextStyle(
                fontSize: 20,
                color: Colors.purple
            ),
        );
    }
}

```

我们可以通过一些属性来改变 Text 的布局：

textAlign：文本对齐方式，比如 TextAlign.center maxLines：最大显示行数，比如 1 overflow：超出部分显示方式，比如 TextOverflow.ellipsis textScaleFactor：控制文本缩放，比如 1.24

```js
class MyHomeBody extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return Text(
            "《定风波》 苏轼 \n 莫听穿林打叶声，何妨吟啸且徐行。\n 竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。",
            textAlign: TextAlign.center, // 所有内容都居中对齐
            maxLines: 3, // 显然 "生。" 被删除了
            overflow: TextOverflow.ellipsis, // 超出部分显示...
            // textScaleFactor: 1.25,
            style: TextStyle(
                fontSize: 20,
                color: Colors.purple
            ),
        );
    }
}

```

## 2. 富文本展示

前面展示的文本，我们都应用了相同的样式，如果我们希望给他们不同的样式呢？

- 比如《定风波》我希望字体更大一点，并且是黑色字体，并且有加粗效果；
- 比如 苏轼 我希望是红色字体；

如果希望展示这种混合样式，那么我们可以利用分片来进行操作（在 Android 中，我们可以使用 SpannableString，在 iOS 中，我们可以使用 NSAttributedString 完成，了解即可）

```js
class MyHomeBody extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text.rich(
      TextSpan(
        children: [
          TextSpan(text: "《定风波》", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: Colors.black)),
          TextSpan(text: "苏轼", style: TextStyle(fontSize: 18, color: Colors.redAccent)),
          TextSpan(text: "\n莫听穿林打叶声，何妨吟啸且徐行。\n竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。")
        ],
      ),
      style: TextStyle(fontSize: 20, color: Colors.purple),
      textAlign: TextAlign.center,
    );
  }
}
```
