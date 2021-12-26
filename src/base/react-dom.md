---
nav:
  title: 基础
  path: /base
group:
  title: 基础特性
  order: 1
title: 组件挂载器
order: 6
---

# 组件挂载器

React 的声明式渲染把复杂的 DOM 操作抽象为简单的 State 和 Props 的操作。避免了很多直接的 DOM 操作。不过，DOM 操作仍可能在 React 中无法避免的。

## ReactDOM API

- `ReactDOM.render(element, container [, callback])`顶层组件用于将 VirtualDOM 渲染到游览器的 DOM 中去。
- `ReactDOM.findDOMNode(component)`获取当前组件的 DOM 元素节点引用。
- `ReactDOM.unmountComponentAtNode(container)`从 DOM 树卸载已装载 React 组件并清空事件监听和状态。
- hydrate
- `ReactDOM.createPortal(child, container)`

## render

- 控制你传入容器节点里的内容。第一次调用的时候，内部所有已经存在的 DOM 元素都会被替换掉。之后的调用会使用 React 的 DOM 的 diff 算法进行高效更新。
- 不会修改容器的节点（只修改容器的子项）。你可以不覆盖已有的子节点的情况下添加一个组件到已有的 DOM 节点中去。
- 目前会返回一个引用。指向 ReactComponent 的根实例。但是这个返回值是历史遗留问题，应避免使用。

---

**参考资料**：

- [组件挂载器](https://tsejx.github.io/react-guidebook/foundation/main-concepts/react-dom)
