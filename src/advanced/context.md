---
nav:
  title: 基础
  path: /base
group:
  title: 进阶
  order: 2
title: Context
order: 6
---

# Context

Context 提供一个无需为每层组件手动添加 props,就能在组件中传递数据的方法。

想象一个场景，你的应用需要你个主题颜色，此时，我们需要在多个组件中共享这一个数据，最原始的方法是，我们在他们公共的祖先中，定义一个变量，然后进行数据的传递。

这种方法是可行的，但会十分繁琐。

Context 提供了组件之间共享值的方法，而不必显式通过组件树来逐层传递 props。

## 应用场景

Context 主要用于很多不同层级的组件需要使用共同的数据。谨慎使用，因为这个也会使得组件的复用性变差。

对于**全局、不常修改的数据共享**，我们可以使用 context api 来实现。

- 用户信息
- 主题方案
- 语言

## 实践

### Provider

```ts
<MyContext.Provider value={/* 某个值 */}>
```

```tsx
import React from 'react';

const themes = {
  light: {
    backgroud: '#eeeeee',
    color: '#222222',
  },
  dark: {
    backgroud: '#222222',
    color: '#eeeeee',
  },
};

const ThemeContext = React.createContext(themes.dark);

class ThemedButton extends React.Component {
  render() {
    let props = this.props;

    let theme = this.context;

    return (
      <button
        {...props}
        style={{
          backgroundColor: theme.background,
          color: theme.color,
        }}
      >
        submit
      </button>
    );
  }
}

ThemedButton.contextType = ThemeContext;

// 一个使用 ThemedButton 的中间组件
const Toolbar = props => {
  return <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 內部的 ThemedButton 按钮组件使用 state 的 theme 值
    // 而外部的组件使用默认的 theme 值
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Toolbar changeTheme={this.toggleTheme} />
      </ThemeContext.Provider>
    );
  }
}

export default () => <App />;
```

### 深层组件更新

#### Consumer

一个 React 组件可以订阅 context 的变更，此组件可以让你在[函数式组件](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)中可以订阅 context。

从一个在组件树中嵌套很深的组件中更新 Context 是很有必要的。在这种场景下，你可以通过 context 传递一个函数，使得 `<Cosumer>` 组件更新 context：

```jsx
import React from 'react';

const themes = {
  light: {
    background: '#eeeeee',
    color: '#222222',
  },
  dark: {
    background: '#222222',
    color: '#eeeeee',
  },
};

// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
  count: 1,
  addCount: () => {},
});

function ThemeTogglerButton() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme, count, addCount }) => (
        <>
          <button
            onClick={toggleTheme}
            style={{
              outline: 'none',
              color: theme.color,
              backgroundColor: theme.background,
              cursor: 'pointer',
            }}
          >
            Toggle Theme {count}
          </button>
          <button onClick={addCount}>add</button>
        </>
      )}
    </ThemeContext.Consumer>
  );
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    this.addCount = () => {
      this.setState(prev => ({
        count: prev.count + 1,
      }));
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
      count: 0,
      addCount: this.addCount,
    };
  }
  render() {
    // 整个 state 都被传递进 provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

export default () => <App />;
```

### 消费多个 Context

```tsx
import React from 'react';

// Theme context，默认 theme 是 light 值
const ThemeContext = React.createContext('light');

// 用户登录 Context
const UserContext = React.createContext({ name: 'Guest' });

function Profile(props) {
  return (
    <div>
      <div>Theme: {props.theme}</div>
      <div>Profile: {props.user.name === 'Guest' ? 'Guest' : 'Signed'}</div>
    </div>
  );
}

function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => {
        return (
          <UserContext.Consumer>
            {user => {
              return (
                <>
                  <Profile theme={theme} user={user} />
                </>
              );
            }}
          </UserContext.Consumer>
        );
      }}
    </ThemeContext.Consumer>
  );
}

function Layout() {
  return (
    <div>
      <Content />
    </div>
  );
}

function App() {
  return (
    <>
      <ThemeContext.Provider value={'drak'}>
        <UserContext.Provider value={{ name: 'Guest' }}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
```

Q: 我们能否用 Context API 来答题所有的数据传递，甚至`Redux`？不合适。`Context API`应该用于需要全局共享数据的场景，而且最好是不频繁改变的数据。最顶层的 Context，会容易导致 Consumer 重新 render

因为 context 会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些陷阱，当 `<Provider>` 的父组件进行重渲染时，可能会在 `<Consumer>` 组件中触发意外的渲染。举个例子，当每次 `<Provider>` 重渲染时，以下的代码会重渲染所有下面的 `<Consumer>` 组件，因为 `value` 属性总是被赋值为新的对象。

```js
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{ something: 'something' }}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

为了防止这种情况，将 `value` 状态提升到父节点的 `state` 里：

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { something: 'something' },
    };
  }
  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```
