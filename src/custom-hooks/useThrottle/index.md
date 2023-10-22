---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 3
title: useThrottle
order: 20
---

# useThrottle

A hook that deal with the throttled value.

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
const throttledValue = useThrottle(
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
import { useState } from 'react';
import { ThrottleOptions } from '../useThrottleFn';
import useThrottleEffect from '../useThrottleEffect';

const useThrottle = <T>(value: T, options?: ThrottleOptions) => {
  const [throttleValue, setThrottleValue] = useState<T>(value);

  useThrottleEffect(
    () => {
      setThrottleValue(value);
    },
    [value],
    options,
  );

  return throttleValue;
};

export default useThrottle;
```
