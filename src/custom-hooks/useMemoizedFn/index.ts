import { useMemo, useRef } from 'react';

type noop = (...args: any[]) => any;

function useMemoized<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);

  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<T>();

  if (!memoizedFn.current) {
    memoizedFn.current = function(this: unknown, ...args) {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      return fnRef.current.apply(this, args);
    } as T;
  }

  return memoizedFn.current;
}

export default useMemoized;
