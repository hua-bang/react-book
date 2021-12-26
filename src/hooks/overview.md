---
nav:
  title: Hooks
  path: /hooks
group:
  title: Hooks
  order: 3
title: 概述
order: 1
---

# Hooks

React Hook 是一种复用状态逻辑的方式。

_Hook_ 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

```tsx
import React, { useState } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default () => <Example />;
```

## 为什么我们需要 hook

在 Hooks 出现之前，开发 React 组件主要是类组件和函数组件。函数组件没有 `state`，所以也叫 SFC（stateless functional component），简单的将 `props` 映射成 `view`；Class 组件有 `state`，能够处理更加复杂的逻辑。

类组件可以完成功能，但并非完美，有以下三个问题。

- **代码复用：在组件之间复用状态逻辑很难**

  你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook 使你在无需修改组件结构的情况下复用状态逻辑。** 这使得在组件间或社区内共享 Hook 变得更便捷。

- **复杂组件变的难以理解**

  **Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

- **难以理解的 CLass**

  **Hook 使你在非 class 的情况下可以使用更多的 React 特性。** 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

其实，React Hooks 带来的好处不仅是更函数式、更新颗粒度更细、代码更清晰，还有以下三个优点：

1. 多个状态不会产生嵌套，写法还是平铺的：如 `async/await` 之于 `callback hell` 一样，Hooks 也解决了高阶组件的嵌套地狱问题。虽然 `render props` 也可以通过 `compose` 解决这个问题，但使用略为繁琐，而且因为强制封装一个新对象而增加了实体数量。
2. Hooks 可以引用其他 Hooks，自定义 Hooks 更加灵活。
3. 更容易将组件的 UI 与状态分离。

## 原则

- 只能在函数组件中进行调用，不要在普通的`JavaScript`中调用 Hook
- 只能在函数组件的最顶层作用于调用：不能在循环，条件中调用。

### 自定义 Hook

通过自定义的 Hook，将组件逻辑提取到可重用的函数中。

当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。而组件和 Hook 都是函数，所以也同样适用这种方式。

> 自定义 Hook 必须以 `use` 开头吗？

必须如此。这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 规则。

> 在两个组件中使用相同的 Hook 会共享 `state` 吗？

不会。自定义 Hook 是一种 **重用状态逻辑的机制**（例如设置为订阅并存储当前值），所以每次使用自定义 Hook 时，其中的所有 `state` 和副作用都是完全隔离的。

> 自定义 Hook 如何获取独立的 `state`？

每次调用 Hook，它都会获取独立的 `state`。由于我们直接调用 `useFriedStatus`，从 React 的角度来看，我们的组件只是调用了 `useState` 和 `useEffect`。正如我们在之前章节中了解到的一样，我们可以在一个组件中多次调用 `useState` 和 `useEffect`，它们是完全独立的。
