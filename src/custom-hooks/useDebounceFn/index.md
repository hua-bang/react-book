---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Effect
  order: 2
title: useDebounceFn
order: 14
---

# useDebounceFn

A hook that deal with the debounced function.

## Examples

### Default Usage

```tsx
import Demo1 from './demo/demo1.tsx';
import React, { useState } from 'react';

export default () => {
  return <Demo1 />;
};
```

## API

```typescript
const {
  run,
  cancel,
  flush
} = useDebounceFn(
  fn: (...args: any[]) => any,
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
