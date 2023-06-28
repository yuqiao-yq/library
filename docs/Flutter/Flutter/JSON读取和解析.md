---
title: JSON读取和解析
order: 7
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

在开发中，我们经常会使用本地 JSON 或者从服务器请求数据后回去到 JSON，拿到 JSON 后通常会将 JSON 转成 Model 对象来进行后续的操作，因为这样操作更加的方便，也更加的安全。

所以学习 JSON 的相关操作以及读取 JSON 后如何转成 Model 对象对于 Flutter 开发也非常重要。

## 1. JSON 资源配置

JSON 也属于一种资源，所以在使用之前需要先进行相关的配置

我们之前在学习使用 Image 组件时，用到了本地图片，本地图片必须在 pubspec.yaml 中进行配置：

<img src="./../assets/JSON配置.png" alt="" style="zoom:100%;" />

## 2. JSON 读取解析

### 2.1. JSON 资源读取

如果我们希望读取 JSON 资源，可以使用`package:flutter/services.dart`包中的`rootBundle`。

在`rootBundle`中有一个`loadString`方法，可以去加载 JSON 资源

- 但是注意，查看该方法的源码，你会发现这个操作是一个异步的。
- 关于 Future 和 async，这里就不再展开讲解，可以去查看之前的 dart 语法。

```js
Future<String> loadString(String key, { bool cache = true }) async {
  ...省略具体代码，可以自行查看源码
}
```

代码如下：(不要试图拷贝这个代码去运行，是没办法运行的)

```js
import 'package:flutter/services.dart' show rootBundle;

// 打印读取的结果是一个字符串
rootBundle.loadString("assets/yz.json").then((value) => print(value));
```

### 2.2. JSON 字符串转化

拿到 JSON 字符串后，我们需要将其转成成我们熟悉的 List 和 Map 类型。

我们可以通过 dart:convert 包中的 json.decode 方法将其进行转化

```js
// 1.读取json文件
String jsonString = await rootBundle.loadString("assets/yz.json");

// 2.转成List或Map类型
final jsonResult = json.decode(jsonString);
```

### 2.3. 对象 Model 定义

将 JSON 转成了 List 和 Map 类型后，就可以将 List 中的一个个 Map 转成 Model 对象，所以我们需要定义自己的 Model

```js
class Anchor {
  String nickname;
  String roomName;
  String imageUrl;

  Anchor({
    this.nickname,
    this.roomName,
    this.imageUrl
  });

  Anchor.withMap(Map<String, dynamic> parsedMap) {
    this.nickname = parsedMap["nickname"];
    this.roomName = parsedMap["roomName"];
    this.imageUrl = parsedMap["roomSrc"];
  }
}
```

## 3. JSON 解析代码

上面我们给出了解析的一个个步骤，下面我们给出完整的代码逻辑

这里我单独创建了一个 anchor.dart 的文件，在其中定义了所有的相关代码：

- 之后外界只需要调用我内部的`getAnchors`就可以获取到解析后的数据了

```js
import 'package:flutter/services.dart' show rootBundle;
import 'dart:convert';
import 'dart:async';

class Anchor {
  String nickname;
  String roomName;
  String imageUrl;

  Anchor({
    this.nickname,
    this.roomName,
    this.imageUrl
  });

  Anchor.withMap(Map<String, dynamic> parsedMap) {
    this.nickname = parsedMap["nickname"];
    this.roomName = parsedMap["roomName"];
    this.imageUrl = parsedMap["roomSrc"];
  }
}

Future<List<Anchor>> getAnchors() async {
  // 1.读取json文件
  String jsonString = await rootBundle.loadString("assets/yz.json");

  // 2.转成List或Map类型
  final jsonResult = json.decode(jsonString);

  // 3.遍历List，并且转成Anchor对象放到另一个List中
  List<Anchor> anchors = new List();
  for (Map<String, dynamic> map in jsonResult) {
    anchors.add(Anchor.withMap(map));
  }
  return anchors;
}
```
