---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 4
title: useReactive
order: 15
---

# useReactive

It offers data reactivity when manipulating states and views, in which case useState is unnecessary for state definition. Modifying properties will automatically lead to view rerendering.

## Examples

### Default Usage

```tsx
import React from 'react';
import useReactive from './index.ts';

export default () => {
  const state = useReactive({
    count: 0,
    inputVal: '',
    obj: {
      value: '',
    },
  });

  return (
    <div>
      <p> state.count：{state.count}</p>

      <button style={{ marginRight: 8 }} onClick={() => state.count++}>
        state.count++
      </button>
      <button onClick={() => state.count--}>state.count--</button>

      <p style={{ marginTop: 20 }}> state.inputVal: {state.inputVal}</p>
      <input onChange={e => (state.inputVal = e.target.value)} />

      <p style={{ marginTop: 20 }}> state.obj.value: {state.obj.value}</p>
      <input onChange={e => (state.obj.value = e.target.value)} />
    </div>
  );
};
```

### Array

```tsx
import React from 'react';
import useReactive from './index.ts';

export default () => {
  const state = useReactive<{ arr: number[] }>({
    arr: [],
  });

  return (
    <div>
      <p>
        state.arr: <span role="test-array">{JSON.stringify(state.arr)}</span>
      </p>
      <button
        style={{ marginRight: '10px' }}
        onClick={() => state.arr.push(Math.floor(Math.random() * 100))}
        role="pushbtn"
      >
        push
      </button>
      <button
        style={{ marginRight: '10px' }}
        onClick={() => state.arr.pop()}
        role="popbtn"
      >
        pop
      </button>
      <button
        style={{ marginRight: '10px' }}
        onClick={() => state.arr.shift()}
        role="shiftbtn"
      >
        shift
      </button>
      <button
        style={{ marginRight: '10px' }}
        role="unshiftbtn"
        onClick={() => state.arr.unshift(Math.floor(Math.random() * 100))}
      >
        unshift
      </button>
      <button
        style={{ marginRight: '10px' }}
        role="reverse"
        onClick={() => state.arr.reverse()}
      >
        reverse
      </button>
      <button
        style={{ marginRight: '10px' }}
        role="sort"
        onClick={() => state.arr.sort()}
      >
        sort
      </button>
    </div>
  );
};
```

### Notice

```tsx
import React, { useEffect, useState } from 'react';
import useReactive from './index.ts';

export default () => {
  const state = useReactive({ count: 0 });
  const [stateCount, setStateCount] = useState(0);

  const state2 = useReactive({ count: 0 });
  const [stateCount2, setStateCount2] = useState(0);

  // Depends on the object, because it is always the same reference, it will not be executed
  useEffect(() => {
    setStateCount(stateCount + 1);
  }, [state]);

  // Depends on the underlying data type, so as long as it changes, it will be re-executed
  useEffect(() => {
    setStateCount2(stateCount2 + 1);
  }, [state2.count]);

  return (
    <div>
      <button style={{ marginTop: 20 }} onClick={() => (state.count += 1)}>
        stateCount + 1
      </button>
      <p>stateCount:{stateCount}</p>

      <button style={{ marginTop: 20 }} onClick={() => (state2.count += 1)}>
        stateCount2 + 1
      </button>
      <p>stateCount2:{stateCount2}</p>
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
import { useCallback, useState } from 'react';

const useResetState = <S>(initState: S | (() => S)) => {
  const [state, setState] = useState<S>(initState);

  const resetState = useCallback(() => {
    setState(initState);
  }, []);

  return [state, setState, resetState];
};

export default useResetState;
```
