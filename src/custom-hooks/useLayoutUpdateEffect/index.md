---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useLayoutUpdateEffect
order: 21
---

# useLayoutUpdateEffect

A hook alike `useLayoutEffect` but skips running the effect for the first time.

## Examples

### Basic usage

```tsx
import React, { useLayoutEffect, useState } from 'react';
import useUpdateLayoutEffect from './index.ts';

export default () => {
  const [count, setCount] = useState(0);
  const [layoutEffectCount, setLayoutEffectCount] = useState(0);
  const [updateLayoutEffectCount, setUpdateLayoutEffectCount] = useState(0);

  useLayoutEffect(() => {
    setLayoutEffectCount(c => c + 1);
  }, [count]);

  useUpdateLayoutEffect(() => {
    setUpdateLayoutEffectCount(c => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>layoutEffectCount: {layoutEffectCount}</p>
      <p>updateLayoutEffectCount: {updateLayoutEffectCount}</p>
      <p>
        <button type="button" onClick={() => setCount(c => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
```

## API

The API is exactly the same as `React.useLayoutEffect`.

```typescript
useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
)
```

## Code

```ts
import { useRef, useEffect, useLayoutEffect } from 'react';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect: (
  hook: EffectHookType,
) => EffectHookType = hook => (effect, deps) => {
  const isMounted = useRef(false);

  hook(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  hook(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default createUpdateEffect;
```
