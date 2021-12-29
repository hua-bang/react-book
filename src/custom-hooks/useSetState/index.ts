import { useState, useCallback } from 'react';
import { isFunction } from '../../utils/index';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prev: Readonly<S>) => Pick<S, K> | null | S),
) => void;

const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S),
): [S, SetState<S>] => {
  const [state, setState] = useState(initialState);

  const setMergeState = useCallback(patch => {
    setState(prevState => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};

export default useSetState;
