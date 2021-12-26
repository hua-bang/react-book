---
nav:
  title: Hooks
  path: /hooks
group:
  title: Hooks
  order: 3
title: useImperativeHandle
order: 7
---

# useImperativeHandle

`useImperativeHandle`可以让你在使用`ref`时自定义暴露给父组件的实例值。但在大多数情况下，请避免使用`ref`这种命令式代码。

## 基本用法

**语法：**

```ts
useImperativeHandle(ref, createHandle, [deps]);
```

**类型声明：**

```ts
export function useImperativeHandle<T>(
  ref: { current: T | null } | ((inst: T | null) => mixed) | null | void,
  create: () => T,
  deps: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}
```

**举个例子**：

```tsx
import React, { useRef, useImperativeHandle } from 'react';

function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
  }));
  return <input ref={inputRef} />;
}

const FancyInputWrapped = React.forwardRef(FancyInput);

const App = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleBlur = () => {
    inputRef.current.blur();
  };

  return (
    <div>
      <FancyInputWrapped ref={inputRef} />
      <button style={{ marginLeft: 8 }} onClick={handleFocus}>
        FOCUS
      </button>
      <button style={{ marginLeft: 8 }} onClick={handleBlur}>
        BLUR
      </button>
    </div>
  );
};

export default () => <App />;
```
