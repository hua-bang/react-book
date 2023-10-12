import { useRef, MutableRefObject } from 'react';

function useLatest<T>(value: T): MutableRefObject<T> {
  const ref = useRef<T>(value);

  ref.current = value;

  return ref;
}

export default useLatest;
