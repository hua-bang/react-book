---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useToggle
order: 7
---

# useToggle

A hook that toggle states.

## Examples

### Default usage

```tsx
import React from 'react';
import useToggle from './index.ts';

export default () => {
  const [state, { toggle, setLeft, setRight }] = useToggle();

  return (
    <div>
      <p>Effects：{`${state}`}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setLeft} style={{ margin: '0 8px' }}>
          Toggle False
        </button>
        <button type="button" onClick={setRight}>
          Toggle True
        </button>
      </p>
    </div>
  );
};
```

### Advanced usage

```tsx
import React from 'react';
import useToggle from './index.ts';

export default () => {
  const [state, { toggle, set, setLeft, setRight }] = useToggle(
    'Hello',
    'World',
  );

  return (
    <div>
      <p>Effects：{state}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button
          type="button"
          onClick={() => set('Hello')}
          style={{ margin: '0 8px' }}
        >
          Set Hello
        </button>
        <button type="button" onClick={() => set('World')}>
          Set World
        </button>
        <button type="button" onClick={setLeft} style={{ margin: '0 8px' }}>
          Set Left
        </button>
        <button type="button" onClick={setRight}>
          Set Right
        </button>
      </p>
    </div>
  );
};
```

## API

```typescript
const [state, { toggle, set, setLeft, setRight }] = useToggle(defaultValue?: boolean);
const [state, { toggle, set, setLeft, setRight }] = useToggle<T>(defaultValue: T);
const [state, { toggle, set, setLeft, setRight }] = useToggle<T, U>(defaultValue: T, reverseValue: U)
```

### Params

| Property     | Description                 | Type | Default |
| ------------ | --------------------------- | ---- | ------- |
| defaultValue | The default value. Optional | `T`  | `false` |
| reverseValue | The reverse value. Optional | `U`  | -       |

### Result

| Property | Description                            | Type      |
| -------- | -------------------------------------- | --------- |
| state    | Current state                          | -         |
| actions  | A set of methods to update state value | `Actions` |

### Actions

| Property | Description                                                                                                   | Type                     |
| -------- | ------------------------------------------------------------------------------------------------------------- | ------------------------ |
| toggle   | Toggle state                                                                                                  | `() => void`             |
| set      | Set state                                                                                                     | `(state: T | U) => void` |
| setLeft  | Set state to `defaultValue`                                                                                   | `() => void`             |
| setRight | Set state to `reverseValue` if `reverseValue` is available. Otherwise set it to the reverse of `defaultValue` | `() => void`             |

### Code

```ts
import { useMemo, useState } from 'react';

interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (val: T) => void;
  toggle: () => void;
}

function useToggle<T = boolean>(): [boolean, Actions<T>];

function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(
  defaultValue: T,
  reverseValue: U,
): [T | U, Actions<T | U>];

function useToggle<D, R>(
  defaultValue: D = (false as unknown) as D,
  reverseValue?: R,
) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions: Actions<D | R> = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined
      ? !defaultValue
      : reverseValue) as D | R;

    const toggle = () =>
      setState(s => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const set = (value: D | R) => setState(value);
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
  }, []);

  return [state, actions];
}

export default useToggle;
```
