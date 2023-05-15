---
title: Dart介绍和安装
order: 1
toc: content
path:
# nav:
#   title:
#   order: 1
group:
  path: /flutter/Dart
  title: Dart
  order: 2
---

## 一. Dart 介绍和安装

### 1.1. 认识 Dart

Google 为 Flutter 选择了 Dart 就已经是既定的事实，无论你多么想用你熟悉的语言，比如 JavaScript、Java、Swift、C++等来开发 Flutter，至少目前都是不可以的。

下面，我们就从安装 Dart 开始吧！

### 1.2. 安装 Dart

为什么还需要安装 Dart 呢？事实上在安装`Flutter SDK`的时候，它已经内置了`Dart`了，我们完全可以直接使用`Flutter`去进行`Dart`的编写并且运行。

但是，如果你想单独学习`Dart`，并且运行自己的`Dart`代码，最好去安装一个`Dart SDK`。

#### 下载 Dart SDK

到 Dart 的官方，根据不同的操作系统下载对应的 Dart

官方网站：[dart.dev/get-dart](https://dart.dev/get-dart)

无论是什么操作系统，安装方式都是有两种：`通过工具安装`和`直接下载SDK，配置环境变量`

1.通过工具安装

- Windows 可以通过 Chocolatey
- macOS 可以通过 homebrew
- 具体安装操作官网网站有详细的解释

  2.直接下载 SDK，配置环境变量

- 下载地址：[dart.dev/tools/sdk](https://dart.dev/get-dart/archive)
- 下载完成后，根据路径配置环境变量即可。

  1.3. VSCode 配置

学习 Dart 过程中，我使用 VSCode 作为编辑器,使用 VSCode 编写 Dart 需要安装 Dart 插件：

- Dart 和 Flutter 插件是为 Flutter 开发准备的
- Code Runner 可以点击右上角的按钮让我快速运行代码

## 二. Hello Dart

### 2.1. Hello World

接下来，就可以步入正题了。学习编程语言，从祖传的 Hello World 开始。

在 VSCode 中新建一个 helloWorld.dart 文件，添加下面的内容：

```dart
main(List<String> args) {
  print('Hello World');
}
```

然后在终端执行`dart helloWorld.dart`，就能看到 Hello World 的结果了。

### 2.2. 程序的分析

接下来，就是我自己的总结：

- Dart 语言的入口也是`main`函数，并且必须显示的进行定义；
- Dart 的入口函数`main`是没有返回值的；
- 传递给 main 的命令行参数，是通过`List<String>`完成的。

- 从字面值就可以理解`List`是`Dart`中的集合类型。其中的每一个`String`都表示传递给`main`的一个参数；

- 定义字符串的时候，可以使用单引号或双引号；

- 每行语句必须使用分号结尾，很多语言并不需要分号，比如`Swift`、`JavaScript`；
