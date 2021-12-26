---
nav:
  title: 基础
  path: /base
group:
  title: 基础特性
  order: 1
title: State
order: 3
---

# State

React 吧用户界面当作简单状态机。通过用户的交互，实现不同的状态，然后渲染 UI，界面和数据保持一致。只需要更新组件的`state`，然后根据新的`state`渲染用户界面。

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。State 在**组件内部自身初始化**，并且只能被**组件自身修改**。

注意，我们不要以简单的赋值语句改变`state`的值, 而是应该使用`setState`去进行修改更新（注意：必须是新的值），数据的更新会使得组件重新渲染。

## 概念

如何判断变量是否是组件`state`。

1. 这个变量是否通过`props`获取? 如果是，就不是状态。
2. 这个变量是否在整个组件的生命周期过程中保持不可变? 如果是，就不是状态。
3. 这个变量是否可以通过`state`或者`props`获取? 如果是，就不是状态。
4. 这个变量是否在 render 中使用？ 如果不是，就不是状态。

⚠️ 注意： 并非所有的数据都是组件的状态，当存在多个组件共同以来一个`state`，一般做法是**状态提升**或者使用**全局状态**管理。

### 不可变对象

React 官方建议吧 State 当作**不可变对象（immutable）**，State 中包含的所有状态应该都是不可变对象，当 State 的状态发生改变时，我们应该重新创建这个对象，而不是仅仅做修改。

State 对象分为三种

- 基本数据类型
- 数组类型
- 对象类型

#### 基本数据类型

number、string、null、boolean、undefined 这五种类型，原始数据类型

```js
this.setState({
  number: 1,
  string: 'hello',
});
```

#### 数组类型

当我们的数据为数组的时候，加入我们要推入一个新数组，不要简单的使用`push`来进行修改，注意**不可变对象**的概念。我们可以使用`concat`方法或者`ES6`的数组扩展方法

```js
let students = [];
this.setState({
  students: students.concat('xiaoming');
})

this.setState(prev => ({
  students: prev.students.concat('xiaoming');
}))

this.setState(prev => ({
  students: [...prev.students, 'xiaoming']
}))
```

⚠️ 注意： **不可变对象**，所以这里我们不应该涉及直接修改 state，而是用一个新的对象来赋值给`state`.

#### 对象类型

对象就是可变类型，修改对象类型的`state`时，应该保证不修改原来的`state`。可以使用`es6`的`Object.assign`方法或对象扩展语法。

```js
this.setState(prev => ({
  school: Object.assign({}, prev.school, { classNum : 10})
}))

this.setState(prev => ({
  school: {
    ...prev.school
  	classNum : 10
  })
}))
```

总结一下，创建新的状态对象的关键是，避免直接修改原对象，而是使用返回一个新对象的方法。

### 无状态组件

没有 State 的组件称为无状态组件(Stateless Component)。以前，由于函数组件的特点，常常把函数组件称为无状态组件，但如今`hooks`的出世以及使用，使得函数组件也有了这样自己的状态。

---

**参考资料**

- [State](https://tsejx.github.io/react-guidebook/foundation/main-concepts/state)
- [React](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)
