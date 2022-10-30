---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useUnmountRef
order: 21
---

# useUnmountRef

A hook can be used to get whether the components is unmounted.

## Examples

### Default Usage

```tsx
import useUnmountedRef from './index.ts';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import 'antd/dist/antd.css';

const MyComponent = () => {
  const unmountedRef = useUnmountedRef();
  useEffect(() => {
    setTimeout(() => {
      if (!unmountedRef.current) {
        message.info('component is alive');
      }
    }, 3000);
  }, []);

  return <p>Hello World!</p>;
};

export default () => {
  const [state, setState] = useState(true);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setState(prev => !prev);
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
const unmountRef: { current: boolean } = useUnmountedRef();
```

### Result

| Property   | Description                        | Type                   | Default |
| ---------- | ---------------------------------- | ---------------------- | ------- |
| unmountRef | Whether the component is unmounted | `{ current: boolean }` | -       |

### Code

```ts
import { useEffect, useRef } from 'react';

const useUnmountedRef = () => {
  const unmountedRef = useRef<boolean>(false);
  useEffect(() => {
    unmountedRef.current = true;
    return () => {
      unmountedRef.current = false;
    };
  }, []);
};

export default useUnmountedRef;
```
