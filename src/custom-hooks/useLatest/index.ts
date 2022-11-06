import { useRef, MutableRefObject } from 'react';

const useLatest = <T>(val: T): MutableRefObject<T> => {
  const ref = useRef<T>(val);
  ref.current = val;

  return ref;
};

export default useLatest;
