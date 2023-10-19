---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useMemoizedFn
order: 8
---

# useMemoizedFn

Hooks for persistent functions. In theory, useMemoizedFn can be used instead of useCallback.

In some scenarios, we need to use useCallback to cache a function, but when the second parameter deps changes, the function will be regenerated, causing the function reference to change.

```js
const [state, setState] = useState('');
// When the state changes, the func reference will change
const func = useCallback(() => {
  console.log(state);
}, [state]);
```

Using useMemoizedFn, you can omit the second parameter deps, and ensure that the function reference never change.

```js
const [state, setState] = useState('');
// func reference never changeconst
func = useMemoizedFn(() => {
  console.log(state);
});
```

## Examples

### Default usage

```tsx
import React, { useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import useMemoizedFn from './index.ts';

export default () => {
  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);

  const memoizedFn = useMemoizedFn(() => {
    message.info(`Current count is ${count}`);
  });

  return (
    <>
      <p>count: {count}</p>
      <button
        type="button"
        onClick={() => {
          setCount(c => c + 1);
        }}
      >
        Add Count
      </button>
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={callbackFn}>
          call callbackFn
        </button>
        <button type="button" onClick={memoizedFn} style={{ marginLeft: 8 }}>
          call memoizedFn
        </button>
      </div>
    </>
  );
};
```

### Performance Improvement

```tsx
import useMemoizedFn from './index.ts';
import { message } from 'antd';
import React, { useCallback, useRef, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);

  const memoizedFn = useMemoizedFn(() => {
    message.info(`Current count is ${count}`);
  });

  return (
    <>
      <p>count: {count}</p>
      <button
        type="button"
        onClick={() => {
          setCount(c => c + 1);
        }}
      >
        Add Count
      </button>

      <p>
        You can click the button to see the number of sub-component renderings
      </p>

      <div style={{ marginTop: 32 }}>
        <h3>Component with useCallback function:</h3>
        {/* use callback function, ExpensiveTree component will re-render on state change */}
        <ExpensiveTree showCount={callbackFn} />
      </div>

      <div style={{ marginTop: 32 }}>
        <h3>Component with useMemoizedFn function:</h3>
        {/* use memoized function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={memoizedFn} />
      </div>
    </>
  );
};

// some expensive component with React.memo
const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div>
      <p>Render Count: {renderCountRef.current}</p>
      <button type="button" onClick={showCount}>
        showParentCount
      </button>
    </div>
  );
});
```

## API

```typescript
const fn = useMemoizedFn<T>(fn: T): T;
```

### Result

| Property | Description                            | Type                      |
| -------- | -------------------------------------- | ------------------------- |
| fn       | Fn the reference address never changes | `(...args: any[]) => any` |

### Params

| Property | Description                       | Type                      | Default |
| -------- | --------------------------------- | ------------------------- | ------- |
| fn       | Function that require persistence | `(...args: any[]) => any` | -       |

### code

```ts
import { useRef } from 'react';
import isDev from '../utils/isDev';
import { isFunction } from '../utils';

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

const useMemoizedFn = <T extends noop>(fn: T) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMemoizedFn expected parameter is a function, got ${typeof fn}`,
      );
    }
  }
  const fnRef = useRef<T>(fn);

  fnRef.current = fn;

  const memoizedFnRef = useRef<PickFunction<T>>();

  if (!memoizedFnRef.current) {
    memoizedFnRef.current = function(this, ...args: any[]) {
      return fnRef.current.call(this, ...args);
    };
  }

  return memoizedFnRef.current as T;
};

export default useMemoizedFn;
```
