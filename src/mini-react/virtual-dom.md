---
nav:
  title: mini-react
  path: /mini-react
group:
  title: 基础
  order: 2
title: virtual dom
order: 1
---

# virtual dom

## 理解

`React` 本身只是一个 `DOM` 的抽象层，使用组件构建虚拟 `DOM`。

## 虚拟 DOM

`Virtual DOM` 是一个抽象的概念。实际在是一个 `JavaScript` 对象，用于描述页面上的 `DOM` 元素。

### 为什么要用 虚拟 DOM

真实 `DOM` 的操作其实是比较慢的，轻微的操作都可能导致页面回流，重绘，会比较消耗性能。对于 `DOM` 元素来讲， `JS` 对象可能处理更快，更为简单。通过 `diff` 算法进行新老 `vdom` 的对比, 可以批量，小成本的执行 `dom` 操作，优化用户体验。

### React 中的虚拟 DOM

在 `React` 中，`UI` 以一种理想化的，或者说“虚拟的”表现形式被保存于内存中，并通过如 `ReactDOM` 等类库使之与“真实的” `DOM` 同步。这一过程叫做[协调](https://zh-hans.reactjs.org/docs/reconciliation.html)。

## JSX

### JSX 是什么

- 语法糖
- `React` 使用 `JSX` 来替代常规的 `JavaScript`。
- `JSX` 是一个看起来很像 `XML` 的 `JavaScript` 语法扩展。

### 为什么需要 JSX

- 开发效率：使用 `JSX` 编写模板简单快速。
- 执行效率：`JSX` 编译为 `JavaScript` 代码后进行了优化，执行更快。
- 类型安全：在编译过程中就能发现错误。

## React Fiber

`Fiber` 是 `React 16` 中新的协调引擎。它的主要目的是使 `Virtual DOM` 可以进行增量式渲染。

### 什么是 fiber

A Fiber is work on a Component that needs to be done or was done. There can be more than one per component.
