---
nav:
  title: 基础
  path: /base
group:
  title: 基础特性
  order: 1
title: 特性
order: 1
---

# 特性

## 理解

构建用户界面的`JavaScript`库

## 设计思想

React 不是一个 MVC 框架，而是一个用于构建组件化 UI 的库，是一个前端界面开发工具。

## React 三大特性

- `函数式编程 -> 单向数据流`
- `组件化思维`
- `虚拟DOM -> 跨平台`

## 概念

### Virtual DOM

实质上`Virtual DOM`就是对`DOM`的抽象，本质是一个 JS 对象，使用 js 对象更轻量的对 DOM 进行描述。

### JSX

**JSX 是类 XML 语法的 ECMAScript 扩展**，完美地利用了 JavaScript 自带的语法和特性，并使用大家熟悉的 HTML 语法来创建虚拟元素。

## 数据

### 数据驱动

注意，在 React 中，一切皆为数据。数据驱动视图。

一般不建议手动操作 DOM 节点（请确保真的有需要）

### State

React 的数据，类组件中的数据使用`state`来管理。

分为组件`state`与全局`state`。

### 单向数据流

数据只能从`state`或者`props`留向视图层，视图层数据是不能直接流向数据的。

## 程序开发

### 声明式编程（函数式编程）

React 推行的是声明式编程的思想。

声明式编程表明想要实现什么目的，应该做什么，但是不指定具体怎么做。

`命令式 -> 声明式编程`

### 组件化开发

数据层和视图层组织起来的表现形式，并且根据组件的用意，拆分可复用，灵活的组件。

```tsx
import React from 'react';
export default () => <>hello, world</>;
```

### JSX 语法

React 中推荐的一种语法，在 JS 中编辑 HTML 片段

```tsx
import React from 'react';
export default () => <h1>JSX</h1>;
```

## 优点

- **灵活性和响应性**：提供最大的灵活性和响应能力。
- **虚拟 DOM**：使用 JSX 来生成虚拟 DOM，编写更加灵活，同时可跨平台。
- **纯粹的 JavaScript 及函数式编程**：编写页面更为灵活，抽象。
- **可扩展性**：由于其灵活的结构和可扩展性，React 已被证明对大型应用程序更好。

---

**参考资料**

- [特性](https://tsejx.github.io/react-guidebook/foundation/main-concepts/overview)
