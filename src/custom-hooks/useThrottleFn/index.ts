import { throttle } from 'lodash-es';
import useLatest from '../useLatest';
import { isFunction } from '../utils';
import isDev from '../utils/isDev';
import { useMemo } from 'react';
import useUnMount from '../useUnmount';

type noop = (...args: any[]) => any;

export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

const useThrottleFn = <FN extends noop>(fn: FN, options?: ThrottleOptions) => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(
        `useThrottleFn expected parameter is a function, got ${typeof fn}`,
      );
    }
  }

  const fnRef = useLatest<FN>(fn);

  const wait = options?.wait ?? 1000;

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<FN>): ReturnType<FN> => {
          return fnRef.current(...args) as ReturnType<FN>;
        },
        wait,
        options,
      ),
    [],
  );

  useUnMount(() => throttled.cancel());

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
};

export default useThrottleFn;
