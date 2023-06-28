---
title: 表单Widget
order: 4
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

和用户交互的其中一种就是输入框，比如注册、登录、搜索，我们收集用户输入的内容将其提交到服务器。

## 1. TextField 的使用

### 1.1. TextField 的介绍

TextField 用于接收用户的文本输入，它提供了非常多的属性，我们来看一下源码：

但是我们没必要一个个去学习，很多时候用到某个功能时去查看是否包含某个属性即可

```js
const TextField({
  Key key,
  this.controller,
  this.focusNode,
  this.decoration = const InputDecoration(),
  TextInputType keyboardType,
  this.textInputAction,
  this.textCapitalization = TextCapitalization.none,
  this.style,
  this.strutStyle,
  this.textAlign = TextAlign.start,
  this.textAlignVertical,
  this.textDirection,
  this.readOnly = false,
  ToolbarOptions toolbarOptions,
  this.showCursor,
  this.autofocus = false,
  this.obscureText = false,
  this.autocorrect = true,
  this.maxLines = 1,
  this.minLines,
  this.expands = false,
  this.maxLength,
  this.maxLengthEnforced = true,
  this.onChanged,
  this.onEditingComplete,
  this.onSubmitted,
  this.inputFormatters,
  this.enabled,
  this.cursorWidth = 2.0,
  this.cursorRadius,
  this.cursorColor,
  this.keyboardAppearance,
  this.scrollPadding = const EdgeInsets.all(20.0),
  this.dragStartBehavior = DragStartBehavior.start,
  this.enableInteractiveSelection = true,
  this.onTap,
  this.buildCounter,
  this.scrollController,
  this.scrollPhysics,
})
```

我们来学习几个比较常见的属性：

- 一些属性比较简单：`keyboardType`键盘的类型，`style`设置样式，`textAlign`文本对齐方式，`maxLength`最大显示行数等等；
- `decoration`：用于设置输入框相关的样式

  - `icon`：设置左边显示的图标
  - `labelText`：在输入框上面显示一个提示的文本
  - `hintText`：显示提示的占位文字
  - `border`：输入框的边框，默认底部有一个边框，可以通过 InputBorder.none 删除掉
  - `filled`：是否填充输入框，默认为 false
  - `fillColor`：输入框填充的颜色

- `controller`：
- `onChanged`：监听输入框内容的改变，传入一个回调函数
- `onSubmitted`：点击键盘中右下角的 down 时，会回调的一个函数

### 1.2. TextField 的样式以及监听

演示一下 TextField 的 decoration 属性以及监听：

```js
class HomeContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          TextFieldDemo()
        ],
      ),
    );
  }
}

class TextFieldDemo extends StatefulWidget {
  @override
  _TextFieldDemoState createState() => _TextFieldDemoState();
}

class _TextFieldDemoState extends State<TextFieldDemo> {
  @override
  Widget build(BuildContext context) {
    return TextField(
      decoration: InputDecoration(
        icon: Icon(Icons.people),
        labelText: "username",
        hintText: "请输入用户名",
        border: InputBorder.none,
        filled: true,
        fillColor: Colors.lightGreen
      ),
      onChanged: (value) {
        print("onChanged:$value");
      },
      onSubmitted: (value) {
        print("onSubmitted:$value");
      },
    );
  }
}
```

### 1.3. TextField 的 controller

我们可以给 TextField 添加一个控制器（Controller），可以使用它设置文本的初始值，也可以使用它来监听文本的改变；事实上，如果我们没有为 TextField 提供一个 Controller，那么会 Flutter 会默认创建一个 TextEditingController 的，这个结论可以通过阅读源码得到：

```js
@override
void initState() {
  super.initState();
  // ...其他代码
  if (widget.controller == null)
    _controller = TextEditingController();
}
```

我们也可以自己来创建一个 Controller 控制一些内容：

```js
class _TextFieldDemoState extends State<TextFieldDemo> {
  final textEditingController = TextEditingController();

  @override
  void initState() {
    super.initState();

    // 1.设置默认值
    textEditingController.text = "Hello World";

    // 2.监听文本框
    textEditingController.addListener(() {
      print("textEditingController:${textEditingController.text}");
    });
  }

  // ...省略build方法
}

```

## 2. Form 表单的使用

在我们开发注册、登录页面时，通常会有多个表单需要同时获取内容或者进行一些验证，如果对每一个 TextField 都分别进行验证，是一件比较麻烦的事情。做过前端的开发知道，我们可以将多个 input 标签放在一个 form 里面，Flutter 也借鉴了这样的思想：我们可以通过 Form 对输入框进行分组，统一进行一些操作。

### 2.1. Form 表单的基本使用

Form 表单也是一个 Widget，可以在里面放入我们的输入框。

但是 Form 表单中输入框必须是 FormField 类型的

- 我们查看刚刚学过的 TextField 是继承自 StatefulWidget，并不是一个 FormField 类型；
- 我们可以使用 TextFormField，它的使用类似于 TextField，并且是继承自 FormField 的；

我们通过 Form 的包裹，来实现一个注册的页面：

```js
class FormDemo extends StatefulWidget {
  @override
  _FormDemoState createState() => _FormDemoState();
}

class _FormDemoState extends State<FormDemo> {
  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          TextFormField(
            decoration: InputDecoration(
              icon: Icon(Icons.people),
              labelText: "用户名或手机号"
            ),
          ),
          TextFormField(
            obscureText: true, // 密码暗文
            decoration: InputDecoration(
              icon: Icon(Icons.lock),
              labelText: "密码"
            ),
          ),
          SizedBox(height: 16,),
          Container(
            width: double.infinity,
            height: 44,
            child: RaisedButton(
              color: Colors.lightGreen,
              child: Text("注 册", style: TextStyle(fontSize: 20, color: Colors.white),),
              onPressed: () {
                print("点击了注册按钮");
              },
            ),
          )
        ],
      ),
    );
  }
}

```

<img src="./../assets/表单widget.png" alt="表单widget" style="zoom:100%;" />

### 2.2. 保存和获取表单数据

有了表单后，我们需要在点击注册时，可以同时获取和保存表单中的数据，怎么可以做到呢？

- 1、需要监听注册按钮的点击，在之前我们已经监听的 onPressed 传入的回调中来做即可。（当然，如果嵌套太多，我们待会儿可以将它抽取到一个单独的方法中）
- 2、监听到按钮点击时，同时获取用户名和密码的表单信息。

如何同时获取用户名和密码的表单信息？

- 如果我们调用 Form 的 State 对象的 save 方法，就会调用 Form 中放入的 TextFormField 的 onSave 回调：

```js
TextFormField(
  decoration: InputDecoration(
    icon: Icon(Icons.people),
    labelText: "用户名或手机号"
  ),
  onSaved: (value) {
    print("用户名：$value");
  },
),

```

但是，我们有没有办法可以在点击按钮时，拿到 Form 对象 来调用它的 save 方法呢？

<Alert type="info">
知识点：在Flutter如何可以获取一个通过一个引用获取一个StatefulWidget的State对象呢？

答案：通过绑定一个 GlobalKey 即可。 </Alert>

```js
class FormDemo extends StatefulWidget {
  @override
  _FormDemoState createState() => _FormDemoState();
}

class _FormDemoState extends State<FormDemo> {
  final registerFormKey = GlobalKey<FormState>();
  String username, password;

  void registerForm() {
    registerFormKey.currentState.save();

    print("username:$username password:$password");
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: registerFormKey, // registerFormKey.currentState  可以获取它的state对象
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          TextFormField(
            decoration: InputDecoration(
              icon: Icon(Icons.people),
              labelText: "用户名或手机号"
            ),
            onSaved: (value) {
              this.username = value;
            },
          ),
          TextFormField(
            obscureText: true,
            decoration: InputDecoration(
              icon: Icon(Icons.lock),
              labelText: "密码"
            ),
            onSaved: (value) {
              this.password = value;
            },
          ),
          SizedBox(height: 16,),
          Container(
            width: double.infinity,
            height: 44,
            child: RaisedButton(
              color: Colors.lightGreen,
              child: Text("注 册", style: TextStyle(fontSize: 20, color: Colors.white),),
              onPressed: registerForm,
            ),
          )
        ],
      ),
    );
  }
}
```

### 2.3. 验证填写的表单数据

在表单中，我们可以添加`验证器`，如果不符合某些特定的规则，那么给用户一定的提示信息比如我们需要账号和密码有这样的规则：账号和密码都不能为空。按照如下步骤就可以完成整个验证过程：

- 1、为 TextFormField 添加 validator 的回调函数；
- 2、调用 Form 的 State 对象的 validate 方法，就会回调 validator 传入的函数；

```js
class FormDemo extends StatefulWidget {
  @override
  _FormDemoState createState() => _FormDemoState();
}

class _FormDemoState extends State<FormDemo> {
  final registerFormKey = GlobalKey<FormState>();
  String username, password;

  void registerForm() {
    registerFormKey.currentState.save();
    registerFormKey.currentState.validate();

    print("username:$username password:$password");
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: registerFormKey, // registerFormKey.currentState  可以获取它的state对象
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          TextFormField(
            decoration: InputDecoration(
              icon: Icon(Icons.people),
              labelText: "用户名或手机号"
            ),
            onSaved: (value) {
              this.username = value;
            },
            validator: (value) { // 验证
                if(value.isEmpty()) {
                    return '账号不能为空';
                }
                return null;
            }
          ),
          TextFormField(
            obscureText: true,
            decoration: InputDecoration(
              icon: Icon(Icons.lock),
              labelText: "密码"
            ),
            onSaved: (value) {
              this.password = value;
            },
          ),
          SizedBox(height: 16,),
          Container(
            width: double.infinity,
            height: 44,
            child: RaisedButton(
              color: Colors.lightGreen,
              child: Text("注 册", style: TextStyle(fontSize: 20, color: Colors.white),),
              onPressed: registerForm,
            ),
          )
        ],
      ),
    );
  }
}
```

也可以为 TextFormField 添加一个属性：autovalidate

- 不需要调用 validate 方法，会自动验证是否符合要求

```js
TextFormField(
  decoration: InputDecoration(
    icon: Icon(Icons.people),
    labelText: "用户名或手机号"
  ),
  onSaved: (value) {
    this.username = value;
  },
  validator: (value) { // 验证
      if(value.isEmpty()) {
          return '账号不能为空';
      }
      return null;
  },
  autovalidate: true,
),
```
