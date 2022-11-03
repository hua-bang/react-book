---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 1
title: useSet
order: 2
---

# useSet

A hook that can manage the state of Set.

## Examples

### Default usage

```tsx
import React from 'react';
import useSet from './index.ts';

export default () => {
  const [set, { add, remove, reset }] = useSet(['Hello']);

  return (
    <div>
      <button type="button" onClick={() => add(String(Date.now()))}>
        Add Timestamp
      </button>
      <button
        type="button"
        onClick={() => remove('Hello')}
        disabled={!set.has('Hello')}
        style={{ margin: '0 8px' }}
      >
        Remove Hello
      </button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
      </div>
    </div>
  );
};
```

## API

```typescript
const [
  set,
  {
    add,
    remove,
    reset
  }
] = useSet(initialValue?: Iterable<K>);
```

### Result

| Property | Description      | Type                 |
| -------- | ---------------- | -------------------- |
| set      | Set object       | `Set`                |
| add      | Add item         | `(key: any) => void` |
| remove   | Remove item      | `(key: any) => void` |
| reset    | Reset to default | `() => void`         |

### Params

| Property     | Description                 | Type          | Default |
| ------------ | --------------------------- | ------------- | ------- |
| initialValue | Optional, set default value | `Iterable<K>` | -       |

## Code

```ts
import React, { useMemo, useState } from 'react';

interface Actions<T> {
  add: (val: T) => void;
  remove: (value: T) => void;
  reset: () => void;
}

const useSet = <T>(initialVal?: Iterable<T>) => {
  const getInitialVal = () =>
    initialVal === undefined ? new Set<T>() : new Set(initialVal);

  const [set, setSet] = useState<Set<T>>(() => getInitialVal());

  const actions: Actions<T> = useMemo(() => {
    const add = (val: T) => {
      if (set.has(val)) {
        return;
      }
      setSet(prev => {
        const tempSet = new Set(prev);
        tempSet.add(val);
        return tempSet;
      });
    };
    const remove = (val: T) => {
      if (!set.has(val)) {
        return;
      }
      setSet(prev => {
        const tempSet = new Set(prev);
        tempSet.delete(val);
        return tempSet;
      });
    };
    const reset = () => {
      setSet(() => getInitialVal());
    };
    return {
      add,
      remove,
      reset,
    };
  }, [initialVal]);

  return [set, actions];
};

export default useSet;
```
