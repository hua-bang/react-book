import {
  useEffect,
  useLayoutEffect,
  DependencyList,
  EffectCallback,
  useRef,
} from 'react';

type EffectHook = typeof useEffect | typeof useLayoutEffect;

const createUpdateEffect = (effectHook: EffectHook) => {
  const useEffectHook = (effect: EffectCallback, deps?: DependencyList) => {
    const mountedRef = useRef<boolean>(false);

    effectHook(() => {
      return () => {
        mountedRef.current = false;
      };
    }, []);

    effectHook(() => {
      if (!mountedRef.current) {
        mountedRef.current = true;
        return;
      }

      return effect();
    }, deps);
  };

  return useEffectHook;
};

export default createUpdateEffect;
