---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 3
title: useSetState
order: 1
---

# useSetState

useSetState works similar to `this.setState` of class component, used to manage the state of object type.

## Examples

### Default usage

```tsx
import React from 'react';
import useSetState from './index.ts';

interface State {
  hello: string;
  count: number;
  [key: string]: any;
}

export default () => {
  const [state, setState] = useSetState<State>({
    hello: '',
    count: 0,
  });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <button type="button" onClick={() => setState({ hello: 'world' })}>
          set hello
        </button>
        <button
          type="button"
          onClick={() => setState({ foo: 'bar' })}
          style={{ margin: '0 8px' }}
        >
          set foo
        </button>
        <button
          type="button"
          onClick={() => setState(prev => ({ count: prev.count + 1 }))}
        >
          count + 1
        </button>
      </p>
    </div>
  );
};
```

## API

```typescript
const [state, setState] = useSetState<T extends Record<string, any>>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void]
```

### code

```ts
import { useCallback, useState } from 'react';
import { isFunction } from '@/utils';

export type SetState<S extends Record<string, any>> = (
  state: Partial<S> | ((prev: S) => S),
) => void;

const useSetState = <S extends Record<string, any>>(
  initialVal: S | (() => S),
): [S, SetState<S>] => {
  const [state, setState] = useState(initialVal);
  const setMergeState: SetState<S> = useCallback(patch => {
    setState(prevState => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};

export default useSetState;
```
