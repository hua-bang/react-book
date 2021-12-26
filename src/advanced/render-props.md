---
nav:
  title: 基础
  path: /base
group:
  title: 进阶
  order: 2
title: 渲染属性
order: 4
---

# 渲染属性

**渲染属性**（Render Props）指一种在 React 组件之间使用一个值为函数的 `props` 在 React 组件间共享代码的简单技术。

本质上是讲一个方法通过`props`传递给子组件，子组件可以拿到传递的数据，进行共用，来实现代码的复用。不过这种情况下传递的就是一个 **纯粹的方法**，比如父组件传递一个 `function` 给子组件，然后子组件去触发，实现代码的复用或事件的冒泡。

**Render Props**则是传递一个**渲染逻辑**给子组件，带有 Render Props 的组件，并不是自己的渲染逻辑，而是通过 `props` 传递实现的渲染逻辑，而这个渲染逻辑是由 render props 方法完成的。

## 基本使用

使用方法：

```ts
<Component render={data => <>JSX.ELEMENT</>} />
```

举个例子

```tsx
import React from 'react';

interface MouseState {
  x: number;
  y: number;
}

interface MouseProps {
  render: (x: number, y: number) => JSX.Element;
}

class Mouse extends React.Component<MouseProps> {
  state = {
    x: 0,
    y: 0,
  };

  handleMouseMove = event => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state.x, this.state.y)}
      </div>
    );
  }
}

const App = () => {
  return (
    <div style={{ height: '100%' }}>
      <Mouse
        render={(x, y) => (
          <h1>
            The mouse position is ({x}, {y})
          </h1>
        )}
      />
    </div>
  );
};

export default App;
```

实质上，是通过父组件传递渲染逻辑到子组件，子组件可以拿到渲染函数，结合自己的渲染方式最终形成自己的`render`函数。

这里需要明确的概念是，`<Mouse>` 组件实际上是调用了它的 `props.render` 方法来将它的 `state` 暴露给 `<App>` 组件。因此，`<App>` 可以随便按自己的想法使用这个 `state`。

该技术规避了所有 `mixin` 和 HOC 会面对的问题：

- **状态组件**：不成问题，我们可以在类组件中使用 Render Props。
- **不够直接**：我们不必再担心 `state` 或者 `props` 来自哪里。我们可以看到通过 Render Props 的参数列表看到有哪些 `state` 或者 `props` 可供使用。
- **命名冲突**：现在不会有任何的自动属性名称合并，因此，命名冲突将无可乘之机。

---

**参考资料**

- [渲染属性](https://tsejx.github.io/react-guidebook/foundation/advanced-guides/render-props)
