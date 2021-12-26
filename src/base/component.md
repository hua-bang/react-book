---
nav:
  title: 基础
  path: /base
group:
  title: 基础特性
  order:
title: 组件化
order: 5
---

# 组件化

React 组件封装的思路就是面向对象思想。

规范标准组件准则：

- **基本的封装性**：尽管 JS 中并没有真正面向对象的方法，但我们还是可以通过实例化的方法制造对象。
- **简单的生命周期实现**：最明显的两个方法`constructor`和`destory`，代表组件的挂载和卸载的过程。
- **明确的数据流动**：这里的数据指的是调用组件的参数。一旦确定参数的值，就会解析传入的参数，根据参数的不同做出不同的响应，从而得到渲染的结果。

## 组件类型

React 组件三要素：Props，State，生命周期钩子。

**React 组件类型：**

- 无状态组件（函数组件）
- 有状态组件
- 容器组件
- 高阶组件
- 渲染回调组件

### 无状态组件

无状态组件（Stateless Component）是最基础的组件形式。由于没有状态的影响所以是纯静态的展示。

举例：按钮、标签、输入框等。

基本组成结构即属性（props）和渲染函数（render）。没有涉及状态的改变，所以这种复用性也比较强。

**特点：**

- 无状态，只负责接受`props`，渲染 DOM
- 不能访问生命周期方法。
- 不需要声明类：可以避免`extend`和`constructor`的代码。
- 不会被实例化，因此不能传`ref`（可以使用`React.forwardRef`包装后传`ref`）
- 不需要显示声明 `this` 关键字：在 ES6 的类声明中往往需要将函数的 `this` 关键字绑定到当前作用域，而因为函数式声明的特性，我们不需要再强制绑定。
- 更好的性能表现：因为函数式组件中并不需要进行生命周期的管理与状态管理，因此 React 并不需要进行某些特定的检查或者内存分配，从而保证了更好地性能表现。

```tsx
import React from 'react';
const PureComponent = props => <div>hello, world</div>;

export default PureComponent;
```

无状态组件的写法十分简单，比起使用传统的组件定义方式，我通常就直接使用 ES6 语法中提供的箭头函数来声明这种组件形式。当然，如果碰到稍微复杂点的，可能还会带有生命周期的钩子函数。这时候就需要用到 `Class Component` 的写法了。(当然可以考虑 hooks)。

### 有状态组件

在无状态组件的基础上，如果组件的内部包含状态(state)且状态随着事件或者外部的消息发生改变，就构成了**有状态组件**（stateful component）。有状态组件通常有生命周期（LifeCycle）。用以在不同的时刻触发状态的更新。这种组件也是通常在写业务逻辑中最经常使用到的，根据不同的业务场景组件的状态数量以及生命周期机制也不尽相同。

```ts
class StatefulComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //定义状态
        }
    }

    componentWillMount() {
        //do something
    }

    componentDidMount() {
        //do something
    }

    // 其他生命周期

    render() {
        return (
            //render
        );
    }
}
```

### 容器组件

在具体的项目中，前端数据一般是通过异步请求获取的（数据可能还得经过一层处理）。为了使组件的职责更加单一，引入了容器组件（Container Component）的概念。我们将数据获取以及处理的逻辑放在容器组件中，使得组件的耦合性进一步地降低。

```ts
class UserListContainer extends React.component {
  getInitialState() {
    return {
      users: [],
    };
  }

  componentDidMount() {
    let _this = this;
    axios.get('/path/to/user-api').then(function(response) {
      _this.setState({ users: response.data });
    });
  }

  render() {
    return <UserList users={this.state.users} />;
  }
}
```

如上面这个容器组件，就是负责获取用户数据，然后以 `props` 的形式传递给 `UserList` 组件来渲染。容器组件也不会在页面中渲染出具体的 DOM 节点，因此，它通常就充当数据源的角色。目前很多常用的框架，也都采用这种组件形式。如：React Redux 的 `connect()`，Relay 的 `createContainer()`，Flux Utils 的 `Container.create()` 等。

### 高阶组件

一般上面三种就可以满足大部分业务的需求了。但是对于复杂的需求时，我们可以使用`高阶组件(Higher-Order Component)`编写出可重用性的组件。那么什么是高阶组件？其实它和高阶函数的概念类似，就是一个会返回组件的组件。或者更确切地说，它其实是一个会返回组件的函数。就像这样：

```ts
const HigherOrderComponent = WrappedComponent => {
  return class WrapperComponent extends Component {
    render() {
      //do something with WrappedComponent
    }
  };
};
```

举个例子

```tsx
import React from 'react';

const LogHigherOrderComponent = WrappedComponent => {
  return class WrapperComponent extends React.Component {
    render() {
      console.log('log hoc');
      return <WrappedComponent />;
    }
  };
};

const Com = props => <div>hello, wolrd</div>;

export default LogHigherOrderComponent(Com);
```

高阶组件的目的

- 在原有的组件基础上，添加新的功能和行为。
- 保证自己原来的组件的功能或业务纯净单一。
- 新加入的功能要足够复用。

```ts
//检验规则，表格组件
const FormValidator = (WrappedComponent, validator, trigger) => {

   getTrigger(trigger, validator) {
      var originTrigger = this.props[trigger];
      return function(event) {
          //触发验证机制,更新状态
          // do something ...
          originTrigger(event);
      }
  }

  var newProps = {
    ...this.props,
    [trigger]:   this.getTrigger(trigger, validator) //触发时机,重新绑定原有触发机制
  };

  return <WrappedComponent  {...newProps} />
}
```

值得提一句，同样是给组件增加新功能的方法，相比于使用 mixins 这种方式高阶组件则更加简洁和职责更加单一。你如果使用过多个 mixins 的时候，状态污染就十分容易发生，以及你很难从组件的定义上看出隐含在 mixins 中的逻辑。而高阶组件的处理方式则更加容易维护。

另一方面，ES7 中新的语法 `Decorator` 也可以用来实现和上面写法一样的效果。

```ts
function LogDecorator(msg) {
  return WrappedComponent => {
    return class LogHoc extends Component {
      render() {
        // do something with this component
        console.log(msg);
        <WrappedComponent {...this.props} />;
      }
    };
  };
}

@LogDecorator('hello world')
class HelloComponent extends Component {
  render() {
    //...
  }
}
```

### 渲染回调组件

还有一种组件模式是在组件中使用渲染回调的方式，将组件中的渲染逻辑委托给其子组件。

```tsx
import React, { Component } from 'react';

class RenderCallbackCmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'hello',
    };
  }

  render() {
    return this.props.children(this.state.msg);
  }
}

const ParentComponent = () => (
  <RenderCallbackCmp>
    {msg => (
      //use the msg
      <div>{msg + ', world'}</div>
    )}
  </RenderCallbackCmp>
);

export default ParentComponent;
```

## 总结

### 函数组件和类组件本质的区别

对于类组件来说，底层只需要实例化一次，实例中保存了组件的`state`等状态。对于每一次更新，只需要调用`render`函数以及相应的生命周期函数就可以。

对于函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明。

以上这些组件编写模式基本上可以覆盖目前工作中所需要的模式。在写一些复杂的框架组件的时候，仔细设计和研究组件间的解耦和组合方式，能够使后续的项目可维护性大大增强。

组件 Component === UI + update + 函数或类实例

---

**参考资料**

- [组件化](https://tsejx.github.io/react-guidebook/foundation/main-concepts/component)
