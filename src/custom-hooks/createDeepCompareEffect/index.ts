import { DependencyList, useEffect, useLayoutEffect, useRef } from 'react';
import { depsEqual } from '../utils/depsEqual';

type EffectHook = typeof useEffect | typeof useLayoutEffect;

export const createDeepCompareEffect = (hook: EffectHook) => {
  const useDeepCompareEffect = (
    effect: React.EffectCallback,
    deps?: React.DependencyList | undefined,
  ) => {
    const depsRef = useRef<DependencyList>();
    const signalRef = useRef<number>(0);

    if (deps === undefined || !depsEqual(deps, depsRef.current)) {
      depsRef.current = deps;
      signalRef.current += 1;
    }

    hook(effect, [signalRef.current]);
  };

  return useDeepCompareEffect;
};
