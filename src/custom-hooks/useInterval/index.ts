import { useCallback, useEffect, useRef } from 'react';
import useLatest from '../useLatest';

const useInterval = (fn: () => void, delay: number) => {
  const fnRef = useLatest(fn);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  }, []);

  useEffect(() => {
    const timeId = setInterval(() => {
      fnRef.current?.();
    }, delay);

    timeRef.current = timeId;

    return clear;
  }, [delay]);
};

export default useInterval;
