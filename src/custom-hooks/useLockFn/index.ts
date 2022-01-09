import { useRef, useCallback } from 'react';

const useLockFn = <P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>,
) => {
  const lockRef = useRef(false);

  const lockFn = useCallback(
    async (...args: P) => {
      if (lockRef.current) {
        return;
      }
      lockRef.current = true;
      try {
        const ret = await fn(...args);
        return ret;
      } catch (err) {
        throw err;
      } finally {
        lockRef.current = false;
      }
    },
    [fn],
  );

  return lockFn;
};

export default useLockFn;
