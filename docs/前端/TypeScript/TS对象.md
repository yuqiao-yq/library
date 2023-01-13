---
title: TS对象
order: 6
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /TypeScript
  title: TypeScript
  order: 4
---

## 内置对象

JavaScript 中有很多[内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它们可以直接在 TypeScript 中当做定义好了的类型。

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

### ECMAScript 的内置对象

ECMAScript 标准提供的内置对象有：

`Boolean`、`Error`、`Date`、`RegExp` 等。

我们可以在 TypeScript 中将变量定义为这些类型：

```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

更多的内置对象，可以查看 [MDN 的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)。

而他们的定义文件，则在 [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中。

### DOM 和 BOM 的内置对象

DOM 和 BOM 提供的内置对象有：

`Document`、`HTMLElement`、`Event`、`NodeList` 等。

TypeScript 中会经常用到这些类型：

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function (e: MouseEvent) {
  // Do something
});
```

它们的定义文件同样在 [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中。

### TypeScript 核心库的定义文件

[TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。

当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了，比如：

```ts
Math.pow(10, '2');

// index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

上面的例子中，`Math.pow` 必须接受两个 `number` 类型的参数。事实上 `Math.pow` 的类型定义如下：

```ts
interface Math {
  /**
   * Returns the value of a base expression taken to a specified power.
   * @param x The base value of the expression.
   * @param y The exponent value of the expression.
   */
  pow(x: number, y: number): number;
}
```

再举一个 DOM 中的例子：

```ts
document.addEventListener('click', function (e) {
  console.log(e.targetCurrent);
});

// index.ts(2,17): error TS2339: Property 'targetCurrent' does not exist on type 'MouseEvent'.
```

上面的例子中，`addEventListener` 方法是在 TypeScript 核心库中定义的：

```ts
interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
  addEventListener(type: string, listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
}
```

所以 `e` 被推断成了 `MouseEvent`，而 `MouseEvent` 是没有 `targetCurrent` 属性的，所以报错了。

注意，TypeScript 核心库的定义中不包含 Node.js 部分。

### 用 TypeScript 写 Node.js

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```bash
npm install @types/node --save-dev
```

## `Number`

Number 对象是原始数值的包装对象

```ts
var num = new Number(value);

// 如果一个参数值不能转换为一个数字将返回 NaN (非数字值)。
```

### `Number` 对象属性

下表列出了 Number 对象支持的属性：

| 序号 | 属性 & 描述 |
| :-: | :-: |
| 1. | **`MAX_VALUE`** 可表示的最大的数，MAX_VALUE 属性值接近于 1.79E+308。大于 MAX_VALUE 的值代表 "Infinity"。 |
| 2. | **`MIN_VALUE`** 可表示的最小的数，即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE，MIN_VALUE 的值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。 |
| 3. | **`NaN`**非数字值（Not-A-Number）。 |
| 4. | **`NEGATIVE_INFINITY`** 负无穷大，溢出时返回该值。该值小于 MIN_VALUE。 |
| 5. | **`POSITIVE_INFINITY`** 正无穷大，溢出时返回该值。该值大于 MAX_VALUE。 |
| 6. | **`prototype`** Number 对象的静态属性。可以向对象添加属性和方法。 |
| 7. | **`constructor`** 返回对创建此对象的 Number 函数的引用。 |

### `Number` 对象方法

Number 对象 支持以下方法：

| 序号 | 方法 & 描述 | 实例 |
| :-: | :-: | :-: |
| 1. | `toExponential()`把对象的值转换为指数计数法。 | `//toExponential() var num1 = 1225.30 var val = num1.toExponential(); console.log(val) // 输出： 1.2253e+3` |
| 2. | `toFixed()`把数字转换为字符串，并对小数点指定位数。 | `var num3 = 177.234 console.log("num3.toFixed() 为 "+num3.toFixed()) // 输出：177 console.log("num3.toFixed(2) 为 "+num3.toFixed(2)) // 输出：177.23 console.log("num3.toFixed(6) 为 "+num3.toFixed(6)) // 输出：177.234000` |
| 3. | `toLocaleString()`把数字转换为字符串，使用本地数字格式顺序。 | `var num = new Number(177.1234); console.log( num.toLocaleString()); // 输出：177.1234` |
| 4. | `toPrecision()`把数字格式化为指定的长度。 | `var num = new Number(7.123456); console.log(num.toPrecision()); // 输出：7.123456 console.log(num.toPrecision(1)); // 输出：7 console.log(num.toPrecision(2)); // 输出：7.1` |
| 5. | `toString()`把数字转换为字符串，使用指定的基数。数字的基数是 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。 | `var num = new Number(10); console.log(num.toString()); // 输出10进制：10 console.log(num.toString(2)); // 输出2进制：1010 console.log(num.toString(8)); // 输出8进制：12` |
| 6. | `valueOf()`返回一个 Number 对象的原始数字值。 | `var num = new Number(10); console.log(num.valueOf()); // 输出：10` |

## `String`

```ts
var txt = new String("string");
或者更简单方式：
var txt = "string";
```

### `String` 对象属性

下表列出了 String 对象支持的属性：

| 序号 | 属性 & 描述 | 实例 |
| :-: | :-: | :-: |
| 1. | constructor 对创建该对象的函数的引用。 | `var str = new String( "This is string" ); console.log("str.constructor is:" + str.constructor)`输出结果：`str.constructor is:function String() { [native code] }` |
| 2. | length 返回字符串的长度。 | `var uname = new String("Hello World") console.log("Length "+uname.length) // 输出 11` |
| 3. | prototype 允许您向对象添加属性和方法。 | `function employee(id:number,name:string) { this.id = id this.name = name } var emp = new employee(123,"admin") employee.prototype.email="admin@runoob.com" // 添加属性 email console.log("员工号: "+emp.id) console.log("员工姓名: "+emp.name) console.log("员工邮箱: "+emp.email)` |

### `String` 方法

同 JS

下表列出了 String 对象支持的方法：

| 序号 | 方法 & 描述 | 实例 |
| :-: | :-: | :-: |
| 1. | `charAt()`返回在指定位置的字符。 | `var str = new String("RUNOOB"); console.log("str.charAt(0) 为:" + str.charAt(0)); // R console.log("str.charAt(1) 为:" + str.charAt(1)); // U console.log("str.charAt(2) 为:" + str.charAt(2)); // N console.log("str.charAt(3) 为:" + str.charAt(3)); // O console.log("str.charAt(4) 为:" + str.charAt(4)); // O console.log("str.charAt(5) 为:" + str.charAt(5)); // B` |
| 2. | `charCodeAt()`返回在指定的位置的字符的 Unicode 编码。 | `var str = new String("RUNOOB"); console.log("str.charCodeAt(0) 为:" + str.charCodeAt(0)); // 82 console.log("str.charCodeAt(1) 为:" + str.charCodeAt(1)); // 85 console.log("str.charCodeAt(2) 为:" + str.charCodeAt(2)); // 78 console.log("str.charCodeAt(3) 为:" + str.charCodeAt(3)); // 79 console.log("str.charCodeAt(4) 为:" + str.charCodeAt(4)); // 79 console.log("str.charCodeAt(5) 为:" + str.charCodeAt(5)); // 66` |
| 3. | `concat()`连接两个或更多字符串，并返回新的字符串。 | `var str1 = new String( "RUNOOB" ); var str2 = new String( "GOOGLE" ); var str3 = str1.concat( str2 ); console.log("str1 + str2 : "+str3) // RUNOOBGOOGLE` |
| 4. | `indexOf()`返回某个指定的字符串值在字符串中首次出现的位置。 | `var str1 = new String( "RUNOOB" ); var index = str1.indexOf( "OO" ); console.log("查找的字符串位置 :" + index ); // 3` |
| 5. | `lastIndexOf()`从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。 | `var str1 = new String( "This is string one and again string" ); var index = str1.lastIndexOf( "string" ); console.log("lastIndexOf 查找到的最后字符串位置 :" + index ); // 29 index = str1.lastIndexOf( "one" ); console.log("lastIndexOf 查找到的最后字符串位置 :" + index ); // 15` |
| 6. | `localeCompare()`用本地特定的顺序来比较两个字符串。 | `var str1 = new String( "This is beautiful string" ); var index = str1.localeCompare( "This is beautiful string"); console.log("localeCompare first :" + index ); // 0` |
| 7. | **`match()`**查找找到一个或多个正则表达式的匹配。 | `var str="The rain in SPAIN stays mainly in the plain"; var n=str.match(/ain/g); // ain,ain,ain` |
| 8. | `replace()`替换与正则表达式匹配的子串 | `var re = /(\w+)\s(\w+)/; var str = "zara ali"; var newstr = str.replace(re, "$2, $1"); console.log(newstr); // ali, zara` |
| 9. | `search()`检索与正则表达式相匹配的值 | `var re = /apples/gi; var str = "Apples are round, and apples are juicy."; if (str.search(re) == -1 ) { console.log("Does not contain Apples" ); } else { console.log("Contains Apples" ); } ` |
| 10. | `slice()`提取字符串的片断，并在新的字符串中返回被提取的部分。 |  |
| 11. | `split()`把字符串分割为子字符串数组。 | `var str = "Apples are round, and apples are juicy."; var splitted = str.split(" ", 3); console.log(splitted) // [ 'Apples', 'are', 'round,' ]` |
| 12. | `substr()`从起始索引号提取字符串中指定数目的字符。 |  |
| 13. | `substring()`提取字符串中两个指定的索引号之间的字符。 | `var str = "RUNOOB GOOGLE TAOBAO FACEBOOK"; console.log("(1,2): " + str.substring(1,2)); // U console.log("(0,10): " + str.substring(0, 10)); // RUNOOB GOO console.log("(5): " + str.substring(5)); // B GOOGLE TAOBAO FACEBOOK` |
| 14. | `toLocaleLowerCase()`根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射。 | `var str = "Runoob Google"; console.log(str.toLocaleLowerCase( )); // runoob google` |
| 15. | `toLocaleUpperCase()`据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射。 | `var str = "Runoob Google"; console.log(str.toLocaleUpperCase( )); // RUNOOB GOOGLE` |
| 16. | `toLowerCase()`把字符串转换为小写。 | `var str = "Runoob Google"; console.log(str.toLowerCase( )); // runoob google` |
| 17. | `toString()`返回字符串。 | `var str = "Runoob"; console.log(str.toString( )); // Runoob` |
| 18. | `toUpperCase()`把字符串转换为大写。 | `var str = "Runoob Google"; console.log(str.toUpperCase( )); // RUNOOB GOOGLE` |
| 19. | `valueOf()`返回指定字符串对象的原始值。 | `var str = new String("Runoob"); console.log(str.valueOf( )); // Runoob` |

## `Array`

同 JS 的数组

## `Map`

### 创建 Map

TypeScript 使用 Map 类型和 new 关键字来创建 Map：

```ts
let myMap = new Map();
```

初始化 Map，可以以数组的格式来传入键值对：

```ts
let myMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
```

### Map 相关的函数与属性：

- **map.clear()** – 移除 Map 对象的所有键/值对 。
- **map.set()** – 设置键值对，返回该 Map 对象。
- **map.get()** – 返回键对应的值，如果不存在，则返回 undefined。
- **map.has()** – 返回一个布尔值，用于判断 Map 中是否包含键对应的值。
- **map.delete()** – 删除 Map 中的元素，删除成功返回 true，失败返回 false。
- **map.size** – 返回 Map 对象键/值对的数量。
- **map.keys()** - 返回一个 Iterator 对象， 包含了 Map 对象中每个元素的键 。
- **map.values()** – 返回一个新的 Iterator 对象，包含了 Map 对象中每个元素的值 。

```ts
let nameSiteMapping = new Map();

// 设置 Map 对象
nameSiteMapping.set('Google', 1);
nameSiteMapping.set('Runoob', 2);
nameSiteMapping.set('Taobao', 3);

// 获取键对应的值
console.log(nameSiteMapping.get('Runoob')); // 2

// 判断 Map 中是否包含键对应的值
console.log(nameSiteMapping.has('Taobao')); // true
console.log(nameSiteMapping.has('Zhihu')); // false

// 返回 Map 对象键/值对的数量
console.log(nameSiteMapping.size); // 3

// 删除 Runoob
console.log(nameSiteMapping.delete('Runoob')); // true
console.log(nameSiteMapping); // Map { 'Google' => 1, 'Taobao' => 3 }
// 移除 Map 对象的所有键/值对
nameSiteMapping.clear(); // 清除 Map
console.log(nameSiteMapping); // Map {}
```

使用 **es6** 编译：

```apl
tsc --target es6 test.ts
```

### 迭代 Map

Map 对象中的元素是按顺序插入的，我们可以迭代 Map 对象，每一次迭代返回 [key, value] 数组。

TypeScript 使用 **`for...of`** 来实现迭代：

```ts
// 实例 -test.ts 文件
let nameSiteMapping = new Map();

nameSiteMapping.set('Google', 1);
nameSiteMapping.set('Runoob', 2);
nameSiteMapping.set('Taobao', 3);

// 迭代 Map 中的 key
for (let key of nameSiteMapping.keys()) {
  console.log(key);
}

// 迭代 Map 中的 value
for (let value of nameSiteMapping.values()) {
  console.log(value);
}

// 迭代 Map 中的 key => value
for (let entry of nameSiteMapping.entries()) {
  console.log(entry[0], entry[1]);
}

// 使用对象解析
for (let [key, value] of nameSiteMapping) {
  console.log(key, value);
}
```

使用 **es6** 编译：

```apl
tsc --target es6 test.ts
```
