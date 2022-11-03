---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 1
title: useMap
order: 3
---

# useMap

A hook that can manage the state of Map.

## Examples

### Default usage

```tsx
import React from 'react';
import useMap from './index.ts';

export default () => {
  const [map, { set, setAll, remove, reset, get }] = useMap<
    string | number,
    string
  >([
    ['msg', 'hello world'],
    [123, 'number type'],
  ]);

  return (
    <div>
      <button
        type="button"
        onClick={() => set(String(Date.now()), new Date().toJSON())}
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => setAll([['text', 'this is a new Map']])}
        style={{ margin: '0 8px' }}
      >
        Set new Map
      </button>
      <button
        type="button"
        onClick={() => remove('msg')}
        disabled={!get('msg')}
      >
        Remove 'msg'
      </button>
      <button type="button" onClick={() => reset()} style={{ margin: '0 8px' }}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>
    </div>
  );
};
```

## API

```typescript
const [
  map,
  {
    set,
    setAll,
    remove,
    reset,
    get
  }
] = useMap(initialValue?: Iterable<[any, any]>);
```

### Result

| Property | Description      | Type                                     |
| -------- | ---------------- | ---------------------------------------- |
| map      | Map object       | `Map`                                    |
| set      | Add item         | `(key: any, value: any) => void`         |
| get      | Get item         | `(key: any) => MapItem`                  |
| setAll   | Set a new Map    | `(newMap: Iterable<[any, any]>) => void` |
| remove   | Remove item      | `(key: any) => void`                     |
| reset    | Reset to default | `() => void`                             |

### Params

| Property     | Description                 | Type                   | Default |
| ------------ | --------------------------- | ---------------------- | ------- |
| initialValue | Optional, set default value | `Iterable<[any, any]>` | -       |

## Code

```ts
import { useState, useMemo } from 'react';

interface Actions<K, T> {
  set: (key: K, val: T) => void;
  setAll: (newMap: Iterable<readonly [K, T]>) => void;
  remove: (key: K) => void;
  reset: () => void;
  get: (key: K) => T | undefined;
}

function useMap<K, T>(initialVal?: Iterable<readonly [K, T]>) {
  const getInitialVal = () =>
    initialVal === undefined ? new Map<K, T>() : new Map(initialVal);

  const [map, setMap] = useState(() => getInitialVal());

  const actions: Actions<K, T> = useMemo(() => {
    const set = (key: K, val: T) => {
      setMap(prev => {
        const newMap = new Map(prev);
        newMap.set(key, val);
        return newMap;
      });
    };

    const setAll = (newMap: Iterable<readonly [K, T]>) => {
      setMap(new Map(newMap));
    };

    const remove = (key: K) => {
      setMap(prev => {
        const newMap = new Map(prev);
        newMap.delete(key);
        return newMap;
      });
    };

    const reset = () => {
      setMap(() => getInitialVal());
    };

    const get = (key: K) => map.get(key);

    return {
      set,
      get,
      setAll,
      remove,
      reset,
    };
  }, [initialVal]);

  return [map, actions];
}

export default useMap;
```
