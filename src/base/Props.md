---
nav:
  title: 基础
  path: /base
group:
  title: 基础特性
  order: 1
title: Props
order: 4
---

# Props

Props 的主要作用是让父组件传入参数来配置组件。是外部传入参数的值（**只读，不要对其进行修改**），组件内部无法控制与修改。除非外部传人的 Props 修改，否则组件的 Props 永远不变。

## 语法原则

像书写 HTML 的标签属性一样，就可以传到子组件的`this.props`中

⚠️ 注意以下几点：

- 特殊属性`ref`、`key`、`children`为 react 保留，不会传递给子组件
- 只给定属性不传值，React 会解析成布尔值`true`
- 除了字符串，其他值需要使用花括号
- 属性名驼峰
- 特殊值

```tsx
import React from 'react';
export default () => <div style={{ color: 'red' }}>JSX</div>;
```

## 不可变属性

无论是使用函数还是类组件，都无法改变 props

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

类似上方的函数称为**纯函数**

纯函数的特点

- 给定相同的输入，总会返回相同的输出。
- 过程没有副作用
- 不依赖外部状态

React 规则：**所有的 React 组件必须像纯函数那样使用他们的 props。**

props 若可被修改，则组件的行为和显示形态会变的不可预测

但并不意味着 Props 决定的显示形态不能被修改。

## 默认值

Props 的默认值可以自己定义。

### 类组件

类组件中`defaultProps`定义在类上。

```tsx
import React from 'react';

class Foo extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

Foo.defaultProps = {
  name: 'classComponent',
};

export default () => (
  <>
    <Foo />
  </>
);
```

### 函数组件

函数组件在函数参数中定义即可。

```tsx
import React from 'react';

function Foo({ name = 'fnComponent' }) {
  return <div>{name}</div>;
}

export default () => (
  <>
    <Foo />
  </>
);
```

---

- [props](https://tsejx.github.io/react-guidebook/foundation/main-concepts/props)
