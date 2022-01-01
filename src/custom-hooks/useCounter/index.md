---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useCounter
order: 5
---

# useCounter

A hook that manage counter.

## Examples

### Default usage

```tsx
import React from 'react';
import useCounter from './index.ts';

export default () => {
  const [current, { inc, dec, set, reset }] = useCounter(100, {
    min: 1,
    max: 10,
  });

  return (
    <div>
      <p>{current} [max: 10; min: 1;]</p>
      <div>
        <button
          type="button"
          onClick={() => {
            inc();
          }}
          style={{ marginRight: 8 }}
        >
          inc()
        </button>
        <button
          type="button"
          onClick={() => {
            dec();
          }}
          style={{ marginRight: 8 }}
        >
          dec()
        </button>
        <button
          type="button"
          onClick={() => {
            set(3);
          }}
          style={{ marginRight: 8 }}
        >
          set(3)
        </button>
        <button type="button" onClick={reset} style={{ marginRight: 8 }}>
          reset()
        </button>
      </div>
    </div>
  );
};
```

## API

```typescript
const [current, { inc, dec, set, reset }] = useCounter(initialValue, {
  min,
  max,
});
```

### Result

| Property | Description                          | Type                       |
| -------- | ------------------------------------ | -------------------------- |
| current  | Current value                        | `number`                   |
| inc      | Increment, default delta is 1        | `(delta?: number) => void` |
| dec      | Decrement, default delta is 1        | `(delta?: number) => void` |
| set      | Set current value                    | `(value: number`           | `((c: number) => number)) => void` |
| reset    | Reset current value to initial value | `() => void`               |

### Params

| Property     | Description   | Type     | Default |
| ------------ | ------------- | -------- | ------- |
| initialValue | Initial count | `number` | `0`     |
| min          | Min count     | `number` | -       |
| max          | Max count     | `number` | -       |

### Code

```ts
import { useState } from 'react';

interface Options {
  max: number;
  min: number;
}

export interface Actions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  set: (value: number | ((c: number) => number)) => void;
  reset: () => void;
}

export type ValueParam = number | ((c: number) => number);

function getTargetValue(val: number, options: Options) {
  const { min, max } = options;
  let target = val;

  if (max !== undefined) {
    target = Math.min(max, target);
    console.log(target);
  }
  if (min !== undefined) {
    target = Math.max(min, target);
  }

  return target;
}

const useCounter = (initialVal = 0, options: Options) => {
  const { min, max } = options;

  const [count, setCount] = useState<number>(() => {
    return getTargetValue(initialVal, {
      min,
      max,
    });
  });

  const setValue = (value: ValueParam) => {
    setCount(prev => {
      const target = typeof value === 'number' ? value : value(prev);
      return getTargetValue(target, {
        max,
        min,
      });
    });
  };

  const inc = (delta: number = 1) => {
    setValue(prev => prev + delta);
  };

  const dec = (delta: number = 1) => {
    setValue(prev => prev - delta);
  };

  const set = (value: ValueParam) => {
    setValue(value);
  };

  const reset = () => {
    setValue(initialVal);
  };

  const actions: Actions = {
    inc,
    dec,
    set,
    reset,
  };

  return [count, actions];
};

export default useCounter;
```
