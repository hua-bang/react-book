---
nav:
  title: Hooks
  path: /hooks
group:
  title: Hooks
  order: 3
title: useMemo
order: 4
---

# useMemo

## 基本用法

语法：

```ts
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

类型声明

```ts
export function useMemo<T>(
  create: () => T,
  deps: Array<mixed> | void | null,
): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}
```

说明：

- 把**创建函数**和**依赖项**组成参数传入`useMemo`,它仅会在某个依赖想改变时，才会重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
- 记住，传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

**你可以把 `useMemo` 作为性能优化的手段，但不要把它当成语义上的保证。**将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 `useMemo` 的情况下也可以执行的代码 —— 之后再在你的代码中添加 `useMemo`，以达到优化性能的目的。

举个例子

```tsx
import React, { useState, useMemo } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [memoVal, setMemoVal] = useState(0);
  const content = () => {
    console.log('content');
    return memoVal + 1;
  };

  return (
    <>
      <div>
        <button onClick={() => setCount(count + 1)}>count: {count}</button>
        <button onClick={() => setMemoVal(memoVal + 1)}>
          memoVal: {memoVal}
        </button>
      </div>
      <h2>{content()}</h2>
    </>
  );
}

export default App;
```

优化后代码

```tsx
import React, { useState, useMemo } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [memoVal, setMemoVal] = useState(0);
  const content = useMemo(() => {
    console.log('content');
    return memoVal + 1;
  }, [memoVal]);

  return (
    <>
      <div>
        <button onClick={() => setCount(count + 1)}>count: {count}</button>
        <button onClick={() => setMemoVal(memoVal + 1)}>
          memoVal: {memoVal}
        </button>
      </div>
      <h2>{content}</h2>
    </>
  );
}

export default App;
```

同样的，这个也适合我们组件的性能优化。

```tsx
import React, { useState, useMemo } from 'react';

function MemoValComponent(props) {
  const { value } = props;
  console.log('MemoValComponent');
  return <h2>{value}</h2>;
}

function App() {
  const [count, setCount] = useState(0);
  const [memoVal, setMemoVal] = useState(0);
  const content = useMemo(() => {
    return <MemoValComponent value={memoVal} />;
  }, [memoVal]);

  return (
    <>
      <div>
        <button onClick={() => setCount(count + 1)}>count: {count}</button>
        <button onClick={() => setMemoVal(memoVal + 1)}>
          memoVal: {memoVal}
        </button>
      </div>
      <>{content}</>
    </>
  );
}

export default App;
```

### 总结

通过上文的学习，我们知道`useMemo`有缓存结果的能力，但我们不要滥用这个`hooks`，当我们的需要的变量他的渲染的成本没有那么大的时候，我们最好不要使用`useMemo`，因为使用`useMemo`也是一种消耗。

例如：如果我们所希望的结果，他需要很大的计算量，这个时候`useMemo`可以派上用场。
