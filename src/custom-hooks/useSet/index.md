---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 1
title: useSet
order: 13
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
import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

interface Actions<T> {
  add: (key: T) => void;
  remove: (key: T) => void;
  reset: () => void;
}

const useSet = <T>(initialValue: Iterable<T>): [Set<T>, Actions<T>] => {
  const getInitialVal = () => {
    return initialValue === undefined ? new Set<T>() : new Set(initialValue);
  };

  const [set, setSet] = useState(() => getInitialVal());

  const add = (key: T) => {
    if (set.has(key)) {
      return;
    }
    setSet(prevSet => {
      const temp = new Set(prevSet);
      temp.add(key);
      return temp;
    });
  };

  const remove = (key: T) => {
    if (!set.has(key)) {
      return;
    }
    setSet(prevSet => {
      const temp = new Set(prevSet);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => setSet(() => getInitialVal());

  const actions: Actions<T> = {
    add: useMemoizedFn(add),
    remove: useMemoizedFn(remove),
    reset: useMemoizedFn(reset),
  };

  return [set, actions];
};

export default useSet;
```
