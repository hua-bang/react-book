---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useInterval
order: 9
---

# useInterval

A hook that handles the `setInterval` timer function.

#### Base Case

when we use `useState` & `useEffect` wants to implement the interval(to add count), you always get this problem, it's cased by closure.

```tsx
import React, { useState, useEffect } from 'react';

export default () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setCount(count + 1);
    });
    return () => {
      clearInterval(time);
    };
  }, []);

  return <div> count: {count}</div>;
};
```

So now we implement a hook to avoid the problem.

## Examples

### Default usage

```tsx
import React, { useState } from 'react';
import useInterval from './index.ts';

export default () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <div>count: {count}</div>;
};
```

### Advance usage

```tsx
import React, { useState } from 'react';
import useInterval from './index.ts';

export default () => {
  const [count, setCount] = useState(0);
  const [interval, setInterval] = useState(1000);

  useInterval(() => {
    setCount(count + 1);
  }, interval);

  return (
    <div>
      <p> count: {count} </p>
      <p style={{ marginTop: 16 }}> interval: {interval} </p>
      <button
        onClick={() => setInterval(t => (!!t ? t + 1000 : 1000))}
        style={{ marginRight: 8 }}
      >
        interval + 1000
      </button>
      <button
        style={{ marginRight: 8 }}
        onClick={() => {
          setInterval(1000);
        }}
      >
        reset interval
      </button>
      <button
        onClick={() => {
          setInterval(undefined);
        }}
      >
        clear
      </button>
    </div>
  );
};
```

## API

```typescript
useInterval(
  fn: () => void,
  interval?: number | null,
  immediate: boolean,
);
```

### Params

| Property  | Description                                                                                                                                                   | Type         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| fn        | The function to be executed every `delay` milliseconds.                                                                                                       | `() => void` |
| delay     | The time in milliseconds, the timer should delay in between executions of the specified function. The timer will be cancelled if delay is set to `undefined`. | `number`     | `undefined` |
| immediate | immediate                                                                                                                                                     | boolean      |

### code

```ts
import { useEffect } from 'react';
import useLatest from '../useLatest';

const useInterval = (
  fn: (...args: any[]) => void,
  delay = 0,
  immediate = false,
) => {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (!delay) {
      return;
    }
    if (immediate) {
      fnRef.current();
    }
    const timer = setInterval(() => {
      fnRef.current();
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [delay]);
};

export default useInterval;
```
