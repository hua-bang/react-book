---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useMount
order: 1
---

# useMount

A hook that executes a function after the component is mounted.

## Examples

### Default Usage

```tsx
import useMount from './index.ts';
import React, { useState } from 'react';
import { message } from 'antd';
import 'antd/dist/antd.css';

const MyComponent = () => {
  useMount(() => {
    message.success('mount');
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
useMount(fn: () => void);
```

### Params

| Property | Description                 | Type         | Default |
| -------- | --------------------------- | ------------ | ------- |
| fn       | The function to be executed | `() => void` | -       |

### Code

```ts
import { useEffect } from 'react';

const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
  }, []);
};

export default useMount;
```
