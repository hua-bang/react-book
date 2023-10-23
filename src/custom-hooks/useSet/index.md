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
import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

interface Actions<T> {
  add: (key: T) => void;
  remove: (key: T) => void;
  reset: () => void;
}

const useSet = <T>(initialValue?: Iterable<T>): [Set<T>, Actions<T>] => {
  const getInitValue = () => new Set<T>(initialValue);

  const [set, setSet] = useState<Set<T>>(getInitValue);

  const add = (key: T) => {
    setSet(prev => {
      const tempSet = new Set(prev);
      tempSet.add(key);
      return tempSet;
    });
  };

  const remove = (key: T) => {
    setSet(prev => {
      const tempSet = new Set(prev);
      tempSet.delete(key);
      return tempSet;
    });
  };

  const reset = () => {
    setSet(getInitValue);
  };

  const actions: Actions<T> = {
    add: useMemoizedFn(add),
    remove: useMemoizedFn(remove),
    reset: useMemoizedFn(reset),
  };

  return [set, actions];
};

export default useSet;
```
