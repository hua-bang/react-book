---
nav:
  title: 基础
  path: /base
group:
  title: 进阶
  order: 2
title: setState
order: 1
---

# setState

> `setState()` enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.
>
> `setState()` 将需要处理的变化塞入（译者注：setState 源码中将一个需要改变的变化存放到组件的 state 对象中，采用队列处理）组件的 state 对象中， 并告诉该组件及其子组件需要用更新的状态来重新渲染。这是用于响应事件处理和服务端响应的更新用户界面的主要方式。

为了提高性能，React 将`setState`设置为**状态批量处理或延迟更新**，实际上就是**异步更新函数**，该方法不会以顺序控制流的方式处理相同周期内的事件，同时，我们不能依赖`this.state`来计算未来的状态。

## 基本语法

```ts
Component.prototype.setState(updater [, callback])
```

| 参数     | 说明     | 类型             |
| -------- | -------- | ---------------- |
| updater  | 更新器   | object\|function |
| callback | 回调函数 | function         |

### updater 函数

### 函数形式

`updater`参数可以带一个签名的函数

```ts
Component.prototype.setState((prevState, props) => changedState);
```

| setState 参数 | 说明                                   | 类型   |
| ------------- | -------------------------------------- | ------ |
| prevState     | 未更新前的状态说明。该引用不应该被改变 | object |
| props         | 父组件传入的属性                       | object |

`updater`保证`state`和`props`是最新的。

该函数通过对 `prevState` 或 `props` 的引用构建一个新对象作为输出，该输出后续用于与旧状态（prevState）浅合并。（注意：一定要是新对象）

举个例子：

```ts
this.setState((prevState, props) => {
  return {
    index: prevState.index + props.step,
  };
});
```

对象形式

`updater` 参数亦可为对象类型，该对象仅会浅合并到新状态中。

```js
Component.prototype.setState(obj stateChange, [callback])
```

与函数形式相类似，对象形式的 `updater` 参数通过直接构建与旧状态浅合并的新对象作为输出。

🌰 **示例：**

```ts
this.setState({
  index: 1,
});
```

⚠️ 注意：这里的 setState 返回的不会覆盖原来的对象，而是和原来的`state`进行合并。

### callback 参数

`callball`这里是可选的回调函数，该函数在状态更新完成同时组件被重新渲染之后执行。通常，对于此类逻辑，官方推荐使用 `componentDidUpdate` 生命周期函数。

## 基本特性(todo)
