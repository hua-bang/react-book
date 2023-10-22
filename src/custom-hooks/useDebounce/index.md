---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 3
title: useDebounce
order: 1
---

# useDebounce

A hook that deal with the debounced value.

## Examples

### Default usage

```tsx
import React, { useState } from 'react';
import Demo1 from './demo/demo1.tsx';

export default () => {
  return <Demo1 />;
};
```

## API

```typescript
const debouncedValue = useDebounce(
  value: any,
  options?: Options
);
```

### Params

| Property | Description                    | Type      | Default |
| -------- | ------------------------------ | --------- | ------- |
| value    | The value to debounce          | `any`     | `-`     |
| options  | Config the debounce behaviors. | `Options` | `-`     |

### Options

| Property | Description                    | Type      | Default |
| -------- | ------------------------------ | --------- | ------- |
| wait     | The value to debounce          | `any`     | `-`     |
| options  | Config the debounce behaviors. | `Options` | `-`     |

### code

```ts
import { useRef, useState } from 'react';
import useDebounceEffect from '../useDebounceEffect';
import { DebounceOptions } from '../useDebounceFn';

const useDebounce = <T>(value: T, options: DebounceOptions): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useDebounceEffect(
    () => {
      setDebounced(value);
    },
    [value],
    options,
  );

  return debounced;
};

export default useDebounce;
```
