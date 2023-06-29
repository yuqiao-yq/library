---
title: StarRating
order: 9
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

评分展示： 我们需要根据不同的评分显示不同的星级展示，这里封装了一个 StarRating 的小 Widget 来实现

## 1. 最终效果展示

目的：实现功能展示的同时，提供高度的定制效果

rating：必传参数，告诉 Widget 当前的评分。 maxRating：可选参数，最高评分，根据它来计算一个比例，默认值为 10； size：星星的大小，决定每一个 star 的大小； unselectedColor：未选中星星的颜色（该属性是使用默认的 star 才有效）； selectedColor：选中星星的颜色（该属性也是使用默认的 star 才有效）； unselectedImage：定制未选中的 star； selectedImage：定义选中时的 star； count：展示星星的个数；

<img src="./../assets/starRating.png" alt="" style="zoom:100%;" />

## 2. 实现思路分析

- 未选中 star 的展示：根据个数和传入的 unselectedImage 创建对应个数的 Widget 即可；
- 选中 star 的展示：
  - 计算出满 star 的个数，创建对应的 Widget；
  - 计算剩余比例的评分，对最后一个 Widget 进行裁剪；

问题一：选择 StatelessWidget 还是 StatefulWidget？考虑到后面可能会做用户点击进行评分或者用户手指滑动评分的效果，所以这里选择 StatefulWidget

- 目前还没有讲解事件监听相关，所以暂时不添加这个功能

问题二：如何让选中的 star 和未选中的 star 重叠显示？

- 非常简单，使用 Stack 即可；

```js
child: Stack(
  children: <Widget>[
    Row(children: getUnSelectImage(), mainAxisSize: MainAxisSize.min,),
    Row(children: getSelectImage(), mainAxisSize: MainAxisSize.min,),
  ],
),
```

问题三：如何实现对选中的最后一个 star 进行裁剪？

- 可以使用 ClipRect 定制 CustomClipper 进行裁剪

定义 CustomClipper 裁剪规则：

```js
class MyRectClipper extends CustomClipper<Rect>{
  final double width;

  MyRectClipper({
    this.width
  });

  @override
  Rect getClip(Size size) {
    return Rect.fromLTRB(0, 0, width, size.height);
  }

  @override
  bool shouldReclip(MyRectClipper oldClipper) {
    return width != oldClipper.width;
  }
}
```

使用 MyRectClipper 进行裁剪：

```js
Widget leftStar = ClipRect(
  clipper: MyRectClipper(width: leftRatio * widget.size),
  child: widget.selectedImage,
);
```

## 3. 最终代码实现

```js
import 'package:flutter/material.dart';

class HYStarRating extends StatefulWidget {
  final double rating;
  final double maxRating;
  final Widget unselectedImage;
  final Widget selectedImage;
  final int count;
  final double size;
  final Color unselectedColor;
  final Color selectedColor;

  HYStarRating({
    @required this.rating,
    this.maxRating = 10,
    this.size = 30,
    this.unselectedColor = const Color(0xffbbbbbb),
    this.selectedColor = const Color(0xffe0aa46),
    Widget unselectedImage,
    Widget selectedImage,
    this.count = 5,
  }): unselectedImage = unselectedImage ?? Icon(Icons.star, size: size, color: unselectedColor,),
        selectedImage = selectedImage ?? Icon(Icons.star, size: size, color: selectedColor);

  @override
  _HYStarRatingState createState() => _HYStarRatingState();
}

class _HYStarRatingState extends State<HYStarRating> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Stack(
        children: <Widget>[
          Row(children: getUnSelectImage(), mainAxisSize: MainAxisSize.min),
          Row(children: getSelectImage(), mainAxisSize: MainAxisSize.min),
        ],
      ),
    );
  }

  // 获取评星
  List<Widget> getUnSelectImage() {
    return List.generate(widget.count, (index) => widget.unselectedImage);
  }

  List<Widget> getSelectImage() {
    // 1.计算Star个数和剩余比例等
    double oneValue = widget.maxRating / widget.count;
    int entireCount = (widget.rating / oneValue).floor();
    double leftValue = widget.rating - entireCount * oneValue;
    double leftRatio = leftValue / oneValue;

    // 2.获取start
    List<Widget> selectedImages = [];
    for (int i = 0; i < entireCount; i++) {
      selectedImages.add(widget.selectedImage);
    }

    // 3.计算
    Widget leftStar = ClipRect(
      clipper: MyRectClipper(width: leftRatio * widget.size),
      child: widget.selectedImage,
    );
    selectedImages.add(leftStar);

    return selectedImages;
  }
}


class MyRectClipper extends CustomClipper<Rect>{
  final double width;

  MyRectClipper({
    this.width
  });

  @override
  Rect getClip(Size size) {
    return Rect.fromLTRB(0, 0, width, size.height);
  }

  @override
  bool shouldReclip(MyRectClipper oldClipper) {
    return width != oldClipper.width;
  }
}
```
