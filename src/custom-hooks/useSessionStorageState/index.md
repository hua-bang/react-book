---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 1
title: useSessionStorageState
order: 5
---

# useSessionStorageState

A Hook for store state into sessionStorage.

## Examples

### Store state into localStorage

```tsx
import React from 'react';
import useSessionStorageState from './index.ts';

export default function() {
  const [message, setMessage] = useSessionStorageState(
    'use-session-storage-state-demo1',
    {
      defaultValue: 'Hello~',
    },
  );

  return (
    <>
      <input
        value={message || ''}
        placeholder="Please enter some words..."
        onChange={e => setMessage(e.target.value)}
      />
      <button
        style={{ margin: '0 8px' }}
        type="button"
        onClick={() => setMessage('Hello~')}
      >
        Reset
      </button>
      <button type="button" onClick={() => setMessage()}>
        Clear
      </button>
    </>
  );
}
```

### Store complex types of data

```tsx
import React from 'react';
import useSessionStorageState from './index.ts';

const defaultArray = ['a', 'e', 'i', 'o', 'u'];

export default function() {
  const [value, setValue] = useSessionStorageState(
    'use-session-storage-state-demo2',
    {
      defaultValue: defaultArray,
    },
  );

  return (
    <>
      <p>{value.join('-')}</p>
      <button
        type="button"
        style={{ marginRight: '16px' }}
        onClick={() =>
          setValue([
            ...value,
            Math.random()
              .toString(36)
              .slice(-1),
          ])
        }
      >
        push random
      </button>
      <button type="button" onClick={() => setValue(defaultArray)}>
        reset
      </button>
    </>
  );
}
```

### Custom serialization and deserialization functions

```tsx
import React from 'react';
import useSessionStorageState from './index.ts';

export default function() {
  const [message, setMessage] = useSessionStorageState(
    'use-session-storage-state-demo3',
    {
      defaultValue: 'Hello~',
      serializer: v => v,
      deserializer: v => v,
    },
  );

  return (
    <>
      <input
        value={message || ''}
        placeholder="Please enter some words..."
        onChange={e => setMessage(e.target.value)}
      />
      <button
        style={{ margin: '0 8px' }}
        type="button"
        onClick={() => setMessage('Hello~')}
      >
        Reset
      </button>
      <button type="button" onClick={() => setMessage()}>
        Clear
      </button>
    </>
  );
}
```

## API

If you want to delete this record from localStorage, you can use setState() or setState(undefined).

```typescript
interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

const [state, setState] = useSessionStorageState<T>(
  key: string,
  options: Options<T>
): [T?, (value?: T | ((previousState: T) => T)) => void]
```

### Options

| Property     | Description                   | Type                     | Default          |
| ------------ | ----------------------------- | ------------------------ | ---------------- |
| defaultValue | Default value                 | `any | (() => any)`      | -                |
| serializer   | Custom serialization method   | `(value: any) => string` | `JSON.stringify` |
| deserializer | Custom deserialization method | `(value: string) => any` | `JSON.parse`     |

## Remark

useLocalStorageState will call `serializer` before write data to localStorage, and call `deserializer` once after read data.
