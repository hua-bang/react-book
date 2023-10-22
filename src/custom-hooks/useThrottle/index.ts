import { useState } from 'react';
import { ThrottleOptions } from '../useThrottleFn';
import useThrottleEffect from '../useThrottleEffect';

const useThrottle = <T>(value: T, options?: ThrottleOptions) => {
  const [throttleValue, setThrottleValue] = useState<T>(value);

  useThrottleEffect(
    () => {
      setThrottleValue(value);
    },
    [value],
    options,
  );

  return throttleValue;
};

export default useThrottle;
