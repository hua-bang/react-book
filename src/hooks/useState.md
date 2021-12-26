---
nav:
  title: Hooks
  path: /hooks
group:
  title: Hooks
  order: 3
title: useState
order: 2
---

# useState

> `useState` is a React Hook that lets a component "rememver" some informatio (called state). It return two values: the current state, and the function you can use to update it.

## Basic usage

```ts
const [state, setState] = useState(initialState);
```

**Type declaration**

```ts
type BasicStateAction<S> = (S => S) | S;
type Dispatch<A> = A => void;

export function useState<S>(
	initialValue: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

**example**

```tsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handClick() {
    setCount(count + 1);
  }

  return <button onClick={handClick}>{count}</button>;
}

export default Counter;
```

说明：

- 在 **初始渲染** 期间，返回的状态（`state`）与传入的第一个参数（`initialState`）值相同。
- `setState` 函数用于更新 `state`。它接收一个新的 `state` 值并将组件的一次重新渲染加入队列。
- 在后续的重新渲染中，`useState` 返回的第一个值将始终是更新后最新的 `state`。

### 函数式更新

如果你想基于原来的值进行相关的更新，可以使用更新函数的形式来传递给`setState`,该函数的第一个参数就是先前的`state`，返回值就是变更后的`state`.

举个例子：

```tsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handClick() {
    setCount(prev => prev + 1);
  }

  return <button onClick={handClick}>{count}</button>;
}

export default Counter;
```

如果你的更新函数返回值和当前的`state`完成相同，则随后的重渲染会被跳过。

> This is a performance optimization. React uses the [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) algorithm to compare the values.

⚠️ **注意：**

与 `class` 组件中的 `setState` 方法不同，`useState` 不会自动合并更新对象。你可以用函数式的 `setState` 结合扩展运算符或 `Object.assign`来达到合并更新对象的效果。

```js
setState(prevState => {
  // 也可以使用 Object.assign
  return {
    ...prevState,
    ...updateValues,
  };
});
```

useReducer 是另一种可选方案，它更适合用于管理包含多个 property 的 `state` 对象。

### 惰性初始值

说明：

- `initialState` 初始化参数只会在组件的初始渲染中起作用，后续渲染时会被忽略
- 如果初始 `state` 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 `state`，此函数只在初始渲染时被调用。

```ts
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

### 跳过更新

调用更新函数 `setState` 并传入当前的 `state` 时，React 将跳过子组件的渲染及 `effect` 的执行。（React 使用 `Object.is` 比较算法来比较 `state`）

需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。不过由于 React 不会对组件树的 **深层节点** 进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 **useMemo** 来进行优化。

## 实现原理

首先`useState`是一个方法，它本身是无法存粗状态的。其次，他运行在无状态组件中，本身也是无法保存状态的。

`useState` 只接收一个初始化参数，并看不出有什么特殊的地方。所以 React 在一次重新渲染的时候如何获取之前更新过的 `state` 呢？

### 基础概念

#### React Element

JSX 编译解析后执行 `React.createElement()` 创建并返回的是一个 `ReactElement` 对象，他的数据解构如下：

```ts
const element = {
  // 是否是普通Element_Type
  ?typeof: REACT_ELEMENT_TYPE,

  // Built-in properties that belong on the element
  // 我们的组件，比如 `class MyComponent`
  type: type,
  key: key,
  ref: ref,
  props: props,

  // Record the component responsible for creating this element.
  _owner: owner,
};
```

这其中需要注意的是 `type`，在我们写 `<MyClassComponent {...props} />` 的时候，他的值就是 `MyClassComponent` 这个 `class`，而不是他的实例，实例是在后续渲染的过程中创建的。

#### Fiber

每个节点都会有一个对应的 Fiber 对象，他的数据解构如下：

```ts
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // Instance
  this.tag = tag;
  this.key = key;
  // 就是 ReactElement 的 `?typeof`
  this.elementType = null;
  // 就是 ReactElement 的 type
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  // 上次渲染过程中最终获得的节点的状态 State
  // 每次 render 之前会计算出最新的状态，然后赋值给组件实例，再调用 render
  this.memoizedState = null;
  this.firstContextDependency = null;

  // ...others
}
```

在这里我们需要注意的是 `this.memoizedState`，这个 `key` 就是用来存储在上次渲染过程中最终获得的节点的 `state` 的，每次执行 `render` 方法之前，React 会计算出当前组件最新的 `state` 然后赋值给 `class` 的实例，再调用 `render`。

所以很多不是很清楚 React 原理的同学会对 React 的 Class 类组件有误解，认为 `state` 和生命周期钩子都是自己主动调用的，因为我们继承了 React.Component，它里面肯定有很多相关逻辑。事实上如果有兴趣可以去看一下 Component 的源码，大概也就是 100 多行，非常简单。所以在 React 中，class 仅仅是一个载体，让我们写组件的时候更容易理解一点，毕竟组件和 class 都是封闭性较强的。

### 原理分析

在知道上面的基础之后，对于 Hooks 为什么能够保存无状态组件的原理就比较好理解了。

我们假设有这么一段代码：

```ts
function FunctionalComponent() {
  const [state1, setState1] = useState(1);
  const [state2, setState2] = useState(2);
  const [state3, setState3] = useState(3);
}
```

在我们执行函数组件的时候，在第一次执行到 `useState` 的时候，对应的是 Fiber 对象上的 `memoizedState`，这个属性原本是设计来存储 Class 状态组件的 `state` 的，因为在 Class 状态组件中 `state` 是一整个对象，所以可以和 `memoizedState` 相对应。

但是在 Hooks 中，React 并不知道我们调用了几次 `useState`，所以在保存 `state` 这件事情上，React 想出了一个比较有意思的方案，那就是调用 `useState` 后设置在 `memoizedState` 上的对象长这样：

```js
{
  baseState, next, baseUpdate, queue, memoizedState;
}
```

我们叫他 Hook 对象。这里面我们最需要关心的是 `memoizedState` 和 `next`，`memoizedState` 是用来记录这个 `useState` 应该返回的结果的，而 `next` 指向的是下一次调用 `useState` 对应的 Hook 对象。

```js
// 链表式结构
hook1 => Fiber.memoizedState
state1 === hook1.memoizedState
hook1.next => hook2
state2 === hook2.memoizedState
hook2.next => hook3
state3 === hook2.memoizedState
```

每个在函数组件中调用的 `useState` 都会有一个对应的 Hook 对象，他们按照执行的顺序以类似链表的数据格式存放在 `Fiber.memoizedState` 上。

⚠️ 注意：就是因为是以这种链表的方式进行 `state` 的存储，所以 `useState`（包括其他的 Hooks）都必须在 **函数组件的根作用域** 中声明，也就是不能在 **条件语句** 或者 **循环语句** 中声明。

```js
if (something) {
  const [state1] = useState(1)
}

// 或者
for (something) {
  const [state2] = useState(2)
}
```

最主要的原因就是你不能确保这些条件语句每次执行的次数是一样的，也就是说如果第一次我们创建了`state1 => hook1`，`state2 => hook2`，`state3 => hook3` 这样的对应关系之后，下一次执行因为 `something` 条件没达成，导致 `useState(1)` 没有执行，那么运行 `useState(2)` 的时候，拿到的 Hooks 对象是 `state1` 的，那么整个逻辑就乱套了，所以这个原则是必须遵守的。

### 状态更新

上面讲了 Hooks 中 `state` 是如何保存的，那么接下去来讲讲如何更新 `state`。

我们调用的 `useState` 返回的方法是这样的：

```js
var dispatch = (queue.dispatch = dispatchAction.bind(
  null,
  currentlyRenderingFiber$1,
  queue,
));

return [workInProgressHook.memoizedState, dispatch];
```

调用这个方法会创建一个 `update`：

```js
var update = {
  expirationTime: _expirationTime,
  action: action,
  callback: callback !== undefined ? callback : null,
  next: null,
};
```

这里的 `action` 是我们调用 `setState1` 传入的值，而这个 `update` 会被加入到 `queue` 上，因为可能存在一次性调用多次 `setState1` 的清空（跟 React 的 `batchUpdate` 批量更新有关）。

在收集完这所有 `update` 之后，会调度一次 React 的更新，在更新的过程中，肯定会执行到我们的函数组件，那么就会执行到对应的 `useState`，然后我们就拿到了 Hook 对象，他保存了 `queue` 对象表示有哪些更新存在，然后依次进行更新，拿到最新的 `state` 保存在 `memoizedState` 上，并且返回，最终达到了 `setState` 的效果。

其实本质上跟 Class 类组件是差不多的，只不过因为 `useState` 拆分了单一对象 `state`，所以要用一个相对独特的方式进行数据保存，而且会存在一定的规则限制。

但是这些条件完全不能掩盖 Hooks 的光芒，他的意义是在是太大了，让 React 这个函数式编程范式的框架终于摆脱了要用类来创建组件的尴尬场面。事实上类的存在意义确实不大，比如 PuerComponent 现在也有对应的 `React.memo` 来让函数组件也能达到相同的效果。
