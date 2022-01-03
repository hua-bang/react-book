import { useRef } from 'react';

export type ShouldUpdateFunc<T> = (prev: T | undefined, curr: T) => boolean;

const defaultShouldUpdate = <T>(a?: T, b?: T) => a !== b;

const usePrevious = <T>(
  state: T,
  shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate,
) => {
  const currRef = useRef<T>();
  const prevRef = useRef<T>();

  if (shouldUpdate(currRef.current, state)) {
    prevRef.current = currRef.current;
    currRef.current = state;
  }

  return prevRef.current;
};

export default usePrevious;
