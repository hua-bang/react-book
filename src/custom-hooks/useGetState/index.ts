import { useCallback, useRef, useState } from 'react';

const useGetState = <S>(initialState: S | (() => S)) => {
  const [state, setState] = useState<S>(initialState);

  const stateRef = useRef<S>(state);
  stateRef.current = state;

  const getState = useCallback(() => stateRef.current, []);

  return [state, setState, getState];
};

export default useGetState;
