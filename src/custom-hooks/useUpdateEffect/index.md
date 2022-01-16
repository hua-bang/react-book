---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useUpdateEffect
order: 19
---

# useUpdateEffect

A hook alike `useEffect` but skips running the effect for the first time.

## Examples

### Basic usage

```tsx
import React, { useEffect, useState } from 'react';
import useUpdateEffect from './index.ts';

export default () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);

  useEffect(() => {
    setEffectCount(c => c + 1);
  }, [count]);

  useUpdateEffect(() => {
    setUpdateEffectCount(c => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>effectCount: {effectCount}</p>
      <p>updateEffectCount: {updateEffectCount}</p>
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

The API is exactly the same as `React.useEffect`.

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
