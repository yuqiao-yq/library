---
title: React函数式组件传值
order: 6
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /react
  title: React
  order: 6
---

## 1.1 父传子

父组件向子组件传一个 `show`值

```Ts
// 父组件
import Child from './Child/index';
import React, { useState, useEffect } from 'react';

export default function Father() {
  const [show, setShow] = useState<boolean>(true);
  <>
    <Child showChild={ show } />
  <>
}
```

```ts
// 子组件
import React, { useEffect, useState } from 'react';

interface childProps {
  show?: boolean;
}

export default function Child(props: childProps) {
  const { show } = props;
  <>
    <p style={{ show ? display: 'block' : display: 'none'}}> This is a child</p>
  <>
}
```

## 1.2 子传父

子组件通过点击事件改变父组件中的 `show`值

```Ts
// 父组件
import Child from './Child/index';
import React, { useState, useEffect } from 'react';

export default function Father() {
  const [show, setShow] = useState<boolean>(true);
  return (
  	<>
  	  <Child
  			showChild = { show }
  			onChangeShow = {
  	        () => {
  	        	setShow(false)
  	        }
  			}
  		/>
  	</>
  )
}
```

```Ts
// 子组件
import React, { useEffect, useState } from 'react';

interface childProps {
  show?: boolean;
  onChangeShow?: () => void;
}

export default function Child(props: childProps) {
  const { showScreen, onChangeShow = () => {} } = props;
  return (
  	<>
  	  <p
  			style = {{ show ? display: 'block' : display: 'none'}}
			onClick = { () => {onChangeShow()}}
  		>
  	    This is a child
  	  </p>
  	</>
  )
}
```

## 1.3 子传子

    子 → 父 → 子
