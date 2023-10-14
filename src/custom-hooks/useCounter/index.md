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
  const [current, { inc, dec, set, reset }] = useCounter(10, {
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
import { useCallback, useEffect, useMemo, useState } from 'react';
import isDev from '../utils/isDev';
import { isFunction } from '../utils';

export interface useCounterOptions {
  min?: number;
  max?: number;
}

export interface useCounterActions {
  inc: () => void;
  dec: () => void;
  set: React.Dispatch<React.SetStateAction<number>>;
  reset: () => void;
}

const checkValValidate = (value: number, options?: useCounterOptions) => {
  if (!options) {
    return true;
  }

  const { min, max } = options;

  if (
    (min !== undefined && min > value) ||
    (max !== undefined && max < value)
  ) {
    return false;
  }

  return true;
};

const checkInitialVal = (initialVal?: number, options?: useCounterOptions) => {
  if (!isDev) {
    return;
  }

  if (initialVal === undefined || !options) {
    return;
  }

  const validateRes = checkValValidate(initialVal, options);

  if (!validateRes) {
    console.log('Your initialVal is invalidate');
  }
};

const useCounter = (initialVal = 0, options?: useCounterOptions) => {
  const [count, setCount] = useState(initialVal || 0);

  const setCountProxy: React.Dispatch<React.SetStateAction<
    number
  >> = useCallback(patch => {
    setCount(prevState => {
      const newState = isFunction(patch) ? patch(prevState) : patch;

      const newStateValidate = checkValValidate(newState, options);

      return newStateValidate ? newState : prevState;
    });
  }, []);

  const actions: useCounterActions = useMemo(
    () => ({
      inc: () => setCountProxy(prev => prev + 1),
      dec: () => setCountProxy(prev => prev - 1),
      set: setCountProxy,
      reset: () => setCountProxy(initialVal),
    }),
    [],
  );

  useEffect(() => {
    checkInitialVal(initialVal, options);
  }, []);

  return [count, actions];
};

export default useCounter;
```
