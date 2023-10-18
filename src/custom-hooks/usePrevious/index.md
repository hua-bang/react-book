---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 1
title: usePrevious
order: 12
---

# usePrevious

A Hook to return the previous state.

## Examples

### Default usage

```tsx
import React, { useState } from 'react';
import usePrevious from './index.ts';

export default () => {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);
  return (
    <>
      <div>counter current value: {count}</div>
      <div style={{ marginBottom: 8 }}>counter previous value: {previous}</div>
      <button type="button" onClick={() => setCount(c => c + 1)}>
        increase
      </button>
      <button
        type="button"
        style={{ marginLeft: 8 }}
        onClick={() => setCount(c => c - 1)}
      >
        decrease
      </button>
    </>
  );
};
```

### Custom shouldUpdate function

```tsx
import React, { useState } from 'react';
import usePrevious from './index.ts';

interface Person {
  name: string;
  job: string;
}

const nameCompareFunction = (prev: Person | undefined, next: Person) => {
  if (!prev) {
    return true;
  }
  if (prev.name !== next.name) {
    return true;
  }
  return false;
};

const jobCompareFunction = (prev: Person | undefined, next: Person) => {
  if (!prev) {
    return true;
  }
  if (prev.job !== next.job) {
    return true;
  }
  return false;
};

export default () => {
  const [state, setState] = useState({ name: 'Jack', job: 'student' });
  const [nameInput, setNameInput] = useState('');
  const [jobInput, setJobInput] = useState('');
  const previousName = usePrevious(state, nameCompareFunction);
  const previousJob = usePrevious(state, jobCompareFunction);

  return (
    <>
      <div style={{ margin: '8px 0', border: '1px solid #e8e8e8', padding: 8 }}>
        <div>current name: {state.name}</div>
        <div>current job: {state.job}</div>
      </div>
      <div>previous name: {(previousName || {}).name}</div>
      <div style={{ marginBottom: 8 }}>
        previous job: {(previousJob || {}).job}
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          style={{ width: 220 }}
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          placeholder="new name"
        />
        <button
          type="button"
          onClick={() => {
            setState(s => ({ ...s, name: nameInput }));
          }}
          style={{ marginLeft: 8 }}
        >
          update
        </button>
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          style={{ width: 220 }}
          value={jobInput}
          onChange={e => setJobInput(e.target.value)}
          placeholder="new job"
        />
        <button
          type="button"
          onClick={() => {
            setState(s => ({ ...s, job: jobInput }));
          }}
          style={{ marginLeft: 8 }}
        >
          update
        </button>
      </div>
    </>
  );
};
```

## API

```typescript
const previousState: T = usePrevious<T>(
  state: T,
  shouldUpdate?: (prev: T | undefined, next: T) => boolean
);
```

### Result

| Property      | Description        | Type |
| ------------- | ------------------ | ---- |
| previousState | The previous value | `T`  |

### Params

| Property     | Description                                                   | Type                                        | Default             |
| ------------ | ------------------------------------------------------------- | ------------------------------------------- | ------------------- |
| state        | The state that needs to be tracked                            | `T`                                         | -                   |
| shouldUpdate | Optional. Customize whether the state value should be updated | `(prev: T | undefined, next: T) => boolean` | `(a, b) => a !== b` |

### code

```ts
import { useRef } from 'react';

interface ShouldUpdateFn<T> {
  (a: T, b: T): boolean;
}

const defaultShouldUpdate = <T>(a: T, b: T) => a !== b;

const usePrevious = <T>(
  val: T,
  shouldUpdate: ShouldUpdateFn<T> = defaultShouldUpdate,
): T | undefined => {
  const prefRef = useRef<T>();
  const currentRef = useRef<T>(val);

  if (shouldUpdate(currentRef.current, val)) {
    prefRef.current = currentRef.current;
    currentRef.current = val;
  }

  return prefRef.current;
};

export default usePrevious;
```
