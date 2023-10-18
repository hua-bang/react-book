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
