---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useUnmount
order: 2
---

# useMount

A hook that executes a function after the component is unmounted.

## Examples

### Default Usage

```tsx
import useUnmount from './index.ts';
import React, { useState } from 'react';
import { message } from 'antd';
import 'antd/dist/antd.css';

const MyComponent = () => {
  useUnmount(() => {
    message.success('unMount');
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
