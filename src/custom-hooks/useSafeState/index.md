---
nav:
  title: Custom-Hooks
  path: /custom-hooks
group:
  title: State
  order: 4
title: useSafeState
order: 18
---

# useSafeState

用法与 React.useState 完全一样，但是在组件卸载后异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏。

## Examples

### Default Usage

```tsx
import useSafeState from './index.ts';
import React, { useEffect, useState } from 'react';

const Child = () => {
  const [value, setValue] = useSafeState<string>();

  useEffect(() => {
    setTimeout(() => {
      setValue('data loaded from server');
    }, 5000);
  }, []);

  const text = value || 'Loading...';

  return <div>{text}</div>;
};

export default () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(false)}>Unmount</button>
      {visible && <Child />}
    </div>
  );
};
```

## API

```typescript
const [state, setState] = useSafeState(initialState);
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
