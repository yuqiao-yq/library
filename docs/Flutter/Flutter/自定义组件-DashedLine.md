---
title: DashedLine
order: 10
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

分割线： 最初我考虑使用边框虚线来完成分割线，后来发现 Flutter 并不支持虚线边框，因此封装了一个 DashedLine 的小 Widget 来实现。

## 1. 最终实现效果

目的：实现效果的同时，提供定制，并且可以实现水平和垂直两种虚线效果：

- axis：确定虚线的方向；
- `dashedWidth`：根据虚线的方向确定自己虚线的宽度；
- `dashedHeight`：根据虚线的方向确定自己虚线的高度；
- `count`：内部会根据设置的个数和宽高确定密度（虚线的空白间隔）；
- `color`：虚线的颜色，不多做解释；

<img src="./../assets/DashedLine.png" alt="" style="zoom:100%;" />

## 2. 实现思路分析

实现比较简单，主要是根据用户传入的方向确定添加对应的 SizedBox 即可。

这里有一个注意点：虚线到底是设置多宽或者多高呢？

- 我这里是根据方向获取父 Widget 的宽度和高度来决定的；
- 通过 LayoutBuilder 可以获取到父 Widget 的宽度和高度；

```js
return LayoutBuilder(
  builder: (BuildContext context, BoxConstraints constraints) {
    // 根据宽度计算个数
    return Flex(
      direction: this.axis,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: List.generate(this.count, (int index) {
        return SizedBox(
          width: dashedWidth,
          height: dashedHeight,
          child: DecoratedBox(
            decoration: BoxDecoration(color: color),
          ),
        );
      }),
    );
  },
);
```

## 3. 最终代码实现

```js
class HYDashedLine extends StatelessWidget {
  final Axis axis;
  final double dashedWidth;
  final double dashedHeight;
  final int count;
  final Color color;

  HYDashedLine({
    @required this.axis,
    this.dashedWidth = 1,
    this.dashedHeight = 1,
    this.count,
    this.color = const Color(0xffff0000)
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        // 根据宽度计算个数
        return Flex(
          direction: this.axis,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: List.generate(this.count, (int index) {
            return SizedBox(
              width: dashedWidth,
              height: dashedHeight,
              child: DecoratedBox(
                decoration: BoxDecoration(color: color),
              ),
            );
          }),
        );
      },
    );
  }
}
```
