---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 1
title: useResetState
order: 15
---

# useResetState

useResetState works similar to `React.useState`, it provides a reset method

## Examples

### Default Usage

```tsx
import React from 'react';
import useResetState from './index.ts';

interface State {
  hello: string;
  count: number;
}

export default () => {
  const [state, setState, resetState] = useResetState<State>({
    hello: '',
    count: 0,
  });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <button
          type="button"
          style={{ marginRight: '8px' }}
          onClick={() => setState({ hello: 'world', count: 1 })}
        >
          set hello and count
        </button>

        <button type="button" onClick={resetState}>
          resetState
        </button>
      </p>
    </div>
  );
};
```

## API

```typescript
const [state, setState, resetState] = useResetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, () => void];
```

### Code

```ts
import { useState, SetStateAction } from 'react';

const useResetState = <S>(
  initialState: S | (() => S),
): [S, React.Dispatch<SetStateAction<S>>, () => void] => {
  const [state, setState] = useState(initialState);

  const resetState = () => {
    setState(initialState);
  };

  return [state, setState, resetState];
};

export default useResetState;
```
