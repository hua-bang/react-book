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

### Demo2

```tsx
import React, { useState } from 'react';
import useTimeout from './index.ts';

export default () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number | undefined>(1000);

  const clear = useTimeout(() => {
    setCount(count + 1);
  }, delay);

  return (
    <div>
      <p> count: {count} </p>
      <p style={{ marginTop: 16 }}> Delay: {delay} </p>
      <button
        onClick={() => setDelay(t => (!!t ? t + 1000 : 1000))}
        style={{ marginRight: 8 }}
      >
        Delay + 1000
      </button>
      <button
        style={{ marginRight: 8 }}
        onClick={() => {
          setDelay(1000);
        }}
      >
        reset Delay
      </button>
      <button onClick={clear}>clear</button>
    </div>
  );
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
