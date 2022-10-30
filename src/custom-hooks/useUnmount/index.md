---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Life Cycle
  order: 2
title: useUnmount
order: 2
---

# useUnmount

A hook that executes a function after the component is unmounted.

## Examples

### Default Usage

```tsx
import useUnmount from './index.ts';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import 'antd/dist/antd.css';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev + 1);
    }, 200);
    return () => {
      clearInterval(id);
    };
  }, []);

  useUnmount(() => {
    message.success(`unMount, ${count}.`);
  });

  return <div>Hello World</div>;
};

export default () => {
  const [state, setState] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setState(!state);
        }}
      >
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
```

## API

```typescript
useUnmount(fn: () => void);
```

### Params

| Property | Description                 | Type         | Default |
| -------- | --------------------------- | ------------ | ------- |
| fn       | The function to be executed | `() => void` | -       |

### Code

```ts
import { useEffect } from 'react';

const useUnmount = (fn: () => void) => {
  useEffect(
    () => fn
    [],
  );
};

export default useUnmount;
```
