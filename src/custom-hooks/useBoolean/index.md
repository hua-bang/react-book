---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useBoolean
order: 3
---# useBoolean

A hook that elegantly manages boolean state.

## Examples

### Default Usage

```tsx
import React from 'react';
import useBoolean from './index.ts';

export default () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

  return (
    <div>
      <p>Effects：{JSON.stringify(state)}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setFalse} style={{ margin: '0 16px' }}>
          Set false
        </button>
        <button type="button" onClick={setTrue}>
          Set true
        </button>
      </p>
    </div>
  );
};
```

## API

```typescript
const [ state, { toggle, set, setTrue, setFalse }] = useBoolean(
  defaultValue?: boolean,
);
```

### Params

| Property     | Description                               | Type      | Default |
| ------------ | ----------------------------------------- | --------- | ------- |
| defaultValue | The default value of the state. Optional. | `boolean` | `false` |

### Result

| Property | Description                            | Type      |
| -------- | -------------------------------------- | --------- |
| state    | Current value                          | `boolean` |
| actions  | A set of methods to update state value | `Actions` |

### Actions

| Property | Description          | Type                       |
| -------- | -------------------- | -------------------------- |
| toggle   | Toggle state         | `() => void`               |
| set      | Set state            | `(value: boolean) => void` |
| setTrue  | Set state to `true`  | `() => void`               |
| setFalse | Set state to `false` | `() => void`               |

### Code

```ts
import { useState, useMemo } from 'react';

interface Actions {
  toggle: () => void;
  set: (val: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
}

const useBoolean = (defaultValue: boolean) => {
  const [val, setVal] = useState<boolean>(defaultValue);

  const actions: Actions = useMemo(
    () => ({
      toggle: () => setVal(prev => !prev),
      set: setVal,
      setTrue: () => setVal(true),
      setFalse: () => setVal(false),
    }),
    [],
  );
  return [val, actions];
};

export default useBoolean;
```
