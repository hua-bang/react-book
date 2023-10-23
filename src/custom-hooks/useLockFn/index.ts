import { useCallback, useRef } from 'react';

interface PromiseFn<Params extends any[], ReturnValue extends any> {
  (...args: Params): Promise<ReturnValue>;
}

const useLockFn = <Params extends any[], ReturnValue extends any>(
  promiseFn: PromiseFn<Params, ReturnValue>,
): PromiseFn<Params, ReturnValue | undefined> => {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: Params) => {
      if (lockRef.current) {
        return;
      }

      lockRef.current = true;

      try {
        const ret = await promiseFn(...args);
        lockRef.current = false;
        return ret;
      } catch (e) {
        lockRef.current = false;
        throw e;
      }
    },
    [promiseFn],
  );
};

export default useLockFn;
