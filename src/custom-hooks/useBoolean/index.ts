import { useMemo, useState } from 'react';

interface Action {
  toggle: () => void;
  set: React.Dispatch<React.SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
}

const useBoolean = (defaultValue = false) => {
  const [state, setState] = useState<boolean>(defaultValue);

  const action: Action = useMemo(
    () => ({
      toggle: () => setState(prev => !prev),
      set: setState,
      setTrue: () => setState(true),
      setFalse: () => setState(false),
    }),
    [],
  );

  return [state, action];
};

export default useBoolean;
