import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../useLatest';

const useTimeout = (fn: () => void, delay: number) => {
  const fnRef = useLatest(fn);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      fnRef.current?.();
    }, delay);

    timerRef.current = timeId;

    return clear;
  }, [delay]);

  return clear;
};

export default useTimeout;
