---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useSetTimeout
order: 11
---

# useSetTimeout

A hook that handles the `setTimeout` timer function.

## Examples

### Default usage

```tsx
import React, { useState } from 'react';
import useTimeout from './index.ts';

export default () => {
  const [state, setState] = useState(1);
  useTimeout(() => {
    setState(state + 1);
  }, 3000);

  return <div>{state}</div>;
};
```

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: number | null
);
```

###Params

| Property | Description                                                                                                            | Type         |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | ------------ |
| fn       | The function to be executed after `delay` milliseconds.                                                                | `() => void` |
| delay    | The number of milliseconds to wait before executing the function. The timer will be cancelled if delay is `undefined`. | `number`     | `undefined` |

### code

```ts
import { useEffect } from 'react';
import useLatest from '../useLatest';

function useTimeout(fn: () => void, delay: number | undefined): void {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (typeof delay !== 'number' || delay <= 0) return;
    const timer = setTimeout(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);
}

export default useTimeout;
```
