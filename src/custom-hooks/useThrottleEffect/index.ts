import { DependencyList, EffectCallback, useEffect, useState } from 'react';
import useThrottleFn, { ThrottleOptions } from '../useThrottleFn';
import useUpdateEffect from '../useUpdateEffect';

const useThrottleEffect = (
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) => {
  const [flag, setFlag] = useState({});

  const { run } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUpdateEffect(effect, [flag]);
};

export default useThrottleEffect;
