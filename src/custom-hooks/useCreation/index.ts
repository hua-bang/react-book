import { DependencyList, useRef } from 'react';
import depsAreSame from '../utils/depsAreSame';

export const useCreation = <T>(factory: () => T, deps: DependencyList) => {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.initialized = true;
    current.obj = factory();
    current.deps = deps;
  }
  return current.obj as T;
};
