---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useLockFn
order: 16
---

# useLockFn

Add lock to an async function to prevent parallel executions.

## Examples

### Basic usage

```tsx
import { message } from 'antd';
import React, { useState } from 'react';
import useLockFn from './index.ts';

function mockApiRequest() {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

export default () => {
  const [count, setCount] = useState(0);

  const submit = useLockFn(async () => {
    message.info('Start to submit');
    await mockApiRequest();
    setCount(val => val + 1);
    message.success('Submit finished');
  });

  return (
    <>
      <p>Submit count: {count}</p>
      <button onClick={submit}>Submit</button>
    </>
  );
};
```

## API

```typescript
function useLockFn<P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
): fn: (...args: P) => Promise<V | undefined>
```

### Result

| 参数 | 说明                         | 类型                               |
| ---- | ---------------------------- | ---------------------------------- |
| fn   | The async function with lock | `(...args: any[]) => Promise<any>` |

### Params

| 参数 | 说明              | 类型                               | 默认值 |
| ---- | ----------------- | ---------------------------------- | ------ |
| fn   | An async function | `(...args: any[]) => Promise<any>` | -      |
