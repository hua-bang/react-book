import { useState } from 'react';
import { useCallback } from 'react';
import { isFunction } from '../utils';

const useSetState = <S extends Record<string, any>>(
  initState: S | (() => S),
) => {
  const [state, setState] = useState<S>(initState);

  const setMergeState: React.Dispatch<React.SetStateAction<
    Partial<S>
  >> = useCallback(patch => {
    setState(prevState => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};

export default useSetState;
