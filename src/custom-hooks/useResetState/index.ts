import { useCallback, useState } from 'react';

const useResetState = <S>(initState: S | (() => S)) => {
  const [state, setState] = useState<S>(initState);

  const resetState = useCallback(() => {
    setState(initState);
  }, []);

  return [state, setState, resetState];
};

export default useResetState;
