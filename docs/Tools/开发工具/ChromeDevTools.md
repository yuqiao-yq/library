---
title: Chrome DevTools
order: 1
toc: content
---

---

## **Console 面板**

> 此章节请打开 justwe7.github.io/devtools/console/console.html 一起食用
>
> 一方面用来记录页面在执行过程中的信息（一般通过各种 console 语句来实现），另一方面用来当做 shell 窗口来执行脚本以及与页面文档、DevTools 等进行交互

组合快捷键按键:Windows: Control + Shift + J

Mac: Command + Option + J

首先看一下 console 对象下面都有哪些方法:

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/1ff80aa4907141b889b1902549524830.png?from=pc)

### **console.clear()**

顾名思义，清空控制台

### **console.log(), info(), warn(), error()**

日常用的比较多的就是这几个了，其中 log 和 info，印象中在 2016 年之前老用 info 打印，还是有区别的，info 输出的内容前面是有一个蓝色背景的小圈, 大概跟这个差不多: i，后来 chrome 更新就没了(IE 还是可以看出差别的)

```
console.log('普通信息')
console.info('提示性信息')
console.error('错误信息')
console.warn('警示信息')
```

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/cc59128ac09f474a811a1f093ceca970.png?from=pc)

**使用占位符**

```
// 支持逗号分隔参数，不需要每个参数都单独打印
console.log(1, '2', +'3')
// 占位符
// %s
console.log('今晚%s 老虎', '打', '？？？')
// %c
console.log('今晚%s%c 老虎', '打', 'color: red', '？？？')
// 带有占位符的参数之后的若干参数属于占位符的配置参数
```

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/18992b506cca44f196a2004a60f6da77.png?from=pc)

其余的占位符列表还有：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/042e0ad644434b16b6d2fe5a8eb255eb?from=pc)

### **console.time(), timeEnd()**

time 和 timeEnd 一般放在一起用，传入一个参数用来标识起始位置用于统计时间:

```
console.time('t')
Array(900000).fill({}).forEach((v, index) => v.index = index)
console.timeEnd('t')
// t: 28.18603515625ms
```

会打印出中间代码的执行时间

### **console.count()**

顾名思义。。计数,可以用来统计某个函数的执行次数，也可以传入一个参数，并且根据传入的参数分组统计调用的次数

```
function foo(type = '') {
  type ? console.count(type) : console.count()
  return 'type：' + type
}
foo('A') //A: 1
foo('B') //B: 1
foo()    //default: 1
foo()    //default: 2
foo()    //default: 3
foo('A') //A: 2
```

### **console.trace()**

用于追踪代码的调用栈，不用专门断点去看了

```
console.trace()
function foo() {
  console.trace()
}
foo()
```

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/a08cbbd3f583401fb86a109492ccf30d.png?from=pc)

### **console.table()**

console.table()方法可以将复合类型的数据转为表格显示

```
var arr = [
  { name: '梅西', qq: 10 },
  { name: 'C 罗', qq: 7 },
  { name: '内马尔', qq: 11 },
]
console.table(arr)
```

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/50156e4bc09146b3b4a15bcfcf6d5a3f.png?from=pc)

### **console.dir()**

按便于阅读和打印的形式将对象打印

```
var obj = {
  name: 'justwe7',
  age: 26,
  fn: function () {
    alert('justwe7')
  },
}
console.log(obj)
console.dir(obj)
```

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/0aa8de53198945aba722d035f25b3dab.png?from=pc)

打印 DOM 对象区别：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/0ab74f1d4aa24764a5ec5f7ac5079fef.png?from=pc)

### **console.assert()**

断言，用来进行条件判断。当表达式为 false 时，则显示错误信息，不会中断程序执行。

> 可以用于提示用户，内部状态不正确（把那个说假话的揪出来）

```
var val = 1
console.assert(val === 1, '等于 1')
console.assert(val !== 1, '不等于 1')
console.log('代码往下执行呢啊')
```

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/eb930969a34f4748a7d971d54fe9326c.png?from=pc)

### **console.group(), groupEnd()**

分组输出信息，可以用鼠标折叠/展开

```
console.group('分组 1')
console.log('分组 1-1111')
console.log('分组 1-2222')
console.log('分组 1-3333')
console.groupEnd()
console.group('分组 2')
console.log('分组 2-1111')
console.log('分组 2-2222')
console.log('分组 2-3333')
console.groupEnd()
```

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/399ae65aa3f24a1a826f87080afbcf81.png?from=pc)

## **$ 选择器**

### **$\_**

可以记录上次计算的结果，直接用于代码执行:

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/1e91df834a354b44a048c472dc3ae308?from=pc)

### **$0,$1...$4**

代表最近 5 个审查元素**选中**过的 DOM 节点，看图（是要选中一下，我更喜欢用存储全局变量的方式玩，省的自己手残又选了一个节点）：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/953f4e113f5b41469ae880aee045444a?from=pc)

### **$和$$**

- $(selector)是原生 document.querySelector() 的封装。
- $$
  (selector)返回的是所有满足选择条件的元素的一个集合，是 document.querySelectorAll() 的封装
  $$

### **$x**

将所匹配的节点放在一个数组里返回

```
<ul>
  <ul>
    <li><p>li 下的 p1</p></li>
    <li><p>li 下的 p2</p></li>
    <li><p>li 下的 p3</p></li>
  </ul>
</ul>
<p>外面的 p</p>
$x('//li') // 所有的 li
$x('//p') // 所有的 p
$x('//li//p') // 所有的 li 下的 p
$x('//li[p]') // 所有的 li 下的 p
```

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/1a8002d757aa433a90240ce9b9e8068c.png?from=pc)

## **keys(), values()**

跟 ES6 对象扩展方法， Object.keys() 和 Object.values() 相同

```
keys(obj);
values(obj);
```

## **copy()**

可以直接将变量复制到剪贴板

```
copy(temp1)
```

与 Save global variable 结合使用神器

## **Element 面板**

> 此章节请打开 justwe7.github.io/devtools/element/element.html 一起食用
>
> 在 Elements 面板中可以通过 DOM 树的形式查看所有页面元素，同时也能对这些页面元素进行所见即所得的编辑

组合快捷键按键:Windows: Control + Shift + CMac: Command + Option + C

## **css 调试**

## **style**

选中目标节点，element 面板，查看 style->:hov,选择对应的状态即可

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/0994fe83bd0747d4b2b14592b50f238c.png?from=pc)

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/2b8563e510b04eb6a5457fc9cda372d9?from=pc)

## **computed**

有时候样式覆盖过多，查看起来很麻烦，computed 就派上用场了

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/47b8fc9a4cdd4e91a6ea878873046835?from=pc)

> 点击某个样式可以直接跳转至对应 css 定义

## **调整某个元素的数值**

选中想要更改的值，按方向键上下就可以 + / - 1 个单位的值

> alt + 方向键 可以 ×10 调整单位值 Ctrl + 方向键 可以 ×100 调整单位值 shift + 方向键 可以 /10 调整单位

## **html 调试**

### **骚操作**

选中节点，直接按键盘 H 可以直接让元素显示/隐藏，不用手动敲样式了，效果等同 visibility: hidden，还是要占据盒模型空间的。（记得把输入法改成英文~）

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/3e13c9d95cee4020a5de573d13a079c8?from=pc)

### **将某个元素存储到全局临时变量中**

选中节点，右键，Store as global variable（在 network 面板中也能用，尤其是筛选接口的返回值很方便）

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/a455ac3a06eb4c049771ad7c4ed64402?from=pc)

### **滚动到某个节点**

如果页面很长，想找一个文本节点的显示位置又不想手动滑动可以试试 Scroll into view

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/8ad85e98670444a9b1fff4eb4ce09b38?from=pc)

## **Edge 专属的 3D 视图**

使用 chromium 后的 Edge 真的是改头换面，**3D 视图**可以帮忙定位一些定位层级还有 DOM 嵌套的问题，页面结构写的好不好看很直观的可以看出来(跟辅助功能里面的 dom 树结合使用很舒服)

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/55e49545c8ef47448d287c125a1c83f5?from=pc)

目前 chrome 还是没有这项功能的，Edge 打开位置：控制台打开状态 =>Esc 打开抽屉 => ···选择 3D 视图面板

## **DOM 断点**

可以监听到 DOM 节点的变更(子节点变动/属性变更/元素移除)，并断点至变更 DOM 状态的 js 代码行：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/0db37d77728748e2971658b609d91037?from=pc)

## **Network 面板**

> 可以查看通过网络请求的资源的相关详细信息

组合快捷键按键:Windows: Control + Shift + IMac: Command + Option + I

按区域划分大概分为如下几个区域：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/cc612c3cac0d4576bc55e249d478b9f3.png?from=pc)

1. Controls - 控制 Network 功能选项，以及一些展示外观
2. Filters - 控制在 Requests Table 中显示哪些类型的资源 tips：按住 Cmd (Mac) 或 Ctrl (Windows/Linux) 并点击筛选项可以同时选择多个筛选项
3. Overview - 此图表显示了资源检索时间的时间线。如果看到多条竖线堆叠在一起，则说明这些资源被同时检索
4. Requests Table - 此表格列出了检索的每一个资源。 默认情况下，此表格按时间顺序排序，最早的资源在顶部。点击资源的名称可以显示更多信息。 提示：右键点击 Timeline 以外的任何一个表格标题可以添加或移除信息列
5. Summary - 可以一目了然地看到页面的请求总数、传输的数据总量、加载时间

## **（1、2）Controls，Filters 区域**

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/7b84bd5556d043f79abeb84513d63b36.png?from=pc)

Filters 控制的展示：

- **使用大请求行** - 默认情况下，Requests Table 一个资源只显示很小的一行。选中 Use large resource rows(使用大资源行)按钮可以显示两个文本字段：主要字段和次要字段。
- **捕获屏幕截图** - 将鼠标悬停在某个屏幕截图上的时候，Timeline/Waterfall(时间轴)会显示一条垂直的黄线，指示该帧是何时被捕获的
- **显示概述** - 展示页面整个生命周期的各个阶段（Overview 区域）的耗时（蓝色绿色的那些横杠）

## **（3） Overview 区域**

页面整个生命周期的各个阶段网络资源加载耗时信息的汇总，可以选择区域来筛选 Requests Table 的详细资源信息

## **(4) Requests Table 区域**

标题栏的对应描述：

- Name**(名称)**: 资源的名称。
- Status**(状态)**: HTTP 状态代码。
- Type**(类型)**: 请求的资源的 MIME 类型。
- Initiator**(发起)**: 发起请求的对象或进程。它可能有以下几种值：
- - Parser**(解析器)**: Chrome 的 HTML 解析器发起了请求。
  - Redirect**(重定向)**: HTTP 重定向启动了请求。
  - Script**(脚本)**: 脚本启动了请求。
  - Other**(其他)**: 一些其他进程或动作发起请求，例如用户点击链接跳转到页面，或在地址栏中输入网址。
- Size**(大小)**: 相应头的大小（通常是几百字节）加上响应数据，由服务器提供。
- Time**(时间)**: 总持续时间，从请求的开始到接收响应中的最后一个字节
- Timeline/Waterfall**(时间轴)**: 显示所有网络请求的可视化统计信息

> 在标题栏如(Name 上)右键，可以添加或删除信息列。比如可以多加一列 Response Header => Content-Encoding 选项来总览页面资源的 gzip 压缩情况:

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/1010e82a1399492a9233cc84288bff24?from=pc)

# **重新发起 xhr 请求**

在平时和后端联调时，我们用的最多的可能就是 Network 面板了。但是每次想重新查看一个请求通过刷新页面、点击按钮等方式去触发 xhr 请求，这种方式有时显得会比较麻烦，可以通过 Replay XHR 的方式去发起一条新的请求：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/6d74ddd6cee74d84b7e1642ad98c534d?from=pc)

## **查看 HTTP 相关信息**

**查看网络请求的参数**

可以通过点击 query string parameters (查询字符串参数)旁边的 view URL encoded (查看 URL 编码)或 view decoded (查看解码)链接，查看 URL 编码或解码格式的 query string parameters (查询字符串参数)。在使用 postman 复制相关入参时尤其实用。

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/dd5d1c700412417f9e5ec77246fc7cc4.png?from=pc)

**查看 HTTP** **响应\*\***内容\*\*点击 Response(响应)标签页可以查看该资源未格式化的 HTTP 响应内容

> 接口的返回值(在 preview 中）同样也可以 Save global variable 存储一个全局变量

### **Size 和 Time 为什么有两行参数？**

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/2d156b87362b49dcb1a94f529f396d1b.png?from=pc)

### **关于 Size 列**

Size 有两行：

- 第一行表示的是数据的**传输时**的大小，例如上图中的 190KB
- 第二行表示的是数据**实际**的大小 708KB

> 在服务器端采取 gzip 压缩算法将原有 708KB 压缩至 190KB,传输大小缩短 3.7 倍，大大的提高了资源传输的效率

**需要注意的点：**

gzip 压缩只会压缩响应体内容，所以适用于返回数据量大的时候，如果数据量太小的话，有可能会导致数据**传输时**的大小比**实际**大小要大(_加入了一些额外的响应头_)

### **关于 Time 列**

Time 有两行：

- 第一行表示从客户端发送请求到服务端返回所有数据所花费的总时间，对于上图来说就是 471ms
- 第二行表示的是从客户端发送请求到服务器端返回第一个字节所表示的时间，对于上图来说就是 55ms

> 第一行的时间代表了所有项目：例如解析 dns，建立连接，等待服务器返回数据，传输数据等
>
> 第二行的时间是 总时间 - 数据传输的时间

从上面的分析中我们看到 从**客户端请求到服务器处理结束准备返回数据**花了 55ms，但是在进行**传输数据**的时候花费了 471ms

对于网慢的用户来说，可能会耗费更长的时间，所以在写代码（接口）的时候，返回的数据量要尽量精简

### **Waterfall**

点击某个资源会展示出详细的网络加载信息：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/639163427b0c4c9d997b303d9e3c1716.png?from=pc)

相关字段描述:

- Queuing (排队)浏览器在以下情况下对请求排队
- 存在更高优先级的请求,请求被渲染引擎推迟，这经常发生在 images（图像）上,因为它被认为比关键资源（如脚本/样式）的优先级低。
- 此源已打开六个 TCP 连接，达到限值，仅适用于 HTTP/1.0 和 HTTP/1.1。在等待一个即将被释放的不可用的 TCP socket
- 浏览器正在短暂分配磁盘缓存中的空间，生成磁盘缓存条目（通常非常快）
- Stalled (停滞) - 发送请求之前等待的时间。它可能因为进入队列的任意原因而被阻塞，这个时间包括代理协商的时间。请求可能会因 Queueing 中描述的任何原因而停止。
- DNS lookup (DNS 查找) - 浏览器正在解析请求 IP 地址，页面上的每个新域都需要完整的往返(roundtrip)才能进行 DNS 查找
- Proxy Negotiation - 浏览器正在与代理服务器协商请求
- initial connection (初始连接) - 建立连接所需的时间，包括 TCP 握手/重视和协商 SSL。
- SSL handshake (SSL 握手) - 完成 SSL 握手所用的时间
- Request sent (请求发送) - 发出网络请求所花费的时间，通常是几分之一毫秒。
- Waiting (等待) - 等待初始响应所花费的时间，也称为 Time To First Byte(接收到第一个字节所花费的时间)。这个时间除了等待服务器传递响应所花费的时间之外，还包括 1 次往返延迟时间及服务器准备响应所用的时间（服务器发送数据的延迟时间）
- Content Download(内容下载) - 接收响应数据所花费的时间(从接收到第一个字节开始，到下载完最后一个字节结束)
- ServiceWorker Preparation - 浏览器正在启动 Service Worker
- Request to ServiceWorker - 正在将请求发送到 Service Worker
- Receiving Push - 浏览器正在通过 HTTP/2 服务器推送接收此响应的数据
- Reading Push - 浏览器正在读取之前收到的本地数据

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/5f7773c3f8ef456d8e80f2b0e2c8fc38.png?from=pc)

# **(5) Summary 区域**

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/46e845acaec547c1862f58ff1df138a6.png?from=pc)

requests 查看请求的总数量 | transferred 查看请求的总大小 | resources 资源 | Finish 所有 http 请求响应完成的时间 | DOMContentLoaded 时间 | load 时间

当页面的初始的标记被解析完时，会触发 DOMContentLoaded。 它在 Network(网络)面板上的显示：

- 在 Overview (概览)窗格中的蓝色垂直线表示这个事件。
- 在 Requests Table (请求列表)中的红色垂直线也表示这个事件。
- 在 Summary (概要)窗格中，您可以查看事件的确切时间。

当页面完全加载时触发 load 事件。 它显示也显示在：

- 在 Overview (概览)窗格的红色垂直线表示这个事件。
- 在 Requests Table (请求列表)中的红色垂直线也表示这个事件。
- 在 Summary (概要)中，可以查看改事件的确切时间

> DOMContentLoaded 会比 Load 时间小，两者时间差大致等于外部资源加载（一般是图片/字体）的时间
>
> Finish 时间是页面上所有 http 请求发送到响应完成的时间（如果页面存在一个轮询的接口，这个值也会累加的）。HTTP1.0/1.1 协议限定单个域名的请求并发量是 6 个，即 Finish 是所有请求（不只是 XHR 请求，还包括 DOC，img，js，css 等资源的请求）在并发量为 6 的限制下完成的时间。
>
> Finish 的时间比 Load 大，意味着页面有相当部分的请求量
>
> Finish 的时间比 Load 小，意味着页面请求量很少，如果页面是只有一个 html 文档请求的静态页面，Finish 时间基本就等于 HTML 文档请求的时间
>
> 所以 Finish 时间与 DOMContentLoaded 和 Load 并无直接关系

# **使用 Network 面板进行网络优化**

> 参考 Network 面板可以针对 Network 提出一些优化建议

### **排队或停止阻塞**

最常见的问题是很多个请求排队或被阻塞。这表示从单个客户端检索的资源太多。在 HTTP 1.0/1.1 连接协议中，Chrome 限制每个域名最多执行 6 个 TCP 连接。如果一次请求十二个资源，前 6 个月开始，后 6 个将排队。一旦其中一个请求完成，队列中的第一个请求项目将开始其请求过程。

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/827d5fe94a104bffadc09d044db5aae9.png?from=pc)

要解决传统 HTTP 1 的此问题，需要用多个子域名提供服务资源，将资源拆分到多个子域中，均匀分配。

> 上面说的修复 HTTP 1 连接数问题，不适用于 HTTP 2 连接，如果已部署 HTTP 2，不要对资源进行域划分，因为它会影响 HTTP 2 的工作原理（在 HTTP 2 中 TCP 连接多路复用连接的）。取消了 HTTP 1 的 6 个连接限制，并且可以通过单个连接同时传输多个资源。

### **接收到第一个字节的时间很慢**

绿色地块占据比例很高：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/69a507c5fdea46458910a2e9eaa077d5.png?from=pc)

TTFB 就是等待第一个响应字节的时间，建议在 200ms 以下，以下情况可能会导致高 TTFB:

1. 客户端和服务器之间的网络条件差
2. 要么，服务器端程序响应很慢

> 为了解决高 TTFB，首先去排除尽可能多的网络连接。理想情况下，在本地托管应用程序（部署在本地），并查看是否仍有一个大的 TTFB。如果有，那么需要优化应用程序针的响应速度。这可能意味着优化数据库查询，为内容的某些部分实现高速缓存，或修改 Web 服务器配置。后端可能很慢的原因有很多。您需要对您的程序进行研究，并找出不符合您预期的内容。
>
> 如果本地 TTFB 低，那么是您的客户端和服务器之间的网络问题。网络传输可能被很多种事情干扰阻碍。在客户端和服务器之间有很多点，每个都有自己的连接限制，可能会导致问题。测试减少这种情况的最简单的方法是将您的应用程序放在另一台主机上，看看 TTFB 是否改进。

### **加载缓慢**

蓝色色块占据比例很高：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/c113f313d40d4a04b86433f778b909a3.png?from=pc)

如果 Content Download (内容下载)阶段花费了很多时间，提高服务响应速度、并行下载等优化措施帮助都不大。 主要的解决方案是发送更少的字节（比如一张高质量的大图可能几 M 的大小，这时可以酌情优化一下图片的宽高/清晰度）

## **Sources 面板**

> 此章节请打开 justwe7.github.io/devtools/debug-js/get-started.html 一起食用
>
> 主要用来调试页面中的 JavaScript

## **自定义代码片段 Snippets**

> 我们经常有些 JavaScript 的代码想在控制台中调试，假如代码量多的情况下直接在 console 下写比较麻烦，或者我们经常有些代码片段(防抖、节流、获取地址栏参数等)想保存起来，每次打开 Devtools 都能获取到这些代码片段，而不用再去从笔记里面找。

如图所示，在 Sources 这个 tab 栏下，有个 Snippets 标签，在里面可以添加一些常用的代码片段。（当个小笔记本）

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/0f34295189914230bdc56608269111d1?from=pc)

## **设置断点**

### **断点的面板**

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/bccda20fc4de4e03899db9a3b469f17d.png?from=pc)

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/7e007db03ce846e4b5c16ab66467b836.png?from=pc)

### **指定位置的中断**

断点调试基本流程

找到源代码，点击要中断代码执行的位置，点击红色按钮的位置。然后再触发该方法执行，因为已知点击按钮可以触发，精准的定位到代码行就可以了:

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/eaf8c5d988384f29a6a89f7559c0fc00?from=pc)

### **全局事件中断**

假如不知道代码执行的位置，如以下场景：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/657e906a07ff4b99907f495575b1135f?from=pc)

看接口返回的列表总数应该是 20 条，但是页面到 15 条就显示到底部了

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/9311905130364a44b1130b1033d60f61.png?from=pc)

看代码写的判断条件有点问题，但从编译后的代码找到对应位置进行调试就相当于大海捞针了。想试试自己的设想的解决方式是否正确：

1. 因为列表是提拉加载，所以肯定会触发网络请求，可以在事件侦听器里面打一个 XHR 的断点
2. 然后提拉加载页面触发接口请求，如预期的，代码中断执行了。但提示找不到 sourcemap，暂时把 js 的资源映射给关掉(相关解决方式)：
3. 再次触发断点，发现可以查看到中断的代码了，因为肯定是页面中的业务代码将请求推入到执行堆栈的，所以可以在堆栈中找到对应的方法名：getVideoList
4. 点击方法名可以跳转到对应的源码，可以看到圈起来的代码和所猜想的问题代码应该是同一处
5. 回过来看下问题原因： 页面请求完新数据后直接 pageNum 自增，然后直接就用于是否结束的判断了，有点不够严谨，不如直接比对当前的列表长度与接口返回的数据总数来判断:
6. 记住要修改的代码，在这个文件开头，也就是 191.xxx.js
7. 1. 第一行先打个断点，push 方法之前再打一个断点:(如果没有再刷新一下(也不清楚为什么可能会没有))
   2. 然后刷新页面，找到刚刚想要修改的代码: 用 t.recommendList.length 替换掉 n.pageSize\*t.pageNo（前两步是为了避免 js 开始解析问题代码，先阻塞一下运行: stackoverflow）
8. 在 Ctrl + S，保存一下，然后看下页面效果，列表可以全部加载出来了:

> 在美化代码的面板中是不支持直接修改页面代码的

## **黑盒模式**

把脚本文件放入 Blackbox(黑盒)，可以忽略来自第三方库的调用堆栈

默认（不开启黑盒）：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/6b95e5ba99a7468eb66f82ecbaf0e15b.png?from=pc)

开启黑盒：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/78c97e947f324bb4a4c759c533b19ae2.png?from=pc)

- 打开方式 ①
- 打开 DevTools Settings (设置)
- 在左侧的导航菜单中，单击 Blackboxing (黑箱)
- 点击 Add pattern... (添加模式)按钮。
- 在 Pattern(模式)文本框输入您希望从调用堆栈中排除的文件名模式。DevTools 会排除该模式匹配的任何脚本。
- 在文本字段右侧的下拉菜单中，选择 Blackbox (黑箱)以执行脚本文件但是排除来自调用堆栈的调用，或选择 Disabled (禁用)来阻止文件执行。
- 点击 Add(添加) 保存
- 打开方式 ② 直接在想要忽略的堆栈信息上 blackbox script

## **DOM 断点**

查看 element 面板 DOM 断点

## **Performance 面板**

> 此章节请使用**Chrome 的隐身模式**打开 justwe7.github.io/devtools/jank/index.html 一起食用 隐身模式可以保证 Chrome 在一个相对干净的环境下运行。假如安装了许多 chrome 插件，这些插件可能会影响分析性能表现
>
> 在 Performance 面板可以查看页面加载过程中的详细信息，比如在什么时间开始做什么事情，耗时多久等等。相较于 Network 面板，不仅可以看到通过网络加载资源的信息，还能看到解析 JS、计算样式、重绘等页面加载的方方面面的信息

## **面板主要的区域划分：**

1. Controls - 开始记录，停止记录和配置记录期间捕获的信息
2. Overview - 页面性能的汇总
3. Flame Chart - [火焰图(线程面板)]。在火焰图上看到三条（绿色的有好几条）垂直的虚线：
4. 蓝线代表 DOMContentLoaded 事件
5. 绿线代表首次绘制的时间
6. 红线代表 load 事件
7. Details - 在 Flame Chart 中，选择了某一事件后，这部分会展示与这个事件相关的更多信息；如果选择了某一帧，这部分会展示与选中帧相关的信息。如果既没有选中事件也没有选中帧，则这部分会展示当前记录时间段内的相关信息。

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/53a47297307346d3a8521b68dedce30d?from=pc)

## **开始记录**

1. 首先点击控制条左边的第一个圆圈，开始记录日志
2. 等待几分钟(正常操作页面)
3. 点击 Stop 按钮，Devtools 停止录制，处理数据，然后显示性能报告

然后就会出来上图的内容

> 与台式机和笔记本电脑相比移动设备的 CPU 功率要小得多。无论何时分析页面，都使用 CPU 限制来模拟页面在移动设备上的表现。 在"开发工具"中，单击"性能"选项卡。 确保启用"屏幕截图"复选框。 单击"捕获设置"。 Capture SettingsDevTools 揭示了与如何捕获性能指标相关的设置。 对于 CPU，选择 2 倍减速。DevTools 会限制 CPU 使其速度比平时慢 2 倍

> 注意：如果想要确保它们在低端移动设备上运行良好，请将 CPU 限制设置为 20 倍减速。

### **(1)controls 控制条区域**

- 上半区域
- - Screenshots 截图：默认勾选，每一帧都会截图
  - Memory 内存消耗记录：勾选后可以看到各种内存消耗曲线
- 下面的 checkbox 区域
- - Disable javaScript samples [禁用 javaScript 示例]：减少在手机运行时系统的开销，模拟手机运行时勾选
  - Network [网络模拟]：可以模拟在 3G,4G 等网络条件下运行页面
  - Enable advanced paint instrumentation(slow) [启用高级画图检测工具(慢速)]：捕获高级画图检测工具，带来显著的性能开销
  - CPU [CPU 限制性能]：主要为了模拟底 CPU 下运行性能

### **(2)overview 总览区域**

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/8ee68cb4d1d54e0e84b49d89a809c879.png?from=pc)

#### **FPS**

绿色竖线越高，FPS 越高。 FPS 图表上的红色块(上图刚开始的部分)表示长时间帧，很可能会出现卡顿。经常打游戏肯定知道这个指标代表什么，120FPS 代表流畅（手动滑稽）

火焰图的 FPS 可以量化这项参数

> FPS（frames per second）是用来分析动画的一个主要性能指标。能保持在 60 的 FPS 的话，那么用户体验就是不错的
>
> Q: 为什么是 60fps?
>
> A: 我们的目标是保证页面要有高于每秒 60fps(帧)的刷新频率，这和目前大多数显示器的刷新率相吻合(60Hz)。如果网页动画能够做到每秒 60 帧，就会跟显示器同步刷新，达到最佳的视觉效果。这意味着，一秒之内进行 60 次重新渲染，每次重新渲染的时间不能超过 16.66 毫秒

#### **CPU**

CPU 资源。**此面积图指示消耗 CPU 资源的事件类型**。在 CPU 图表中的各种颜色与 Summary 面板里的颜色是相互对应的，Summary 面板就在 Performance 面板的下方。CPU 图表中的各种颜色代表着在这个时间段内，CPU 在各种处理上所花费的时间。如果你看到了某个处理占用了大量的时间，那么这可能就是一个可以找到性能瓶颈的线索

#### **CPU 资源面积图颜色划分:**

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/0e2d451c3ff64e3cac86b7a7a3ae9a9e?from=pc)

> 重绘是当节点需要更改外观而不会影响布局的，比如改变 color 就叫称为重绘 回流(重排)是布局或者几何属性需要改变就称为回流
>
> 重排必定会发生重绘，重绘不一定会引发重排。重排所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列重排

js 修改 dom 结构或样式 -> 计算 style -> layout(重排) -> paint(重绘) -> composite(合成)

justwe7.github.io/性能优化的相关总结

#### **NET**

每条彩色横杠表示一种资源。横杠越长，检索资源所需的时间越长。 每个横杠的浅色部分表示等待时间（从请求资源到第一个字节下载完成的时间） 深色部分表示传输时间（下载第一个和最后一个字节之间的时间）

- HTML：蓝色
- CSS：紫色
- JS：黄色
- 图片：绿色

> 感觉优化网络性能直接使用 network 面板就好了

### **(3)Flame Chart 火焰图（线程面板）**

详细的分析某些任务的详细耗时，从而定位问题

![Chrome DevTools 面板全攻略，助力你高效开发](https://p1-tt.byteimg.com/origin/pgc-image/302bdb4c2ce7413c971d9a3d6ddfbe61.png?from=pc)

#### **看到的几条虚线：**

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/12a51fa932854bbea9929595a8ae603a?from=pc)

- 蓝线代表 DOMContentLoaded 事件
- 绿线代表首次绘制的时间
- - FP(First Paint): 首次绘制
  - FCP(First Contentful Paint)： 第一次丰富内容的绘图
  - FMP(First Meaningful Paint)：第一次有意义的绘图
  - LCP(Largest Contentful Paint)： 最大区域内容绘制
- 红线代表 load 事件

> DOMContentLoaded: 就是 dom 内容加载完毕。 那什么是 dom 内容加载完毕呢？打开一个网页当输入一个 URL，页面的展示首先是空白的，然后过一会，页面会展示出内容，但是页面的有些资源比如说图片资源还无法看到，此时页面是可以正常的交互，过一段时间后，图片才完成显示在页面。从页面空白到展示出页面内容，会触发 DOMContentLoaded 事件。而这段时间就是 HTML 文档被加载和解析完成。
>
> load: 页面上所有的资源（图片，音频，视频等）被加载以后才会触发 load 事件，简单来说，页面的 load 事件会在 DOMContentLoaded 被触发之后才触发。

#### **Main**

看下主线程，Devtools 展示了主线程运行状况

- X 轴代表着时间。每个长条代表着一个 event。长条越长就代表这个 event 花费的时间越长。
- Y 轴代表了调用栈（call stack）。在栈里，上面的 event 调用了下面的 event

Google 官方文档的例子：

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/4442a00ca91843059d4310e762fa11b4.png?from=pc)

如上图：click 事件触发了 script_foot_closure.js 第 53 行的函数调用。 再看下面，Function Call 可以看到一个匿名函数被调用，然后调用 Me() 函数，然后调用 Se()，依此类推。

> DevTools 为脚本分配随机颜色。在上图中，来自一个脚本的函数调用显示为浅绿色。来自另一个脚本的调用被渲染成米色。较深的黄色表示脚本活动，而紫色的事件表示渲染活动。这些较暗的黄色和紫色事件在所有记录中都是一致的。

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/b73f5a99cb3a42539df949f4125a7ada?from=pc)

1. 在性能报告中，有很多的数据。可以通过双击，拖动等等动作来放大缩小报告范围，从各种时间段来观察分析报告
2. 在事件长条的右上角处，如果出现了红色小三角，说明这个事件是存在问题的，需要特别注意
3. 双击这个带有红色小三角的事件。在 Summary 面板会看到详细信息。注意 reveal 这个链接，双击它会让高亮触发这个事件的 event。如果点击了 app.js:94 这个链接，就会跳转到对应的代码处

### **(4)Details 区域**

一般要配合 Flame Chart 一起使用

- Summary 区域是一个饼状图总览，汇总了各个事件类型所耗费的总时长，另外还有三个查看选项：
- Bottom-Up 选项卡：要查看直接花费最多时间的活动时使用
- Call Tree 选项卡：想查看导致最多工作的根活动时使用
- Event Log 选项卡：想要按记录期间的活动顺序查看活动时使用

# **window.performance 对象**

> Performance 接口可以获取到当前页面中与性能相关的信息。它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。
>
> 实质上来说 performance 对象就是专门用于性能监测的对象，内置了几乎所有常用前端需要的性能参数监控

## **几个实用的 API**

### **performance.now()方法**

performance.now() 返回 performance.navigationStart 至当前的毫秒数。performance.navigationStart 是下文将介绍到的可以说是浏览器访问最初的时间测量点。

值得注意的两点：

- 测量初始点是浏览器访问最初测量点，或者理解为在地址栏输入 URL 后按回车的那一瞬间。
- 返回值是毫秒数，但带有精准的多位小数。

用 performance.now()检测 js 代码的执行时间(毫秒):

```
  var st = performance.now();
  console.log(Array(9999999).fill(null).filter(v => !v).length);
  var end = performance.now();
  console.log(`取值时间${end - st}ms`); // 取值时间 558.7849999992759ms
```

### **performance.navigation**

performance.navigation 负责纪录用户行为信息，只有两个属性:

- redirectCount
- - 如果有重定向的话，页面通过几次重定向跳转而来
- type
- - type 的值：
  - 0 即 TYPE_NAVIGATENEXT 正常进入页面（非刷新、非重定向等)
  - 1 即 TYPE_RELOAD 通过 window.location.reload()刷新的页面
  - 2 即 TYPE_BACK_FORWARD 通过浏览器的前进后退按钮进入的页面（历史记录）
  - 255 即 TYPE_UNDEFINED 非以上方式进入的页面

```
  console.log(performance.navigation); // PerformanceNavigation {type: 1, redirectCount: 0}
```

### **performance.timing**

timing 内包含了几乎所有时序的时间节点

可以通过此字段来统计页面相关事件的发生时长：

```
function getTiming() {
  try {
    var timing = performance.timing;
    var timingObj = {};
    var loadTime = (timing.loadEventEnd - timing.loadEventStart) / 1000;
    if(loadTime < 0) {
      setTimeout(function() {
        getTiming();
      }, 0);
      return;
    }
    timingObj['重定向时间'] = (timing.redirectEnd - timing.redirectStart);
    timingObj['DNS 解析时间'] = (timing.domainLookupEnd - timing.domainLookupStart);
    timingObj['TCP 完成握手时间'] = (timing.connectEnd - timing.connectStart);
    timingObj['HTTP 请求响应完成时间'] = (timing.responseEnd - timing.requestStart);
    timingObj['DOM 开始加载前所花费时间'] = (timing.responseEnd - timing.navigationStart);
    timingObj['DOM 加载完成时间'] = ((timing.domComplete || timing.domLoading) - timing.domLoading);
    timingObj['DOM 结构解析完成时间'] = (timing.domInteractive - timing.domLoading);
    timingObj['总体网络交互耗时，即开始跳转到服务器资源下载完成时间'] = (timing.responseEnd - timing.navigationStart);
    timingObj['可交互的时间'] = (timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart);
    timingObj['首次出现内容'] = (timing.domLoading - timing.navigationStart);
    timingObj['onload 事件时间'] = (timing.loadEventEnd - timing.loadEventStart);
    timingObj['页面完全加载时间'] = (timingObj['重定向时间'] + timingObj['DNS 解析时间'] + timingObj['TCP 完成握手时间'] + timingObj['HTTP 请求响应完成时间'] + timingObj['DOM 结构解析完成时间'] + timingObj['DOM 加载完成时间']);
    for(item in timingObj) {
      console.log(item + ":" + timingObj[item] + '(ms)');
    }
    console.log(performance.timing);
  } catch(e) {
    console.log(performance.timing);
  }
}
window.onload = getTiming
```

### **performance.memory**

用于显示当前的内存占用情况

```
console.log(performance.memory)
/* {
  jsHeapSizeLimit: 4294705152,
  totalJSHeapSize: 13841857,
  usedJSHeapSize: 12417637
} */
```

- usedJSHeapSize 表示：JS 对象（包括 V8 引擎内部对象）占用的内存数
- totalJSHeapSize 表示：可使用的内存
- jsHeapSizeLimit 表示：内存大小限制

> 通常，usedJSHeapSize 不能大于 totalJSHeapSize，如果大于，有可能出现了内存泄漏。

### **performance.getEntries()**

浏览器获取网页时，会对网页中每一个对象（脚本文件、样式表、图片文件等等）发出一个 HTTP 请求。performance.getEntries 方法以数组形式，返回一个 PerformanceEntry 列表，这些请求的时间统计信息，有多少个请求，返回数组就会有多少个成员

- name：资源的链接
- duration: 资源的总耗时（包括等待时长，请求时长，响应时长 相当于 responseEnd - startTime）
- entryType: 资源类型，entryType 类型不同数组中的对象结构也不同:

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/aa79b856d2cf47e0a02af8c859be63dc?from=pc)

- initiatorType: 如何发起的请求,初始类型（注意这个类型并不准确，例如在 css 中的图片资源会这个值显示 css，所以还是推荐用 name 中的后缀名）

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/b6ac68416e954d83a0a6ec0840cfe9c1?from=pc)

### **performance.getEntriesByType()**

方法返回给定类型的 getEntries 列表打开页面（justwe7.github.io/devtools/network/queue.html）

> 这段代码可以在 DevTools 控制台中运行。它将使用 Resource Timing API(资源时序 API)来检索所有资源。然后它过滤条目，查找包含 logo-1024px.png 名称的条目。如果找到，会返回相关信息。

```
performance
  .getEntriesByType('resource')
  .filter(item => item.name.includes('logo-1024px.png'))
```

注意:返回资源的 connectEnd 等相关字段不是 Unix 时间戳，而是 DOMHighResTimeStamp。 MDN PerformanceResourceTiming

> DOMHighResTimeStamp 是一个 double 类型，用于存储时间值。该值可以是离散的时间点或两个离散时间点之间的时间差。T 单位为毫秒 ms (milliseconds) ，应准确至 5 微妙 µs (microseconds)。但是，如果浏览器无法提供准确到 5 微秒的时间值(例如,由于硬件或软件的限制), 浏览器可以以毫秒为单位的精确到毫秒的时间表示该值

### **Lighthouse(Audits) 面板**

> 来自 Google 的描述： Lighthouse 是一个开源的自动化工具，用于改进网络应用的质量。 您可以将其作为一个 Chrome 扩展程序运行，或从命令行运行。 您为 Lighthouse 提供一个您要审查的网址，它将针对此页面运行一连串的测试，然后生成一个有关页面性能的报告
>
> 会对页面的加载进行分析，然后给出提高页面性能的建议

懒人专用

![Chrome DevTools 面板全攻略，助力你高效开发](https://p6-tt.byteimg.com/origin/pgc-image/5df50c0d93c940c086a8bf80b44466a0?from=pc)

有 5 个指标:

- Performance 性能
- accessibility 无障碍使用
- Best Practice 用户体验
- SEO SEO 优化
- Progressive Web App 也对于 PWA 的兼容性

### **Security 面板**

> 用于检测当面页面的安全性

该面板可以区分两种类型的不安全的页面：

- 如果被请求的页面通过 HTTP 提供服务，那么这个主源就会被标记为不安全。
- 如果被请求的页面是通过 HTTPS 获取的，但这个页面接着通过 HTTP 继续从其他来源检索内容，那么这个页面仍然被标记为不安全。这就是所谓的混合内容页面,混合内容页面只是部分受到保护,因为 HTTP 内容(非加密的内容通信使用明文)可能会被窃听,容易受到中间人攻击。如 163，虽然证书是有效的，但是页面有一部分 http 资源：

## **Command 终极大招**

在控制台打开的状态下， 组合按键 Ctrl + Shift + P / Command + Shift + P 打开“命令”菜单，接下来就可以为所欲为了~

## **截图**

当你只想对一个特定的 DOM 节点进行截图时，可能需要使用其他工具操作好久，使用控制台可以直接选中想要截图的节点，打开 Command 菜单并且使用 节点截图 就可以了

- 截取特定节点： Screenshot Capture node screenshot
- 全屏截图： Screenshot Capture full size screenshot

## **CSS/JS 覆盖率**

- 打开调试面板，通过命令菜单输入 Show Coverage 调出面板
- 点击 reload 按钮开始检测
- 点击相应文件即可查看具体的覆盖情况（蓝色的为用到的代码，红色表示没有用到的代码）

## **媒体查询**

媒体查询是自适应网页设计的基本部分。 在 Chrome Devtools 中的设备模式下，在三圆点菜单点击, Show Media queries 即可启用：

> 右键点击某个条形，查看媒体查询在 CSS 中何处定义并跳到源代码中的定义

![Chrome DevTools 面板全攻略，助力你高效开发](https://p3-tt.byteimg.com/origin/pgc-image/3c436120575a44199cd52c55365a0d3e?from=pc)

作者：李华西
