import { useCallback, useState } from 'react';
import { isFunction } from '@/utils';

export type SetState<S extends Record<string, any>> = (state: Partial<S> | ((prev: S) => S)) => void;

const useSetState = <S extends Record<string, any>>(
  initialVal: S | (() => S),
): [S, SetState<S>] => {
  const [state, setState] = useState(initialVal);
  const setMergeState: SetState<S> = useCallback((patch) => {
    setState(prevState => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};

export default useSetState;