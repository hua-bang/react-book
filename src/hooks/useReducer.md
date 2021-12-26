---
nav:
  title: Hooks
  path: /hooks
group:
  title: Hooks
  order: 3
title: useReducer
order: 9
---

# useReducer

## 基本用法

语法：

```ts
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

类型声明

```ts
type Dispatch<A> = A => void;

export function useReducer<S, I, A>(
	reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
```

举个例子：

```tsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="app">
      <div>Count: {state.count}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button className="reset" onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </div>
  );
}

export default () => <App />;
```

**说明：**

1. 它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。（如果你熟悉 Redux 的话，就已经知道它如何工作了。）
2. 在某些场景下，`useReducer` 会比 `useState` 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。
3. 并且，使用 `useReducer` 还能给那些会触发深更新的组件做性能优化，因为[你可以向子组件传递 `dispatch` 而不是回调函数](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down) 。

> React 会确保 `dispatch` 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 `useEffect` 或 `useCallback` 的依赖列表中省略 `dispatch`。

### 指定初始 State

有两种不同初始化 `useReducer` state 的方式，你可以根据使用场景选择其中的一种。将初始 state 作为第二个参数传入 `useReducer` 是最简单的方法

```ts
const [state, dispatch] = useReducer(reducer, { count: initialCount });
```

### 惰性初始化

你可以选择惰性地创建初始 `state`。为此，需要将 `init` 函数作为 `useReducer` 的第三个参数传入，这样初始 `state` 将被设置为 `init(initialArg)`。

这么做可以将用于计算 `state` 的逻辑提取到 `reducer` 外部，这也为将来对重置 `state` 的 `action` 做处理提供了便利：

```tsx
import React, { useReducer } from 'react';

function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function App({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <div className="app">
      <div>Count: {state.count}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button
        className="reset"
        onClick={() => dispatch({ type: 'reset', payload: initialCount })}
      >
        Reset
      </button>
    </div>
  );
}

export default () => <App initialCount={0} />;
```

### 跳过 dispatch

如果 Reducer Hook 的返回值与当前 `state` 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 `Object.is` 比较算法 来比较 `state`）

需要注意的是，React 可能仍需要在跳过渲染前再次渲染该组件。不过由于 React 不会对组件树的 **深层节点** 进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 [useMemo](https://tsejx.github.io/react-guidebook/api-reference/hooks/useMemo) 来进行优化。
