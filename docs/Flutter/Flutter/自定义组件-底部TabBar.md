---
title: 底部TabBar
order: 11
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

## 1. TabBar 实现说明

<img src="./../assets/底部TabBar.png" alt="" style="zoom:100%;" />

在 Flutter 中，我们会使用 Scaffold 来搭建页面的基本结构，实际上它里面有一个属性就可以实现底部 TabBar 功能：bottomNavigationBar。 bottomNavigationBar 对应的类型是 BottomNavigationBar，我们来看一下它有什么属性：

- 属性非常多，但是都是设置底部 TabBar 相关的，我们介绍几个：
- `currentIndex`：当前选中哪一个 item；
- `selectedFontSize`：选中时的文本大小；
- `unselectedFontSize`：未选中时的文本大小；
- `type`：当 item 的数量超过 2 个时，需要设置为 fixed；
- `items`：放入多个 BottomNavigationBarItem 类型；
- `onTap`：监听哪一个 item 被选中；

```js
class BottomNavigationBar extends StatefulWidget {
  BottomNavigationBar({
    Key key,
    @required this.items,
    this.onTap,
    this.currentIndex = 0,
    this.elevation = 8.0,
    BottomNavigationBarType type,
    Color fixedColor,
    this.backgroundColor,
    this.iconSize = 24.0,
    Color selectedItemColor,
    this.unselectedItemColor,
    this.selectedIconTheme = const IconThemeData(),
    this.unselectedIconTheme = const IconThemeData(),
    this.selectedFontSize = 14.0,
    this.unselectedFontSize = 12.0,
    this.selectedLabelStyle,
    this.unselectedLabelStyle,
    this.showSelectedLabels = true,
    bool showUnselectedLabels,
  })
}
```

当实现了底部 TabBar 展示后，我们需要监听它的点击来切换显示不同的页面，这个时候我们可以使用 IndexedStack 来管理多个页面的切换：

```js
body: IndexedStack(
  index: _currentIndex,
  children: <Widget>[
    Home(),
    Subject(),
    Group(),
    Mall(),
    Profile()
  ],
```

## 2. TabBar 代码实现

注意事项：

1、我们需要在其他地方创建对应要切换的页面； 2、需要引入对应的资源，并且在 pubspec.yaml 中引入；

```js
import 'package:flutter/material.dart';
import 'views/home/home.dart';
import 'views/subject/subject.dart';
import 'views/group/group.dart';
import 'views/mall/mall.dart';
import 'views/profile/profile.dart';


class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "豆瓣",
      theme: ThemeData(
        primaryColor: Colors.green,
        highlightColor: Colors.transparent,
        splashColor: Colors.transparent
      ),
      home: MyStackPage(),
    );
  }
}

class MyStackPage extends StatefulWidget {
  @override
  _MyStackPageState createState() => _MyStackPageState();
}

class _MyStackPageState extends State<MyStackPage> {

  var _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        selectedFontSize: 14,
        unselectedFontSize: 14,
        type: BottomNavigationBarType.fixed,
        items: [
          createItem("home", "首页"),
          createItem("subject", "书影音"),
          createItem("group", "小组"),
          createItem("mall", "市集"),
          createItem("profile", "我的"),
        ],
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: <Widget>[
          Home(),
          Subject(),
          Group(),
          Mall(),
          Profile()
        ],
      ),
    );
  }
}

BottomNavigationBarItem createItem(String iconName, String title) {
  return BottomNavigationBarItem(
      icon: Image.asset("assets/images/tabbar/$iconName.png", width: 30,),
      activeIcon: Image.asset("assets/images/tabbar/${iconName}_active.png", width: 30,),
      title: Text(title)
  );
}
```
