import { useRef } from 'react';
import isDev from '../utils/isDev';
import { isFunction } from '../utils';

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

const useMemoizedFn = <T extends noop>(fn: T) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useMemoizedFn expected parameter is a function, got ${typeof fn}`,
      );
    }
  }
  const fnRef = useRef<T>(fn);

  fnRef.current = fn;

  const memoizedFnRef = useRef<PickFunction<T>>();

  if (!memoizedFnRef.current) {
    memoizedFnRef.current = function(this, ...args: any[]) {
      return fnRef.current.call(this, ...args);
    };
  }

  return memoizedFnRef.current as T;
};

export default useMemoizedFn;
