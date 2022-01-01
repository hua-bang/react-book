---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useLatest
order: 6
---

# useLatest

A Hook that returns the latest value, effectively avoiding the closure problem.

## Examples

### Why we need？

why we need this hook? Because closure problem.

### BAD CASES

```tsx
import React, { useState, useEffect } from 'react';
let prevFn;

const ClosureProblem = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>{count}</div>;
};

export default ClosureProblem;
```

# Basic usage

```tsx
import React, { useState, useEffect } from 'react';
import useLatest from './index.ts';

export default () => {
  const [count, setCount] = useState(0);

  const latestCountRef = useLatest(count);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(latestCountRef.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>count: {count}</p>
    </>
  );
};
```

## API

```typescript
const latestValueRef = useLatest<T>(value: T): MutableRefObject<T>;
```

### Code

```ts
import { useRef } from 'react';

const useLatest = <T>(value: T) => {
  const ref = useRef<T>(value);
  ref.current = value;

  return ref;
};

export default useLatest;
```
