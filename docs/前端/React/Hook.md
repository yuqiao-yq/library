---
title: Hook
order: 7
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

钩子函数只应该放在 React 函数的顶层代码中使用，不能放在条件语句、循环或者嵌套函数中。

## 1 `useState()`

声明状态、更改状态

```Ts
// useState 写在函数的最外层，不能写在ifelse等条件语句当中，来确保hooks的执行顺序一致
import React, { useState } from 'react';

export default Child = () => {
  const [state, setState] = useState('initialValue')
  const [num, setNum] = useState<number>(0)

  return (
  	<>
    	<div onClick={setState(num => num++)}>
    		{num}
    	</div>
    </>
  )
}
```

## 2 `useEffect()`

生命周期、监听 `useEffect`相当于是在渲染之后调用的一个函数。

```TS
//
import React, { useEffect, useState } from 'react';

export default Child = () => {
  const [state, setState] = useState('initialValue')
  const [num, setNum] = useState<number>(0)

  useEffect( () => {
    // 第二个参数传一个空数组[]时，就相当于只在首次渲染的时候执行；
  }, [])

    useEffect( () => {
    // 第二个参数不写时，没有依赖数组，就每次组件渲染的时候都会执行；
  })

  useEffect( () => {
    // 第二个参数传一个非空数组[]时（可以一项或多项)，在首次渲染的时候执行，且每次该数组中的某一个依赖项发生改变时也会执行；
  }, [num])

  useEffect( () => {
    let timer = setInterval(()=>{
			setCount(count => count+1 )
		},1000)

    //  effect可选清除机制：useEffect()允许返回一个函数，在组件卸载时，执行该函数，清理副效应。
    // 每个 effect 都可以返回一个清除函数。React 会在组件卸载的时候执行清除操作,React 会在执行当前 effect 之前对上一个 effect 进行清除。
	return ()=>{
		clearInterval(timer)
	}
  }, [num])

  return (
  	<>
    	<div onClick={setState(num => num++)}>
    		{num}
    	</div>
    </>
  )
}
```

注意事项：如果有多个副效应且依赖项不同，应该调用多个 `useEffect()`，而不应该合并写在一起。

## 3 `useRef()`

获取 html 结构中的某个元素

```Ts
//
import React, { useRef } from 'react';

const Child = () => {
  const myRef1 = useRef(null);
  // const myRef2 = useRef(null);
  const myRef2 = useRef<HTMLInputElement | null>(null);

  return (
    <>
  		<div ref={myRef1}></div>
    	<input ref={myRef2}></input>
    </>
  )
}
```

## 4 `useReducer()`

`reducer`是一个利用 `action`提供的信息，将 `state`从 A 转换到 B 的一个纯函数;

` const [state, dispatch] = useReducer(reducer, initState)`

[useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)接收两个参数：

第一个参数：reducer 函数。第二个参数：初始化的 state。返回值为最新的 state 和 dispatch 函数（用来触发 reducer 函数，计算对应的 state）。

- 如果页面 `state`很简单，可以直接使用 `useState`;
- 如果页面 `state`比较复杂（state 是一个对象或者 state 非常多散落在各处）请使用 `userReducer`;
- 如果页面组件层级比较深，并且需要子组件触发 `state`的变化，可以考虑 `useReducer` + `useContext`

### （1）`useReducer`中的 `state`

#### `state`是一个基础数据类型时

```Ts
//例子：计算器reducer，根据state（当前状态）和action（触发的动作加、减）参数，计算返回newState
function countReducer(state, action) {
    switch(action.type) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        default:
            return state;
    }
}

```

#### `state`是一个复杂的 JavaScript 对象时

```Ts
// 返回一个 newState (newObject)
function countReducer(state, action) {
    switch(action.type) {
        case 'add':
            return { ...state, count: state.count + 1; }
        case 'sub':
            return { ...state, count: state.count - 1; }
        default:
            return count;
    }
}

```

#### 注意事项:

1. `reducer`处理的 `state`对象必须是 `immutable`，这意味着永远不要直接修改参数中的 state 对象，reducer 函数应该每次都返回一个新的 state object;
2. 既然 `reducer`要求每次都返回一个新的对象，我们可以使用 ES6 中的[解构赋值方式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)去创建一个新对象，并复写我们需要改变的 state 属性;

###### state 为什么需要 immutable？

- `reducer`的幂等性

`reducer`需要保持幂等性，更加可预测、可测试。如果每次返回同一个 `state`，就无法保证无论执行多少次都是相同的结果;

- React 中的 state 比较方案

React 在比较 `oldState`和 `newState`的时候是使用 `Object.is()`函数，如果是同一个对象则不会出发组件的 rerender。

### （2）`useReducer`中的 `action`

action 用来表示触发的行为。

1. 用 `type`来表示具体的行为类型(登录、登出、添加用户、删除用户等)
2. 用 `payload`携带的数据（如增加书籍，可以携带具体的 book 信息），我们用上面 addBook 的 action 为例

```TS
const action = {
    type: 'addBook',
    payload: {
        book: {
            bookId,
            bookName,
            author,
        }
    }
}
function bookReducer(state, action) {
    switch(action.type) {
        // 添加一本书
        case 'addBook':
            const { book } = action.payload;
            return {
                ...state,
                books: {
                    ...state.books,
                    [book.bookId]: book,
                }
            };
        case 'sub':
            // ....
        default:
            return state;
    }
}

```

### (3) 简单 state 使用实例

```TS
 // 官方 useReducer Demo

 // 第一个参数：state的reducer处理函数
 function reducer(state, action) {
     switch (action.type) {
         case 'increment':
           return {count: state.count + 1};
         case 'decrement':
            return {count: state.count - 1};
         default:
             throw new Error();
     }
 // 第二个参数：应用的初始化
 const initialState = {count: 0}

 function Counter() {
     // 返回值：最新的state和dispatch函数
     const [state, dispatch] = useReducer(reducer, initialState);
     return (
         <>
             // useReducer会根据dispatch的action，返回最终的state，并触发rerender
             Count: {state.count}
             // dispatch 用来接收一个 action参数「reducer中的action」，用来触发reducer函数，更新最新的状态
             <button onClick={() => dispatch({type: 'increment'})}>+</button>
             <button onClick={() => dispatch({type: 'decrement'})}>-</button>
         </>
     );
 }

```

### (4) 复杂 state 使用实例

```TS
// 登录实例
const initState = {
     name: '',
     pwd: '',
     isLoading: false,
     error: '',
     isLoggedIn: false,
 }

 function loginReducer(state, action) {
     switch(action.type) {
         case 'login':
             return {
                 ...state,
                 isLoading: true,
                 error: '',
             }
         case 'success':
             return {
                 ...state,
                 isLoggedIn: true,
                 isLoading: false,
             }
         case 'error':
             return {
                 ...state,
                 error: action.payload.error,
                 name: '',
                 pwd: '',
                 isLoading: false,
             }
         default:
             return state;
     }
 }

 function LoginPage() {
     const [state, dispatch] = useReducer(loginReducer, initState);
     const { name, pwd, isLoading, error, isLoggedIn } = state;
     const login = (event) => {
         event.preventDefault();
         dispatch({ type: 'login' });
         login({ name, pwd })
             .then(() => {
                 dispatch({ type: 'success' });
             })
             .catch((error) => {
                 dispatch({
                     type: 'error'
                     payload: { error: error.message }
                 });
             });
     }
     return (
         //  返回页面JSX Element
     )
 }

```

### (5) `useReducer()`+`useContext()`

`Context`的作用就是对它所包含的组件树提供全局共享数据的一种技术;

```TS
// 官方Demo

// 第一步：创建需要共享的context
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 第二步：使用 Provider 提供 ThemeContext 的值，Provider所包含的子树都可以直接访问ThemeContext的值
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
// Toolbar 组件并不需要透传 ThemeContext
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton(props) {
  // 第三步：使用共享 Context
  const theme = useContext(ThemeContext);
  render() {
    return <Button theme={theme} />;
  }
}

```

当 Context Provider 的 value 发生变化是，他的所有子级消费者都会 rerender

```TS
// useContext版login

// 定义初始化值
const initState = {
    name: '',
    pwd: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
}
// 定义state[业务]处理逻辑 reducer函数
function loginReducer(state, action) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                isLoading: true,
                error: '',
            }
        case 'success':
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
            }
        case 'error':
            return {
                ...state,
                error: action.payload.error,
                name: '',
                pwd: '',
                isLoading: false,
            }
        default:
            return state;
    }
}
// 定义 context函数
const LoginContext = React.createContext();
function LoginPage() {
    const [state, dispatch] = useReducer(loginReducer, initState);
    const { name, pwd, isLoading, error, isLoggedIn } = state;
    const login = (event) => {
        event.preventDefault();
        dispatch({ type: 'login' });
        login({ name, pwd })
            .then(() => {
                dispatch({ type: 'success' });
            })
            .catch((error) => {
                dispatch({
                    type: 'error'
                    payload: { error: error.message }
                });
            });
    }
    // 利用 context 共享dispatch
    return (
        <LoginContext.Provider value={{dispatch}}>
            <...>
            <LoginButton />
        </LoginContext.Provider>
    )
}
function LoginButton() {
    // 子组件中直接通过context拿到dispatch，出发reducer操作state
    const dispatch = useContext(LoginContext);
    const click = () => {
        if (error) {
            // 子组件可以直接 dispatch action
            dispatch({
                type: 'error'
                payload: { error: error.message }
            });
        }
    }
}

```

`useReducer`结合 `useContext`，通过 `context`把 `dispatch`函数提供给组件树中的所有组件使用，而不用通过 `props`添加回调函数的方式一层层传递

**使用 Context 相比回调函数的优势:**

对比回调函数的自定义命名，`Context`的 Api 更加明确，我们可以更清晰的知道哪些组件使用了 dispatch、应用中的数据流动和变化。这也是 React 一直以来单向数据流的优势。

更好的性能：如果使用回调函数作为参数传递的话，因为每次 render 函数都会变化，也会导致子组件 rerender。当然我们可以使用 `useCallback`解决这个问题，但相比 `useCallback`,React 官方更推荐使用 `useReducer`，因为 React 会保证 dispatch 始终是不变的，不会引起 consumer 组件的 rerender。

## 5 `useMemo()`

`useMemo`和 `useCallback`都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个 `hooks`都返回缓存的值，`useMemo`返回缓存的变量，`useCallback`返回缓存的函数。

```TS
// 不使用useMemo
import React from 'react';

export default function WithoutMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');

    function expensive() {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }

    return <div>
        <h4>{count}-{val}-{expensive()}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}

// 这里创建了两个state，然后通过expensive函数，执行一次昂贵的计算，拿到count对应的某个值。我们可以看到：无论是修改count还是val，由于组件的重新渲染，都会触发expensive的执行(能够在控制台看到，即使修改val，也会打印)；但是这里的昂贵计算只依赖于count的值，在val修改的时候，是没有必要再次计算的。在这种情况下，我们就可以使用useMemo，只在count的值修改时，执行expensive计算：
```

```TS
// 使用useMemo
export default function WithMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    const expensive = useMemo(() => {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);

    return <div>
        <h4>{count}-{expensive}</h4>
        {val}
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}

// 使用useMemo来执行昂贵的计算，然后将计算值返回，并且将count作为依赖值传递进去。这样，就只会在count改变的时候触发expensive执行，在修改val的时候，返回上一次缓存的值。
```

## 6 `useCallback()`

useCallback 跟 useMemo 比较类似，但它返回的是缓存的函数。

```TS
import React, { useState, useCallback } from 'react';

const set = new Set();

export default function Callback() {
    const [count, setCount] = useState(1);
    const [val, setVal] = useState('');

    const callback = useCallback(() => {
        console.log(count);
    }, [count]);
    set.add(callback);


    return <div>
        <h4>{count}</h4>
        <h4>{set.size}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <input value={val} onChange={event => setVal(event.target.value)}/>
        </div>
    </div>;
}

// 每次修改count，set.size就会+1，这说明useCallback依赖变量count，count变更时会返回新的函数；而val变更时，set.size不会变，说明返回的是缓存的旧版本函数。
```

使用场景是：有一个父组件，其中包含子组件，子组件接收一个函数作为 props；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助 useCallback 来返回函数，然后把这个函数作为 props 传递给子组件；这样，子组件就能避免不必要的更新。

```TS
import React, { useState, useCallback, useEffect } from 'react';
function Parent() {
    const [count, setCount] = useState(1);
    const [val, setVal] = useState('');

    const callback = useCallback(() => {
        return count;
    }, [count]);
    return <div>
        <h4>{count}</h4>
        <Child callback={callback}/>
        <div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <input value={val} onChange={event => setVal(event.target.value)}/>
        </div>
    </div>;
}

function Child({ callback }) {
    const [count, setCount] = useState(() => callback());
    useEffect(() => {
        setCount(callback());
    }, [callback]);
    return <div>
        {count}
    </div>
}
```

`useEffect`、`useMemo`、`useCallback`都是自带闭包的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，所以每一次这三种 hooks 的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用 ref 来访问。

## 7 `useLayoutEffect()`

`useLayoutEffect`和 `useEffect`非常的相似,只有一点区别:

- `useEffect`是异步执行的,会在渲染的内容更新到 DOM 上后执行,不会阻塞 DOM 的更新;
- `useLayoutEffect`是同步执行的,会在渲染的内容更新到 DOM 上之前进行,会阻塞 DOM 的更新;

组件可能需要在浏览器开始绘制之前就知道窗口的宽高，或者跟踪鼠标的位置，于是需要 `useLayoutEffect`

```TS
// 例子
import React, { useEffect, useLayoutEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [state, setState] = useState("hello world")

  useEffect(() => {
    let i = 0;
    while(i <= 100000000) {
      i++;
    };
    setState("world hello");
  }, []);

  // useLayoutEffect(() => {
  //   let i = 0;
  //   while(i <= 100000000) {
  //     i++;
  //   };
  //   setState("world hello");
  // }, []);

  return (
    <>
      <div>{state}</div>
    </>
  );
}

export default App;

// 换成 useLayoutEffect 之后闪烁现象就消失了
```

也正是因为 `useLayoutEffect` 可能会导致渲染结果不一样的关系，如果你在 ssr 的时候使用这个函数会有一个 warning

```Ts
Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.

```

这是因为 useLayoutEffect 是不会在服务端执行的，所以就有可能导致 ssr 渲染出来的内容和实际的首屏内容并不一致。而解决这个问题也很简单：

放弃使用 useLayoutEffect，使用 useEffect 代替如果你明确知道 useLayouteffect 对于首屏渲染并没有影响，但是后续会需要，你可以这样写

```TS
import { useEffect, useLayoutEffect } from 'react';
export const useCustomLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
// 当你使用 useLayoutEffect 的时候就用 useCustomLayoutEffect 代替。这样在服务端就会用 useEffect ，这样就不会报 warning 了。
```

## 8 `useContext()`

`useContext()`是用于实现兄弟组件之间传值的。

```TS
// 父组件
import React, { useContext } from "react";
const TestContext = React.createContext({});

<TestContext.Provider
	value={{
		username: 'superawesome',
	}}
>
	<div className="test">
		<Navbar />
		<Messages />
	</div>
<TestContext.Provider/>
// TestContext.Provider提供了一个Context对象，这个对象是可以被子组件共享的
```

```TS
// 子组件1
import React, { useContext } from "react";
const Navbar = () => {
	const { username } = useContext(TestContext);
	return (
		<div className="navbar">
			<p>{username}</p>
		</div>
	)
}
// useContext()钩子函数用来引入Context对象，从中获取username属性
```

```TS
// 子组件2
import React, { useContext } from "react";
const Messages = () => {
	const { username } = useContext(TestContext);
	return (
		<div className="messages">
      		<p>1 message for {username}</p>
		</div>
	)
}

```

## 9 `useImperativeHandle`

## 10 `useDebugValue`
