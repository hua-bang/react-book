---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: Custom-Hooks
  order: 1
title: useUpdate
order: 14
---

# useUpdate

A hook that returns a function which can be used to force the component to re-render.

## Examples

### Default Usage

```tsx
import React from 'react';
import useUpdate from './index.ts';

export default () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <button type="button" onClick={update} style={{ marginTop: 8 }}>
        update
      </button>
    </>
  );
};
```

## API

```typescript
const update = useUpdate();
```

### Code

```ts
import { useState, useCallback } from 'react';

const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export default useUpdate;
```
