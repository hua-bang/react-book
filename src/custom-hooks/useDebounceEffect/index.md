---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Effect
  order: 2
title: useDebounceEffect
order: 15
---

# useDebounceEffect

A hook that deal with the debounced function.

## Examples

### Default Usage

```tsx
import useDebounceEffect from './index.ts';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState('hello');
  const [records, setRecords] = useState<string[]>([]);
  useDebounceEffect(
    () => {
      setRecords(val => [...val, value]);
    },
    [value],
    {
      wait: 1000,
    },
  );
  return (
    <div>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>
        <ul>
          {records.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </p>
    </div>
  );
};
```

## API

```typescript
useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: Options
);
```

### Code

```ts
import { debounce } from 'lodash-es';
import { useMemo } from 'react';
import isDev from '../utils/isDev';
import { isFunction } from '../utils';
import useUnMount from '../useUnmount';
import useLatest from '../useLatest';

type noop = (...args: any[]) => any;

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

const useDebounceFn = <T extends noop>(fn: T, options?: DebounceOptions) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useDebounceFn expected parameter is a function, got ${typeof fn}`,
      );
    }
  }

  const fnRef = useLatest(fn);

  const wait = options?.wait || 1000;

  const debounceFn = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => fnRef.current(...args),
        wait,
        options,
      ),
    [],
  );

  useUnMount(() => {
    debounceFn.cancel();
  });

  return {
    run: debounceFn,
    cancel: () => debounceFn.cancel(),
    flush: () => debounceFn.flush(),
  };
};

export default useDebounceFn;
```
