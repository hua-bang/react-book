import { useState, useCallback } from 'react';
import useUnmountedRef from '../useUnmountedRef';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

function useSafeState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>];

function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
];

function useSafeState<S>(initialState?: S | (() => S)) {
  const unMountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);

  const setSafeState: React.Dispatch<React.SetStateAction<
    S | undefined
  >> = useCallback((...args) => {
    if (unMountedRef.current) {
      return;
    }

    return setState(...args);
  }, []);

  return [state, setSafeState];
}

export default useSafeState;
