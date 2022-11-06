import { useState, SetStateAction, useCallback } from 'react';

const useResetState = <S>(
  initialState: S | (() => S),
): [S, React.Dispatch<SetStateAction<S>>, () => void] => {
  const [state, setState] = useState(initialState);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  return [state, setState, resetState];
};

export default useResetState;
