---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Effect
  order: 2
title: useThrottleEffect
order: 15
---

# useThrottleEffect

Throttle your useEffect.

## Examples

### Default Usage

```tsx
import React, { useState } from 'react';
import useThrottleEffect from './index.ts';

export default () => {
  const [value, setValue] = useState('hello');
  const [records, setRecords] = useState<string[]>([]);
  useThrottleEffect(
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
useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: Options
);
```

### Code

```ts
import { DependencyList, EffectCallback, useEffect, useState } from 'react';
import useThrottleFn, { ThrottleOptions } from '../useThrottleFn';
import useUpdateEffect from '../useUpdateEffect';

const useThrottleEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) => {
  const [flag, setFlag] = useState({});

  const { run } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUpdateEffect(effect, [flag]);
};

export default useThrottleEffect;
```
